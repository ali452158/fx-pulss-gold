'use client'

import { useEffect, useRef, useState } from 'react'
import { BarChart3, Coins, TrendingUp, Bitcoin, DollarSign } from 'lucide-react'
import { cn } from '@/lib/utils'

// TradingView Advanced Chart Widget — embeds a live interactive chart.
// Free client-side widget (no API key needed, works on Vercel).

type SymbolConfig = {
  tvSymbol: string
  label: string
  nameAr: string
  icon: typeof Coins
  color: string
}

const SYMBOLS: SymbolConfig[] = [
  { tvSymbol: 'OANDA:XAUUSD', label: 'XAU/USD', nameAr: 'الذهب', icon: Coins, color: 'text-amber-500' },
  { tvSymbol: 'OANDA:EURUSD', label: 'EUR/USD', nameAr: 'يورو/دولار', icon: DollarSign, color: 'text-emerald-500' },
  { tvSymbol: 'OANDA:GBPUSD', label: 'GBP/USD', nameAr: 'إسترليني/دولار', icon: TrendingUp, color: 'text-sky-500' },
  { tvSymbol: 'BINANCE:BTCUSDT', label: 'BTC/USD', nameAr: 'بيتكوين', icon: Bitcoin, color: 'text-orange-500' },
]

function TradingViewWidget({ symbol }: { symbol: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.async = true
    script.type = 'text/javascript'
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval: '15',
      timezone: 'Africa/Cairo',
      theme: 'dark',
      style: '1',
      locale: 'ar_AE',
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      allow_symbol_change: true,
      withdateranges: true,
      backgroundColor: 'rgba(21, 19, 18, 1)',
      gridColor: 'rgba(255, 255, 255, 0.06)',
      support_host: 'https://www.tradingview.com',
    })

    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = ''
    }
  }, [symbol])

  return <div className="tradingview-widget-container w-full h-full" ref={containerRef} />
}

export function TradingCharts() {
  const [activeSymbol, setActiveSymbol] = useState(SYMBOLS[0])
  const active = SYMBOLS.find((s) => s.tvSymbol === activeSymbol.tvSymbol) || SYMBOLS[0]

  return (
    <section id="charts" className="py-16 md:py-24 scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-4">
            <BarChart3 className="h-3.5 w-3.5" />
            مخططات تفاعلية مباشرة
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            شارت <span className="text-shimmer-gold">الذهب والعملات</span> مباشر
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            مخططات تفاعلية احترافية من TradingView — تابع حركة الذهب والفوركس والعملات الرقمية لحظياً مع كل الأدوات
          </p>
        </div>

        {/* Symbol selector tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {SYMBOLS.map((s) => {
            const isActive = s.tvSymbol === active.tvSymbol
            return (
              <button
                key={s.tvSymbol}
                onClick={() => setActiveSymbol(s)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2.5 text-sm font-bold transition-all',
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-md shadow-amber-500/20'
                    : 'bg-card border border-border hover:border-amber-500/40 text-muted-foreground hover:text-foreground'
                )}
              >
                <s.icon className={cn('h-4 w-4', isActive ? 'text-black' : s.color)} />
                <span>{s.label}</span>
                <span className="text-[10px] font-normal opacity-70 hidden sm:inline">{s.nameAr}</span>
              </button>
            )
          })}
        </div>

        {/* Chart container */}
        <div className="relative rounded-2xl border border-border bg-card/60 backdrop-blur p-2 shadow-2xl shadow-amber-500/5 neon-border overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-border/60 mb-2">
            <div className="flex items-center gap-2">
              <active.icon className={cn('h-4 w-4', active.color)} />
              <span className="font-bold text-sm">{active.label}</span>
              <span className="text-xs text-muted-foreground">— {active.nameAr}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-live absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] text-muted-foreground font-medium">مباشر · TradingView</span>
            </div>
          </div>
          <div className="h-[400px] sm:h-[500px] md:h-[560px] w-full">
            <TradingViewWidget key={active.tvSymbol} symbol={active.tvSymbol} />
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4 max-w-2xl mx-auto">
          💡 المخطط تفاعلي بالكامل — يمكنك تغيير الإطار الزمني، إضافة مؤشرات، رسم خطوط، وتكبير/تصغير. البيانات مباشرة من TradingView.
        </p>
      </div>
    </section>
  )
}
