import { Shield, AlertTriangle, Zap, Lock, CheckCircle } from 'lucide-react'
import RiskBar from '@/components/advisor/RiskBar'
import { allClients, snapshots } from '@/lib/advisorMetrics'
import { systemStatus } from '@/lib/mock-data/research'
import { formatCurrency } from '@/lib/formatters'

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

const STATUS_COLORS: Record<string, string> = {
  online:       'var(--gain)',
  connected:    'var(--gain)',
  armed:        'var(--gain)',
  paper:        'var(--warn)',
  offline:      'var(--loss)',
  disconnected: 'var(--loss)',
  triggered:    'var(--loss)',
  live:         'var(--info)',
  degraded:     'var(--warn)',
}

function getStatusColor(val: string): string {
  return STATUS_COLORS[val.toLowerCase()] ?? 'var(--t2)'
}

export default function RiskPage() {
  return (
    <div className="ag-page">

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="ag-ph" style={{ marginBottom: 20 }}>
        <p className="ag-ph-ey">Risk Management</p>
        <h1 className="ag-ph-h">Risk Monitor</h1>
        <p className="ag-ph-s">Real-time exposure, circuit breakers, and position risk — all managed accounts</p>
      </header>

      {/* ── System status strip ───────────────────────────── */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 22 }}>
        {[
          { label: 'AGQuant Engine',   value: systemStatus.agquantEngine,  icon: Zap },
          { label: 'Alpaca API',       value: systemStatus.alpacaApi,      icon: Shield },
          { label: 'Circuit Breakers', value: systemStatus.circuitBreakers, icon: Lock },
          { label: 'Trading Mode',     value: systemStatus.alpacaMode,     icon: AlertTriangle },
        ].map((s) => {
          const color = getStatusColor(s.value)
          return (
            <div
              key={s.label}
              className="ag-kpi"
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px' }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 6,
                background: `${color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <s.icon size={13} color={color} />
              </div>
              <div>
                <div className="ag-kpi-label">{s.label}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color, textTransform: 'capitalize' }}>{s.value}</div>
              </div>
            </div>
          )
        })}
      </section>

      {/* ── Client risk panels ────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {allClients.map((client) => {
          const cfg = RISK_CONFIG[client.id]
          if (!cfg) return null
          const snap        = snapshots.find((s) => s.clientId === client.id)
          const investedPct = client.currentAUM > 0 ? ((client.currentAUM - client.cashBalance) / client.currentAUM) * 100 : 0

          return (
            <div
              key={client.id}
              className="ag-card"
              style={{ borderLeft: `3px solid ${client.color}` }}
            >
              {/* Client header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 12px', borderBottom: '1px solid var(--bdr)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    className="ag-av"
                    style={{ width: 36, height: 36, fontSize: 12, background: `${client.color}1A`, color: client.color, borderRadius: 10 }}
                  >
                    {client.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)', marginBottom: 2 }}>{client.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--t3)', fontVariantNumeric: 'tabular-nums' }}>
                      {client.id} · {client.riskProfile ?? client.tier} · AUM {formatCurrency(client.currentAUM)}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10, color: 'var(--t3)', marginBottom: 2 }}>Cash / Invested</div>
                  <div style={{ fontSize: 11, color: 'var(--t1)', fontVariantNumeric: 'tabular-nums' }}>
                    {formatCurrency(client.cashBalance)} / {formatCurrency(client.currentAUM - client.cashBalance)}
                  </div>
                </div>
              </div>

              {/* Exposure metrics + controls */}
              <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

                {/* Risk bars */}
                <div>
                  <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--t3)', marginBottom: 12 }}>Exposure Metrics</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <RiskBar label="Portfolio volatility"  fill={cfg.volatility}     variant={cfg.volatility > 50 ? 'loss' : cfg.volatility > 25 ? 'warn' : 'gain'}         statusText={cfg.volatilityText} />
                    <RiskBar label="Concentration risk"    fill={cfg.concentration}  variant={cfg.concentration > 50 ? 'loss' : cfg.concentration > 25 ? 'warn' : 'gain'}   statusText={cfg.concentrationText} />
                    <RiskBar label="Strategy risk"         fill={cfg.strategyRisk}   variant={cfg.strategyRisk > 70 ? 'loss' : cfg.strategyRisk > 40 ? 'warn' : 'gain'}     statusText={cfg.strategyRiskText} />
                    <RiskBar label="Max drawdown"          fill={cfg.maxDrawdown}    variant={cfg.drawdownVariant}                                                           statusText={cfg.maxDrawdownText} />
                    <RiskBar label="Invested allocation"   fill={Math.round(investedPct)} variant={investedPct > 90 ? 'warn' : 'gain'}                                      statusText={`${investedPct.toFixed(1)}% deployed`} />
                  </div>
                </div>

                {/* Risk controls */}
                <div>
                  <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--t3)', marginBottom: 12 }}>Risk Controls</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ background: 'var(--bg-elevated)', borderRadius: 6, padding: '10px 12px' }}>
                      <div style={{ fontSize: 9, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>Circuit Breaker</div>
                      <div style={{ fontSize: 11, color: 'var(--gain)', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <CheckCircle size={10} /> {cfg.circuitBreaker}
                      </div>
                    </div>
                    <div style={{ background: 'var(--bg-elevated)', borderRadius: 6, padding: '10px 12px' }}>
                      <div style={{ fontSize: 9, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>Kelly Position Limit</div>
                      <div style={{ fontSize: 11, color: 'var(--t2)' }}>{cfg.kellyLimit}</div>
                    </div>
                    <div style={{ background: 'var(--bg-elevated)', borderRadius: 6, padding: '10px 12px' }}>
                      <div style={{ fontSize: 9, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>Active Stop-Losses</div>
                      {cfg.stopLosses.map((sl) => (
                        <div key={sl.symbol} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--t1)', fontVariantNumeric: 'tabular-nums' }}>{sl.symbol}</span>
                          <span style={{ fontSize: 11, color: 'var(--loss)', fontVariantNumeric: 'tabular-nums' }}>{sl.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Position exposure table */}
              {snap && snap.openPositions.length > 0 && (
                <div style={{ borderTop: '1px solid var(--bdr)' }}>
                  <div style={{ padding: '12px 20px 4px', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--t3)' }}>
                    Position Exposure
                  </div>
                  <table className="ag-table">
                    <thead>
                      <tr>
                        <th>Symbol</th>
                        <th>Allocation</th>
                        <th>Mkt Val</th>
                        <th>Unreal P&amp;L</th>
                        <th>% of AUM</th>
                        <th>Risk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {snap.openPositions.map((pos) => {
                        const pctOfAum  = (pos.marketValue / client.currentAUM) * 100
                        const riskLevel = pctOfAum > 15 ? 'High' : pctOfAum > 8 ? 'Medium' : 'Low'
                        const riskColor = riskLevel === 'High' ? 'var(--loss)' : riskLevel === 'Medium' ? 'var(--warn)' : 'var(--gain)'
                        return (
                          <tr key={pos.symbol}>
                            <td className="ag-td-main">{pos.symbol}</td>
                            <td style={{ width: 140 }}>
                              <div className="ag-bar-track">
                                <div className="ag-bar-fill" style={{ width: `${Math.min(pctOfAum * 4, 100)}%`, background: riskColor }} />
                              </div>
                            </td>
                            <td style={{ fontVariantNumeric: 'tabular-nums' }}>{formatCurrency(pos.marketValue)}</td>
                            <td style={{ color: pos.unrealizedPnl >= 0 ? 'var(--gain)' : 'var(--loss)', fontVariantNumeric: 'tabular-nums' }}>
                              {pos.unrealizedPnl >= 0 ? '+' : ''}{formatCurrency(pos.unrealizedPnl)}
                            </td>
                            <td style={{ fontVariantNumeric: 'tabular-nums' }}>{pctOfAum.toFixed(1)}%</td>
                            <td>
                              <span
                                className="ag-pill"
                                style={{ background: `${riskColor}18`, color: riskColor, fontSize: 9 }}
                              >
                                {riskLevel}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
