'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { generateEquityCurve } from '@/lib/marketData'
import CountUp from '@/components/ui/CountUp'

const STRATEGIES = [
  {
    id: 'mean-rev',
    label: 'Mean Reversion',
    description:
      'Exploits price deviations from statistical equilibrium across correlated equity pairs. Targets 45–60 minute holding periods.',
    sharpe: 2.84,
    winRate: 68.3,
    drawdown: -4.2,
    x: 50, y: 50,
  },
  {
    id: 'momentum',
    label: 'Momentum Scalping',
    description:
      'High-frequency momentum captures intraday breakouts with algorithmic entry/exit based on volume confirmation.',
    sharpe: 2.31,
    winRate: 61.8,
    drawdown: -6.7,
    x: 75, y: 25,
  },
  {
    id: 'stat-arb',
    label: 'Statistical Arbitrage',
    description:
      'Cross-asset statistical arbitrage identifying pricing inefficiencies in correlated securities.',
    sharpe: 3.12,
    winRate: 72.1,
    drawdown: -3.8,
    x: 25, y: 25,
  },
  {
    id: 'div-capture',
    label: 'Dividend Capture',
    description:
      'Systematic dividend capture strategy across high-yield equities with ex-dividend timing optimization.',
    sharpe: 1.95,
    winRate: 74.5,
    drawdown: -2.9,
    x: 80, y: 65,
  },
  {
    id: 'options',
    label: 'Options Income',
    description:
      'Theta decay strategies — iron condors, covered calls — generating consistent premium income.',
    sharpe: 2.44,
    winRate: 79.2,
    drawdown: -5.1,
    x: 20, y: 70,
  },
  {
    id: 'pairs',
    label: 'Pairs Trading',
    description:
      'Long/short equity pairs identified via cointegration analysis with dynamic hedge ratios.',
    sharpe: 2.67,
    winRate: 65.4,
    drawdown: -5.8,
    x: 55, y: 80,
  },
  {
    id: 'trend',
    label: 'Trend Following',
    description:
      'Multi-timeframe trend following across futures, FX, and crypto with ATR-based position sizing.',
    sharpe: 1.87,
    winRate: 54.7,
    drawdown: -9.3,
    x: 35, y: 45,
  },
  {
    id: 'market-making',
    label: 'Market Making',
    description:
      'Algorithmic market making providing two-sided liquidity in liquid equity and ETF markets.',
    sharpe: 3.41,
    winRate: 82.0,
    drawdown: -2.1,
    x: 65, y: 45,
  },
]

const CONNECTIONS = [
  [0, 1], [0, 2], [0, 5], [0, 6], [1, 3], [1, 7], [2, 4], [2, 6],
  [3, 7], [4, 5], [5, 6], [6, 7],
]

const PYTHON_CODE = `# AGQuant Mean Reversion Strategy
import numpy as np
from agquant import Strategy, Signal

class MeanReversionAlgo(Strategy):
    window: int = 20
    z_threshold: float = 2.0

    def compute(self, prices: np.ndarray) -> Signal:
        mu = prices[-self.window:].mean()
        sigma = prices[-self.window:].std()
        z_score = (prices[-1] - mu) / sigma

        if z_score < -self.z_threshold:
            return Signal.BUY, abs(z_score) / 4
        elif z_score > self.z_threshold:
            return Signal.SELL, abs(z_score) / 4
        return Signal.HOLD, 0.0`

function ForceGraph({ onSelect }: { onSelect: (id: string | null) => void }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  const handleSelect = (id: string) => {
    const next = selected === id ? null : id
    setSelected(next)
    onSelect(next)
  }

  return (
    <div className="relative w-full" style={{ paddingBottom: '62%' }}>
      <svg
        ref={svgRef}
        viewBox="0 0 100 65"
        className="absolute inset-0 w-full h-full"
        aria-label="Strategy correlation network"
      >
        {/* Connections */}
        {CONNECTIONS.map(([a, b], i) => {
          const sA = STRATEGIES[a]
          const sB = STRATEGIES[b]
          const isActive = hovered === sA.id || hovered === sB.id || selected === sA.id || selected === sB.id
          return (
            <line
              key={i}
              x1={`${sA.x}%`} y1={`${sA.y}%`}
              x2={`${sB.x}%`} y2={`${sB.y}%`}
              stroke="rgba(201,168,76,0.25)"
              strokeWidth={isActive ? '0.4' : '0.2'}
              className="transition-all duration-300"
            />
          )
        })}

        {/* Nodes */}
        {STRATEGIES.map(s => {
          const isActive = selected === s.id || hovered === s.id
          return (
            <g
              key={s.id}
              className="cursor-pointer"
              onClick={() => handleSelect(s.id)}
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}
              role="button"
              aria-label={s.label}
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && handleSelect(s.id)}
            >
              {/* Glow ring */}
              {isActive && (
                <circle
                  cx={`${s.x}%`} cy={`${s.y}%`} r="3.2"
                  fill="none"
                  stroke="rgba(201,168,76,0.4)"
                  strokeWidth="0.5"
                  className="animate-pulse-slow"
                />
              )}
              {/* Node */}
              <circle
                cx={`${s.x}%`} cy={`${s.y}%`} r={isActive ? '2.2' : '1.8'}
                fill={isActive ? '#C9A84C' : 'rgba(201,168,76,0.6)'}
                className="transition-all duration-200"
              />
              {/* Label */}
              <text
                x={`${s.x}%`}
                y={`${s.y + 4}%`}
                textAnchor="middle"
                fontSize="2.2"
                fill={isActive ? '#E8D5A3' : '#7A6A50'}
                fontFamily="DM Sans, sans-serif"
                className="transition-colors duration-200 select-none"
              >
                {s.label.split(' ')[0]}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function StrategyPanel({ strategyId }: { strategyId: string | null }) {
  const strategy = STRATEGIES.find(s => s.id === strategyId)

  return (
    <motion.div
      key={strategyId || 'empty'}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-carbon border border-[rgba(201,168,76,0.1)] rounded-xl p-6 min-h-[160px]"
    >
      {strategy ? (
        <>
          <span className="font-dm text-[9px] uppercase tracking-[0.2em] text-muted-gold">Strategy</span>
          <h3 className="mt-2 font-playfair text-[22px] text-pale-gold">{strategy.label}</h3>
          <p className="mt-2 font-dm text-[13px] text-muted-gold leading-relaxed">{strategy.description}</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="font-playfair text-[20px] text-aurum-gold">{strategy.sharpe}</div>
              <div className="font-dm text-[9px] uppercase tracking-wider text-muted-gold mt-1">Sharpe</div>
            </div>
            <div className="text-center">
              <div className="font-playfair text-[20px] text-gain">{strategy.winRate}%</div>
              <div className="font-dm text-[9px] uppercase tracking-wider text-muted-gold mt-1">Win Rate</div>
            </div>
            <div className="text-center">
              <div className="font-playfair text-[20px] text-loss">{strategy.drawdown}%</div>
              <div className="font-dm text-[9px] uppercase tracking-wider text-muted-gold mt-1">Max DD</div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full min-h-[140px]">
          <p className="font-dm text-[13px] text-muted-gold text-center">
            Click any strategy node to view details and metrics.
          </p>
        </div>
      )}
    </motion.div>
  )
}

function EquityCurve() {
  const [drawn, setDrawn] = useState(false)
  const [data, setData] = useState<{ x: number; y: number }[]>([])
  const ref = useRef<SVGPathElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Generate on client only — avoids SSR/client Math.random() mismatch
  useEffect(() => { setData(generateEquityCurve(200)) }, [])

  const W = 800
  const H = 80
  const pad = { l: 0, r: 0, t: 8, b: 8 }

  const minY = data.length ? Math.min(...data.map(d => d.y)) : 0
  const maxY = data.length ? Math.max(...data.map(d => d.y)) : 1

  const scaleX = (x: number) => pad.l + (x / Math.max(data.length, 1)) * (W - pad.l - pad.r)
  const scaleY = (y: number) => pad.t + ((maxY - y) / (maxY - minY || 1)) * (H - pad.t - pad.b)

  const linePath = data.length
    ? data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(d.x)} ${scaleY(d.y)}`).join(' ')
    : ''

  const fillPath = linePath && data.length
    ? linePath + ` L ${scaleX(data[data.length - 1].x)} ${H} L ${scaleX(0)} ${H} Z`
    : ''

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) setDrawn(true) },
      { threshold: 0.3 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label="Portfolio equity curve">
        <defs>
          <linearGradient id="equity-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2D8C5E" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2D8C5E" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Fill */}
        <path d={fillPath} fill="url(#equity-fill)" />
        {/* Line */}
        <path
          ref={ref}
          d={linePath}
          fill="none"
          stroke="#2D8C5E"
          strokeWidth="1.5"
          className="equity-path"
          style={{
            strokeDasharray: 2000,
            strokeDashoffset: drawn ? 0 : 2000,
            transition: 'stroke-dashoffset 2.5s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
      </svg>
    </div>
  )
}

function CodeBlock() {
  const [displayed, setDisplayed] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting && !started) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      if (i <= PYTHON_CODE.length) {
        setDisplayed(PYTHON_CODE.slice(0, i))
        i += 3
      } else {
        clearInterval(interval)
      }
    }, 16)
    return () => clearInterval(interval)
  }, [started])

  return (
    <div
      ref={ref}
      className="bg-[#060608] border border-[rgba(201,168,76,0.1)] rounded-xl overflow-hidden"
    >
      {/* Code bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[rgba(201,168,76,0.08)]">
        <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
        <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
        <div className="w-2 h-2 rounded-full bg-[#28C840]" />
        <span className="ml-3 font-mono text-[10px] text-muted-gold">agquant_strategy.py</span>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="font-mono text-[11px] text-[#B8AE99] leading-[1.7] whitespace-pre">
          {displayed}
          {started && displayed.length < PYTHON_CODE.length && (
            <span className="terminal-cursor" />
          )}
        </code>
      </pre>
    </div>
  )
}

export default function QuantSection() {
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null)

  return (
    <section
      id="markets"
      className="py-[120px] bg-[#07080D]"
      aria-label="AGQuant Algorithms"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section header */}
        <div className="mb-14 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-dm text-[10px] uppercase tracking-[0.25em] text-aurum-gold"
          >
            AGQuant Trading System
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-playfair text-pale-gold"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            Algorithms That <span className="text-aurum-gold">Think.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-dm text-[15px] text-[#B8AE99] max-w-[560px] mx-auto leading-relaxed"
          >
            Institutional quantitative strategies, automated execution, and
            AI-enhanced market analysis.
          </motion.p>
        </div>

        {/* Force graph + panel */}
        <div className="grid lg:grid-cols-5 gap-8 mb-14">
          <div className="lg:col-span-3">
            <ForceGraph onSelect={setSelectedStrategy} />
          </div>
          <div className="lg:col-span-2 flex flex-col justify-center">
            <StrategyPanel strategyId={selectedStrategy} />
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-8 mb-14 border-y border-[rgba(201,168,76,0.1)] py-10">
          {[
            { value: 2.84, label: 'Avg Sharpe Ratio', suffix: '', decimals: 2 },
            { value: 68.3, label: 'Average Win Rate', suffix: '%', decimals: 1 },
            { value: 7.2, label: 'Max Drawdown', suffix: '%', decimals: 1, prefix: '-' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="font-playfair text-aurum-gold" style={{ fontSize: 'clamp(36px, 5vw, 52px)' }}>
                <CountUp
                  end={stat.value}
                  prefix={stat.prefix || ''}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  duration={2000}
                />
              </div>
              <div className="mt-2 font-dm text-[11px] uppercase tracking-[0.15em] text-muted-gold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Equity curve */}
        <div className="mb-14">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-dm text-[11px] uppercase tracking-[0.2em] text-muted-gold">
              Portfolio Equity Curve — Cumulative Return
            </span>
            <span className="font-mono text-[11px] text-gain">+247.3% since inception</span>
          </div>
          <EquityCurve />
        </div>

        {/* Code block */}
        <CodeBlock />
      </div>
    </section>
  )
}
