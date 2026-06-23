'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, GraduationCap, Send, ShieldCheck, Map, Gift, Landmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TELEGRAM_CHANNEL } from '@/lib/brand'

const STATS = [
  { value: 'FX_Pulss', label: 'العلامة التجارية' },
  { value: '24/7', label: 'أسعار حيّة' },
  { value: '2', label: 'كورسات احترافية' },
  { value: '4.9', label: 'تقييم الطلاب' },
]

const FEATURES = [
  { icon: GraduationCap, title: 'SMC & ICT — علم السيولة', desc: 'الأماكن المخفية والظاهرة وقراءة الشموع والذيول' },
  { icon: Map, title: 'Book Map Mastery', desc: 'الخريطة الحرارية وربط البيانات باكج كامل' },
  { icon: Gift, title: 'مؤشرات مجانية', desc: 'مؤشرات حصرية من تصميم FX_Pulss Gold' },
  { icon: Landmark, title: 'حسابات التمويل', desc: 'استشارات وخدمات حسابات البروب فيرم' },
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-grid">
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-right"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-6">
              <ShieldCheck className="h-3.5 w-3.5" />
              منصة FX_Pulss Gold التعليمية
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.15] mb-6">
              تعلّم <span className="text-shimmer-gold">علم السيولة</span>
              <br />
              و <span className="text-shimmer-gold">Book Map</span> باحتراف
            </h1>

            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mr-0 leading-relaxed">
              كورسات احترافية بإشراف FX_Pulss Gold — علم السيولة المخفية والظاهرة، قراءة
              الشموع والذيول، ومنصة Book Map الكاملة، مع مؤشرات مجانية وخدمات حسابات التمويل.
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black hover:from-amber-400 hover:to-yellow-500 h-12 px-8">
                <Link href="#courses">
                  استكشف الكورسات
                  <ArrowLeft className="h-4 w-4 mr-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8 border-sky-500/40 text-sky-500 hover:bg-sky-500/10 hover:text-sky-400">
                <a href={TELEGRAM_CHANNEL} target="_blank" rel="noreferrer">
                  <Send className="h-4 w-4 ml-1" />
                  قناة تلجرام
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {STATS.map((s) => (
                <div key={s.label} className="text-center lg:text-right">
                  <div className="text-2xl md:text-3xl font-black text-gradient-gold">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ALI TRED hero image + Feature cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center gap-6"
          >
            {/* ALI TRED brand image */}
            <div className="relative">
              {/* Glow backdrop */}
              <div className="absolute -inset-6 bg-gradient-to-tr from-amber-500/20 via-pink-500/10 to-sky-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-full overflow-hidden ring-2 ring-amber-500/40 shadow-2xl shadow-amber-500/20">
                <Image
                  src="/ali-tred-hero.png"
                  alt="ALI TRED — FX_Pulss Gold"
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-cover"
                  priority
                />
              </div>
              {/* Brand name badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur border border-amber-500/40 rounded-full px-4 py-1 text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 whitespace-nowrap">
                ALI TRED
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 w-full">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="group relative rounded-2xl border border-border bg-card/60 backdrop-blur p-5 hover:border-amber-500/40 hover:bg-card transition-all"
                >
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-600/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <f.icon className="h-5 w-5 text-amber-500" />
                  </div>
                  <h3 className="font-bold text-base mb-1.5">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
