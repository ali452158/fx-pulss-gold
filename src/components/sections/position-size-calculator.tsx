'use client'

import { useState, useMemo } from 'react'
import { Calculator, Coins, TrendingDown, Scale, RotateCcw, Info } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// XAUUSD (Gold) pip calculation:
// 1 standard lot = 100 oz
// 1 pip = $0.10 price movement
// pip value per 1.0 lot = 100 oz × $0.10 = $10 per pip
const PIP_VALUE_PER_LOT_XAUUSD = 10

function fmt(n: number, digits = 2) {
  if (!isFinite(n)) return '0.00'
  return n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })
}

export function PositionSizeCalculator() {
  const [balance, setBalance] = useState('10000')
  const [risk, setRisk] = useState('1')
  const [stopLoss, setStopLoss] = useState('50')

  const { amountAtRisk, lotSize } = useMemo(() => {
    const b = parseFloat(balance)
    const r = parseFloat(risk)
    const sl = parseFloat(stopLoss)
    if (!isFinite(b) || !isFinite(r) || !isFinite(sl) || b <= 0 || r <= 0 || sl <= 0) {
      return { amountAtRisk: 0, lotSize: 0 }
    }
    const riskAmount = (b * r) / 100
    const lot = riskAmount / (sl * PIP_VALUE_PER_LOT_XAUUSD)
    return { amountAtRisk: riskAmount, lotSize: lot }
  }, [balance, risk, stopLoss])

  const reset = () => {
    setBalance('10000')
    setRisk('1')
    setStopLoss('50')
  }

  // Determine lot size label/color
  const lotTier = useMemo(() => {
    if (lotSize <= 0) return { label: '—', color: 'text-muted-foreground' }
    if (lotSize < 0.1) return { label: 'ميكرو', color: 'text-emerald-400' }
    if (lotSize < 1) return { label: 'ميني', color: 'text-emerald-400' }
    return { label: 'ستاندرد', color: 'text-emerald-400' }
  }, [lotSize])

  return (
    <section id="calculator" className="py-16 md:py-24 scroll-mt-16 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 h-72 w-72 -translate-y-1/2 rounded-full bg-amber-500/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 h-72 w-72 -translate-y-1/2 rounded-full bg-emerald-500/8 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-500 mb-4">
            <Calculator className="h-3.5 w-3.5" />
            أداة احترافية
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            حاسبة <span className="text-gradient-gold">حجم الصفقة</span> للذهب
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            احسب حجم اللوت المناسب لتداول <span className="text-amber-500 font-bold">XAU/USD</span> بدقّة
            بناءً على رصيدك ونسبة المخاطرة ووقف الخسارة
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6">
          {/* Inputs panel */}
          <Card className="p-6 md:p-7 border-amber-500/20 bg-card/80 backdrop-blur">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-600/10 flex items-center justify-center">
                  <Scale className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-bold text-base">بيانات الصفقة</h3>
                  <p className="text-[11px] text-muted-foreground">أدخل قيم التداول</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground hover:text-amber-500 h-8">
                <RotateCcw className="h-3.5 w-3.5 ml-1" />
                إعادة ضبط
              </Button>
            </div>

            <div className="space-y-5">
              {/* Account Balance */}
              <div className="space-y-2">
                <Label htmlFor="balance" className="text-sm font-semibold flex items-center gap-1.5">
                  <Coins className="h-3.5 w-3.5 text-amber-500" />
                  رصيد الحساب
                  <span className="text-muted-foreground font-normal">(دولار)</span>
                </Label>
                <div className="relative">
                  <Input
                    id="balance"
                    type="number"
                    inputMode="decimal"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    placeholder="10000"
                    dir="ltr"
                    className="pr-10 text-left font-mono text-lg h-12 border-amber-500/20 focus-visible:border-amber-500/60 focus-visible:ring-amber-500/20"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-500 font-bold">$</span>
                </div>
              </div>

              {/* Risk Percentage */}
              <div className="space-y-2">
                <Label htmlFor="risk" className="text-sm font-semibold flex items-center gap-1.5">
                  <TrendingDown className="h-3.5 w-3.5 text-rose-400" />
                  نسبة المخاطرة
                  <span className="text-muted-foreground font-normal">(٪)</span>
                </Label>
                <div className="relative">
                  <Input
                    id="risk"
                    type="number"
                    inputMode="decimal"
                    value={risk}
                    onChange={(e) => setRisk(e.target.value)}
                    placeholder="1"
                    dir="ltr"
                    className="pr-10 text-left font-mono text-lg h-12 border-rose-500/20 focus-visible:border-rose-500/60 focus-visible:ring-rose-500/20"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-400 font-bold">٪</span>
                </div>
                {/* Quick risk presets */}
                <div className="flex gap-1.5 pt-1">
                  {['0.5', '1', '2', '3'].map((v) => (
                    <button
                      key={v}
                      onClick={() => setRisk(v)}
                      className={cn(
                        'flex-1 rounded-md border px-2 py-1 text-xs font-mono transition-all',
                        risk === v
                          ? 'border-rose-500/60 bg-rose-500/10 text-rose-400'
                          : 'border-border text-muted-foreground hover:border-rose-500/30'
                      )}
                    >
                      {v}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Stop Loss in Pips */}
              <div className="space-y-2">
                <Label htmlFor="stoploss" className="text-sm font-semibold flex items-center gap-1.5">
                  <Scale className="h-3.5 w-3.5 text-sky-400" />
                  وقف الخسارة
                  <span className="text-muted-foreground font-normal">(نقطة / Pip)</span>
                </Label>
                <div className="relative">
                  <Input
                    id="stoploss"
                    type="number"
                    inputMode="decimal"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    placeholder="50"
                    dir="ltr"
                    className="pr-12 text-left font-mono text-lg h-12 border-sky-500/20 focus-visible:border-sky-500/60 focus-visible:ring-sky-500/20"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-400 text-xs font-bold">Pips</span>
                </div>
              </div>

              {/* Info note */}
              <div className="flex items-start gap-2 rounded-lg bg-amber-500/5 border border-amber-500/15 p-3 text-[11px] text-muted-foreground leading-relaxed">
                <Info className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  الحسبة مخصّصة لزوج الذهب <b className="text-amber-500">XAU/USD</b> — قيمة النقطة للّوت
                  الواحد = <b className="text-emerald-400 font-mono">$10</b> (1 لوت = 100 أونصة).
                </span>
              </div>
            </div>
          </Card>

          {/* Results panel */}
          <div className="flex flex-col gap-6">
            {/* Amount at Risk */}
            <Card className="relative p-6 md:p-7 border-rose-500/30 bg-gradient-to-br from-rose-500/10 via-card to-card overflow-hidden">
              <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-rose-500/15 blur-2xl pointer-events-none" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="h-10 w-10 rounded-xl bg-rose-500/15 flex items-center justify-center">
                      <TrendingDown className="h-5 w-5 text-rose-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">المبلغ المخاطر به</h3>
                      <p className="text-[11px] text-muted-foreground">Amount at Risk</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-rose-400/70 bg-rose-500/10 rounded px-2 py-0.5">
                    {risk || '0'}% من {fmt(parseFloat(balance) || 0, 0)}$
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-black tabular-nums text-rose-400">
                    ${fmt(amountAtRisk)}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-3 leading-relaxed">
                  أقصى خسارة محتملة في حال ضرب وقف الخسارة — لا تخاطر بأكثر من 1-2٪ من رصيدك لكل صفقة.
                </p>
              </div>
            </Card>

            {/* Suggested Lot Size */}
            <Card className="relative p-6 md:p-7 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-card to-card overflow-hidden shadow-lg shadow-emerald-500/10">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                      <Scale className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">حجم اللوت المقترح</h3>
                      <p className="text-[11px] text-muted-foreground">Suggested Lot Size</p>
                    </div>
                  </div>
                  <span className={cn('text-[10px] font-bold rounded px-2 py-0.5 bg-emerald-500/15', lotTier.color)}>
                    {lotTier.label}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-black tabular-nums text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.35)]">
                    {fmt(lotSize, 2)}
                  </span>
                  <span className="text-sm font-bold text-emerald-400/70">لوت</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-background/60 border border-border p-2">
                    <div className="text-[10px] text-muted-foreground">ميكرو (0.01)</div>
                    <div className="text-xs font-bold font-mono text-emerald-400/80">{fmt(lotSize * 100, 0)}</div>
                  </div>
                  <div className="rounded-lg bg-background/60 border border-border p-2">
                    <div className="text-[10px] text-muted-foreground">ميني (0.1)</div>
                    <div className="text-xs font-bold font-mono text-emerald-400/80">{fmt(lotSize * 10, 1)}</div>
                  </div>
                  <div className="rounded-lg bg-background/60 border border-border p-2">
                    <div className="text-[10px] text-muted-foreground">ستاندرد (1.0)</div>
                    <div className="text-xs font-bold font-mono text-emerald-400/80">{fmt(lotSize, 2)}</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[11px] text-muted-foreground max-w-2xl mx-auto mt-8 leading-relaxed">
          ⚠️ هذه الحاسبة لأغراض تعليمية فقط — تأكّد دائماً من إعدادات الوسيط الخاص بك حيث قد تختلف
          قيمة النقطة وحجم اللوت بين الوسطاء.
        </p>
      </div>
    </section>
  )
}
