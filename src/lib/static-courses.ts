// Static course data — works on Vercel without a database.
// This replaces the Prisma database queries so the site is fully static.

import type { CourseSummary, CourseDetail, CurriculumModule } from '@/lib/types'

const BRAND = 'FX_Pulss Gold'
const TELEGRAM = 'https://t.me/FX_pulssGold'

const COURSE_FEATURES_NOTE = `\n\n✨ مميزات الكورس:\n• جميع الدروس لايفات مباشرة (Live) — المشترك يحدد وقت بداية اللايف بما يناسبه\n• CV احترافي خاص بكل مشترك يُبنى عبر الكورس\n• امتحان قصير بعد كل درس لقياس الفهم والتقدّم\n• مدة الكورس مفتوحة (Lifetime Access)`

type StaticCourse = CourseDetail

export const STATIC_COURSES: StaticCourse[] = [
  {
    id: 'smc-ict-liquidity-mastery',
    title: 'SMC & ICT — علم السيولة والأماكن المخفية وقراءة الشموع',
    slug: 'smc-ict-liquidity-mastery',
    category: 'SMC_ICT',
    level: 'intermediate',
    description: 'الدورة الشاملة لعلم السيولة في SMC و ICT — تعلّم الأماكن المخفية والظاهرة للسيولة، قراءة الشموع والذيول بدقّة المحترفين، واصطياد التحرّكات الكبرى. جميع الدروس لايفات مباشرة مع امتحان بعد كل درس وCV خاص بك.',
    longDescription: `دورة احترافية بإشراف ${BRAND} تغوص في أعماق علم السيولة (Liquidity) — أهم وأخفى مفهوم في منهجي SMC و ICT. ستتعلّم كيف تقرأ الأماكن الظاهرة والمخفية للسيولة، كيف تفهم لغة الشموع والذيول، وكيف تتداول مع الأموال الذكية بدل أن تكون فريسة لها. منهج عملي تطبيقي على الذهب والفوركس.${COURSE_FEATURES_NOTE}\n\nانضمّ لقناتنا على تلجرام: ${TELEGRAM}`,
    price: 350,
    oldPrice: 500,
    duration: 'مفتوحة',
    lessons: 12,
    students: 487,
    rating: 4.9,
    instructor: BRAND,
    featured: true,
    image: '/smc-course.png',
    curriculum: [
      { module: 'الوحدة 1: مدخل إلى علم السيولة', lessons: [
        'ما هي السيولة ولماذا هي أهم مفهوم في SMC؟ (Live)',
        'الفرق بين السيولة الظاهرة والمخفية (Live)',
      ] },
      { module: 'الوحدة 2: السيولة الظاهرة (Visible Liquidity)', lessons: [
        'Equal Highs و Equal Lows وسيولة الخطوط (Live)',
        'تحديد أهداف السيولة الظاهرة بدقّة (Live)',
      ] },
      { module: 'الوحدة 3: السيولة المخفية (Hidden Liquidity)', lessons: [
        'Interior Liquidity و Resting Orders غير المرئية (Live)',
        'Liquidity Voids وأماكن تجمّع الأوامر الخفية (Live)',
      ] },
      { module: 'الوحدة 4: قراءة الشموع والذيول', lessons: [
        'تشريح الشمعة اليابانية وقراءة الذيول (Wicks) (Live)',
        'الشموع كأدلّة على اصطياد السيولة (Pin Bar و Rejection) (Live)',
      ] },
      { module: 'الوحدة 5: دمج SMC و ICT — التطبيق', lessons: [
        'توازن السيولة مع بنية السوق وتوقيت Killzones (Live)',
        'خطة تداول متكاملة على الذهب XAU/USD + مراجعة الصفقات الحيّة (Live)',
      ] },
      { module: 'الوحدة 6: التقييم النهائي وبناء CV', lessons: [
        'الامتحان الشامل وتحليل النتائج (Live)',
        'بناء CV احترافي خاص بك يعكس مهاراتك في SMC و ICT (Live)',
      ] },
    ],
  },
  {
    id: 'bookmap-mastery-complete',
    title: 'Book Map Mastery — الخريطة الحرارية وربط البيانات مع SMC و ICT',
    slug: 'bookmap-mastery-complete',
    category: 'BOOKMAP',
    level: 'advanced',
    description: 'الباكج الكامل لإتقان منصة Book Map — شرح الأساسيات، الخريطة الحرارية، ربط البيانات، ودمج SMC و ICT. جميع الدروس لايفات مباشرة مع امتحان بعد كل درس وCV خاص بك.',
    longDescription: `دورة متقدّمة بإشراف ${BRAND} لتعلّم منصة Book Map من الصفر إلى الاحتراف. تشمل شرح الأساسيات كاملة، فهم الخريطة الحرارية (Heat Map) بعمق، ربط البيانات الحيّة مع الرسم البياني، ودمج مفاهيم SMC و ICT في باكج واحد متكامل لتداول الذهب والفوركس باحترافية عالية. للمتداولين الجادّين فقط.${COURSE_FEATURES_NOTE}\n\nانضمّ لقناتنا على تلجرام: ${TELEGRAM}`,
    price: 750,
    oldPrice: 950,
    duration: 'مفتوحة',
    lessons: 6,
    students: 213,
    rating: 5.0,
    instructor: BRAND,
    featured: true,
    image: '/bookmap-course.png',
    curriculum: [
      { module: 'Unit 1: Book Map Fundamentals + Heat Map', lessons: [
        'What is Book Map, platform interface, and core tools (Live)',
        'The Heat Map deep dive — colored liquidity volumes and reading live zones (Live)',
      ] },
      { module: 'Unit 2: Data Integration + SMC & ICT with Book Map', lessons: [
        'Connecting Book Map with price chart, Volume Profiles, and Order Flow (Live)',
        'Order Blocks vs real liquidity, Liquidity Sweeps, and confirming ICT setups (Live)',
      ] },
      { module: 'Unit 3: The Complete Package + Final Exam + CV', lessons: [
        'Full strategy: Book Map + SMC + ICT with live case studies on Gold (Live)',
        'Final exam, results analysis, and building your professional CV (Live)',
      ] },
    ],
  },
]

// Helper functions to mimic the API responses
export function getStaticCourses(category?: string, level?: string): CourseSummary[] {
  let courses = STATIC_COURSES
  if (category && category !== 'all') courses = courses.filter((c) => c.category === category)
  if (level) courses = courses.filter((c) => c.level === level)
  return courses.map(({ curriculum: _curriculum, longDescription: _ld, ...rest }) => rest)
}

export function getStaticCourse(slug: string): CourseDetail | null {
  return STATIC_COURSES.find((c) => c.slug === slug) || null
}
