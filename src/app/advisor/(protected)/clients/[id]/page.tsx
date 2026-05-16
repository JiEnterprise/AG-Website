import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowUpRight, ArrowDownRight, Mail, Phone,
  TrendingUp, DollarSign, Target, FileText, ChevronRight,
  Activity, Clock, ChevronLeft,
} from 'lucide-react'
import EquityChart from '@/components/advisor/EquityChart'
import TradeRow from '@/components/advisor/TradeRow'
import { getClientById, getTradesByClient, getStatementsByClient, snapshots } from '@/lib/advisorMetrics'
import { formatCurrency, formatPercent } from '@/lib/formatters'
import { allTimeReturn, allTimeReturnPct } from '@/lib/calculations/returns'

const RISK_COLORS: Record<string, string> = {
  Conservative: '#30D158',
  Moderate:     '#378ADD',
  Balanced:     '#7F77DD',
  Growth:       '#6B6B6B',
  Aggressive:   '#FF453A',
}

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = getClientById(params.id)
  if (!client) notFound()

  const trades      = getTradesByClient(client.id)
  const statements  = getStatementsByClient(client.id)
  const snap        = snapshots.find((s) => s.clientId === client.id)
  const totalReturn = allTimeReturn(client.currentAUM, client.initialDeposit)
  const roi         = allTimeReturnPct(client.currentAUM, client.initialDeposit)
  const riskColor   = RISK_COLORS[client.riskProfile ?? ''] ?? 'var(--t3)'

  const investedPct = snap && client.currentAUM > 0
    ? ((client.currentAUM - client.cashBalance) / client.currentAUM) * 100
    : 0
  const cashPct = 100 - investedPct

  const totalUnrealizedPnl = snap?.openPositions.reduce((s, p) => s + p.unrealizedPnl, 0) ?? 0
  const totalMarketValue   = snap?.openPositions.reduce((s, p) => s + p.marketValue, 0) ?? 0

  return (
    <div className="ag-page">

      {/* ── Breadcrumb + actions ─────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <Link
          href="/advisor/clients"
          style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--t3)', textDecoration: 'none' }}
        >
          <ChevronLeft size={12} /> Client Roster
        </Link>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link href={`/advisor/orders?client=${client.id}`} className="ag-btn ag-btn-primary" style={{ textDecoration: 'none', fontSize: 11 }}>
            <Activity size={11} /> Place Order
          </Link>
          <Link href={`/advisor/statements?client=${client.id}`} className="ag-btn ag-btn-ghost" style={{ textDecoration: 'none', fontSize: 11 }}>
            <FileText size={11} /> Statement
          </Link>
        </div>
      </div>

      {/* ── Identity strip ───────────────────────────────────── */}
      <div className="ag-card" style={{ borderLeft: `3px solid ${client.color}`, marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px' }}>
          <div
            className="ag-av"
            style={{ width: 52, height: 52, fontSize: 17, background: `${client.color}1A`, color: client.color, border: `1px solid ${client.color}33`, borderRadius: 14 }}
          >
            {client.initials}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--t1)' }}>{client.name}</span>
              <span className="ag-pill" style={{ background: `${riskColor}18`, color: riskColor, fontSize: 9 }}>
                {client.riskProfile}
              </span>
              <span className="ag-pill ag-pill-gray" style={{ fontSize: 9 }}>{client.id}</span>
              <span className="ag-pill ag-pill-gray" style={{ fontSize: 9 }}>{client.tier}</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--t2)' }}>
              {client.investmentObjective} · {client.strategy}
            </div>
            {client.taxStatus && (
              <div style={{ fontSize: 10, color: 'var(--t3)', marginTop: 2 }}>
                {client.taxStatus} · Fee {(client.feeRate * 100).toFixed(2)}% {client.billingCycle}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-end' }}>
            {client.email && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--t2)' }}>
                <Mail size={10} color="var(--t3)" /> {client.email}
              </span>
            )}
            {client.phone && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--t2)' }}>
                <Phone size={10} color="var(--t3)" /> {client.phone}
              </span>
            )}
            {client.nextReview && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: 'var(--t3)' }}>
                <Clock size={9} /> Next review: {new Date(client.nextReview).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── KPI row ──────────────────────────────────────────── */}
      <section className="ag-kpi-row" style={{ marginBottom: 18 }}>
        <div className="ag-kpi" style={{
          background: 'linear-gradient(135deg, rgba(107,107,107,0.12) 0%, rgba(107,107,107,0.04) 100%)',
          borderColor: 'var(--bdr-gold)',
        }}>
          <div className="ag-kpi-label" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <DollarSign size={10} color="var(--gold)" />Current AUM
          </div>
          <div className="ag-kpi-value" style={{ color: 'var(--gold)', fontSize: 20 }}>{formatCurrency(client.currentAUM)}</div>
          <div className="ag-kpi-sub">From {formatCurrency(client.initialDeposit)}</div>
        </div>
        <div className="ag-kpi">
          <div className="ag-kpi-label" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <TrendingUp size={10} color="var(--gain)" />Total Return
          </div>
          <div className="ag-kpi-value" style={{ color: 'var(--gain)', fontSize: 20 }}>+{formatCurrency(totalReturn)}</div>
          <div className="ag-kpi-sub">+{formatPercent(roi)} ROI</div>
        </div>
        <div className="ag-kpi">
          <div className="ag-kpi-label">Cash Balance</div>
          <div className="ag-kpi-value" style={{ fontSize: 20 }}>{formatCurrency(client.cashBalance)}</div>
          <div className="ag-kpi-sub">{cashPct.toFixed(1)}% of AUM</div>
        </div>
        <div className="ag-kpi">
          <div className="ag-kpi-label">Open Positions</div>
          <div className="ag-kpi-value" style={{ color: client.openPositions > 0 ? 'var(--info)' : 'var(--t3)', fontSize: 20 }}>
            {client.openPositions}
          </div>
          <div className="ag-kpi-sub">live holdings</div>
        </div>
        <div className="ag-kpi" style={client.feeStatus !== 'paid' ? {
          background: 'rgba(220,38,38,0.06)', borderColor: 'rgba(220,38,38,0.22)',
        } : {}}>
          <div className="ag-kpi-label">Fee Status</div>
          <div className="ag-kpi-value" style={{ color: client.feeStatus === 'paid' ? 'var(--gain)' : 'var(--loss)', fontSize: 20 }}>
            {client.feeStatus === 'paid' ? 'Paid' : formatCurrency(client.feeDue ?? 0)}
          </div>
          <div className="ag-kpi-sub">{client.feeStatus === 'paid' ? 'All current' : `Due ${client.feeDueDate ?? ''}`}</div>
        </div>
      </section>

      {/* ── Equity chart ─────────────────────────────────────── */}
      <div className="ag-card" style={{ marginBottom: 18 }}>
        <div className="ag-card-head">
          <span className="ag-card-title">Equity Curve</span>
          {snap && (
            <div style={{ display: 'flex', gap: 20, fontSize: 10, color: 'var(--t3)' }}>
              <span>Realized: <span style={{ color: 'var(--gain)', fontVariantNumeric: 'tabular-nums' }}>+{formatCurrency(snap.totalRealizedPnl)}</span></span>
              <span>Dividends: <span style={{ color: 'var(--gain)', fontVariantNumeric: 'tabular-nums' }}>+{formatCurrency(snap.totalDividends)}</span></span>
            </div>
          )}
        </div>
        <div className="ag-card-body" style={{ padding: '20px' }}>
          <EquityChart clientId={client.id} />
        </div>
      </div>

      {/* ── Holdings + Goals ──────────────────────────────────── */}
      <div className="ag-g2" style={{ marginBottom: 18 }}>

        {/* Open Positions */}
        <div className="ag-card">
          <div className="ag-card-head">
            <span className="ag-card-title">Open Positions</span>
            {snap && (
              <span style={{ fontSize: 10, color: 'var(--t2)' }}>
                Unrealized: <span style={{ color: totalUnrealizedPnl >= 0 ? 'var(--gain)' : 'var(--loss)', fontWeight: 600 }}>
                  {totalUnrealizedPnl >= 0 ? '+' : ''}{formatCurrency(totalUnrealizedPnl)}
                </span>
              </span>
            )}
          </div>
          {snap && snap.openPositions.length > 0 ? (
            <table className="ag-table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Shares</th>
                  <th>Mkt Val</th>
                  <th>Avg Cost</th>
                  <th>P&amp;L</th>
                </tr>
              </thead>
              <tbody>
                {snap.openPositions.map((pos) => (
                  <tr key={pos.symbol}>
                    <td className="ag-td-main">{pos.symbol}</td>
                    <td>{pos.shares.toLocaleString()}</td>
                    <td className="ag-td-main">{formatCurrency(pos.marketValue)}</td>
                    <td>{formatCurrency(pos.avgCost)}</td>
                    <td style={{ color: pos.unrealizedPnl >= 0 ? 'var(--gain)' : 'var(--loss)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        {pos.unrealizedPnl >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                        {formatCurrency(Math.abs(pos.unrealizedPnl))}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ background: 'var(--bg-elevated)' }}>
                  <td style={{ padding: '9px 12px', color: 'var(--t3)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }} colSpan={2}>
                    Total invested
                  </td>
                  <td style={{ padding: '9px 12px', color: 'var(--gold)', fontWeight: 700 }}>
                    {formatCurrency(totalMarketValue)}
                  </td>
                  <td style={{ padding: '9px 12px' }}></td>
                  <td style={{ padding: '9px 12px', color: totalUnrealizedPnl >= 0 ? 'var(--gain)' : 'var(--loss)', fontWeight: 700 }}>
                    {totalUnrealizedPnl >= 0 ? '+' : ''}{formatCurrency(totalUnrealizedPnl)}
                  </td>
                </tr>
              </tfoot>
            </table>
          ) : (
            <div className="ag-empty">
              <span className="ag-empty-label">No open positions</span>
              <span className="ag-empty-sub">Cash: {formatCurrency(client.cashBalance)}</span>
            </div>
          )}
        </div>

        {/* Investment Goals */}
        <div className="ag-card">
          <div className="ag-card-head">
            <span className="ag-card-title">Investment Goals</span>
          </div>
          {client.goals && client.goals.length > 0 ? (
            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {client.goals.map((goal) => {
                const statusColor =
                  goal.status === 'achieved' ? 'var(--gain)'
                  : goal.status === 'behind' ? 'var(--loss)'
                  : 'var(--gold)'
                return (
                  <div key={goal.id} style={{ background: 'var(--bg-elevated)', borderRadius: 8, padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'var(--t1)', marginBottom: 3 }}>
                          <Target size={11} color="var(--gold)" />{goal.label}
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--t3)' }}>
                          Target: {new Date(goal.targetDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </div>
                      </div>
                      <span className="ag-pill" style={{ background: `${statusColor}18`, color: statusColor, fontSize: 9, textTransform: 'capitalize' }}>
                        {goal.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 10 }}>
                      <span style={{ color: 'var(--t2)', fontVariantNumeric: 'tabular-nums' }}>{formatCurrency(goal.currentAmount)}</span>
                      <span style={{ color: 'var(--t3)', fontVariantNumeric: 'tabular-nums' }}>{formatCurrency(goal.targetAmount)}</span>
                    </div>
                    <div className="ag-bar-track">
                      <div
                        className="ag-bar-fill"
                        style={{ width: `${Math.min(goal.progress, 100)}%`, background: statusColor }}
                      />
                    </div>
                    <div style={{ fontSize: 11, color: statusColor, fontWeight: 700, marginTop: 5 }}>
                      {goal.progress}% complete
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="ag-empty"><span className="ag-empty-label">No goals defined</span></div>
          )}
        </div>
      </div>

      {/* ── Account profile + Monthly returns ────────────────── */}
      <div className="ag-g2" style={{ marginBottom: 18 }}>

        {/* Account Profile */}
        <div className="ag-card">
          <div className="ag-card-head">
            <span className="ag-card-title">Account Profile</span>
          </div>
          <div style={{ padding: '4px 0' }}>
            {([
              ['Client ID',    client.id],
              ['Tier',         client.tier],
              ['Risk Profile', client.riskProfile ?? '—'],
              ['Objective',    client.investmentObjective ?? '—'],
              ['Strategy',     client.strategy ?? '—'],
              ['Tax Status',   client.taxStatus ?? '—'],
              ['Fee Rate',     `${(client.feeRate * 100).toFixed(2)}% ${client.billingCycle}`],
              ['Fee Status',   client.feeStatus],
              ['Onboarded',    new Date(client.onboarded).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })],
              ['Next Review',  client.nextReview ? new Date(client.nextReview).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—'],
            ] as [string, string][]).map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', borderBottom: '1px solid var(--bdr)' }}>
                <span style={{ fontSize: 11, color: 'var(--t3)' }}>{label}</span>
                <span style={{ fontSize: 11, color: 'var(--t1)', fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Performance */}
        <div className="ag-card">
          <div className="ag-card-head">
            <span className="ag-card-title">Monthly Performance</span>
          </div>
          {snap && snap.monthlyReturns.length > 0 ? (
            <table className="ag-table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Net Return</th>
                  <th>Closing AUM</th>
                  <th>Dividends</th>
                </tr>
              </thead>
              <tbody>
                {[...snap.monthlyReturns].reverse().slice(0, 8).map((m) => (
                  <tr key={m.month}>
                    <td style={{ fontVariantNumeric: 'tabular-nums' }}>{m.month}</td>
                    <td style={{ color: m.netReturn >= 0 ? 'var(--gain)' : 'var(--loss)', fontVariantNumeric: 'tabular-nums' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        {m.netReturn >= 0 ? <ArrowUpRight size={9} /> : <ArrowDownRight size={9} />}
                        {formatCurrency(Math.abs(m.netReturn))}
                      </span>
                    </td>
                    <td className="ag-td-main" style={{ fontVariantNumeric: 'tabular-nums' }}>{formatCurrency(m.closingAum)}</td>
                    <td style={{ color: m.dividends > 0 ? 'var(--gain)' : 'var(--t3)', fontVariantNumeric: 'tabular-nums' }}>
                      {m.dividends > 0 ? `+${formatCurrency(m.dividends)}` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="ag-empty"><span className="ag-empty-label">No monthly data</span></div>
          )}
        </div>
      </div>

      {/* ── Trade History ─────────────────────────────────────── */}
      <div className="ag-card" style={{ marginBottom: 18 }}>
        <div className="ag-card-head">
          <span className="ag-card-title">Trade History</span>
          <Link href="/advisor/trades" style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: 'var(--t3)', textDecoration: 'none' }}>
            Full log <ChevronRight size={10} />
          </Link>
        </div>
        {trades.length === 0 ? (
          <div className="ag-empty"><span className="ag-empty-label">No trades recorded</span></div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="ag-table" style={{ minWidth: 620 }}>
              <thead>
                <tr>
                  {['Symbol', 'Type', 'Shares', 'Price', 'Amount', 'P&L', 'Date', 'Venue'].map((h) => (
                    <th key={h}>{h}</th>
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

      {/* ── Statements ───────────────────────────────────────── */}
      {statements.length > 0 && (
        <div className="ag-card">
          <div className="ag-card-head">
            <span className="ag-card-title">Statements</span>
          </div>
          <table className="ag-table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Label</th>
                <th>Total Due</th>
                <th>Status</th>
                <th>Paid Date</th>
              </tr>
            </thead>
            <tbody>
              {statements.map((stmt) => (
                <tr key={stmt.id}>
                  <td style={{ fontVariantNumeric: 'tabular-nums' }}>{stmt.period}</td>
                  <td className="ag-td-main">{stmt.periodLabel}</td>
                  <td style={{ fontVariantNumeric: 'tabular-nums' }}>{formatCurrency(stmt.totalDue)}</td>
                  <td>
                    <span className={`ag-pill ${stmt.status === 'paid' ? 'ag-pill-gain' : stmt.status === 'draft' ? 'ag-pill-gray' : 'ag-pill-loss'}`} style={{ fontSize: 9 }}>
                      {stmt.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--t3)', fontVariantNumeric: 'tabular-nums' }}>
                    {stmt.paidDate ? new Date(stmt.paidDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
