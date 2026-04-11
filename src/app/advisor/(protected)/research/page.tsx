import PageHeader from '@/components/advisor/PageHeader'
import StatRow from '@/components/advisor/StatRow'
import { researchTheses } from '@/lib/mock-data/research'
import { advisorPerformance } from '@/lib/advisorMetrics'
import { formatCurrency, formatPercent } from '@/lib/formatters'

const watchlist = [
  { symbol: 'TSLY', price: 7.18, indicator: 'RSI 42', status: 'Entry zone', color: 'var(--gold)' },
  { symbol: 'PLUG', price: 2.84, indicator: 'RSI 28.4', status: 'Watch', color: 'var(--info)' },
  { symbol: 'MSFO', price: 21.31, indicator: 'Yield spread', status: 'Research', color: 'var(--t3)' },
  { symbol: 'NVDY', price: 18.91, indicator: 'Vol regime', status: 'Monitor', color: 'var(--gain)' },
  { symbol: 'QQQ', price: 503.18, indicator: 'Trend +', status: 'Watch', color: 'var(--info)' },
]

export default function ResearchPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Intelligence"
        title="Research Desk"
        subtitle="Active theses, watchlist, and strategy performance"
      />

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
          <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Active Theses</h2>
          <div className="mt-2 space-y-2">
            {researchTheses.map((thesis) => (
              <div key={thesis.id} className="rounded-[var(--radius-sm)] border border-[rgba(255,255,255,0.04)] bg-[var(--bg-elevated)] p-3">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      background:
                        thesis.status === 'active'
                          ? 'var(--gold)'
                          : thesis.status === 'watching'
                            ? 'var(--info)'
                            : 'var(--t3)',
                    }}
                  />
                  <p className="font-dm text-[12px] text-[var(--t1)]">{thesis.title}</p>
                </div>
                <p className="mt-1 font-mono text-[10px] text-[var(--t3)]">{thesis.symbol} · {thesis.strategy}</p>
                <p className="mt-1 font-dm text-[10px] leading-[1.6] text-[var(--t2)]">{thesis.thesis}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="space-y-4">
          <div className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
            <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Watchlist</h2>
            <div className="mt-2 space-y-1">
              {watchlist.map((row) => (
                <div key={row.symbol} className="grid grid-cols-[70px_1fr_70px_70px] items-center gap-2 rounded-[var(--radius-sm)] border border-[rgba(255,255,255,0.04)] bg-[var(--bg-elevated)] px-2 py-1.5">
                  <span className="font-mono text-[10px] text-[var(--gold)]">{row.symbol}</span>
                  <span className="font-mono text-[10px] text-[var(--t2)]">{row.price.toFixed(2)}</span>
                  <span className="font-dm text-[10px] text-[var(--t3)]">{row.indicator}</span>
                  <span className="font-dm text-[10px]" style={{ color: row.color }}>{row.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
            <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">AGQuant Strategy Performance</h2>
            <div className="mt-2">
              <StatRow label="Total realized (both clients)" value={formatCurrency(advisorPerformance.totalRealizedReturn)} valueColor="var(--gain)" />
              <StatRow label="Average client ROI" value={formatPercent(advisorPerformance.avgClientRoi)} valueColor="var(--gain)" />
              <StatRow label="Max drawdown (worst client)" value="-7.20%" valueColor="var(--loss)" />
              <StatRow label="Sharpe ratio (est.)" value={advisorPerformance.sharpeRatio.toFixed(2)} valueColor="var(--gold)" />
            </div>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--bdr-gold)] bg-[var(--gold-dim)] p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--gold)]">Cortex AI · Dec 1, 2025</p>
            <p className="mt-2 font-dm text-[11px] leading-[1.65] text-[var(--t2)]">
              Dividend capture on YieldMax ETFs with active entry/exit discipline is outperforming passive hold.
              The contrarian PLUG thesis demonstrated strong mean-reversion alpha. Recommend maintaining systematic
              approach with Kelly-based position sizing. AGQuant confidence in TSLY strategy: HIGH.
            </p>
          </div>
        </article>
      </section>
    </div>
  )
}
