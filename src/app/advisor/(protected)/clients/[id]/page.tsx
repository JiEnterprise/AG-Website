import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowUpRight, ArrowDownRight, Mail, Phone, Shield,
  TrendingUp, DollarSign, Target, FileText, ChevronRight,
  Activity, Clock,
} from 'lucide-react'
import PageHeader from '@/components/advisor/PageHeader'
import EquityChart from '@/components/advisor/EquityChart'
import TradeRow from '@/components/advisor/TradeRow'
import { getClientById, getTradesByClient, getStatementsByClient, snapshots } from '@/lib/advisorMetrics'
import { formatCurrency, formatPercent } from '@/lib/formatters'
import { allTimeReturn, allTimeReturnPct } from '@/lib/calculations/returns'

const RISK_COLORS: Record<string, string> = {
  Conservative: '#30D158',
  Moderate:     '#378ADD',
  Balanced:     '#7F77DD',
  Growth:       '#C9A84C',
  Aggressive:   '#FF453A',
}

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = getClientById(params.id)
  if (!client) notFound()

  const trades     = getTradesByClient(client.id)
  const statements = getStatementsByClient(client.id)
  const snap       = snapshots.find((s) => s.clientId === client.id)
  const totalReturn = allTimeReturn(client.currentAUM, client.initialDeposit)
  const roi         = allTimeReturnPct(client.currentAUM, client.initialDeposit)
  const riskColor   = RISK_COLORS[client.riskProfile ?? ''] ?? 'var(--t3)'

  const investedPct = snap && client.currentAUM > 0
    ? ((client.currentAUM - client.cashBalance) / client.currentAUM) * 100
    : 0
  const cashPct = 100 - investedPct

  return (
    <div>
      <PageHeader
        eyebrow="Client 360°"
        title={`${client.name}`}
        subtitle={`${client.id} · ${client.tier} · onboarded ${new Date(client.onboarded).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
        action={
          <div style={{ display: 'flex', gap: 8 }}>
            <Link
              href={`/advisor/orders?client=${client.id}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5, padding: '7px 13px', borderRadius: 7,
                background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.28)',
                fontFamily: 'var(--font-dm-sans)', fontSize: 11, color: 'var(--gold)', textDecoration: 'none',
              }}
            >
              <Activity size={11} /> Place Order
            </Link>
            <Link
              href={`/advisor/statements?client=${client.id}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5, padding: '7px 13px', borderRadius: 7,
                background: 'var(--bg-elevated)', border: '1px solid var(--bdr)',
                fontFamily: 'var(--font-dm-sans)', fontSize: 11, color: 'var(--t2)', textDecoration: 'none',
              }}
            >
              <FileText size={11} /> Statement
            </Link>
          </div>
        }
      />

      {/* ── Identity strip ──────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px',
        background: 'var(--bg-card)', border: '1px solid var(--bdr)', borderRadius: 12, marginBottom: 16,
        borderLeft: `3px solid ${client.color}`,
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14, flexShrink: 0,
          background: `${client.color}1A`, color: client.color, border: `1px solid ${client.color}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-dm-sans)', fontSize: 17, fontWeight: 700,
        }}>{client.initials}</div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 16, fontWeight: 600, color: 'var(--t1)' }}>{client.name}</span>
            <span style={{
              fontFamily: 'var(--font-dm-sans)', fontSize: 9, fontWeight: 600,
              color: riskColor, background: `${riskColor}18`, border: `1px solid ${riskColor}33`,
              padding: '2px 8px', borderRadius: 20,
            }}>{client.riskProfile}</span>
            <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 9, color: 'var(--t3)', background: 'var(--bg-elevated)', padding: '2px 6px', borderRadius: 4 }}>{client.id}</span>
          </div>
          <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 11, color: 'var(--t2)', marginTop: 2 }}>
            {client.investmentObjective} · {client.strategy}
          </div>
          {client.taxStatus && (
            <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)', marginTop: 1 }}>
              {client.taxStatus} · Fee {(client.feeRate * 100).toFixed(2)}% {client.billingCycle}
            </div>
          )}
        </div>

        {/* Contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-end' }}>
          {client.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-dm-sans)', fontSize: 11, color: 'var(--t2)' }}>
              <Mail size={10} color="var(--t3)" /> {client.email}
            </span>
          )}
          {client.phone && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-dm-sans)', fontSize: 11, color: 'var(--t2)' }}>
              <Phone size={10} color="var(--t3)" /> {client.phone}
            </span>
          )}
          {client.nextReview && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)' }}>
              <Clock size={9} /> Next review: {new Date(client.nextReview).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          )}
        </div>
      </div>

      {/* ── KPI row ─────────────────────────────────────── */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 20 }}>
        {[
          { label: 'Current AUM',    value: formatCurrency(client.currentAUM),      color: 'var(--gold)',   sub: `From ${formatCurrency(client.initialDeposit)}` },
          { label: 'Total Return',   value: `+${formatCurrency(totalReturn)}`,       color: 'var(--gain)',   sub: `+${formatPercent(roi)} ROI` },
          { label: 'Cash Balance',   value: formatCurrency(client.cashBalance),      color: 'var(--t1)',     sub: `${cashPct.toFixed(1)}% of AUM` },
          { label: 'Open Positions', value: String(client.openPositions),            color: client.openPositions > 0 ? 'var(--info)' : 'var(--t3)', sub: 'live holdings' },
          { label: 'Fee Status',     value: client.feeStatus === 'paid' ? 'Paid' : `$${client.feeDue?.toFixed(2) ?? '0.00'}`, color: client.feeStatus === 'paid' ? 'var(--gain)' : 'var(--loss)', sub: client.feeStatus === 'paid' ? 'All current' : `Due ${client.feeDueDate ?? ''}` },
        ].map((m) => (
          <div key={m.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--bdr)', borderRadius: 10, padding: '13px 15px' }}>
            <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--t3)', marginBottom: 5 }}>{m.label}</div>
            <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 17, fontWeight: 600, color: m.color }}>{m.value}</div>
            <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)', marginTop: 3 }}>{m.sub}</div>
          </div>
        ))}
      </section>

      {/* ── Equity chart ────────────────────────────────── */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bdr)', borderRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h2 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--gold)', margin: 0 }}>Equity Curve</h2>
          <div style={{ display: 'flex', gap: 16 }}>
            {snap && (
              <>
                <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)' }}>
                  Realized: <span style={{ color: 'var(--gain)', fontFamily: 'var(--font-jetbrains)' }}>+{formatCurrency(snap.totalRealizedPnl)}</span>
                </span>
                <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)' }}>
                  Dividends: <span style={{ color: 'var(--gain)', fontFamily: 'var(--font-jetbrains)' }}>+{formatCurrency(snap.totalDividends)}</span>
                </span>
              </>
            )}
          </div>
        </div>
        <EquityChart clientId={client.id} />
      </div>

      {/* ── 2-col: Holdings + Goals ──────────────────────── */}
      <section className="g2" style={{ marginBottom: 20 }}>

        {/* Holdings / Positions */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bdr)', borderRadius: 12, padding: '18px 20px' }}>
          <h2 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--gold)', margin: '0 0 14px' }}>Open Positions</h2>
          {snap && snap.openPositions.length > 0 ? (
            <>
              {/* Table header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 80px 80px 80px', gap: 8, paddingBottom: 8, borderBottom: '1px solid var(--bdr)', marginBottom: 4 }}>
                {['Symbol', 'Shares', 'Mkt Val', 'Avg Cost', 'P&L'].map((h) => (
                  <span key={h} style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--t3)' }}>{h}</span>
                ))}
              </div>
              {snap.openPositions.map((pos) => (
                <div key={pos.symbol} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 80px 80px 80px', gap: 8, alignItems: 'center', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 12, fontWeight: 600, color: 'var(--t1)' }}>{pos.symbol}</span>
                  <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: 'var(--t2)' }}>{pos.shares.toLocaleString()}</span>
                  <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: 'var(--t1)' }}>{formatCurrency(pos.marketValue)}</span>
                  <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: 'var(--t2)' }}>{formatCurrency(pos.avgCost)}</span>
                  <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: pos.unrealizedPnl >= 0 ? 'var(--gain)' : 'var(--loss)', display: 'flex', alignItems: 'center', gap: 2 }}>
                    {pos.unrealizedPnl >= 0 ? <ArrowUpRight size={9} /> : <ArrowDownRight size={9} />}
                    {formatCurrency(Math.abs(pos.unrealizedPnl))}
                  </span>
                </div>
              ))}
              {/* Portfolio totals */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 80px 80px 80px', gap: 8, alignItems: 'center', paddingTop: 10, borderTop: '1px solid var(--bdr)', marginTop: 4 }}>
                <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)' }}>Total invested</span>
                <span />
                <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 12, color: 'var(--gold)', fontWeight: 600 }}>
                  {formatCurrency(snap.openPositions.reduce((s, p) => s + p.marketValue, 0))}
                </span>
                <span />
                <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 12, color: 'var(--gain)', fontWeight: 600 }}>
                  +{formatCurrency(snap.openPositions.reduce((s, p) => s + p.unrealizedPnl, 0))}
                </span>
              </div>
            </>
          ) : (
            <div style={{ padding: '20px 0', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 12, color: 'var(--t3)', marginBottom: 6 }}>No open positions</div>
              <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)' }}>
                Cash balance: <span style={{ color: 'var(--t1)', fontFamily: 'var(--font-jetbrains)' }}>{formatCurrency(client.cashBalance)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Goals */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bdr)', borderRadius: 12, padding: '18px 20px' }}>
          <h2 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--gold)', margin: '0 0 14px' }}>Investment Goals</h2>
          {client.goals && client.goals.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {client.goals.map((goal) => {
                const statusColor = goal.status === 'achieved' ? 'var(--gain)' : goal.status === 'behind' ? 'var(--loss)' : 'var(--gold)'
                return (
                  <div key={goal.id} style={{ background: 'var(--bg-elevated)', borderRadius: 10, padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 12, fontWeight: 500, color: 'var(--t1)', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Target size={11} color="var(--gold)" />
                          {goal.label}
                        </div>
                        <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)', marginTop: 3 }}>
                          Target: {new Date(goal.targetDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </div>
                      </div>
                      <span style={{
                        fontFamily: 'var(--font-dm-sans)', fontSize: 9, fontWeight: 600,
                        color: statusColor, background: `${statusColor}18`, border: `1px solid ${statusColor}33`,
                        padding: '2px 8px', borderRadius: 20, textTransform: 'capitalize',
                      }}>
                        {goal.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 10, color: 'var(--t2)' }}>{formatCurrency(goal.currentAmount)}</span>
                        <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 10, color: 'var(--t3)' }}>{formatCurrency(goal.targetAmount)}</span>
                      </div>
                      <div style={{ height: 4, borderRadius: 99, background: 'var(--bg-root)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${Math.min(goal.progress, 100)}%`, background: statusColor, borderRadius: 99, transition: 'width 0.6s ease' }} />
                      </div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: statusColor, fontWeight: 600 }}>
                      {goal.progress}% complete
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div style={{ padding: '20px 0', textAlign: 'center', fontFamily: 'var(--font-dm-sans)', fontSize: 12, color: 'var(--t3)' }}>
              No goals defined
            </div>
          )}
        </div>
      </section>

      {/* ── Account details ──────────────────────────────── */}
      <section className="g2" style={{ marginBottom: 20 }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bdr)', borderRadius: 12, padding: '18px 20px' }}>
          <h2 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--gold)', margin: '0 0 12px' }}>Account Profile</h2>
          {[
            ['Client ID',            client.id],
            ['Tier',                 client.tier],
            ['Risk Profile',         client.riskProfile ?? '—'],
            ['Objective',            client.investmentObjective ?? '—'],
            ['Strategy',             client.strategy ?? '—'],
            ['Tax Status',           client.taxStatus ?? '—'],
            ['Fee Rate',             `${(client.feeRate * 100).toFixed(2)}% ${client.billingCycle}`],
            ['Fee Status',           client.feeStatus],
            ['Onboarded',            new Date(client.onboarded).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })],
            ['Next Review',          client.nextReview ? new Date(client.nextReview).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—'],
          ].map(([label, value]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
              <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 11, color: 'var(--t3)' }}>{label}</span>
              <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 11, color: 'var(--t1)', fontWeight: 500 }}>{value}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bdr)', borderRadius: 12, padding: '18px 20px' }}>
          <h2 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--gold)', margin: '0 0 12px' }}>Monthly Performance</h2>
          {snap && snap.monthlyReturns.length > 0 ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr 80px 60px', gap: 8, paddingBottom: 8, borderBottom: '1px solid var(--bdr)' }}>
                {['Period', 'Net Return', 'Closing AUM', 'Divid.'].map((h) => (
                  <span key={h} style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--t3)' }}>{h}</span>
                ))}
              </div>
              {[...snap.monthlyReturns].reverse().slice(0, 8).map((m) => (
                <div key={m.month} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 80px 60px', gap: 8, alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 10, color: 'var(--t2)' }}>{m.month}</span>
                  <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: m.netReturn >= 0 ? 'var(--gain)' : 'var(--loss)', display: 'flex', alignItems: 'center', gap: 3 }}>
                    {m.netReturn >= 0 ? <ArrowUpRight size={9} /> : <ArrowDownRight size={9} />}
                    {formatCurrency(Math.abs(m.netReturn))}
                  </span>
                  <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: 'var(--t1)' }}>{formatCurrency(m.closingAum)}</span>
                  <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: m.dividends > 0 ? 'var(--gain)' : 'var(--t3)' }}>{m.dividends > 0 ? `+${formatCurrency(m.dividends)}` : '—'}</span>
                </div>
              ))}
            </>
          ) : (
            <div style={{ padding: '16px 0', fontFamily: 'var(--font-dm-sans)', fontSize: 12, color: 'var(--t3)' }}>No monthly data</div>
          )}
        </div>
      </section>

      {/* ── Trade History ────────────────────────────────── */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bdr)', borderRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h2 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--gold)', margin: 0 }}>Trade History</h2>
          <Link href="/advisor/trades" style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)', textDecoration: 'none' }}>
            Full log <ChevronRight size={10} />
          </Link>
        </div>
        {trades.length === 0 ? (
          <div style={{ padding: '16px 0', fontFamily: 'var(--font-dm-sans)', fontSize: 12, color: 'var(--t3)' }}>No trades recorded</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: 620, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'left' }}>
                  {['Symbol', 'Type', 'Shares', 'Price', 'Amount', 'P&L', 'Date', 'Venue'].map((h) => (
                    <th key={h} style={{ padding: '0 12px 10px', fontFamily: 'var(--font-dm-sans)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--t3)', fontWeight: 400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {trades.slice(0, 15).map((trade) => (
                  <TradeRow key={trade.id} trade={trade} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Statements ───────────────────────────────────── */}
      {statements.length > 0 && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bdr)', borderRadius: 12, padding: '18px 20px' }}>
          <h2 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--gold)', margin: '0 0 14px' }}>Statements</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {statements.map((stmt) => (
              <div key={stmt.id} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 100px 80px 80px', gap: 12, alignItems: 'center', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 10, color: 'var(--t2)' }}>{stmt.period}</span>
                <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 11, color: 'var(--t1)' }}>{stmt.periodLabel}</span>
                <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: 'var(--gold)' }}>{formatCurrency(stmt.managementFee)}</span>
                <span style={{
                  fontFamily: 'var(--font-dm-sans)', fontSize: 9, fontWeight: 600,
                  color: stmt.status === 'paid' ? 'var(--gain)' : 'var(--loss)',
                  background: stmt.status === 'paid' ? 'rgba(48,209,88,0.08)' : 'rgba(212,75,58,0.08)',
                  border: `1px solid ${stmt.status === 'paid' ? 'rgba(48,209,88,0.2)' : 'rgba(212,75,58,0.2)'}`,
                  padding: '2px 8px', borderRadius: 20, textTransform: 'uppercase',
                }}>
                  {stmt.status}
                </span>
                <Link href="/advisor/statements" style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--gold)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                  View <ChevronRight size={9} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
