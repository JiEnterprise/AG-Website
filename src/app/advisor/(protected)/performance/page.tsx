'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import PageHeader from '@/components/advisor/PageHeader'
import MetricCard from '@/components/advisor/MetricCard'
import StatRow from '@/components/advisor/StatRow'
import { advisorPerformance, allClients, snapshots } from '@/lib/advisorMetrics'
import { formatCurrency, formatPercent } from '@/lib/formatters'

const monthlyRows = ['2025-07', '2025-09', '2025-10', '2025-11']

export default function PerformancePage() {
  const strategyBars = advisorPerformance.attribution.map((row) => ({
    name: row.symbol,
    percentage: row.percentage,
  }))

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Analytics"
        title="Performance"
        subtitle="Advisor-level P&L attribution across all managed accounts"
      />

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total AUM" value={formatCurrency(advisorPerformance.totalAum)} accent />
        <MetricCard label="Total Realized Return" value={`+${formatCurrency(advisorPerformance.totalRealizedReturn)}`} valueColor="var(--gain)" />
        <MetricCard label="Best Month" value={advisorPerformance.bestMonth.period} badge={`+${formatCurrency(advisorPerformance.bestMonth.return)}`} badgeVariant="gain" />
        <MetricCard label="Sharpe Ratio" value={advisorPerformance.sharpeRatio.toFixed(2)} />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
          <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">P&L Attribution — All Clients</h2>
          <div className="mt-2">
            {advisorPerformance.attribution.map((row) => (
              <StatRow key={row.symbol} label={`${row.symbol} gains`} value={formatCurrency(row.totalGain)} valueColor="var(--gain)" />
            ))}
            <StatRow label="Dividends (all)" value={formatCurrency(advisorPerformance.totalDividends)} valueColor="var(--gain)" />
            <StatRow label="Transaction fees (neg)" value={formatCurrency(-0.8)} valueColor="var(--loss)" />
            <StatRow label="Net total" value={formatCurrency(advisorPerformance.totalRealizedReturn + advisorPerformance.totalDividends - 0.8)} valueColor="var(--gold)" />
          </div>
        </article>

        <article className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
          <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Strategy Attribution</h2>
          <div className="mt-2 h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={strategyBars}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="name" stroke="#9A9282" fontSize={10} />
                <YAxis stroke="#9A9282" fontSize={10} />
                <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                <Bar dataKey="percentage" fill="#C9A84C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
          <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Client Comparison</h2>
          <div className="mt-2 space-y-2">
            {allClients.map((client) => {
              const snap = snapshots.find((entry) => entry.clientId === client.id)
              return (
                <div key={client.id} className="rounded-[var(--radius-sm)] border border-[rgba(255,255,255,0.04)] bg-[var(--bg-elevated)] p-3">
                  <p className="font-dm text-[11px] text-[var(--t1)]">{client.name} · {client.id}</p>
                  <p className="mt-1 font-mono text-[10px] text-[var(--t3)]">
                    AUM {formatCurrency(client.currentAUM)} · ROI {formatPercent(snap?.allTimeReturnPct ?? 0)} · Dividends {formatCurrency(snap?.totalDividends ?? 0)}
                  </p>
                </div>
              )
            })}
          </div>
        </article>

        <article className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
          <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Monthly Performance Table</h2>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full min-w-[420px]">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.05)]">
                  <th className="px-2 py-2 text-left font-dm text-[9px] uppercase tracking-[0.14em] text-[var(--t3)]">Month</th>
                  <th className="px-2 py-2 text-left font-dm text-[9px] uppercase tracking-[0.14em] text-[var(--t3)]">DL2503</th>
                  <th className="px-2 py-2 text-left font-dm text-[9px] uppercase tracking-[0.14em] text-[var(--t3)]">SR2501</th>
                </tr>
              </thead>
              <tbody>
                {monthlyRows.map((month) => {
                  const dl = snapshots.find((s) => s.clientId === 'DL2503')?.monthlyReturns.find((m) => m.month === month)?.netReturn ?? 0
                  const sr = snapshots.find((s) => s.clientId === 'SR2501')?.monthlyReturns.find((m) => m.month === month)?.netReturn ?? 0
                  return (
                    <tr key={month} className="border-b border-[rgba(255,255,255,0.03)]">
                      <td className="px-2 py-2 font-mono text-[10px] text-[var(--t2)]">{month}</td>
                      <td className="px-2 py-2 font-mono text-[10px]" style={{ color: dl >= 0 ? 'var(--gain)' : 'var(--loss)' }}>{formatCurrency(dl)}</td>
                      <td className="px-2 py-2 font-mono text-[10px]" style={{ color: sr >= 0 ? 'var(--gain)' : 'var(--loss)' }}>{formatCurrency(sr)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </div>
  )
}
