'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, Clock, PlayCircle, Users, GraduationCap, BookOpen, ShieldCheck, Send, Radio, FileText, Award } from 'lucide-react'
import { useCourses } from '@/lib/hooks'
import type { CourseSummary } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { CourseDetailDialog } from './course-detail-dialog'
import { cn } from '@/lib/utils'

const FILTERS = [
  { key: 'all', label: 'كل الكورسات' },
  { key: 'SMC_ICT', label: 'SMC & ICT' },
  { key: 'BOOKMAP', label: 'Book Map' },
]

const CATEGORY_STYLES: Record<string, string> = {
  SMC_ICT: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  BOOKMAP: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30',
}

const CATEGORY_LABELS: Record<string, string> = {
  SMC_ICT: 'SMC & ICT',
  BOOKMAP: 'Book Map',
}

const LEVEL_LABELS: Record<string, string> = {
  beginner: 'مبتدئ',
  intermediate: 'متوسط',
  advanced: 'متقدّم',
}

function CourseCard({ course, onView }: { course: CourseSummary; onView: () => void }) {
  const discount = course.oldPrice
    ? Math.round(((course.oldPrice - course.price) / course.oldPrice) * 100)
    : 0

  return (
    <Card className="group relative overflow-hidden flex flex-col p-0 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 neon-border">
      {/* Cover */}
      <div className={cn(
        'relative h-40 overflow-hidden',
        !course.image && course.category === 'SMC_ICT' && 'bg-gradient-to-br from-emerald-600/30 to-emerald-900/40',
        !course.image && course.category === 'BOOKMAP' && 'bg-gradient-to-br from-sky-600/30 to-sky-900/40'
      )}>
        {course.image ? (
          <Image
            src={course.image}
            alt={course.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-grid opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <GraduationCap className="h-12 w-12 text-white/30 group-hover:scale-110 transition-transform" />
            </div>
          </>
        )}
        {/* Gradient overlay for readability of badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        <div className="absolute top-3 right-3 flex gap-1.5">
          <Badge variant="outline" className={cn('border backdrop-blur', CATEGORY_STYLES[course.category])}>
            {CATEGORY_LABELS[course.category] || course.category}
          </Badge>
        </div>
        {discount > 0 && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-rose-500 text-white border-0">-{discount}%</Badge>
          </div>
        )}
        {course.featured && (
          <div className="absolute bottom-3 right-3">
            <Badge className="bg-amber-500/90 text-black border-0 gap-1">
              <Star className="h-3 w-3 fill-current" /> مميّز
            </Badge>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2 text-xs text-muted-foreground">
          <Badge variant="secondary" className="font-medium text-[10px]">{LEVEL_LABELS[course.level]}</Badge>
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            <span className="font-bold text-foreground">{course.rating.toFixed(1)}</span>
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {course.students.toLocaleString('ar-EG')}
          </span>
        </div>

        <h3 className="font-bold text-sm sm:text-base leading-snug mb-2 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
          {course.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
          {course.description}
        </p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-amber-500" />
            {course.duration === 'مفتوحة' ? (
              <span className="font-bold text-amber-600 dark:text-amber-400">{course.duration}</span>
            ) : (
              course.duration
            )}
          </span>
          <span className="flex items-center gap-1">
            <PlayCircle className="h-3.5 w-3.5" />
            {course.lessons} درس
          </span>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <Badge variant="outline" className="text-[10px] gap-1 border-rose-500/30 bg-rose-500/5 text-rose-500">
            <Radio className="h-2.5 w-2.5" />
            لايف مباشر
          </Badge>
          <Badge variant="outline" className="text-[10px] gap-1 border-sky-500/30 bg-sky-500/5 text-sky-500">
            <FileText className="h-2.5 w-2.5" />
            امتحان لكل درس
          </Badge>
          <Badge variant="outline" className="text-[10px] gap-1 border-emerald-500/30 bg-emerald-500/5 text-emerald-500">
            <Award className="h-2.5 w-2.5" />
            CV احترافي
          </Badge>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3 gap-2">
            <div className="flex items-baseline gap-1.5 sm:gap-2 min-w-0">
              <span className="text-xl sm:text-2xl font-black text-gradient-gold">${course.price}</span>
              {course.oldPrice && (
                <span className="text-xs sm:text-sm text-muted-foreground line-through">${course.oldPrice}</span>
              )}
            </div>
            <span className="text-[10px] sm:text-xs text-muted-foreground truncate">{course.instructor}</span>
          </div>
          <Button
            onClick={onView}
            size="sm"
            className="w-full h-10 sm:h-11 bg-gradient-to-r from-amber-500 to-yellow-600 text-black hover:from-amber-400 hover:to-yellow-500 text-xs sm:text-sm"
          >
            <BookOpen className="h-4 w-4 ml-1" />
            التفاصيل والاشتراك
          </Button>
        </div>
      </div>
    </Card>
  )
}

export function Courses() {
  const [filter, setFilter] = useState('all')
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const { data, isLoading } = useCourses(filter)

  return (
    <section id="courses" className="py-12 md:py-24 scroll-mt-16 bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold text-amber-600 dark:text-amber-400 mb-4">
            <GraduationCap className="h-3.5 w-3.5" />
            كورسات FX_Pulss Gold
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight mb-3 px-2">
            كورسات <span className="text-shimmer-gold">علم السيولة</span> و <span className="text-shimmer-gold">Book Map</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            منهج احترافي بإشراف FX_Pulss Gold — من علم السيولة المخفية إلى إتقان Book Map والخريطة الحرارية
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-10 px-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium transition-all',
                filter === f.key
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-md'
                  : 'bg-card border border-border hover:border-amber-500/40 text-muted-foreground hover:text-foreground'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <Card key={i} className="p-0 overflow-hidden">
                <Skeleton className="h-32 sm:h-40 rounded-none" />
                <div className="p-4 sm:p-5 space-y-3">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {data?.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onView={() => setSelectedSlug(course.slug)}
              />
            ))}
          </div>
        )}

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <Send className="h-4 w-4 text-sky-500" />
            اشتراك مباشر عبر تلجرام
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            دعم مباشر من المدرب
          </span>
          <span className="flex items-center gap-2">
            <Users className="h-4 w-4 text-emerald-500" />
            +700 طالب
          </span>
        </div>
      </div>

      <CourseDetailDialog
        slug={selectedSlug}
        onClose={() => setSelectedSlug(null)}
      />
    </section>
  )
}
