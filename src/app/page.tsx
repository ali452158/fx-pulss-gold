import { Header } from '@/components/sections/header'
import { NewsTicker } from '@/components/sections/news-ticker'
import { Hero } from '@/components/sections/hero'
import { Courses } from '@/components/sections/courses'
import { TradingCharts } from '@/components/sections/trading-charts'
import { Indicators } from '@/components/sections/indicators'
import { PositionSizeCalculator } from '@/components/sections/position-size-calculator'
import { FundedAccounts } from '@/components/sections/funded-accounts'
import { Faq } from '@/components/sections/faq'
import { Footer } from '@/components/sections/footer'

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      {/* Ambient neon background orbs */}
      <div className="neon-ambient-bg" aria-hidden="true">
        <div className="neon-orb orb-1" />
        <div className="neon-orb orb-2" />
        <div className="neon-orb orb-3" />
      </div>

      {/* Diagonal animated neon line (45 degrees, full page) */}
      <div className="neon-diagonal-line" aria-hidden="true" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <NewsTicker />
        <main className="flex-1">
          <Hero />
          <Courses />
          <TradingCharts />
          <Indicators />
          <PositionSizeCalculator />
          <FundedAccounts />
          <Faq />
        </main>
        <Footer />
      </div>
    </div>
  )
}
