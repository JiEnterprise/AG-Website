import Link from 'next/link'
import {
  ArrowUpRight, UserPlus, ChevronRight,
  TrendingUp, DollarSign, Shield, Phone, Mail,
} from 'lucide-react'
import PageHeader from '@/components/advisor/PageHeader'
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
  const totalReturn = allClients.reduce((sum, c) => sum + allTimeReturn(c.currentAUM, c.initialDeposit), 0)
  const totalPositions = allClients.reduce((sum, c) => sum + c.openPositions, 0)

  return (
    <div>
      <PageHeader
        eyebrow="Wealth Management"
        title="Client Roster"
        subtitle={`${allClients.length} managed accounts · ${formatCurrency(totalAum)} combined AUM`}
        action={
          <Link
            href="/advisor/clients/onboard"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '7px 14px', borderRadius: 8,
              background: 'rgba(107,107,107,0.12)', border: '1px solid rgba(107,107,107,0.28)',
              fontFamily: 'var(--font-dm-sans)', fontSize: 11, color: 'var(--gold)',
              textDecoration: 'none', fontWeight: 500,
            }}
          >
            <UserPlus size={12} /> Onboard Client
          </Link>
        }
      />

      {/* Summary metrics */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Combined AUM',      value: formatCurrency(totalAum),          color: 'var(--gold)',  icon: DollarSign,  sub: `${allClients.length} active accounts` },
          { label: 'Total Return',      value: `+${formatCurrency(totalReturn)}`,  color: 'var(--gain)',  icon: TrendingUp,  sub: 'all-time realized' },
          { label: 'Open Positions',    value: String(totalPositions),             color: 'var(--info)',  icon: ArrowUpRight, sub: 'across all accounts' },
          { label: 'Fees Outstanding',  value: formatCurrency(totalOutstandingFees), color: totalOutstandingFees > 0 ? 'var(--loss)' : 'var(--gain)', icon: Shield, sub: totalOutstandingFees > 0 ? 'collection required' : 'all current' },
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

      {/* Client cards */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {allClients.map((client) => {
          const gain   = allTimeReturn(client.currentAUM, client.initialDeposit)
          const roi    = allTimeReturnPct(client.currentAUM, client.initialDeposit)
          const riskColor = RISK_COLORS[client.riskProfile ?? ''] ?? 'var(--t3)'

          // AUM allocation bar within total
          const allocPct = totalAum > 0 ? (client.currentAUM / totalAum) * 100 : 0

          return (
            <div key={client.id} style={{
              background: 'var(--bg-card)', border: '1px solid var(--bdr)', borderRadius: 12, overflow: 'hidden',
            }}>
              {/* Gold accent bar = client color */}
              <div style={{ height: 2, background: `linear-gradient(90deg, ${client.color} 0%, transparent 100%)` }} />

              <div style={{ padding: '18px 20px' }}>
                {/* Top row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {/* Avatar */}
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: `${client.color}1A`, color: client.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-dm-sans)', fontSize: 14, fontWeight: 700,
                      border: `1px solid ${client.color}33`,
                    }}>
                      {client.initials}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 15, fontWeight: 600, color: 'var(--t1)' }}>{client.name}</span>
                        <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 9, color: 'var(--t3)', background: 'var(--bg-elevated)', padding: '2px 6px', borderRadius: 4 }}>{client.id}</span>
                        {/* Risk badge */}
                        <span style={{
                          fontFamily: 'var(--font-dm-sans)', fontSize: 9, fontWeight: 600,
                          color: riskColor, background: `${riskColor}18`,
                          border: `1px solid ${riskColor}33`, padding: '2px 8px', borderRadius: 20,
                        }}>{client.riskProfile}</span>
                      </div>
                      <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 11, color: 'var(--t2)', marginTop: 3 }}>
                        {client.investmentObjective} · {client.strategy}
                      </div>
                      {(client.email || client.phone) && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
                          {client.email && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)' }}>
                              <Mail size={9} /> {client.email}
                            </span>
                          )}
                          {client.phone && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)' }}>
                              <Phone size={9} /> {client.phone}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* View button */}
                  <Link
                    href={`/advisor/clients/${client.id}`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '7px 12px', borderRadius: 7,
                      border: '1px solid var(--bdr)', background: 'var(--bg-elevated)',
                      fontFamily: 'var(--font-dm-sans)', fontSize: 11, color: 'var(--t2)',
                      textDecoration: 'none',
                    }}
                  >
                    Open 360° <ChevronRight size={11} />
                  </Link>
                </div>

                {/* Metrics row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 16 }}>
                  {[
                    { label: 'Current AUM',    value: formatCurrency(client.currentAUM),      color: 'var(--t1)' },
                    { label: 'Initial Deposit', value: formatCurrency(client.initialDeposit),  color: 'var(--t2)' },
                    { label: 'Total Return',   value: `+${formatCurrency(gain)}`,              color: 'var(--gain)' },
                    { label: 'ROI',            value: `+${formatPercent(roi)}`,                color: 'var(--gain)' },
                    { label: 'Open Positions', value: String(client.openPositions),            color: client.openPositions > 0 ? 'var(--info)' : 'var(--t3)' },
                  ].map((m) => (
                    <div key={m.label} style={{ background: 'var(--bg-elevated)', borderRadius: 8, padding: '10px 12px' }}>
                      <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--t3)', marginBottom: 4 }}>{m.label}</div>
                      <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 13, fontWeight: 600, color: m.color }}>{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Bottom row: allocation bar + fee status + next review */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {/* Allocation */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 9, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Portfolio Share</span>
                      <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 9, color: client.color }}>{allocPct.toFixed(1)}%</span>
                    </div>
                    <div style={{ height: 3, borderRadius: 99, background: 'var(--bg-elevated)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${allocPct}%`, background: client.color, borderRadius: 99 }} />
                    </div>
                  </div>

                  {/* Fee status */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 6, background: client.feeStatus === 'paid' ? 'rgba(48,209,88,0.08)' : 'rgba(212,75,58,0.08)', border: `1px solid ${client.feeStatus === 'paid' ? 'rgba(48,209,88,0.2)' : 'rgba(212,75,58,0.2)'}` }}>
                    <span style={{ width: 5, height: 5, borderRadius: 99, background: client.feeStatus === 'paid' ? 'var(--gain)' : 'var(--loss)', display: 'block' }} />
                    <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: client.feeStatus === 'paid' ? 'var(--gain)' : 'var(--loss)' }}>
                      {client.feeStatus === 'paid' ? 'Fees current' : `Fee due ${client.feeDueDate ? new Date(client.feeDueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}`}
                    </span>
                  </div>

                  {/* Next review */}
                  {client.nextReview && (
                    <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Shield size={9} />
                      Review: {new Date(client.nextReview).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  )}

                  {/* Onboard date */}
                  <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)' }}>
                    Client since {new Date(client.onboarded).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}
