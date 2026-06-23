import { NextResponse } from 'next/server'
import { getStaticCourses } from '@/lib/static-courses'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') || 'all'
  const level = searchParams.get('level') || undefined

  const courses = getStaticCourses(category, level)

  return NextResponse.json({ count: courses.length, courses })
}
