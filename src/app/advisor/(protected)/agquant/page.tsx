import PageHeader from '@/components/advisor/PageHeader'
import MetricCard from '@/components/advisor/MetricCard'
import { agquantStrategies, systemStatus } from '@/lib/mock-data/research'
import { allSignals } from '@/lib/advisorMetrics'

export default function AgquantPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Systematic trading"
        title="AGQuant Engine"
        subtitle="Algorithmic strategy management · Alpaca paper trading · Live signal feed"
      />

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Engine Status" value={systemStatus.agquantEngine} valueColor="var(--gain)" />
        <MetricCard label="Mode" value={systemStatus.alpacaMode} valueColor="var(--gold)" />
        <MetricCard label="Active Strategies" value={String(agquantStrategies.filter((s) => s.status === 'active').length)} />
        <MetricCard label="Signals Today" value={String(allSignals.length)} valueColor="var(--warn)" />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
          <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Active Strategies</h2>
          <div className="mt-2 space-y-2">
            {agquantStrategies.map((strategy) => (
              <div key={strategy.id} className="rounded-[var(--radius-sm)] border border-[rgba(255,255,255,0.04)] bg-[var(--bg-elevated)] p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-dm text-[11px] text-[var(--t1)]">{strategy.name}</p>
                  <span
                    className="rounded-full px-2 py-[1px] font-dm text-[8px] uppercase tracking-[0.12em]"
                    style={{
                      color:
                        strategy.status === 'active'
                          ? 'var(--gain)'
                          : strategy.status === 'paused'
                            ? 'var(--warn)'
                            : strategy.status === 'backtesting'
                              ? 'var(--info)'
                              : 'var(--t3)',
                      background:
                        strategy.status === 'active'
                          ? 'var(--gain-bg)'
                          : strategy.status === 'paused'
                            ? 'var(--warn-bg)'
                            : strategy.status === 'backtesting'
                              ? 'var(--info-bg)'
                              : 'rgba(255,255,255,0.06)',
                    }}
                  >
                    {strategy.status}
                  </span>
                </div>
                <p className="mt-1 font-dm text-[10px] text-[var(--t3)]">{strategy.description}</p>
                <p className="mt-1 font-mono text-[10px] text-[var(--t2)]">{strategy.symbols.join(', ')}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="space-y-4">
          <div className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
            <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">System Connections</h2>
            <div className="mt-2 space-y-1">
              <p className="font-mono text-[10px] text-[var(--t2)]">Alpaca API · <span className="text-[var(--gain)]">{systemStatus.alpacaApi}</span></p>
              <p className="font-mono text-[10px] text-[var(--t2)]">Market data · <span className="text-[var(--gain)]">Streaming</span></p>
              <p className="font-mono text-[10px] text-[var(--t2)]">Circuit breakers · <span className="text-[var(--gain)]">{systemStatus.circuitBreakers}</span></p>
              <p className="font-mono text-[10px] text-[var(--t2)]">Kelly sizing · <span className="text-[var(--gold)]">{systemStatus.kellyPositionLimit.toFixed(2)}%</span></p>
              <p className="font-mono text-[10px] text-[var(--t2)]">Log sync · <span className="text-[var(--gain)]">{systemStatus.logSync}</span></p>
              <p className="font-mono text-[10px] text-[var(--t2)]">Live mode · <span className="text-[var(--warn)]">Disabled</span></p>
            </div>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
            <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Signal Feed (last 24h)</h2>
            <div className="mt-2 space-y-1">
              {allSignals.map((signal) => (
                <p key={signal.id} className="font-mono text-[10px] text-[var(--t2)]">
                  {new Date(signal.generatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} · {signal.symbol} {signal.type} signal · Confidence {signal.confidence.toFixed(2)}%
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--bdr-gold)] bg-[var(--gold-dim)] p-4">
            <p className="font-dm text-[10px] uppercase tracking-[0.16em] text-[var(--gold)]">Paper Trading Notice</p>
            <p className="mt-1 font-dm text-[11px] leading-[1.65] text-[var(--t2)]">
              AGQuant is currently operating in paper trading mode via Alpaca. All orders are simulated.
              Live mode requires Alpaca live account authorization. Contact Saswat to activate live trading.
            </p>
          </div>
        </article>
      </section>
    </div>
  )
}
