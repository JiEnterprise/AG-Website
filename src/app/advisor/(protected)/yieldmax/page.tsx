'use client'

import { useState } from 'react'
import PageHeader from '@/components/advisor/PageHeader'
import MetricCard from '@/components/advisor/MetricCard'
import { yieldmaxUniverse, dividendCalendar } from '@/lib/mock-data/yieldmax'

function rsiColor(rsi: number) {
  if (rsi <= 30) return 'var(--gain)'
  if (rsi <= 45) return 'var(--info)'
  if (rsi >= 70) return 'var(--loss)'
  if (rsi >= 60) return 'var(--warn)'
  return 'var(--t2)'
}

function trendColor(trend: string) {
  if (trend === 'rising') return 'var(--gain)'
  if (trend === 'falling') return 'var(--loss)'
  return 'var(--t3)'
}

function trendIcon(trend: string) {
  if (trend === 'rising') return '↑'
  if (trend === 'falling') return '↓'
  return '→'
}

function decayColor(pct: number) {
  if (pct <= 2) return 'var(--gain)'
  if (pct <= 3.5) return 'var(--warn)'
  return 'var(--loss)'
}

export default function YieldMaxPage() {
  const [tab, setTab] = useState<'screener' | 'calendar'>('screener')

  const totalIncome = yieldmaxUniverse
    .filter((e) => e.inPortfolio)
    .reduce((sum, e) => sum + e.lastDistribution, 0)

  const avgYield = (
    yieldmaxUniverse.reduce((sum, e) => sum + e.annualYieldPct, 0) / yieldmaxUniverse.length
  ).toFixed(1)

  const nextExDiv = dividendCalendar
    .filter((e) => e.type === 'ex-div')
    .sort((a, b) => a.date.localeCompare(b.date))[0]

  // Group calendar by date
  const calByDate = dividendCalendar.reduce<Record<string, typeof dividendCalendar>>((acc, ev) => {
    if (!acc[ev.date]) acc[ev.date] = []
    acc[ev.date].push(ev)
    return acc
  }, {})

  const sortedDates = Object.keys(calByDate).sort()

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Income strategy"
        title="YieldMax Universe"
        subtitle="Weekly option income ETFs · Ex-div calendar · NAV decay tracking · Distribution trends"
      />

      {/* Alert banner for upcoming ex-div */}
      {nextExDiv && (
        <div
          className="flex items-center gap-3 rounded-[var(--radius-sm)] border px-4 py-3"
          style={{ borderColor: 'rgba(201,168,76,0.3)', background: 'var(--gold-dim)' }}
        >
          <span className="font-dm text-[9px] uppercase tracking-[0.16em] text-[var(--gold)]">
            Next Ex-Div
          </span>
          <span className="font-mono text-[11px] text-[var(--t1)]">
            {nextExDiv.symbol} — {nextExDiv.date}
          </span>
          <span className="font-mono text-[10px] text-[var(--t3)]">
            Est. ${nextExDiv.estimatedAmount.toFixed(2)}/share · {nextExDiv.underlying} underlying
          </span>
        </div>
      )}

      {/* Metrics */}
      <section className="mrow">
        <MetricCard
          label="ETFs Tracked"
          value={String(yieldmaxUniverse.length)}
          badge={`${yieldmaxUniverse.filter((e) => e.inPortfolio).length} in portfolio`}
          accent
        />
        <MetricCard
          label="Portfolio Distributions"
          value={`$${totalIncome.toFixed(2)}/share`}
          valueColor="var(--gold)"
          badge="Last distribution cycle"
          badgeVariant="gain"
        />
        <MetricCard
          label="Universe Avg Yield"
          value={`${avgYield}%`}
          valueColor="var(--gain)"
          badge="Annual distribution yield"
          badgeVariant="gain"
        />
        <MetricCard
          label="Ex-Div Events"
          value={String(dividendCalendar.filter((e) => e.type === 'ex-div').length)}
          badge="Next 6 weeks"
          badgeVariant="warn"
        />
      </section>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid var(--bdr)', marginBottom: -4 }}>
        {(['screener', 'calendar'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="font-dm text-[10px] uppercase tracking-[0.14em]"
            style={{
              padding: '8px 14px 7px',
              background: 'none',
              border: 'none',
              borderBottom: tab === t ? '2px solid var(--gold)' : '2px solid transparent',
              color: tab === t ? 'var(--gold)' : 'var(--t3)',
              cursor: 'pointer',
            }}
          >
            {t === 'screener' ? 'ETF Screener' : 'Ex-Div Calendar'}
          </button>
        ))}
      </div>

      {/* Screener */}
      {tab === 'screener' && (
        <article className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] overflow-x-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--bdr)' }}>
                {['Symbol', 'Underlying', 'Price', 'Yield', 'NAV Decay/mo', 'Last Dist', 'Trend', 'RSI', 'Next Ex-Div', 'Status'].map(
                  (h) => (
                    <th
                      key={h}
                      className="font-dm text-[9px] uppercase tracking-[0.14em] text-[var(--t3)]"
                      style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 500 }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {yieldmaxUniverse.map((etf) => (
                <tr
                  key={etf.symbol}
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                    background: etf.inPortfolio ? 'rgba(201,168,76,0.03)' : 'transparent',
                  }}
                >
                  <td style={{ padding: '11px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="font-mono text-[12px] font-semibold" style={{ color: 'var(--gold)' }}>
                        {etf.symbol}
                      </span>
                      {etf.inPortfolio && (
                        <span
                          className="font-dm text-[8px] uppercase tracking-[0.1em] rounded px-1 py-0.5"
                          style={{ background: 'var(--gold-dim)', color: 'var(--gold)' }}
                        >
                          Held
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '11px 14px' }}>
                    <span className="font-mono text-[10px] text-[var(--t3)]">{etf.underlying}</span>
                  </td>
                  <td style={{ padding: '11px 14px' }}>
                    <span className="font-mono text-[11px] text-[var(--t1)]">${etf.currentPrice.toFixed(2)}</span>
                  </td>
                  <td style={{ padding: '11px 14px' }}>
                    <span className="font-mono text-[11px]" style={{ color: 'var(--gain)' }}>
                      {etf.annualYieldPct.toFixed(1)}%
                    </span>
                  </td>
                  <td style={{ padding: '11px 14px' }}>
                    <span className="font-mono text-[11px]" style={{ color: decayColor(etf.navDecayPct) }}>
                      -{etf.navDecayPct.toFixed(1)}%
                    </span>
                  </td>
                  <td style={{ padding: '11px 14px' }}>
                    <span className="font-mono text-[11px]" style={{ color: 'var(--gold)' }}>
                      ${etf.lastDistribution.toFixed(2)}
                    </span>
                  </td>
                  <td style={{ padding: '11px 14px' }}>
                    <span className="font-mono text-[11px]" style={{ color: trendColor(etf.distributionTrend) }}>
                      {trendIcon(etf.distributionTrend)} {etf.distributionTrend}
                    </span>
                  </td>
                  <td style={{ padding: '11px 14px' }}>
                    <span className="font-mono text-[11px]" style={{ color: rsiColor(etf.rsi14) }}>
                      {etf.rsi14}
                    </span>
                  </td>
                  <td style={{ padding: '11px 14px' }}>
                    <span className="font-mono text-[10px] text-[var(--t2)]">{etf.nextExDivDate}</span>
                  </td>
                  <td style={{ padding: '11px 14px' }}>
                    <span
                      className="font-dm text-[9px] uppercase tracking-[0.1em] rounded px-1.5 py-0.5"
                      style={{
                        color: etf.inPortfolio ? 'var(--gain)' : 'var(--t3)',
                        background: etf.inPortfolio ? 'var(--gain-bg)' : 'rgba(255,255,255,0.04)',
                      }}
                    >
                      {etf.inPortfolio ? 'Active' : 'Watch'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      )}

      {/* Notes panel */}
      {tab === 'screener' && (
        <div className="grid gap-3 md:grid-cols-2">
          {yieldmaxUniverse.filter((e) => e.inPortfolio).map((etf) => (
            <article
              key={etf.symbol}
              className="rounded-[var(--radius-sm)] border border-[var(--bdr-gold)] bg-[var(--gold-dim)] p-4"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span className="font-mono text-[12px] font-semibold" style={{ color: 'var(--gold)' }}>
                  {etf.symbol}
                </span>
                <span className="font-dm text-[9px] text-[var(--t3)]">{etf.name}</span>
              </div>
              <p className="font-dm text-[11px] leading-[1.65] text-[var(--t2)]">{etf.notes}</p>
              <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
                <span className="font-mono text-[10px] text-[var(--t3)]">52W Low: ${etf.fiftyTwoWeekLow.toFixed(2)}</span>
                <span className="font-mono text-[10px] text-[var(--t3)]">52W High: ${etf.fiftyTwoWeekHigh.toFixed(2)}</span>
                <span className="font-mono text-[10px] text-[var(--t3)]">Pays: {etf.nextPayDate}</span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Calendar */}
      {tab === 'calendar' && (
        <div className="space-y-3">
          {sortedDates.map((date) => {
            const events = calByDate[date]
            const exDivs = events.filter((e) => e.type === 'ex-div')
            const pays = events.filter((e) => e.type === 'pay')
            return (
              <article
                key={date}
                className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <span className="font-mono text-[13px] text-[var(--t1)] font-semibold">{date}</span>
                  {exDivs.length > 0 && (
                    <span
                      className="font-dm text-[8px] uppercase tracking-[0.14em] rounded px-2 py-0.5"
                      style={{ background: 'var(--gold-dim)', color: 'var(--gold)' }}
                    >
                      {exDivs.length} Ex-Div
                    </span>
                  )}
                  {pays.length > 0 && (
                    <span
                      className="font-dm text-[8px] uppercase tracking-[0.14em] rounded px-2 py-0.5"
                      style={{ background: 'var(--gain-bg)', color: 'var(--gain)' }}
                    >
                      {pays.length} Pay Date
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {events.map((ev, i) => {
                    const etf = yieldmaxUniverse.find((e) => e.symbol === ev.symbol)
                    return (
                      <div
                        key={i}
                        className="rounded-[var(--radius-sm)] border p-3"
                        style={{
                          borderColor:
                            ev.type === 'ex-div'
                              ? 'rgba(201,168,76,0.2)'
                              : 'rgba(71,186,130,0.2)',
                          background:
                            ev.type === 'ex-div'
                              ? 'rgba(201,168,76,0.04)'
                              : 'rgba(71,186,130,0.04)',
                          minWidth: 160,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                          <span
                            className="font-mono text-[11px] font-semibold"
                            style={{ color: ev.type === 'ex-div' ? 'var(--gold)' : 'var(--gain)' }}
                          >
                            {ev.symbol}
                          </span>
                          <span
                            className="font-dm text-[8px] uppercase tracking-[0.1em]"
                            style={{ color: ev.type === 'ex-div' ? 'var(--gold)' : 'var(--gain)' }}
                          >
                            {ev.type === 'ex-div' ? 'Ex-Div' : 'Pay'}
                          </span>
                          {etf?.inPortfolio && (
                            <span style={{ fontSize: 9, color: 'var(--t3)' }}>●</span>
                          )}
                        </div>
                        <p className="font-mono text-[10px] text-[var(--t3)]">
                          ${ev.estimatedAmount.toFixed(2)}/share · {ev.underlying}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
