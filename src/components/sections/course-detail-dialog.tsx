'use client'

import { useState } from 'react'
import {
  X, Star, Clock, PlayCircle, Users, GraduationCap, Send, CheckCircle2,
  Radio, FileText, Award,
} from 'lucide-react'
import {
  Dialog, DialogContent, DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useCourse } from '@/lib/hooks'
import { TELEGRAM_CONTACT } from '@/lib/brand'
import { cn } from '@/lib/utils'

export function CourseDetailDialog({
  slug,
  onClose,
}: {
  slug: string | null
  onClose: () => void
}) {
  const [open, setOpen] = useState(false)
  const [prevSlug, setPrevSlug] = useState<string | null>(slug)

  // Adjust open when slug prop changes (render-phase, React-recommended)
  if (slug !== prevSlug) {
    setPrevSlug(slug)
    setOpen(!!slug)
  }

  const { data: course, isLoading } = useCourse(slug)

  const handleOpenChange = (o: boolean) => {
    setOpen(o)
    if (!o) {
      setTimeout(onClose, 100)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto p-0 gap-0 scroll-thin">
        <DialogTitle className="sr-only">تفاصيل الكورس</DialogTitle>
        {isLoading || !course ? (
          <div className="p-6 space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        ) : (
          <Overview course={course} onClose={handleOpenChange} />
        )}
      </DialogContent>
    </Dialog>
  )
}

function Overview({
  course,
  onClose,
}: {
  course: NonNullable<ReturnType<typeof useCourse>['data']>
  onClose: (o: boolean) => void
}) {
  // Pre-filled Telegram message for subscription
  const tgMsg = encodeURIComponent(
    `السلام عليكم، أرغب بالاشتراك في كورس: ${course.title} (${course.price}$)`
  )
  const tgLink = `${TELEGRAM_CONTACT}?text=${tgMsg}`

  return (
    <>
      {/* Header banner */}
      <div className={cn(
        'relative h-32 overflow-hidden rounded-t-lg',
        course.category === 'SMC_ICT' && 'bg-gradient-to-br from-emerald-600/30 to-emerald-900/50',
        course.category === 'BOOKMAP' && 'bg-gradient-to-br from-sky-600/30 to-sky-900/50'
      )}>
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <GraduationCap className="h-14 w-14 text-white/30" />
        </div>
        <button
          onClick={() => onClose(false)}
          className="absolute top-3 left-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background"
          aria-label="إغلاق"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="p-6 space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{course.category === 'SMC_ICT' ? 'SMC & ICT' : 'Book Map'}</Badge>
          <Badge variant="outline">
            {course.level === 'beginner' ? 'مبتدئ' : course.level === 'intermediate' ? 'متوسط' : 'متقدّم'}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <b className="text-foreground">{course.rating.toFixed(1)}</b>
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            {course.students.toLocaleString('ar-EG')} طالب
          </span>
        </div>

        <h2 className="text-2xl font-black leading-tight">{course.title}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{course.longDescription}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-xl border border-border bg-card p-3 text-center">
            <Clock className="h-5 w-5 mx-auto text-amber-500 mb-1" />
            <div className="text-xs text-muted-foreground">المدة</div>
            <div className="text-sm font-bold text-amber-600 dark:text-amber-400">{course.duration}</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-3 text-center">
            <PlayCircle className="h-5 w-5 mx-auto text-amber-500 mb-1" />
            <div className="text-xs text-muted-foreground">عدد الدروس</div>
            <div className="text-sm font-bold">{course.lessons} درس</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-3 text-center">
            <Radio className="h-5 w-5 mx-auto text-rose-500 mb-1" />
            <div className="text-xs text-muted-foreground">نوع الدروس</div>
            <div className="text-sm font-bold text-rose-500">لايف مباشر</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-3 text-center">
            <GraduationCap className="h-5 w-5 mx-auto text-amber-500 mb-1" />
            <div className="text-xs text-muted-foreground">المدرب</div>
            <div className="text-sm font-bold truncate">{course.instructor}</div>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="h-8 w-8 rounded-lg bg-rose-500/15 flex items-center justify-center">
                <Radio className="h-4 w-4 text-rose-500" />
              </div>
              <h4 className="font-bold text-sm">لايفات مباشرة</h4>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              جميع الدروس لايف مباشر — <b className="text-foreground">المشترك يحدد وقت بداية اللايف</b> بما يناسبه
            </p>
          </div>
          <div className="rounded-xl border border-sky-500/30 bg-sky-500/5 p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="h-8 w-8 rounded-lg bg-sky-500/15 flex items-center justify-center">
                <FileText className="h-4 w-4 text-sky-500" />
              </div>
              <h4 className="font-bold text-sm">امتحان بعد كل درس</h4>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              اختبار قصير بعد كل درس لقياس الفهم والتقدّم وتثبيت المعلومات
            </p>
          </div>
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                <Award className="h-4 w-4 text-emerald-500" />
              </div>
              <h4 className="font-bold text-sm">CV احترافي خاص بك</h4>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              يُبنى لك سيرة ذاتية احترافية عبر الكورس تعكس مهاراتك في التداول
            </p>
          </div>
        </div>

        {/* Curriculum */}
        <div>
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
            <PlayCircle className="h-4 w-4 text-amber-500" />
            محتوى الكورس
          </h3>
          <Accordion type="single" collapsible defaultValue="item-0">
            {course.curriculum.map((mod, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                  <span className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-bold">
                      {i + 1}
                    </span>
                    {mod.module}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pr-8">
                    {mod.lessons.map((les, j) => (
                      <li key={j} className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Radio className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                          <span className="flex-1">{les}</span>
                          <Badge variant="outline" className="text-[9px] gap-0.5 border-rose-500/30 text-rose-500 px-1.5 py-0">
                            <Radio className="h-2 w-2" /> لايف
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground/70 pr-5">
                          <FileText className="h-3 w-3 text-sky-500/70" />
                          <span>امتحان قصير بعد هذا الدرس</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Subscription via Telegram */}
        <div className="rounded-2xl border-2 border-sky-500/30 bg-gradient-to-br from-sky-500/5 to-card p-5 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">قيمة الاشتراك</div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-gradient-gold">${course.price}</span>
                {course.oldPrice && (
                  <span className="text-sm text-muted-foreground line-through">${course.oldPrice}</span>
                )}
              </div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/15">
              <Send className="h-6 w-6 text-sky-500" />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground leading-relaxed">
              للاشتراك في هذا الكورس، راسلني على حسابي الخاص في تلجرام وسيتم تفعيل اشتراكك يدوياً.
            </p>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Radio className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                <span><b className="text-foreground">أنت تحدد وقت بداية كل لايف</b> حسب ما يناسبك</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <FileText className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                امتحان قصير بعد كل درس + متابعة نتائجك
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Award className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                بناء CV احترافي خاص بك عبر الكورس
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                وصول كامل ومفتوح لجميع الدروس
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                دعم مباشر مع المدرب FX_Pulss Gold
              </li>
            </ul>
          </div>

          <Button asChild size="lg" className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:from-sky-400 hover:to-sky-500 h-12">
            <a href={tgLink} target="_blank" rel="noreferrer">
              <Send className="h-5 w-5 ml-2" />
              اشترك الآن عبر تلجرام
            </a>
          </Button>
          <p className="text-center text-[11px] text-muted-foreground" dir="ltr">
            t.me/ali_0165
          </p>
        </div>
      </div>
    </>
  )
}
