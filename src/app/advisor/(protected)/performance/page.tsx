'use client'

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Area, AreaChart,
} from 'recharts'
import Link from 'next/link'
import { ArrowUpRight, ChevronRight, TrendingUp, DollarSign, Award, Activity } from 'lucide-react'
import PageHeader from '@/components/advisor/PageHeader'
import { advisorPerformance, allClients, snapshots } from '@/lib/advisorMetrics'
import { formatCurrency, formatPercent } from '@/lib/formatters'
import { allTimeReturn, allTimeReturnPct } from '@/lib/calculations/returns'

const CELL_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-jetbrains)',
  fontSize: 11,
  color: 'var(--t2)',
  padding: '9px 12px',
  borderBottom: '1px solid rgba(255,255,255,0.04)',
}

const TH_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans)',
  fontSize: 9,
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: 'var(--t3)',
  padding: '0 12px 10px',
  fontWeight: 400,
  textAlign: 'left',
}

export default function PerformancePage() {
  // All monthly data across all clients, sorted
  const allMonthly = advisorPerformance.monthlyData

  // Attribution bar data
  const attrData = advisorPerformance.attribution.map((a) => ({
    symbol: a.symbol,
    gain:   Number((a.totalGain / 1000).toFixed(1)),  // in $K
    trades: a.tradeCount,
  }))

  // Combined AUM over time (use MW2504 as proxy since it's the largest)
  const aumChartData = allMonthly.map((m) => ({
    month:  m.period.slice(5),  // "01" → "Jan" etc.
    period: m.period,
    aum:    Number((m.aum / 1000).toFixed(0)),
    ret:    Number(m.return.toFixed(0)),
  }))

  return (
    <div>
      <PageHeader
        eyebrow="Analytics"
        title="Performance"
        subtitle="Advisor-level P&L attribution and analytics across all managed accounts"
      />

      {/* ── Top KPI row ──────────────────────────────── */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Total AUM',        value: formatCurrency(advisorPerformance.totalAum),                             color: 'var(--gold)',  icon: DollarSign,  sub: `${allClients.length} accounts` },
          { label: 'Realized Return',  value: `+${formatCurrency(advisorPerformance.totalRealizedReturn)}`,            color: 'var(--gain)',  icon: TrendingUp,  sub: 'all-time' },
          { label: 'Total Dividends',  value: `+${formatCurrency(advisorPerformance.totalDividends)}`,                 color: 'var(--gain)',  icon: Activity,    sub: 'all-time' },
          { label: 'Best Month',       value: advisorPerformance.bestMonth.period,                                     color: 'var(--t1)',    icon: Award,       sub: `+${formatCurrency(advisorPerformance.bestMonth.return)}` },
          { label: 'Sharpe Ratio',     value: advisorPerformance.sharpeRatio.toFixed(2),                               color: 'var(--info)',  icon: Activity,    sub: `Max DD: −${advisorPerformance.maxDrawdown}%` },
        ].map((m) => (
          <div key={m.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--bdr)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
              <m.icon size={11} color={m.color} />
              <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--t3)' }}>{m.label}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 18, fontWeight: 600, color: m.color }}>{m.value}</div>
            <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)', marginTop: 3 }}>{m.sub}</div>
          </div>
        ))}
      </section>

      {/* ── Charts row ───────────────────────────────── */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>

        {/* AUM & Returns line chart */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bdr)', borderRadius: 12, padding: '18px 20px' }}>
          <h2 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--gold)', margin: '0 0 16px' }}>
            AUM Growth (MW2504)
          </h2>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={aumChartData}>
                <defs>
                  <linearGradient id="aumGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C9A84C" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="#C9A84C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#5A5248" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#5A5248" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}K`} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--bdr)', borderRadius: 8, fontFamily: 'var(--font-dm-sans)', fontSize: 11 }}
                  formatter={(v: number) => [`$${v}K`, 'AUM']}
                />
                <Area dataKey="aum" stroke="#C9A84C" strokeWidth={2} fill="url(#aumGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly return bars */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bdr)', borderRadius: 12, padding: '18px 20px' }}>
          <h2 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--gold)', margin: '0 0 16px' }}>
            Monthly Net Return ($)
          </h2>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aumChartData}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#5A5248" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#5A5248" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--bdr)', borderRadius: 8, fontFamily: 'var(--font-dm-sans)', fontSize: 11 }}
                  formatter={(v: number) => [`$${v}`, 'Net Return']}
                />
                <Bar dataKey="ret" fill="#1D9E75" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ── Attribution + Client comparison ─────────── */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>

        {/* Attribution */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bdr)', borderRadius: 12, padding: '18px 20px' }}>
          <h2 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--gold)', margin: '0 0 16px' }}>
            P&amp;L Attribution
          </h2>
          {attrData.length > 0 ? (
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attrData} layout="vertical">
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis type="number" stroke="#5A5248" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}K`} />
                  <YAxis type="category" dataKey="symbol" stroke="#5A5248" fontSize={10} tickLine={false} axisLine={false} width={45} />
                  <Tooltip
                    contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--bdr)', borderRadius: 8, fontFamily: 'var(--font-dm-sans)', fontSize: 11 }}
                    formatter={(v: number) => [`$${v}K`, 'Gain']}
                  />
                  <Bar dataKey="gain" fill="#C9A84C" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div style={{ padding: '16px 0', fontFamily: 'var(--font-dm-sans)', fontSize: 11, color: 'var(--t3)' }}>No attribution data</div>
          )}
          {/* Table summary */}
          <div style={{ marginTop: 12, borderTop: '1px solid var(--bdr)', paddingTop: 10 }}>
            {advisorPerformance.attribution.slice(0, 5).map((a) => (
              <div key={a.symbol} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: 'var(--t1)' }}>{a.symbol}</span>
                <div style={{ display: 'flex', gap: 16 }}>
                  <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: 'var(--gain)' }}>+{formatCurrency(a.totalGain)}</span>
                  <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)' }}>{a.tradeCount} trades</span>
                  <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 10, color: 'var(--t3)' }}>{a.winRate.toFixed(0)}% win</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client comparison */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bdr)', borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--gold)', margin: 0 }}>Client Comparison</h2>
            <Link href="/advisor/clients" style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)', textDecoration: 'none' }}>
              View all <ChevronRight size={10} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {allClients.map((client) => {
              const snap = snapshots.find((s) => s.clientId === client.id)
              const gain = allTimeReturn(client.currentAUM, client.initialDeposit)
              const roi  = allTimeReturnPct(client.currentAUM, client.initialDeposit)
              const allocPct = advisorPerformance.totalAum > 0 ? (client.currentAUM / advisorPerformance.totalAum) * 100 : 0
              return (
                <Link
                  key={client.id}
                  href={`/advisor/clients/${client.id}`}
                  style={{ background: 'var(--bg-elevated)', borderRadius: 10, padding: '12px 14px', textDecoration: 'none', borderLeft: `3px solid ${client.color}` }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 12, color: 'var(--t1)', fontWeight: 500 }}>{client.name}</div>
                      <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 9, color: 'var(--t3)', marginTop: 1 }}>{client.id} · {client.riskProfile ?? client.tier}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}>{formatCurrency(client.currentAUM)}</div>
                      <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 10, color: 'var(--gain)', marginTop: 1, display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end' }}>
                        <ArrowUpRight size={9} />
                        +{formatPercent(roi)}
                      </div>
                    </div>
                  </div>
                  {/* Allocation bar */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 9, color: 'var(--t3)' }}>Portfolio share</span>
                      <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 9, color: client.color }}>{allocPct.toFixed(1)}%</span>
                    </div>
                    <div style={{ height: 3, borderRadius: 99, background: 'var(--bg-root)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${allocPct}%`, background: client.color, borderRadius: 99 }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                    <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)' }}>
                      Return: <span style={{ color: 'var(--gain)' }}>+{formatCurrency(gain)}</span>
                    </span>
                    <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)' }}>
                      Div: <span style={{ color: 'var(--gain)' }}>+{formatCurrency(snap?.totalDividends ?? 0)}</span>
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Monthly performance table ─────────────────── */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bdr)', borderRadius: 12, padding: '18px 20px' }}>
        <h2 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--gold)', margin: '0 0 14px' }}>
          Monthly Performance — All Clients
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: 600, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--bdr)' }}>
                <th style={TH_STYLE}>Month</th>
                {allClients.map((c) => (
                  <th key={c.id} style={{ ...TH_STYLE, color: c.color }}>{c.name.split(' ')[0]}</th>
                ))}
                <th style={{ ...TH_STYLE, color: 'var(--gold)' }}>Combined</th>
              </tr>
            </thead>
            <tbody>
              {advisorPerformance.monthlyData.map((m) => {
                const combined = m.return
                return (
                  <tr key={m.period}>
                    <td style={CELL_STYLE}>{m.period}</td>
                    {allClients.map((c) => {
                      const snap = snapshots.find((s) => s.clientId === c.id)
                      const mr = snap?.monthlyReturns.find((r) => r.month === m.period)
                      const val = mr?.netReturn ?? null
                      return (
                        <td key={c.id} style={{ ...CELL_STYLE, color: val === null ? 'var(--t3)' : val >= 0 ? 'var(--gain)' : 'var(--loss)' }}>
                          {val === null ? '—' : `${val >= 0 ? '+' : ''}${formatCurrency(val)}`}
                        </td>
                      )
                    })}
                    <td style={{ ...CELL_STYLE, color: combined >= 0 ? 'var(--gain)' : 'var(--loss)', fontWeight: 600 }}>
                      +{formatCurrency(combined)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
