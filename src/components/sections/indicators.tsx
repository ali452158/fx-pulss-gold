'use client'

import { useState } from 'react'
import {
  Gift, Download, Send, Layers, TrendingUp, ArrowLeftRight, Activity,
  Repeat, Droplets, Target, Clock, Sparkles, Lock,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TELEGRAM_CONTACT } from '@/lib/brand'
import { cn } from '@/lib/utils'

type Indicator = {
  name: string
  nameAr: string
  icon: typeof Gift
  color: string
  iconColor: string
  desc: string
  tags: string[]
  badge?: string | null
  paid: boolean
}

const FREE_INDICATORS: Indicator[] = [
  {
    name: 'Supply & Demand Zones',
    nameAr: 'مناطق العرض والطلب',
    icon: Layers,
    color: 'from-emerald-500/20 to-emerald-600/10',
    iconColor: 'text-emerald-500',
    desc: 'يرسم مناطق العرض والطلب (Supply & Demand) تلقائياً على الرسم البياني مع تمييز المناطق القوية والمتجدّدة.',
    tags: ['Supply', 'Demand', 'Auto-draw'],
    badge: 'مجاني',
    paid: false,
  },
  {
    name: 'Trend Master',
    nameAr: 'مؤشر الترندات',
    icon: TrendingUp,
    color: 'from-sky-500/20 to-sky-600/10',
    iconColor: 'text-sky-500',
    desc: 'يحدّد اتجاه السوق على عدّة أطر زمنية ويرسم خطوط الترند تلقائياً مع إشارات تغيّر الاتجاه.',
    tags: ['Trend', 'Multi-TF', 'Signals'],
    badge: 'مجاني',
    paid: false,
  },
  {
    name: 'Buy/Sell Levels',
    nameAr: 'المستويات الشرائية والبيعية',
    icon: ArrowLeftRight,
    color: 'from-amber-500/20 to-yellow-600/10',
    iconColor: 'text-amber-500',
    desc: 'يعرض المستويات الشرائية (Demand) والبيعية (Supply) النشطة مع تنبيهات عند اقتراب السعر منها.',
    tags: ['Buy', 'Sell', 'Levels', 'Alerts'],
    badge: 'مجاني',
    paid: false,
  },
]

const PAID_INDICATORS: Indicator[] = [
  {
    name: 'Order Flow Pro',
    nameAr: 'مؤشر تدفّق الأوامر',
    icon: Activity,
    color: 'from-purple-500/20 to-purple-600/10',
    iconColor: 'text-purple-500',
    desc: 'مؤشر احترافي يحلّل تدفّق الأوامر (Order Flow) لحظياً ويعرض أحجام الطلبات النشطة وحركة الأموال الذكية.',
    tags: ['Order Flow', 'Volume', 'Live'],
    badge: 'مدفوع',
    paid: true,
  },
  {
    name: 'Reversal Hunter',
    nameAr: 'تحديد مناطق الارتداد لحظي',
    icon: Repeat,
    color: 'from-rose-500/20 to-rose-600/10',
    iconColor: 'text-rose-500',
    desc: 'يحدّد مناطق الارتداد (Reversal) لحظياً بدقّة عالية ويعطي تنبيهات فورية عند احتمالية انعكاس السعر.',
    tags: ['Reversal', 'Live', 'Alerts'],
    badge: 'مدفوع',
    paid: true,
  },
  {
    name: 'Liquidity Map',
    nameAr: 'أماكن السيولة',
    icon: Droplets,
    color: 'from-cyan-500/20 to-cyan-600/10',
    iconColor: 'text-cyan-500',
    desc: 'يرسم خريطة كاملة لأماكن السيولة (Liquidity) الظاهرة والمخفية وينبّه عند اصطيادها من قبل المؤسسات.',
    tags: ['Liquidity', 'SMC', 'ICT', 'Map'],
    badge: 'مدفوع',
    paid: true,
  },
  {
    name: 'Trade Entry System',
    nameAr: 'دخول صفقة + ستوب لوس + أهداف',
    icon: Target,
    color: 'from-amber-500/20 to-yellow-600/10',
    iconColor: 'text-amber-500',
    desc: 'نظام دخول متكامل يحدّد نقطة الدخول ووقف الخسارة (Stop Loss) والأهداف (Take Profit) تلقائياً لكل صفقة.',
    tags: ['Entry', 'SL', 'TP', 'Auto'],
    badge: 'الأكثر طلباً',
    paid: true,
  },
]

function IndicatorCard({ ind }: { ind: Indicator }) {
  const msgText = ind.paid
    ? `أرغب في الاستفسار عن مؤشر ${ind.nameAr} (${ind.name}) المدفوع`
    : `أرغب في الحصول على مؤشر ${ind.nameAr} (${ind.name}) المجاني`
  const tgLink = `${TELEGRAM_CONTACT}?text=${encodeURIComponent(msgText)}`

  return (
    <Card className="group relative overflow-hidden flex flex-col p-5 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300">
      {/* Badge */}
      <div className="absolute top-4 left-4 z-10 flex gap-1.5">
        {ind.paid ? (
          <Badge className="bg-purple-500/90 text-white border-0 text-[10px] gap-1">
            <Lock className="h-2.5 w-2.5" />
            مدفوع
          </Badge>
        ) : (
          <Badge className="bg-emerald-500/90 text-white border-0 text-[10px] gap-1">
            <Gift className="h-2.5 w-2.5" />
            مجاني
          </Badge>
        )}
        {ind.badge && ind.badge !== 'مجاني' && ind.badge !== 'مدفوع' && (
          <Badge className="bg-amber-500/90 text-black border-0 text-[10px]">
            {ind.badge}
          </Badge>
        )}
      </div>

      {/* Icon */}
      <div className={cn('h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 group-hover:scale-110 transition-transform', ind.color)}>
        <ind.icon className={cn('h-6 w-6', ind.iconColor)} />
      </div>

      {/* Title */}
      <div className="mb-2">
        <h3 className="font-bold text-base">{ind.nameAr}</h3>
        <p className="text-[11px] text-muted-foreground font-mono" dir="ltr">{ind.name}</p>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
        {ind.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {ind.tags.map((t) => (
          <Badge key={t} variant="secondary" className="text-[10px] font-mono">
            {t}
          </Badge>
        ))}
      </div>

      {/* Status + CTA */}
      <div className="flex items-center justify-between gap-2">
        {ind.paid ? (
          <span className="text-sm font-bold text-purple-600 dark:text-purple-400">مدفوع</span>
        ) : (
          <span className="text-lg font-black text-emerald-500">مجاناً</span>
        )}
        <Button
          asChild
          size="sm"
          className={
            ind.paid
              ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-400 hover:to-purple-500'
              : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-400 hover:to-emerald-500'
          }
        >
          <a href={tgLink} target="_blank" rel="noreferrer">
            {ind.paid ? (
              <><Send className="h-3.5 w-3.5 ml-1" />راسلني على حسابي الخاص</>
            ) : (
              <><Download className="h-3.5 w-3.5 ml-1" />تحميل مجاني</>
            )}
          </a>
        </Button>
      </div>
    </Card>
  )
}

export function Indicators() {
  const [tab, setTab] = useState<'all' | 'free' | 'paid'>('all')

  const shown =
    tab === 'all' ? [...FREE_INDICATORS, ...PAID_INDICATORS]
    : tab === 'free' ? FREE_INDICATORS
    : PAID_INDICATORS

  return (
    <section id="indicators" className="py-16 md:py-24 scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            مؤشرات FX_Pulss Gold
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            مؤشرات <span className="text-gradient-gold">احترافية</span> — مجانية ومدفوعة
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            مجموعة مؤشرات حصرية من تصميم ALI TRED لدعم تداولك في SMC و ICT و Book Map — مجانية ومدفوعة
          </p>
        </div>

        {/* Stats summary */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-5 py-2.5 text-center">
            <div className="text-2xl font-black text-emerald-500">{FREE_INDICATORS.length}</div>
            <div className="text-[11px] text-muted-foreground">مؤشرات مجانية</div>
          </div>
          <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 px-5 py-2.5 text-center">
            <div className="text-2xl font-black text-purple-500">{PAID_INDICATORS.length}</div>
            <div className="text-[11px] text-muted-foreground">مؤشرات مدفوعة</div>
          </div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-5 py-2.5 text-center">
            <div className="text-2xl font-black text-gradient-gold">+قريباً</div>
            <div className="text-[11px] text-muted-foreground">مؤشرات جديدة</div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {([
            { key: 'all', label: 'كل المؤشرات' },
            { key: 'free', label: 'مجانية', icon: Gift },
            { key: 'paid', label: 'مدفوعة', icon: Lock },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium transition-all',
                tab === t.key
                  ? t.key === 'paid'
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md'
                    : t.key === 'free'
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-md'
                  : 'bg-card border border-border hover:border-amber-500/40 text-muted-foreground hover:text-foreground'
              )}
            >
              {'icon' in t && t.icon ? <t.icon className="h-3.5 w-3.5" /> : null}
              {t.label}
            </button>
          ))}
        </div>

        {/* Indicators grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((ind) => (
            <IndicatorCard key={ind.name} ind={ind} />
          ))}
        </div>

        {/* Coming soon banner */}
        <div className="mt-10 rounded-2xl border border-dashed border-amber-500/40 bg-gradient-to-r from-amber-500/5 via-card to-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0">
              <Clock className="h-6 w-6 text-amber-500" />
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-xl font-bold mb-1">مؤشرات جديدة قريباً 🔜</h3>
              <p className="text-sm text-muted-foreground">
                نعمل على إضافة مؤشرات احترافية جديدة — تابعنا على القنوات ليصلك كل جديد أولاً بأول
              </p>
            </div>
          </div>
          <Button asChild size="lg" className="bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:from-sky-400 hover:to-sky-500 shrink-0">
            <a href={TELEGRAM_CONTACT} target="_blank" rel="noreferrer">
              <Send className="h-4 w-4 ml-1" />
              تابع الجديد
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
