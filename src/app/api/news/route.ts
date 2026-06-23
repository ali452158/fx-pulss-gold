import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

type NewsItem = {
  title: string
  url: string
  snippet: string
  source: string
  date: string
  category: string
  image?: string
}

type Cache = { items: NewsItem[]; ts: number }

const globalCache = globalThis as unknown as { __newsCache?: Cache }
const CACHE_TTL = 15 * 60 * 1000 // 15 minutes

// ===== RSS feeds that actually work (verified) =====
// All return 200 with valid RSS/XML content. No API keys needed.
const RSS_FEEDS: { url: string; category: string; source: string; lang: 'ar' | 'en' }[] = [
  // Arabic sources
  { url: 'https://www.skynewsarabia.com/web/rss/business.xml', category: 'macro', source: 'سكاي نيوز عربية', lang: 'ar' },
  { url: 'https://arabic.rt.com/rss/', category: 'macro', source: 'RT عربية', lang: 'ar' },
  // English sources (gold + forex specific)
  { url: 'https://www.investing.com/rss/news_25.rss', category: 'gold', source: 'investing.com', lang: 'en' },
  { url: 'https://www.investing.com/rss/news_1.rss', category: 'forex', source: 'investing.com', lang: 'en' },
  { url: 'https://feeds.finance.yahoo.com/rss/2.0/headline?s=GC=F&region=US&lang=en-US', category: 'gold', source: 'yahoo finance', lang: 'en' },
  { url: 'https://feeds.finance.yahoo.com/rss/2.0/headline?s=EURUSD=X&region=US&lang=en-US', category: 'forex', source: 'yahoo finance', lang: 'en' },
  { url: 'https://www.actionforex.com/feed/', category: 'forex', source: 'actionforex', lang: 'en' },
  { url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html', category: 'macro', source: 'cnbc', lang: 'en' },
  { url: 'https://www.cnbc.com/id/20910258/device/rss/rss.html', category: 'forex', source: 'cnbc', lang: 'en' },
]

function stripHtml(html: string): string {
  return html
    .replace(/<!\[CDATA\[|\]\]>/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim()
}

function parseRss(xml: string, category: string, source: string): NewsItem[] {
  const items: NewsItem[] = []
  // Match <item>...</item> blocks (allow whitespace before tags)
  const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/g
  let match
  while ((match = itemRegex.exec(xml)) !== null && items.length < 12) {
    const block = match[1]
    const title = block.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] || ''
    const link = block.match(/<link[^>]*>([\s\S]*?)<\/link>/)?.[1]?.trim() || block.match(/<link[^>]*href="([^"]*)"/)?.[1] || ''
    const desc = block.match(/<description[^>]*>([\s\S]*?)<\/description>/)?.[1] || ''
    const pubDate = block.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/)?.[1] || block.match(/<dc:date[^>]*>([\s\S]*?)<\/dc:date>/)?.[1] || ''

    // Extract thumbnail image
    let image = ''
    const mediaContent = block.match(/<media:content[^>]*url="([^"]*)"[^>]*>/i)
    const mediaThumb = block.match(/<media:thumbnail[^>]*url="([^"]*)"[^>]*>/i)
    const enclosure = block.match(/<enclosure[^>]*url="([^"]*\.(?:jpg|jpeg|png|webp)[^"]*)"[^>]*>/i)
    const imgInDesc = desc.match(/<img[^>]*src="([^"]*)"[^>]*>/i)
    image = (mediaContent?.[1] || mediaThumb?.[1] || enclosure?.[1] || imgInDesc?.[1] || '').trim()

    const cleanTitle = stripHtml(title)
    const cleanUrl = link.trim()
    if (!cleanTitle || !cleanUrl) continue
    // Skip channel-level titles (feed titles, not articles)
    if (cleanTitle.length < 10) continue

    items.push({
      title: cleanTitle,
      url: cleanUrl,
      snippet: stripHtml(desc).slice(0, 200),
      source,
      date: pubDate.trim(),
      category,
      image,
    })
  }
  return items
}

async function fetchNews(): Promise<NewsItem[]> {
  const results = await Promise.all(
    RSS_FEEDS.map(async (feed) => {
      try {
        const res = await fetch(feed.url, {
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; FXPulssNewsBot/1.0)' },
          next: { revalidate: 0 },
          signal: AbortSignal.timeout(10000),
        })
        if (!res.ok) return [] as NewsItem[]
        const xml = await res.text()
        if (!xml || xml.length < 100) return [] as NewsItem[]
        return parseRss(xml, feed.category, feed.source)
      } catch {
        return [] as NewsItem[]
      }
    })
  )

  const all = results.flat()

  // Dedupe by URL and title
  const seenUrl = new Set<string>()
  const seenTitle = new Set<string>()
  const deduped = all.filter((n) => {
    if (!n.url || seenUrl.has(n.url)) return false
    if (seenTitle.has(n.title)) return false
    seenUrl.add(n.url)
    seenTitle.add(n.title)
    return true
  })

  // Sort by date desc (most recent first)
  deduped.sort((a, b) => {
    return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
  })

  // Interleave categories so all types appear: take from each category round-robin
  const byCat: Record<string, NewsItem[]> = { gold: [], forex: [], macro: [] }
  for (const item of deduped) {
    if (!byCat[item.category]) byCat[item.category] = []
    byCat[item.category].push(item)
  }
  const interleaved: NewsItem[] = []
  const cats = ['gold', 'forex', 'macro']
  let maxLen = Math.max(...cats.map((c) => byCat[c]?.length || 0))
  for (let i = 0; i < maxLen; i++) {
    for (const cat of cats) {
      if (byCat[cat] && byCat[cat][i]) {
        interleaved.push(byCat[cat][i])
      }
    }
  }

  return interleaved.slice(0, 30)
}

export async function GET() {
  const cache = globalCache.__newsCache
  if (cache && Date.now() - cache.ts < CACHE_TTL) {
    return NextResponse.json({
      cached: true,
      timestamp: cache.ts,
      count: cache.items.length,
      items: cache.items,
      refreshIn: Math.max(0, CACHE_TTL - (Date.now() - cache.ts)),
    })
  }

  try {
    const items = await fetchNews()
    globalCache.__newsCache = { items, ts: Date.now() }
    return NextResponse.json({
      cached: false,
      timestamp: Date.now(),
      count: items.length,
      items,
      refreshIn: CACHE_TTL,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'فشل جلب الأخبار'
    return NextResponse.json(
      { error: message, items: [], count: 0, refreshIn: CACHE_TTL },
      { status: 200 }
    )
  }
}
