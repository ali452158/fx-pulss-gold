'use client'

import Link from 'next/link'
import Image from 'next/image'
import { TrendingUp, Bitcoin, ShieldCheck, Send, Youtube, Instagram, Gift, Landmark } from 'lucide-react'
import { TikTokIcon } from '@/components/icons/tiktok-icon'
import { SOCIAL_LINKS, TELEGRAM_CHANNEL, TELEGRAM_CONTACT } from '@/lib/brand'

const LINKS = [
  { href: '#markets', label: 'الأسواق الحيّة' },
  { href: '#courses', label: 'الكورسات' },
  { href: '#indicators', label: 'المؤشرات المجانية' },
  { href: '#funded', label: 'حسابات التمويل' },
  { href: '#news', label: 'الأخبار' },
]

const FEATURES = [
  { icon: TrendingUp, label: 'أسعار حيّة 24/7' },
  { icon: Gift, label: 'مؤشرات مجانية' },
  { icon: Landmark, label: 'حسابات تمويل' },
  { icon: ShieldCheck, label: 'منصة آمنة' },
]

function SocialIcon({ iconKey, className }: { iconKey: string; className?: string }) {
  if (iconKey === 'send') return <Send className={className} />
  if (iconKey === 'youtube') return <Youtube className={className} />
  if (iconKey === 'instagram') return <Instagram className={className} />
  if (iconKey === 'tiktok') return <TikTokIcon className={className} />
  return null
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card/40 backdrop-blur">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-amber-500/50 shrink-0">
                <Image
                  src="/ali-tred-hero.png"
                  alt="ALI TRED — FX_Pulss Gold"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-extrabold">FX_Pulss Gold</span>
                <span className="text-[10px] text-muted-foreground tracking-widest">SMC · ICT · BOOK MAP</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed mb-4">
              منصة FX_Pulss Gold التعليمية — كورسات احترافية في علم السيولة (SMC & ICT) ومنصة
              Book Map، مؤشرات مجانية حصرية، وخدمات حسابات التمويل (Prop Firm).
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-5">
              {FEATURES.map((f) => (
                <span key={f.label} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <f.icon className="h-3.5 w-3.5 text-amber-500" />
                  {f.label}
                </span>
              ))}
            </div>

            {/* Social media row */}
            <div className="flex flex-wrap items-center gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  title={`${s.label} — ${s.handle}`}
                  className="flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-2 text-xs font-medium text-muted-foreground hover:border-amber-500/40 hover:text-foreground transition-colors"
                >
                  <SocialIcon iconKey={s.icon} className="h-4 w-4" />
                  <span dir="ltr">{s.handle}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-sm mb-3">روابط سريعة</h4>
            <ul className="space-y-2">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-amber-500 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm mb-3">تواصل معنا</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a href={TELEGRAM_CHANNEL} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-sky-500 transition-colors">
                  <Send className="h-4 w-4 text-sky-500 shrink-0" />
                  <span dir="ltr">@FX_pulssGold</span>
                  <span className="text-[10px] text-muted-foreground/70">(قناة)</span>
                </a>
              </li>
              <li>
                <a href={TELEGRAM_CONTACT} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-sky-500 transition-colors">
                  <Send className="h-4 w-4 text-sky-500 shrink-0" />
                  <span dir="ltr">@ali_0165</span>
                  <span className="text-[10px] text-muted-foreground/70">(اشتراكات)</span>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@ali.c.u" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-red-500 transition-colors">
                  <Youtube className="h-4 w-4 text-red-500 shrink-0" />
                  <span dir="ltr">@ali.c.u</span>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/alifxgold3" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-pink-500 transition-colors">
                  <Instagram className="h-4 w-4 text-pink-500 shrink-0" />
                  <span dir="ltr">@alifxgold3</span>
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@ali.trad011" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <TikTokIcon className="h-4 w-4 shrink-0" />
                  <span dir="ltr">@ali.trad011</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} FX_Pulss Gold. جميع الحقوق محفوظة.
          </p>
          <p className="text-[11px] text-muted-foreground max-w-xl text-center md:text-left leading-relaxed">
            ⚠️ تنبيه المخاطر: ينطوي تداول الفوركس على مستوى عالٍ من المخاطر وقد لا يناسب جميع المستثمرين.
            هذا المحتوى تعليمي ولا يُعدّ توصية استثمارية.
          </p>
        </div>
      </div>
    </footer>
  )
}
