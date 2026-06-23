'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, Sun, Moon, Send, Youtube, Instagram } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { TikTokIcon } from '@/components/icons/tiktok-icon'
import { SOCIAL_LINKS, TELEGRAM_CHANNEL } from '@/lib/brand'

const NAV = [
  { href: '#courses', label: 'الكورسات' },
  { href: '#charts', label: 'المخططات' },
  { href: '#indicators', label: 'المؤشرات' },
  { href: '#calculator', label: 'الحاسبة' },
  { href: '#funded', label: 'حسابات التمويل' },
  { href: '#faq', label: 'الأسئلة' },
]

function SocialIcon({ iconKey, className }: { iconKey: string; className?: string }) {
  if (iconKey === 'send') return <Send className={className} />
  if (iconKey === 'youtube') return <Youtube className={className} />
  if (iconKey === 'instagram') return <Instagram className={className} />
  if (iconKey === 'tiktok') return <TikTokIcon className={className} />
  return null
}

export function Header() {
  const { setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? 'border-border bg-background/85 backdrop-blur-xl shadow-lg shadow-black/5'
          : 'border-transparent bg-background/40 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo + brand */}
        <Link href="#top" className="flex items-center gap-2.5 group">
          <div className="relative h-11 w-11 rounded-full overflow-hidden ring-2 ring-amber-500/50 shadow-md group-hover:scale-105 transition-transform shrink-0">
            <Image
              src="/ali-tred-hero.png"
              alt="ALI TRED — FX_Pulss Gold"
              fill
              sizes="44px"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight">FX_Pulss Gold</span>
            <span className="text-[10px] text-muted-foreground tracking-widest">SMC · ICT · BOOK MAP</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 rounded-md transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          {/* Social icons (desktop) */}
          <div className="hidden md:flex items-center gap-0.5">
            {SOCIAL_LINKS.map((s) => (
              <Button
                key={s.key}
                asChild
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-foreground"
                title={s.label}
              >
                <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                  <SocialIcon iconKey={s.icon} className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark')}
            aria-label="تبديل المظهر"
            className="h-9 w-9"
          >
            <Sun className="h-4 w-4 hidden dark:block" />
            <Moon className="h-4 w-4 block dark:hidden" />
          </Button>
          <Button asChild className="hidden md:inline-flex bg-gradient-to-r from-amber-500 to-yellow-600 text-black hover:from-amber-400 hover:to-yellow-500">
            <Link href="#courses">ابدأ التعلّم</Link>
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="text-right mb-6">القائمة</SheetTitle>
              <nav className="flex flex-col gap-1" onClick={() => setOpen(false)}>
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-3 py-3 text-base font-medium hover:bg-accent rounded-md transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Social links (mobile) */}
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.key}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center gap-1 rounded-lg border border-border bg-card py-2.5 text-[10px] text-muted-foreground hover:border-amber-500/40 hover:text-foreground transition-colors"
                    >
                      <SocialIcon iconKey={s.icon} className="h-4 w-4" />
                      {s.label}
                    </a>
                  ))}
                </div>

                <Button asChild className="mt-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-black">
                  <Link href="#courses">ابدأ التعلّم</Link>
                </Button>
                <Button asChild variant="outline" className="mt-2 border-sky-500/40 text-sky-500 hover:bg-sky-500/10">
                  <a href={TELEGRAM_CHANNEL} target="_blank" rel="noreferrer">
                    <Send className="h-4 w-4 ml-1" />
                    قناة تلجرام
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
