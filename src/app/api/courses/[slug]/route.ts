import { NextResponse } from 'next/server'
import { getStaticCourse } from '@/lib/static-courses'

export const dynamic = 'force-dynamic'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const course = getStaticCourse(slug)
  if (!course) {
    return NextResponse.json({ error: 'الكورس غير موجود' }, { status: 404 })
  }
  return NextResponse.json({ course })
}
