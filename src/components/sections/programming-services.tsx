'use client'

import Image from 'next/image'
import { Send, Code2, Bot, BarChart3, Cpu, Zap, ShieldCheck, Clock, Rocket, Eye } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TELEGRAM_CONTACT } from '@/lib/brand'
import { cn } from '@/lib/utils'

const SERVICES = [
  {
    icon: BarChart3,
    nameAr: 'برمجة مؤشرات TradingView',
    nameEn: 'TradingView Indicators',
    desc: 'برمجة مؤشرات احترافية مخصصة على منصة TradingView بلغة Pine Script — من مؤشرات العرض والطلب إلى مؤشرات السيولة والفركتلات مع تنبيهات فورية.',
    color: 'from-blue-500/20 to-blue-600/10',
    iconColor: 'text-blue-500',
    borderHover: 'hover:border-blue-500/40',
    features: ['Pine Script v5', 'تنبيهات فورية', 'مخصصة 100%', 'جميع الأطر الزمنية'],
    badge: 'الأكثر طلباً',
    image: '/prog-tradingview.jpg',
  },
  {
    icon: Cpu,
    nameAr: 'برمجة مؤشرات MT5',
    nameEn: 'MT5 Indicators',
    desc: 'برمجة مؤشرات احترافية على منصة MetaTrader 5 بلغة MQL5 — مع دعم كامل للتنبيهات والرسوم البيانية المتقدمة والتوافق مع جميع أنواع الحسابات.',
    color: 'from-emerald-500/20 to-emerald-600/10',
    iconColor: 'text-emerald-500',
    borderHover: 'hover:border-emerald-500/40',
    features: ['MQL5', 'رسوم متقدمة', 'تنبيهات push', 'جميع أنواع الحسابات'],
    badge: null,
    image: '/prog-mt5.jpg',
  },
  {
    icon: Bot,
    nameAr: 'برمجة الروبوتات الاكسبرتات',
    nameEn: 'Expert Advisors (EAs)',
    desc: 'برمجة اكسبرتات (Expert Advisors) ذكية لأخذ الصفقات تلقائياً — مع إدارة مخاطر متكاملة، ستوب لوس و TAKE PROFIT تلقائي، وخيارية التريلنج ستوب.',
    color: 'from-amber-500/20 to-yellow-600/10',
    iconColor: 'text-amber-500',
    borderHover: 'hover:border-amber-500/40',
    features: ['أخذ صفقات تلقائي', 'إدارة مخاطر', 'تريلنج ستوب', 'باك تست كامل'],
    badge: 'احترافي',
    image: '/prog-ea-bot.jpg',
  },
  {
    icon: Zap,
    nameAr: 'بوتات إشارات تداول',
    nameEn: 'Trading Signal Bots',
    desc: 'برمجة بوتات إشارات تداول ترسل إشارات الشراء والبيع لحظياً عبر Telegram أو Discord — مع تفاصيل الصفقة من نقطة الدخول والستوب والأهداف.',
    color: 'from-purple-500/20 to-purple-600/10',
    iconColor: 'text-purple-500',
    borderHover: 'hover:border-purple-500/40',
    features: ['إشارات لحظية', 'Telegram + Discord', 'تفاصيل كاملة', 'متعدد الأزواج'],
    badge: null,
    image: null,
  },
]

/* Showcase of built tools */
const SHOWCASE = [
  {
    image: '/prog-tool1.jpg',
    title: 'مؤشر Smart Money Concepts',
    platform: 'TradingView',
    platformColor: 'bg-blue-500/90',
  },
  {
    image: '/prog-tool2.jpg',
    title: 'لوحة تحكم Alfa Pro',
    platform: 'Dashboard',
    platformColor: 'bg-amber-500/90',
  },
  {
    image: '/prog-tool3.jpg',
    title: 'نظام تسجيل دخول Alfa Pro',
    platform: 'Web App',
    platformColor: 'bg-emerald-500/90',
  },
  {
    image: '/prog-tool4.jpg',
    title: 'منشئ التقارير Alfa',
    platform: 'Reports',
    platformColor: 'bg-sky-500/90',
  },
  {
    image: '/prog-tool5.jpg',
    title: 'ربط حسابات MT5',
    platform: 'MT5',
    platformColor: 'bg-emerald-500/90',
  },
  {
    image: '/prog-tool6.jpg',
    title: 'محدد الاستراتيجية',
    platform: 'Strategy',
    platformColor: 'bg-purple-500/90',
  },
]

const TRUST_ITEMS = [
  { icon: Code2, label: '+50 مشروع برمجي', sub: 'تم تسليمه بنجاح' },
  { icon: ShieldCheck, label: 'ضمان الجودة', sub: 'صيانة مجانية 30 يوم' },
  { icon: Clock, label: 'تسليم سريع', sub: 'خلال 3-7 أيام' },
  { icon: Rocket, label: 'دعم متواصل', sub: 'بعد التسليم' },
]

const tgMsg = `أرغب في الاستفسار عن خدمات البرمجة`
const tgLink = `${TELEGRAM_CONTACT}?text=${encodeURIComponent(tgMsg)}`

export function ProgrammingServices() {
  return (
    <section id="programming" className="py-16 md:py-24 scroll-mt-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-4">
            <Code2 className="h-3.5 w-3.5" />
            خدمات البرمجة
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            برمجة <span className="text-gradient-gold">احترافية</span> لمؤشراتك وروبوتاتك
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            نبرمج لك أي مؤشر أو اكسبرت أو بوت حسب استراتيجيتك — على TradingView أو MT5 أو Telegram — بجودة احترافية ودعم متواصل
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {SERVICES.map((s) => (
            <Card
              key={s.nameEn}
              className={cn(
                'group relative overflow-hidden flex flex-col p-6',
                s.borderHover,
                'hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300'
              )}
            >
              {/* Badge */}
              {s.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-amber-500/90 text-black border-0 text-[10px]">
                    {s.badge}
                  </Badge>
                </div>
              )}

              {/* Image or Icon */}
              {s.image ? (
                <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4 border border-border/50">
                  <Image
                    src={s.image}
                    alt={s.nameAr}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  {/* Icon overlay */}
                  <div className={cn('absolute bottom-3 right-3 h-10 w-10 rounded-lg bg-gradient-to-br flex items-center justify-center', s.color)}>
                    <s.icon className={cn('h-5 w-5', s.iconColor)} />
                  </div>
                </div>
              ) : (
                <div className={cn('h-14 w-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 group-hover:scale-110 transition-transform', s.color)}>
                  <s.icon className={cn('h-7 w-7', s.iconColor)} />
                </div>
              )}

              {/* Title */}
              <div className="mb-2">
                <h3 className="font-bold text-lg">{s.nameAr}</h3>
                <p className="text-xs text-muted-foreground font-mono" dir="ltr">{s.nameEn}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {s.desc}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {s.features.map((f) => (
                  <Badge key={f} variant="secondary" className="text-[10px] font-mono">
                    {f}
                  </Badge>
                ))}
              </div>

              {/* CTA */}
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black hover:from-amber-400 hover:to-yellow-500 w-full"
              >
                <a href={tgLink} target="_blank" rel="noreferrer">
                  <Send className="h-3.5 w-3.5 ml-1" />
                  اطلب الخدمة
                </a>
              </Button>
            </Card>
          ))}
        </div>

        {/* ===== Showcase: Tools We Built ===== */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-4">
              <Eye className="h-3.5 w-3.5" />
              أعمالنا
            </div>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
              أدوات <span className="text-gradient-gold">برمجناها</span> بإيدينا
            </h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              نماذج حقيقية من المؤشرات واللوحات والاكسبرتات التي برمجناها — كل مشروع مخصصة حسب استراتيجية العميل
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SHOWCASE.map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-xl overflow-hidden border border-border/50 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300"
              >
                <div className="relative aspect-video">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  {/* Platform badge */}
                  <Badge className={`absolute top-2 left-2 ${item.platformColor} text-white border-0 text-[9px]`}>
                    {item.platform}
                  </Badge>
                  {/* Title */}
                  <div className="absolute bottom-2 right-2 left-2">
                    <p className="text-xs font-bold text-foreground truncate">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust items */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {TRUST_ITEMS.map((t) => (
            <div key={t.label} className="rounded-xl border border-border/50 bg-card/50 p-4 text-center">
              <t.icon className="h-6 w-6 text-amber-500 mx-auto mb-2" />
              <div className="text-sm font-bold">{t.label}</div>
              <div className="text-[11px] text-muted-foreground">{t.sub}</div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="rounded-2xl border border-dashed border-amber-500/40 bg-gradient-to-r from-amber-500/5 via-card to-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0">
              <Code2 className="h-6 w-6 text-amber-500" />
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-xl font-bold mb-1">لديك استراتيجية وتريد تحويلها لبرنامج؟ 💡</h3>
              <p className="text-sm text-muted-foreground">
                أرسل استراتيجيتك وسأقوم ببرمجتها باحترافية — مؤشر، اكسبرت، أو بوت إشارات حسب احتياجك
              </p>
            </div>
          </div>
          <Button asChild size="lg" className="bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:from-sky-400 hover:to-sky-500 shrink-0">
            <a href={tgLink} target="_blank" rel="noreferrer">
              <Send className="h-4 w-4 ml-1" />
              راسلني الآن
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
