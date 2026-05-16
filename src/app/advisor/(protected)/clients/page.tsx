import Link from 'next/link'
import {
  ArrowUpRight, UserPlus, ChevronRight,
  TrendingUp, DollarSign, Users, Activity,
  Phone, Mail,
} from 'lucide-react'
import { allClients, totalAum, totalOutstandingFees } from '@/lib/advisorMetrics'
import { formatCurrency, formatPercent } from '@/lib/formatters'
import { allTimeReturn, allTimeReturnPct } from '@/lib/calculations/returns'

const RISK_COLORS: Record<string, string> = {
  Conservative: '#30D158',
  Moderate:     '#378ADD',
  Balanced:     '#7F77DD',
  Growth:       '#6B6B6B',
  Aggressive:   '#FF453A',
}

export default function ClientsPage() {
  const totalReturn    = allClients.reduce((sum, c) => sum + allTimeReturn(c.currentAUM, c.initialDeposit), 0)
  const totalPositions = allClients.reduce((sum, c) => sum + c.openPositions, 0)
  const activeCount    = allClients.filter((c) => c.status === 'active').length

  return (
    <div className="ag-page">

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="ag-ph" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <p className="ag-ph-ey">Wealth Management</p>
          <h1 className="ag-ph-h">Client Roster</h1>
          <p className="ag-ph-s">{allClients.length} managed accounts · {formatCurrency(totalAum)} combined AUM</p>
        </div>
        <Link
          href="/advisor/clients/onboard"
          className="ag-btn ag-btn-ghost"
          style={{ textDecoration: 'none', flexShrink: 0 }}
        >
          <UserPlus size={12} />
          Onboard Client
        </Link>
      </header>

      {/* ── Summary KPI row ───────────────────────────────── */}
      <section className="ag-kpi-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        <div className="ag-kpi" style={{
          background: 'linear-gradient(135deg, rgba(107,107,107,0.12) 0%, rgba(107,107,107,0.04) 100%)',
          borderColor: 'var(--bdr-gold)',
        }}>
          <div className="ag-kpi-label" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <DollarSign size={10} color="var(--gold)" />Combined AUM
          </div>
          <div className="ag-kpi-value" style={{ color: 'var(--gold)', fontSize: 22 }}>{formatCurrency(totalAum)}</div>
          <div className="ag-kpi-sub" style={{ color: 'var(--gain)', display: 'flex', alignItems: 'center', gap: 3 }}>
            <ArrowUpRight size={10} />+{formatCurrency(totalReturn)} all-time
          </div>
        </div>
        <div className="ag-kpi">
          <div className="ag-kpi-label" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <TrendingUp size={10} color="var(--gain)" />Total Return
          </div>
          <div className="ag-kpi-value" style={{ color: 'var(--gain)' }}>+{formatCurrency(totalReturn)}</div>
          <div className="ag-kpi-sub">realized + dividends</div>
        </div>
        <div className="ag-kpi">
          <div className="ag-kpi-label" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Activity size={10} color="var(--info)" />Open Positions
          </div>
          <div className="ag-kpi-value">{totalPositions}</div>
          <div className="ag-kpi-sub">across {activeCount} accounts</div>
        </div>
        <div className="ag-kpi" style={totalOutstandingFees > 0 ? {
          background: 'rgba(220,38,38,0.06)',
          borderColor: 'rgba(220,38,38,0.22)',
        } : {}}>
          <div className="ag-kpi-label" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Users size={10} color="var(--t3)" />Fees Outstanding
          </div>
          <div className="ag-kpi-value" style={{ color: totalOutstandingFees > 0 ? 'var(--loss)' : 'var(--gain)' }}>
            {formatCurrency(totalOutstandingFees)}
          </div>
          <div className="ag-kpi-sub">{totalOutstandingFees > 0 ? 'pending collection' : 'all cleared'}</div>
        </div>
      </section>

      {/* ── Client cards grid ─────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 14 }}>
        {allClients.map((client) => {
          const gain       = allTimeReturn(client.currentAUM, client.initialDeposit)
          const roi        = allTimeReturnPct(client.currentAUM, client.initialDeposit)
          const riskColor  = RISK_COLORS[client.riskProfile ?? ''] ?? 'var(--t3)'
          const cashPct    = (client.cashBalance / client.currentAUM) * 100
          const equityPct  = 100 - cashPct

          return (
            <div
              key={client.id}
              className="ag-card"
              style={{ borderTop: `2px solid ${client.color}` }}
            >
              {/* Card header: avatar + name + badges */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '14px 16px 12px', borderBottom: '1px solid var(--bdr)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    className="ag-av"
                    style={{ background: `${client.color}22`, color: client.color, width: 38, height: 38, fontSize: 13 }}
                  >
                    {client.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--t1)', marginBottom: 3 }}>{client.name}</div>
                    <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                      <span style={{ fontSize: 9, color: 'var(--t3)', fontVariantNumeric: 'tabular-nums' }}>{client.id}</span>
                      <span className="ag-pill ag-pill-gray" style={{ fontSize: 8 }}>{client.tier}</span>
                      <span className="ag-pill" style={{
                        fontSize: 8,
                        background: `${riskColor}18`,
                        color: riskColor,
                      }}>
                        {client.riskProfile ?? 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--t1)', fontVariantNumeric: 'tabular-nums' }}>
                    {formatCurrency(client.currentAUM)}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--gain)', display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end', marginTop: 2 }}>
                    <ArrowUpRight size={10} />
                    +{formatPercent(roi)} · +{formatCurrency(gain)}
                  </div>
                </div>
              </div>

              {/* Contact row */}
              {(client.email || client.phone) && (
                <div style={{ display: 'flex', gap: 16, padding: '8px 16px', borderBottom: '1px solid var(--bdr)', fontSize: 11, color: 'var(--t3)' }}>
                  {client.email && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Mail size={10} />{client.email}
                    </span>
                  )}
                  {client.phone && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Phone size={10} />{client.phone}
                    </span>
                  )}
                </div>
              )}

              {/* Metrics grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, borderBottom: '1px solid var(--bdr)' }}>
                {[
                  { label: 'Positions', value: client.openPositions },
                  { label: 'Cash',      value: formatCurrency(client.cashBalance) },
                  { label: 'Fee Rate',  value: `${client.feeRate}%` },
                  { label: 'Billing',   value: client.billingCycle },
                  { label: 'Objective', value: client.investmentObjective?.split(' ').slice(-1)[0] ?? '—' },
                ].map((m, i) => (
                  <div
                    key={m.label}
                    style={{
                      padding: '10px 12px',
                      borderRight: i < 4 ? '1px solid var(--bdr)' : 'none',
                    }}
                  >
                    <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--t3)', marginBottom: 3 }}>
                      {m.label}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--t1)', fontVariantNumeric: 'tabular-nums' }}>
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Allocation bar */}
              <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--bdr)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 10, color: 'var(--t3)' }}>
                    Equity <span style={{ color: 'var(--t2)', fontWeight: 600 }}>{equityPct.toFixed(0)}%</span>
                  </span>
                  <span style={{ fontSize: 10, color: 'var(--t3)' }}>
                    Cash <span style={{ color: 'var(--t2)', fontWeight: 600 }}>{cashPct.toFixed(0)}%</span>
                  </span>
                </div>
                <div className="ag-bar-track">
                  <div className="ag-bar-fill" style={{ width: `${equityPct}%`, background: client.color }} />
                </div>
              </div>

              {/* Footer: fee status + next review + CTA */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px' }}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span className={`ag-pill ${client.feeStatus === 'paid' ? 'ag-pill-gain' : client.feeStatus === 'partial' ? 'ag-pill-warn' : 'ag-pill-loss'}`} style={{ fontSize: 9 }}>
                    Fee {client.feeStatus}
                  </span>
                  {client.nextReview && (
                    <span style={{ fontSize: 10, color: 'var(--t3)' }}>Review {client.nextReview}</span>
                  )}
                </div>
                <Link
                  href={`/advisor/clients/${client.id}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}
                >
                  360° View <ChevronRight size={11} />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
