'use client'

import { useQuery } from '@tanstack/react-query'
import type { CourseDetail, CourseSummary, NewsItem } from '@/lib/types'
import { getStaticCourses, getStaticCourse } from '@/lib/static-courses'

// ---------- Courses (static data — works on Vercel without DB) ----------
export function useCourses(category = 'all', level?: string) {
  return useQuery<CourseSummary[]>({
    queryKey: ['courses', category, level],
    queryFn: async () => getStaticCourses(category, level),
    staleTime: Infinity,
  })
}

export function useCourse(slug: string | null) {
  return useQuery<CourseDetail>({
    queryKey: ['course', slug],
    queryFn: async () => {
      if (!slug) return null
      return getStaticCourse(slug)
    },
    enabled: !!slug,
    staleTime: Infinity,
  })
}

// ---------- News (refreshed every 15 minutes) ----------
export function useNews() {
  return useQuery<NewsItem[]>({
    queryKey: ['news'],
    queryFn: async () => {
      const res = await fetch('/api/news')
      const data = await res.json()
      return data.items
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    refetchInterval: 15 * 60 * 1000, // auto-refresh every 15 minutes
  })
}
