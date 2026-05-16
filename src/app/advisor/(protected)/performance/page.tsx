'use client'

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Area, AreaChart,
} from 'recharts'
import Link from 'next/link'
import { ArrowUpRight, ChevronRight, TrendingUp, DollarSign, Award, Activity } from 'lucide-react'
import { advisorPerformance, allClients, snapshots } from '@/lib/advisorMetrics'
import { formatCurrency, formatPercent } from '@/lib/formatters'
import { allTimeReturn, allTimeReturnPct } from '@/lib/calculations/returns'

export default function PerformancePage() {
  const allMonthly = advisorPerformance.monthlyData

  const attrData = advisorPerformance.attribution.map((a) => ({
    symbol: a.symbol,
    gain:   Number((a.totalGain / 1000).toFixed(1)),
    trades: a.tradeCount,
  }))

  const aumChartData = allMonthly.map((m) => ({
    month:  m.period.slice(5),
    period: m.period,
    aum:    Number((m.aum / 1000).toFixed(0)),
    ret:    Number(m.return.toFixed(0)),
  }))

  return (
    <div className="ag-page">

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="ag-ph" style={{ marginBottom: 20 }}>
        <p className="ag-ph-ey">Analytics</p>
        <h1 className="ag-ph-h">Performance</h1>
        <p className="ag-ph-s">Advisor-level P&amp;L attribution and analytics across all managed accounts</p>
      </header>

      {/* ── KPI row ──────────────────────────────────────────── */}
      <section className="ag-kpi-row" style={{ marginBottom: 18 }}>
        {[
          { label: 'Total AUM',       value: formatCurrency(advisorPerformance.totalAum),                  color: 'var(--gold)', icon: DollarSign, sub: `${allClients.length} accounts` },
          { label: 'Realized Return', value: `+${formatCurrency(advisorPerformance.totalRealizedReturn)}`, color: 'var(--gain)', icon: TrendingUp, sub: 'all-time' },
          { label: 'Total Dividends', value: `+${formatCurrency(advisorPerformance.totalDividends)}`,      color: 'var(--gain)', icon: Activity,   sub: 'all-time' },
          { label: 'Best Month',      value: advisorPerformance.bestMonth.period,                          color: 'var(--t1)',   icon: Award,      sub: `+${formatCurrency(advisorPerformance.bestMonth.return)}` },
          { label: 'Sharpe Ratio',    value: advisorPerformance.sharpeRatio.toFixed(2),                    color: 'var(--info)', icon: Activity,   sub: `Max DD: −${advisorPerformance.maxDrawdown}%` },
        ].map((m) => (
          <div key={m.label} className="ag-kpi">
            <div className="ag-kpi-label" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <m.icon size={10} color={m.color} />{m.label}
            </div>
            <div className="ag-kpi-value" style={{ color: m.color, fontSize: 18 }}>{m.value}</div>
            <div className="ag-kpi-sub">{m.sub}</div>
          </div>
        ))}
      </section>

      {/* ── Charts row ───────────────────────────────────────── */}
      <div className="ag-g2" style={{ marginBottom: 18 }}>

        {/* AUM Growth area chart */}
        <div className="ag-card">
          <div className="ag-card-head">
            <span className="ag-card-title">AUM Growth (MW2504)</span>
          </div>
          <div className="ag-card-body" style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={aumChartData}>
                <defs>
                  <linearGradient id="aumGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6B6B6B" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="#6B6B6B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#4C4C4C" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#4C4C4C" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}K`} />
                <Tooltip
                  contentStyle={{ background: '#181818', border: '1px solid rgba(255,255,255,0.055)', borderRadius: 6, fontSize: 11 }}
                  formatter={(v: number) => [`$${v}K`, 'AUM']}
                />
                <Area dataKey="aum" stroke="#6B6B6B" strokeWidth={1.5} fill="url(#aumGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly return bar chart */}
        <div className="ag-card">
          <div className="ag-card-head">
            <span className="ag-card-title">Monthly Net Return ($)</span>
          </div>
          <div className="ag-card-body" style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aumChartData}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#4C4C4C" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#4C4C4C" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  contentStyle={{ background: '#181818', border: '1px solid rgba(255,255,255,0.055)', borderRadius: 6, fontSize: 11 }}
                  formatter={(v: number) => [`$${v}`, 'Net Return']}
                />
                <Bar dataKey="ret" fill="#16A34A" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Attribution + Client comparison ─────────────────── */}
      <div className="ag-g2" style={{ marginBottom: 18 }}>

        {/* P&L Attribution */}
        <div className="ag-card">
          <div className="ag-card-head">
            <span className="ag-card-title">P&amp;L Attribution</span>
          </div>
          <div className="ag-card-body" style={{ padding: '12px 16px' }}>
            {attrData.length > 0 ? (
              <div style={{ height: 200, marginBottom: 12 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attrData} layout="vertical">
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" horizontal={false} />
                    <XAxis type="number" stroke="#4C4C4C" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}K`} />
                    <YAxis type="category" dataKey="symbol" stroke="#4C4C4C" fontSize={10} tickLine={false} axisLine={false} width={42} />
                    <Tooltip
                      contentStyle={{ background: '#181818', border: '1px solid rgba(255,255,255,0.055)', borderRadius: 6, fontSize: 11 }}
                      formatter={(v: number) => [`$${v}K`, 'Gain']}
                    />
                    <Bar dataKey="gain" fill="#6B6B6B" radius={[0, 3, 3, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="ag-empty"><span className="ag-empty-label">No attribution data</span></div>
            )}
            <div style={{ borderTop: '1px solid var(--bdr)', paddingTop: 10 }}>
              {advisorPerformance.attribution.slice(0, 5).map((a) => (
                <div key={a.symbol} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--t1)' }}>{a.symbol}</span>
                  <div style={{ display: 'flex', gap: 14, fontSize: 11 }}>
                    <span className="ag-gain" style={{ fontVariantNumeric: 'tabular-nums' }}>+{formatCurrency(a.totalGain)}</span>
                    <span style={{ color: 'var(--t3)' }}>{a.tradeCount} trades</span>
                    <span style={{ color: 'var(--t3)', fontVariantNumeric: 'tabular-nums' }}>{a.winRate.toFixed(0)}% win</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Client Comparison */}
        <div className="ag-card">
          <div className="ag-card-head">
            <span className="ag-card-title">Client Comparison</span>
            <Link href="/advisor/clients" style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: 'var(--t3)', textDecoration: 'none' }}>
              View all <ChevronRight size={10} />
            </Link>
          </div>
          <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {allClients.map((client) => {
              const snap     = snapshots.find((s) => s.clientId === client.id)
              const gain     = allTimeReturn(client.currentAUM, client.initialDeposit)
              const roi      = allTimeReturnPct(client.currentAUM, client.initialDeposit)
              const allocPct = advisorPerformance.totalAum > 0 ? (client.currentAUM / advisorPerformance.totalAum) * 100 : 0
              return (
                <Link
                  key={client.id}
                  href={`/advisor/clients/${client.id}`}
                  style={{
                    background: 'var(--bg-elevated)', borderRadius: 8, padding: '12px 14px',
                    textDecoration: 'none', borderLeft: `3px solid ${client.color}`,
                    display: 'block',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--t1)', marginBottom: 2 }}>{client.name}</div>
                      <div style={{ fontSize: 10, color: 'var(--t3)', fontVariantNumeric: 'tabular-nums' }}>{client.id} · {client.riskProfile ?? client.tier}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)', fontVariantNumeric: 'tabular-nums' }}>{formatCurrency(client.currentAUM)}</div>
                      <div style={{ fontSize: 10, color: 'var(--gain)', display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end', marginTop: 2 }}>
                        <ArrowUpRight size={9} />+{formatPercent(roi)}
                      </div>
                    </div>
                  </div>
                  <div style={{ marginBottom: 6 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, fontSize: 9 }}>
                      <span style={{ color: 'var(--t3)' }}>Portfolio share</span>
                      <span style={{ color: client.color, fontVariantNumeric: 'tabular-nums' }}>{allocPct.toFixed(1)}%</span>
                    </div>
                    <div className="ag-bar-track">
                      <div className="ag-bar-fill" style={{ width: `${allocPct}%`, background: client.color }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 14, fontSize: 10, color: 'var(--t3)' }}>
                    <span>Return: <span className="ag-gain" style={{ fontVariantNumeric: 'tabular-nums' }}>+{formatCurrency(gain)}</span></span>
                    <span>Div: <span className="ag-gain" style={{ fontVariantNumeric: 'tabular-nums' }}>+{formatCurrency(snap?.totalDividends ?? 0)}</span></span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Monthly performance table ─────────────────────────── */}
      <div className="ag-card">
        <div className="ag-card-head">
          <span className="ag-card-title">Monthly Performance — All Clients</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="ag-table" style={{ minWidth: 600 }}>
            <thead>
              <tr>
                <th>Month</th>
                {allClients.map((c) => (
                  <th key={c.id} style={{ color: c.color }}>{c.name.split(' ')[0]}</th>
                ))}
                <th style={{ color: 'var(--gold)' }}>Combined</th>
              </tr>
            </thead>
            <tbody>
              {advisorPerformance.monthlyData.map((m) => (
                <tr key={m.period}>
                  <td style={{ fontVariantNumeric: 'tabular-nums' }}>{m.period}</td>
                  {allClients.map((c) => {
                    const snap = snapshots.find((s) => s.clientId === c.id)
                    const mr   = snap?.monthlyReturns.find((r) => r.month === m.period)
                    const val  = mr?.netReturn ?? null
                    return (
                      <td key={c.id} style={{ color: val === null ? 'var(--t3)' : val >= 0 ? 'var(--gain)' : 'var(--loss)', fontVariantNumeric: 'tabular-nums' }}>
                        {val === null ? '—' : `${val >= 0 ? '+' : ''}${formatCurrency(val)}`}
                      </td>
                    )
                  })}
                  <td style={{ color: m.return >= 0 ? 'var(--gain)' : 'var(--loss)', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                    +{formatCurrency(m.return)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
