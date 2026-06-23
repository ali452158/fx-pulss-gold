'use client'

import { useState } from 'react'
import {
  Loader2, X, Coins, DollarSign, Globe, TrendingUp, Zap,
  ChevronLeft, ExternalLink, RefreshCw,
} from 'lucide-react'
import { useNews } from '@/lib/hooks'

type CategoryMeta = {
  label: string
  icon: typeof Coins
  color: string
  dot: string
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  gold: { label: 'الذهب', icon: Coins, color: 'text-amber-500', dot: 'bg-amber-500' },
  forex: { label: 'الفوركس', icon: DollarSign, color: 'text-emerald-500', dot: 'bg-emerald-500' },
  macro: { label: 'اقتصادي', icon: Globe, color: 'text-sky-500', dot: 'bg-sky-500' },
}

function relativeTime(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return ''
  const diff = Date.now() - d.getTime()
  const hrs = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (days > 0) return `منذ ${days} يوم`
  if (hrs > 0) return `منذ ${hrs} ساعة`
  const mins = Math.floor(diff / 60000)
  if (mins > 0) return `منذ ${mins} دقيقة`
  return 'الآن'
}

export function NewsTicker() {
  const { data, isLoading, refetch, isFetching } = useNews()
  const [dismissed, setDismissed] = useState(false)
  const items = data || []

  if (dismissed) return null

  // Duplicate items for seamless infinite scroll
  const doubled = items.length > 0 ? [...items, ...items] : []

  return (
    <div className="sticky top-16 z-40 w-full border-y border-amber-500/20 bg-gradient-to-r from-card/95 via-background/95 to-card/95 backdrop-blur-md shadow-lg shadow-black/20">
      {/* Subtle top border glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

      <div className="container mx-auto flex items-center gap-2 sm:gap-3 px-3 sm:px-4 h-12">
        {/* News badge with icon */}
        <div className="flex items-center gap-2 shrink-0 pl-3 border-l border-border/60">
          <div className="flex items-center gap-1.5">
            <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-600/10 ring-1 ring-amber-500/30">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-live absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
              </span>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">أخبار مباشرة</span>
              <span className="text-[9px] text-muted-foreground">تحديث كل 15 دقيقة</span>
            </div>
          </div>
        </div>

        {/* Scrolling news area */}
        <div className="flex-1 overflow-hidden relative self-stretch flex items-center">
          {/* Fade edges */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />

          {isLoading ? (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-500" />
              <span>جارٍ تحميل الأخبار من المصادر...</span>
            </div>
          ) : doubled.length > 0 ? (
            <div className="flex animate-ticker-news" dir="ltr">
              {doubled.map((item, i) => {
                const meta = CATEGORY_META[item.category] || CATEGORY_META.forex
                const relTime = relativeTime(item.date)
                return (
                  <a
                    key={`${item.url}-${i}`}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    dir="auto"
                    className="flex items-center gap-2 px-4 py-1 whitespace-nowrap text-xs hover:text-amber-500 transition-colors shrink-0 group"
                  >
                    {/* Category icon */}
                    <meta.icon className={`h-3.5 w-3.5 ${meta.color} shrink-0`} />
                    {/* Title */}
                    <span className="font-medium text-foreground group-hover:text-amber-500 transition-colors">
                      {item.title}
                    </span>
                    {/* Source badge */}
                    <span className="text-[10px] text-muted-foreground/70 shrink-0 hidden md:inline">
                      {item.source}
                    </span>
                    {/* Relative time */}
                    {relTime && (
                      <span className="text-[10px] text-amber-600/70 dark:text-amber-400/70 shrink-0 font-medium">
                        {relTime}
                      </span>
                    )}
                    <ExternalLink className="h-2.5 w-2.5 text-muted-foreground/40 group-hover:text-amber-500 shrink-0" />
                    {/* Separator */}
                    <ChevronLeft className="h-3 w-3 text-amber-500/40 mx-1 shrink-0" />
                  </a>
                )
              })}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Globe className="h-3.5 w-3.5 text-amber-500" />
              <span>أحدث أخبار الفوركس والذهب</span>
            </div>
          )}
        </div>

        {/* Refresh button */}
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="shrink-0 h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-amber-500 hover:bg-amber-500/10 transition-colors disabled:opacity-50"
          aria-label="تحديث الأخبار"
          title="تحديث الأخبار"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? 'animate-spin' : ''}`} />
        </button>

        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
          aria-label="إغلاق شريط الأخبار"
          title="إغلاق"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Subtle bottom border glow */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
    </div>
  )
}
