import PageHeader from '@/components/advisor/PageHeader'
import RiskBar from '@/components/advisor/RiskBar'
import { systemStatus } from '@/lib/mock-data/research'

function StatusChip({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-[var(--radius-sm)] border border-[var(--bdr)] bg-[var(--bg-elevated)] px-3 py-2">
      <p className="font-dm text-[9px] uppercase tracking-[0.14em] text-[var(--t3)]">{label}</p>
      <p className="mt-1 font-dm text-[12px]" style={{ color }}>{value}</p>
    </div>
  )
}

export default function RiskPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Risk Management"
        title="Risk Monitor"
        subtitle="Real-time exposure and circuit breaker status — all managed accounts"
      />

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
          <h2 className="font-dm text-[12px] text-[var(--t1)]">David Low · DL2503</h2>
          <div className="mt-3 space-y-3">
            <RiskBar label="Portfolio volatility" fill={5} variant="gain" statusText="Low — 100% cash" />
            <RiskBar label="Concentration risk" fill={3} variant="gain" statusText="None" />
            <RiskBar label="TSLY strategy risk" fill={52} variant="warn" statusText="Medium (when active)" />
            <RiskBar label="Max drawdown all-time" fill={12} variant="gain" statusText="-3.2%" />
          </div>
          <div className="my-3 h-px bg-[var(--bdr)]" />
          <div className="space-y-1">
            <p className="font-mono text-[10px] text-[var(--t3)]">Circuit breaker: <span className="text-[var(--gain)]">Armed · -15% threshold</span></p>
            <p className="font-mono text-[10px] text-[var(--t3)]">Kelly position limit: <span className="text-[var(--t2)]">28% max per trade</span></p>
            <p className="font-mono text-[10px] text-[var(--t3)]">Stop-loss on TSLY: <span className="text-[var(--t2)]">$6.50 (-9.6%)</span></p>
            <p className="font-mono text-[10px] text-[var(--t3)]">Stop-loss on PLUG: <span className="text-[var(--t2)]">$2.60 (-8.5%)</span></p>
          </div>
        </article>

        <article className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
          <h2 className="font-dm text-[12px] text-[var(--t1)]">Rehan Shaikh · SR2501</h2>
          <div className="mt-3 space-y-3">
            <RiskBar label="Portfolio volatility" fill={5} variant="gain" statusText="Low — 100% cash" />
            <RiskBar label="Concentration risk" fill={3} variant="gain" statusText="None" />
            <RiskBar label="TSLY strategy risk" fill={52} variant="warn" statusText="Medium (when active)" />
            <RiskBar label="Max drawdown all-time" fill={8} variant="gain" statusText="-2.1%" />
          </div>
          <div className="my-3 h-px bg-[var(--bdr)]" />
          <div className="space-y-1">
            <p className="font-mono text-[10px] text-[var(--t3)]">Circuit breaker: <span className="text-[var(--gain)]">Armed · -15% threshold</span></p>
            <p className="font-mono text-[10px] text-[var(--t3)]">Kelly position limit: <span className="text-[var(--t2)]">28% max per trade</span></p>
            <p className="font-mono text-[10px] text-[var(--t3)]">Stop-loss on TSLY: <span className="text-[var(--t2)]">$6.50 (-9.6%)</span></p>
            <p className="font-mono text-[10px] text-[var(--t3)]">Stop-loss on PLUG: <span className="text-[var(--t2)]">$2.60 (-8.5%)</span></p>
          </div>
        </article>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <StatusChip label="AGQuant Engine" value={systemStatus.agquantEngine} color="var(--gain)" />
        <StatusChip label="Alpaca API" value={systemStatus.alpacaApi} color="var(--gain)" />
        <StatusChip label="Circuit Breakers" value={systemStatus.circuitBreakers} color="var(--gain)" />
        <StatusChip label="Paper Mode" value={systemStatus.alpacaMode} color="var(--gold)" />
      </section>
    </div>
  )
}
