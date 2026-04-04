'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowUpRight } from 'lucide-react'
import { generateCandlestickData, INITIAL_TICKERS, simulateTicker, type TickerItem } from '@/lib/marketData'

const FEATURES = [
  'Real-time multi-asset data feeds',
  'Cortex AI market analysis engine',
  'Options flow and dark pool monitoring',
  'Portfolio X-Ray and risk analytics',
  'Custom screeners and alerting',
]

const NEWS_ITEMS = [
  'FED SIGNALS RATE PAUSE — EQUITY MARKETS RALLY 1.4%',
  'BTC SPOT ETF INFLOWS HIT RECORD $820M — COINBASE',
  'NVIDIA BEATS Q4 ESTIMATES BY 18% — AI INFRA DEMAND SURGES',
  'GOLD TESTS $2,640 RESISTANCE — GEOPOLITICAL RISK PREMIUM ELEVATED',
  'VOLATILITY INDEX VIX DROPS BELOW 15 — RISK ON SENTIMENT',
  'APPLE REPORTS RECORD $94B SERVICES REVENUE — BUYBACKS ACCELERATE',
]

function CandlestickChart({ data }: { data: ReturnType<typeof generateCandlestickData> }) {
  const width = 340
  const height = 120
  const padding = { left: 8, right: 8, top: 8, bottom: 8 }

  const prices = data.flatMap(d => [d.high, d.low])
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const priceRange = maxPrice - minPrice

  const scaleY = (price: number) =>
    padding.top + ((maxPrice - price) / priceRange) * (height - padding.top - padding.bottom)
  const barWidth = Math.max(2, (width - padding.left - padding.right) / data.length - 1)
  const scaleX = (i: number) =>
    padding.left + (i / data.length) * (width - padding.left - padding.right) + barWidth / 2

  return (
    <svg width={width} height={height} className="w-full">
      {data.map((d, i) => {
        const x = scaleX(i)
        const isUp = d.close >= d.open
        const color = isUp ? '#2D8C5E' : '#D44B3A'
        const bodyTop = scaleY(Math.max(d.open, d.close))
        const bodyBot = scaleY(Math.min(d.open, d.close))
        const bodyH = Math.max(1, bodyBot - bodyTop)
        return (
          <g key={i}>
            {/* Wick */}
            <line
              x1={x} y1={scaleY(d.high)}
              x2={x} y2={scaleY(d.low)}
              stroke={color} strokeWidth={0.8} opacity={0.7}
            />
            {/* Body */}
            <rect
              x={x - barWidth / 2}
              y={bodyTop}
              width={barWidth}
              height={bodyH}
              fill={color}
              opacity={0.9}
            />
          </g>
        )
      })}
    </svg>
  )
}

type OrderRow = { price: number; size: number; depth: number }

function OrderBook({ tickers }: { tickers: TickerItem[] }) {
  const spy = tickers.find(t => t.symbol === 'SPY') || tickers[0]
  const mid = spy.price

  const [asks, setAsks] = useState<OrderRow[]>([])
  const [bids, setBids] = useState<OrderRow[]>([])

  useEffect(() => {
    setAsks(Array.from({ length: 5 }, (_, i) => ({
      price: mid + (i + 1) * 0.05,
      size: Math.floor(Math.random() * 400 + 100),
      depth: Math.random() * 0.8 + 0.1,
    })).reverse())
    setBids(Array.from({ length: 5 }, (_, i) => ({
      price: mid - (i + 1) * 0.05,
      size: Math.floor(Math.random() * 400 + 100),
      depth: Math.random() * 0.8 + 0.1,
    })))
  // Refresh on mid price changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Math.round(mid * 100)])

  return (
    <div className="text-[10px] font-mono">
      <div className="flex justify-between text-muted-gold mb-1 px-1">
        <span>PRICE</span>
        <span>SIZE</span>
      </div>
      {asks.map((row, i) => (
        <div key={i} className="relative flex justify-between px-1 py-0.5 overflow-hidden">
          <div
            className="absolute right-0 top-0 bottom-0 bg-loss opacity-10"
            style={{ width: `${row.depth * 100}%` }}
          />
          <span className="text-loss relative z-10">{row.price.toFixed(2)}</span>
          <span className="text-pale-gold relative z-10">{row.size}</span>
        </div>
      ))}
      <div className="text-center py-1 font-semibold text-pale-gold border-y border-[rgba(201,168,76,0.15)] my-1">
        {mid.toFixed(2)}
      </div>
      {bids.map((row, i) => (
        <div key={i} className="relative flex justify-between px-1 py-0.5 overflow-hidden">
          <div
            className="absolute right-0 top-0 bottom-0 bg-gain opacity-10"
            style={{ width: `${row.depth * 100}%` }}
          />
          <span className="text-gain relative z-10">{row.price.toFixed(2)}</span>
          <span className="text-pale-gold relative z-10">{row.size}</span>
        </div>
      ))}
    </div>
  )
}

function NewsScroll() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % NEWS_ITEMS.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="overflow-hidden h-4 relative">
      <motion.div
        key={idx}
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -16, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center"
      >
        <span className="font-mono text-[9px] text-[#7A7060] whitespace-nowrap">
          <span className="text-aurum-gold mr-2">▶</span>
          {NEWS_ITEMS[idx]}
        </span>
      </motion.div>
    </div>
  )
}

export default function TerminalSection() {
  const [tickers, setTickers] = useState<TickerItem[]>(INITIAL_TICKERS)
  const [candleData, setCandleData] = useState<ReturnType<typeof generateCandlestickData>>([])
  useEffect(() => { setCandleData(generateCandlestickData(40)) }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(prev => simulateTicker(prev))
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="terminal"
      className="py-[120px] bg-[#06060A] overflow-hidden"
      aria-label="AG Terminal Spotlight"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-dm text-[10px] uppercase tracking-[0.25em] text-aurum-gold"
            >
              AG Terminal
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 font-playfair text-pale-gold leading-tight"
              style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
            >
              Bloomberg.
              <br />
              <span className="text-aurum-gold italic">Reimagined.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-lora text-[16px] text-[#B8AE99] leading-[1.8] max-w-[480px]"
            >
              The AG Terminal delivers institutional-grade market intelligence to
              private traders and wealth managers. Real-time data, AI-powered
              analysis, and portfolio intelligence — without the six-figure
              subscription.
            </motion.p>

            {/* Feature list */}
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
              }}
              className="mt-8 space-y-3"
              aria-label="AG Terminal features"
            >
              {FEATURES.map(feat => (
                <motion.li
                  key={feat}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="flex items-center gap-3 font-dm text-[14px] text-[#B8AE99]"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full border border-aurum-gold flex items-center justify-center">
                    <Check size={10} className="text-aurum-gold" strokeWidth={2.5} />
                  </span>
                  {feat}
                </motion.li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 h-11 rounded-full bg-aurum-gold text-[12px] font-dm font-medium uppercase tracking-[0.08em] text-[#0A0800] hover:bg-pale-gold transition-colors duration-200"
              >
                Start Free Trial
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-7 h-11 rounded-full border border-[rgba(201,168,76,0.4)] text-[12px] font-dm uppercase tracking-[0.08em] text-aurum-gold hover:border-aurum-gold transition-colors duration-200"
              >
                View Documentation
                <ArrowUpRight size={13} />
              </a>
            </motion.div>
          </div>

          {/* Right — Terminal mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: '#030305',
                border: '1px solid rgba(201,168,76,0.15)',
                boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
              }}
            >
              {/* Terminal chrome bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[rgba(201,168,76,0.08)]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
                <span className="font-mono text-[10px] text-muted-gold">AG TERMINAL v2.4.1</span>
                <div className="w-12" />
              </div>

              {/* Terminal body */}
              <div className="p-3">
                {/* Top price row */}
                <div className="grid grid-cols-4 gap-1 mb-3">
                  {tickers.slice(0, 4).map(t => (
                    <div
                      key={t.symbol}
                      className="bg-[#070709] rounded p-2 border border-[rgba(201,168,76,0.06)]"
                    >
                      <div className="font-mono text-[9px] text-muted-gold">{t.symbol}</div>
                      <div className="font-mono text-[11px] text-pale-gold font-medium">
                        {t.price > 1000
                          ? t.price.toLocaleString('en-US', { maximumFractionDigits: 0 })
                          : t.price.toFixed(2)}
                      </div>
                      <div
                        className={`font-mono text-[9px] ${t.changePercent >= 0 ? 'text-gain' : 'text-loss'}`}
                      >
                        {t.changePercent >= 0 ? '+' : ''}{t.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main area: chart + order book */}
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {/* Chart */}
                  <div className="col-span-2 bg-[#060608] rounded border border-[rgba(201,168,76,0.05)] p-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[9px] text-muted-gold">SPY · 1m</span>
                      <span className="font-mono text-[9px] text-gain">
                        {tickers[0]?.price.toFixed(2)} +{tickers[0]?.changePercent.toFixed(2)}%
                      </span>
                    </div>
                    <CandlestickChart data={candleData} />
                  </div>

                  {/* Order book */}
                  <div className="bg-[#060608] rounded border border-[rgba(201,168,76,0.05)] p-2">
                    <div className="font-mono text-[9px] text-muted-gold mb-2">ORDER BOOK</div>
                    <OrderBook tickers={tickers} />
                  </div>
                </div>

                {/* News scroll */}
                <div className="bg-[#060608] rounded border border-[rgba(201,168,76,0.05)] px-3 py-2">
                  <NewsScroll />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
