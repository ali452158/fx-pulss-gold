// Shared types for the FX_Pulss Gold platform frontend

export type CourseSummary = {
  id: string
  title: string
  slug: string
  category: string
  level: string
  description: string
  price: number
  oldPrice: number | null
  duration: string
  lessons: number
  students: number
  rating: number
  instructor: string
  featured: boolean
  image: string | null
}

export type CurriculumModule = { module: string; lessons: string[] }

export type CourseDetail = CourseSummary & {
  longDescription: string | null
  curriculum: CurriculumModule[]
}

export type NewsItem = {
  title: string
  url: string
  snippet: string
  source: string
  date: string
  category: string
  image?: string
}
