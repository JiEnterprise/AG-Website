import { Shield, AlertTriangle, CheckCircle, Zap, Lock } from 'lucide-react'
import PageHeader from '@/components/advisor/PageHeader'
import RiskBar from '@/components/advisor/RiskBar'
import { allClients, snapshots } from '@/lib/advisorMetrics'
import { systemStatus } from '@/lib/mock-data/research'
import { formatCurrency, formatPercent } from '@/lib/formatters'

// Static risk config per client (would be dynamic in production)
const RISK_CONFIG: Record<string, {
  volatility: number
  volatilityText: string
  concentration: number
  concentrationText: string
  strategyRisk: number
  strategyRiskText: string
  maxDrawdown: number
  maxDrawdownText: string
  drawdownVariant: 'gain' | 'warn' | 'loss'
  circuitBreaker: string
  kellyLimit: string
  stopLosses: { symbol: string; price: string }[]
}> = {
  MW2504: {
    volatility: 38,       volatilityText: 'Elevated — 7 active positions',
    concentration: 24,    concentrationText: 'NVDA 8.5% of AUM',
    strategyRisk: 62,     strategyRiskText: 'High — Momentum / Long Alpha',
    maxDrawdown: 14,      maxDrawdownText: '−9.4% (Jan 2025)',
    drawdownVariant: 'warn',
    circuitBreaker: 'Armed · −20% threshold',
    kellyLimit: '18% max per trade',
    stopLosses: [
      { symbol: 'NVDA',  price: '$720.00 (−17.7%)' },
      { symbol: 'MSFT',  price: '$360.00 (−13.4%)' },
      { symbol: 'TSLY',  price: '$11.80 (−17.8%)' },
    ],
  },
  DL2503: {
    volatility: 5,        volatilityText: 'Low — 100% cash',
    concentration: 3,     concentrationText: 'None — fully liquid',
    strategyRisk: 52,     strategyRiskText: 'Medium (when deployed)',
    maxDrawdown: 12,      maxDrawdownText: '−3.2% all-time',
    drawdownVariant: 'gain',
    circuitBreaker: 'Armed · −15% threshold',
    kellyLimit: '28% max per trade',
    stopLosses: [
      { symbol: 'TSLY', price: '$6.50 (−9.6%)' },
      { symbol: 'PLUG', price: '$2.60 (−8.5%)' },
    ],
  },
  SR2501: {
    volatility: 5,        volatilityText: 'Low — 100% cash',
    concentration: 3,     concentrationText: 'None — fully liquid',
    strategyRisk: 52,     strategyRiskText: 'Medium (when deployed)',
    maxDrawdown: 8,       maxDrawdownText: '−2.1% all-time',
    drawdownVariant: 'gain',
    circuitBreaker: 'Armed · −15% threshold',
    kellyLimit: '28% max per trade',
    stopLosses: [
      { symbol: 'TSLY', price: '$6.50 (−9.6%)' },
      { symbol: 'PLUG', price: '$2.60 (−8.5%)' },
    ],
  },
}

const STATUS_COLORS = {
  online:      'var(--gain)',
  connected:   'var(--gain)',
  armed:       'var(--gain)',
  paper:       'var(--warn)',
  offline:     'var(--loss)',
  disconnected:'var(--loss)',
  triggered:   'var(--loss)',
  live:        'var(--info)',
  degraded:    'var(--warn)',
}

function getStatusColor(val: string): string {
  return STATUS_COLORS[val.toLowerCase() as keyof typeof STATUS_COLORS] ?? 'var(--t2)'
}

export default function RiskPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Risk Management"
        title="Risk Monitor"
        subtitle="Real-time exposure, circuit breakers, and position risk — all managed accounts"
      />

      {/* ── System status strip ───────────────────── */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 24 }}>
        {[
          { label: 'AGQuant Engine',  value: systemStatus.agquantEngine,  icon: Zap },
          { label: 'Alpaca API',      value: systemStatus.alpacaApi,       icon: Shield },
          { label: 'Circuit Breakers',value: systemStatus.circuitBreakers, icon: Lock },
          { label: 'Trading Mode',    value: systemStatus.alpacaMode,      icon: AlertTriangle },
        ].map((s) => {
          const color = getStatusColor(s.value)
          return (
            <div key={s.label} style={{ background: 'var(--bg-card)', border: `1px solid var(--bdr)`, borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <s.icon size={13} color={color} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--t3)', marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 12, fontWeight: 600, color, textTransform: 'capitalize' }}>{s.value}</div>
              </div>
            </div>
          )
        })}
      </section>

      {/* ── Client risk panels ────────────────────── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {allClients.map((client) => {
          const cfg  = RISK_CONFIG[client.id]
          if (!cfg) return null
          const snap = snapshots.find((s) => s.clientId === client.id)
          const investedPct = client.currentAUM > 0 ? ((client.currentAUM - client.cashBalance) / client.currentAUM) * 100 : 0

          return (
            <div key={client.id} style={{
              background: 'var(--bg-card)', border: '1px solid var(--bdr)', borderRadius: 12, overflow: 'hidden',
            }}>
              {/* Client header */}
              <div style={{ padding: '14px 20px 12px', borderBottom: '1px solid var(--bdr)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: `3px solid ${client.color}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${client.color}1A`, color: client.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-dm-sans)', fontSize: 12, fontWeight: 700 }}>
                    {client.initials}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 13, fontWeight: 600, color: 'var(--t1)' }}>{client.name}</div>
                    <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 9, color: 'var(--t3)', marginTop: 1 }}>
                      {client.id} · {client.riskProfile ?? client.tier} · AUM {formatCurrency(client.currentAUM)}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)' }}>Cash / Invested</div>
                  <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: 'var(--t1)', marginTop: 1 }}>
                    {formatCurrency(client.cashBalance)} / {formatCurrency(client.currentAUM - client.cashBalance)}
                  </div>
                </div>
              </div>

              <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {/* Risk bars */}
                <div>
                  <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--t3)', marginBottom: 12 }}>Exposure Metrics</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <RiskBar label="Portfolio volatility"  fill={cfg.volatility}     variant={cfg.volatility > 50 ? 'loss' : cfg.volatility > 25 ? 'warn' : 'gain'} statusText={cfg.volatilityText} />
                    <RiskBar label="Concentration risk"    fill={cfg.concentration}  variant={cfg.concentration > 50 ? 'loss' : cfg.concentration > 25 ? 'warn' : 'gain'} statusText={cfg.concentrationText} />
                    <RiskBar label="Strategy risk"         fill={cfg.strategyRisk}   variant={cfg.strategyRisk > 70 ? 'loss' : cfg.strategyRisk > 40 ? 'warn' : 'gain'} statusText={cfg.strategyRiskText} />
                    <RiskBar label="Max drawdown"          fill={cfg.maxDrawdown}    variant={cfg.drawdownVariant} statusText={cfg.maxDrawdownText} />
                    <RiskBar label="Invested allocation"   fill={Math.round(investedPct)} variant={investedPct > 90 ? 'warn' : 'gain'} statusText={`${investedPct.toFixed(1)}% deployed`} />
                  </div>
                </div>

                {/* Controls */}
                <div>
                  <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--t3)', marginBottom: 12 }}>Risk Controls</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ background: 'var(--bg-elevated)', borderRadius: 8, padding: '10px 12px' }}>
                      <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 9, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3 }}>Circuit Breaker</div>
                      <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: 'var(--gain)', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <CheckCircle size={10} /> {cfg.circuitBreaker}
                      </div>
                    </div>
                    <div style={{ background: 'var(--bg-elevated)', borderRadius: 8, padding: '10px 12px' }}>
                      <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 9, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3 }}>Kelly Position Limit</div>
                      <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: 'var(--t2)' }}>{cfg.kellyLimit}</div>
                    </div>
                    <div style={{ background: 'var(--bg-elevated)', borderRadius: 8, padding: '10px 12px' }}>
                      <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 9, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>Active Stop-Losses</div>
                      {cfg.stopLosses.map((sl) => (
                        <div key={sl.symbol} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: 'var(--t1)', fontWeight: 600 }}>{sl.symbol}</span>
                          <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: 'var(--loss)' }}>{sl.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Open positions risk table (if any) */}
              {snap && snap.openPositions.length > 0 && (
                <div style={{ borderTop: '1px solid var(--bdr)', padding: '14px 20px' }}>
                  <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--t3)', marginBottom: 10 }}>Position Exposure</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 90px 80px 80px 80px', gap: 8, paddingBottom: 8, borderBottom: '1px solid var(--bdr)' }}>
                    {['Symbol', 'Allocation', 'Mkt Val', 'Unreal P&L', '% of AUM', 'Risk'].map((h) => (
                      <span key={h} style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--t3)' }}>{h}</span>
                    ))}
                  </div>
                  {snap.openPositions.map((pos) => {
                    const pctOfAum = (pos.marketValue / client.currentAUM) * 100
                    const riskLevel = pctOfAum > 15 ? 'High' : pctOfAum > 8 ? 'Medium' : 'Low'
                    const riskColor = riskLevel === 'High' ? 'var(--loss)' : riskLevel === 'Medium' ? 'var(--warn)' : 'var(--gain)'
                    return (
                      <div key={pos.symbol} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 90px 80px 80px 80px', gap: 8, alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 12, fontWeight: 600, color: 'var(--t1)' }}>{pos.symbol}</span>
                        <div style={{ height: 4, borderRadius: 99, background: 'var(--bg-elevated)', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${Math.min(pctOfAum * 4, 100)}%`, background: riskColor, borderRadius: 99 }} />
                        </div>
                        <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: 'var(--t1)' }}>{formatCurrency(pos.marketValue)}</span>
                        <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: pos.unrealizedPnl >= 0 ? 'var(--gain)' : 'var(--loss)' }}>
                          {pos.unrealizedPnl >= 0 ? '+' : ''}{formatCurrency(pos.unrealizedPnl)}
                        </span>
                        <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: 'var(--t2)' }}>{pctOfAum.toFixed(1)}%</span>
                        <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, fontWeight: 600, color: riskColor,
                          background: `${riskColor}18`, border: `1px solid ${riskColor}33`,
                          padding: '2px 7px', borderRadius: 20 }}>
                          {riskLevel}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </section>
    </div>
  )
}
