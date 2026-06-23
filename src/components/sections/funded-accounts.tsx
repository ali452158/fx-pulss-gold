'use client'

import {
  Landmark, Send, CheckCircle2, Target, Wallet, TrendingUp, ShieldCheck, Award, Users,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TELEGRAM_CONTACT } from '@/lib/brand'

const PLANS = [
  {
    name: 'تحدي 5K',
    amount: '$5,000',
    icon: Wallet,
    color: 'from-emerald-500/20 to-emerald-600/10',
    iconColor: 'text-emerald-500',
    desc: 'حساب تمويل بقيمة 5,000 دولار — مثالي للمبتدئين في حسابات البروب فيرم.',
    features: ['هدف 8% للتحدي', 'حد خسارة يومي 5%', 'حد خسارة إجمالي 10%', 'تداول بلا حد زمني'],
    popular: false,
  },
  {
    name: 'تحدي 25K',
    amount: '$25,000',
    icon: Target,
    color: 'from-amber-500/20 to-yellow-600/10',
    iconColor: 'text-amber-500',
    desc: 'حساب تمويل بقيمة 25,000 دولار — الخيار الأكثر شيوعاً للمتداولين المحترفين.',
    features: ['هدف 8% للتحدي', 'حد خسارة يومي 5%', 'حد خسارة إجمالي 10%', 'أرباح حتى 90%', 'تداول بلا حد زمني'],
    popular: true,
  },
  {
    name: 'تحدي 100K',
    amount: '$100,000',
    icon: Landmark,
    color: 'from-sky-500/20 to-sky-600/10',
    iconColor: 'text-sky-500',
    desc: 'حساب تمويل بقيمة 100,000 دولار — للمتداولين المتقدّمين الباحثين عن رأس مال كبير.',
    features: ['هدف 8% للتحدي', 'حد خسارة يومي 5%', 'حد خسارة إجمالي 10%', 'أرباح حتى 90%', 'تداول بلا حد زمني', 'دعم خاص'],
    popular: false,
  },
]

const SERVICES = [
  { icon: ShieldCheck, title: 'إعداد الحساب', desc: 'مساعدة في اختيار وإنشاء حساب البروب فيرم المناسب لمستواك' },
  { icon: TrendingUp, title: 'خطة اجتياز التحدي', desc: 'خطة تداول واضحة لاجتياز التحدي والتحقّق بسلام' },
  { icon: Award, title: 'متابعة ودعم', desc: 'متابعة أدائك وتقديم النصائح للحفاظ على الحساب المموّل' },
  { icon: Users, title: 'مجتمع المتداولين', desc: 'انضمام لمجتمع FX_Pulss Gold على تلجرام للتبادل الخبراتي' },
]

export function FundedAccounts() {
  return (
    <section id="funded" className="py-16 md:py-24 scroll-mt-16 bg-gradient-to-b from-transparent via-sky-500/[0.03] to-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 mb-4">
            <Landmark className="h-3.5 w-3.5" />
            حسابات التمويل
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            خدمة <span className="text-gradient-gold">حسابات التمويل</span> (Prop Firm)
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            احصل على رأس مال حقيقي للتداول — نساعدك في اختيار واجتياز حسابات البروب فيرم والوصول للحساب المموّل
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden flex flex-col p-6 transition-all duration-300 ${
                plan.popular
                  ? 'border-amber-500/50 shadow-xl shadow-amber-500/10 scale-[1.02]'
                  : 'hover:border-sky-500/40 hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-amber-500 to-yellow-600 text-black text-center text-xs font-bold py-1.5">
                  الأكثر طلباً
                </div>
              )}
              <div className={plan.popular ? 'pt-8' : 'pt-0'}>
                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                  <plan.icon className={`h-7 w-7 ${plan.iconColor}`} />
                </div>

                <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-black text-gradient-gold">{plan.amount}</span>
                  <span className="text-xs text-muted-foreground">رأس مال</span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {plan.desc}
                </p>

                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black hover:from-amber-400 hover:to-yellow-500'
                      : 'bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:from-sky-400 hover:to-sky-500'
                  }`}
                >
                  <a
                    href={`${TELEGRAM_CONTACT}?text=${encodeURIComponent(`أرغب في خدمة ${plan.name} (${plan.amount})`)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Send className="h-4 w-4 ml-1" />
                    اطلب الخدمة
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Services */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s) => (
            <Card key={s.title} className="p-5 hover:border-sky-500/30 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-sky-500/10 flex items-center justify-center mb-3">
                <s.icon className="h-5 w-5 text-sky-500" />
              </div>
              <h4 className="font-bold text-sm mb-1.5">{s.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-2xl border border-sky-500/30 bg-gradient-to-r from-sky-500/10 via-card to-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold mb-1">جاهز لتبدأ بحساب مموّل؟ 💼</h3>
            <p className="text-sm text-muted-foreground">
              راسلني على حسابي الخاص في تلجرام لاستشارة مجانية واختيار الخطة المناسبة لك
            </p>
          </div>
          <Button asChild size="lg" className="bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:from-sky-400 hover:to-sky-500 shrink-0">
            <a href={TELEGRAM_CONTACT} target="_blank" rel="noreferrer">
              <Send className="h-4 w-4 ml-1" />
              استشارة مجانية
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
