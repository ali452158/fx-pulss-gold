'use client'

import { HelpCircle, GraduationCap, MonitorPlay, Download, Send } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { TELEGRAM_CONTACT } from '@/lib/brand'

type FaqItem = {
  id: string
  question: string
  answer: string
  icon: typeof GraduationCap
  points?: string[]
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'item-1',
    question: 'هل الكورسات مناسبة للمبتدئين؟',
    icon: GraduationCap,
    answer:
      'نعم بالتأكيد. كورس SMC & ICT مصمّم ليناسب جميع المستويات، ويبدأ من الأساسيات قبل التعمّق في المفاهيم المتقدّمة. أما كورس Book Map فينصح به بعد إتقان الأساسيات أو للمتداولين ذوي الخبرة.',
    points: [
      'شرح مبسّط لكل مفهوم قبل الانتقال للمستوى الأعلى',
      'تطبيقات عملية على الرسوم البيانية الحيّة',
      'دعم مباشر مع المدرب عبر تلجرام عند أي استفسار',
      'منهج متدرّج من المبتدئ إلى الاحتراف',
    ],
  },
  {
    id: 'item-2',
    question: 'ما الأدوات والمنصّات المستخدمة في الكورسات؟',
    icon: MonitorPlay,
    answer:
      'نعتمد على أقوى منصّات التحليل الفنّي في السوق. كل كورس يشرح الأدوات المناسبة له بالتفصيل وكيفية الاستفادة القصوى منها في تحليل الذهب والفوركس.',
    points: [
      'TradingView — للتحليل الفنّي ورسم بنية السوق ومناطق السيولة',
      'Bookmap — للخريطة الحرارية وتدفّق الأوامر اللحظي',
      'ATAS — لتحليل Volume Profile و Order Flow',
    ],
  },
  {
    id: 'item-3',
    question: 'كيف أُفعّل المؤشرات المجانية؟',
    icon: Download,
    answer:
      'العملية بسيطة وسريعة. بعد التواصل معي على حسابي الخاص في تلجرام، ستحصل على المؤشر مع شرح كامل لطريقة التركيب والاستخدام خطوة بخطوة.',
    points: [
      'راسلني على حسابي الخاص عبر زر "تحميل مجاني" في كل مؤشر',
      'سيتم إرسال ملف المؤشر مع دليل التركيب',
      'أغلب المؤشرات تعمل على TradingView (Pine Script)',
      'دعم فني مجاني بعد التركيب لأي استفسار',
    ],
  },
]

export function Faq() {
  return (
    <section id="faq" className="py-16 md:py-24 scroll-mt-16 bg-slate-950/40">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-500 mb-4">
              <HelpCircle className="h-3.5 w-3.5" />
              مركز المساعدة
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
              الأسئلة الشائعة 🧐
            </h2>
            <p className="text-muted-foreground">
              إجابات على أكثر الأسئلة التي تصلنا من المتداولين
            </p>
          </div>

          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            className="space-y-3"
          >
            {FAQ_ITEMS.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="rounded-2xl border border-border bg-card/60 backdrop-blur px-5 data-[state=open]:border-amber-500/40 data-[state=open]:bg-card transition-colors overflow-hidden"
              >
                <AccordionTrigger className="hover:no-underline py-5 [&[data-state=open]>svg]:text-amber-500">
                  <div className="flex items-center gap-3 text-right">
                    <div className="h-9 w-9 shrink-0 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-amber-500" />
                    </div>
                    <span className="font-bold text-sm md:text-base text-foreground">
                      {item.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pr-12 pb-5">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {item.answer}
                  </p>
                  {item.points && (
                    <ul className="space-y-2">
                      {item.points.map((p, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Still have questions? */}
          <div className="mt-8 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/5 via-card to-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-right">
              <h3 className="font-bold text-base mb-1">لديك سؤال آخر؟ 💬</h3>
              <p className="text-sm text-muted-foreground">
                راسلني على حسابي الخاص وسأرد عليك في أقرب وقت
              </p>
            </div>
            <a
              href={TELEGRAM_CONTACT}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:from-sky-400 hover:to-sky-500 transition-all shrink-0"
            >
              <Send className="h-4 w-4" />
              تواصل عبر تلجرام
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
