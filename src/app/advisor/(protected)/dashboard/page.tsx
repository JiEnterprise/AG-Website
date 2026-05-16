import Link from 'next/link'
import {
  Activity, MessageCircle, ShoppingCart, TrendingUp,
  DollarSign, Zap, AlertTriangle, ArrowUpRight,
  Clock, ChevronRight, FileText,
} from 'lucide-react'
import {
  allAlerts,
  allSignals,
  allClients,
  totalAum,
  totalOutstandingFees,
  pendingSignals,
  advisorPerformance,
} from '@/lib/advisorMetrics'
import { calendarEvents } from '@/lib/mock-data/calendar'
import { formatCurrency, formatPercent } from '@/lib/formatters'
import { allTimeReturn, allTimeReturnPct } from '@/lib/calculations/returns'

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

const CAT_COLORS: Record<string, string> = {
  dividend:  'var(--gain)',
  billing:   'var(--gold)',
  macro:     'var(--info)',
  client:    'var(--purple)',
  reporting: 'var(--t2)',
  trading:   'var(--warn)',
  critical:  'var(--loss)',
}

const ALERT_COLORS: Record<string, string> = {
  critical: 'var(--loss)',
  warning:  'var(--warn)',
  info:     'var(--info)',
  success:  'var(--gain)',
}

export default function DashboardPage() {
  const totalReturn  = allClients.reduce(
    (sum, c) => sum + allTimeReturn(c.currentAUM, c.initialDeposit), 0
  )
  const activeClients  = allClients.filter((c) => c.status === 'active').length
  const totalPositions = allClients.reduce((sum, c) => sum + c.openPositions, 0)

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  })

  return (
    <div className="ag-page">

      {/* ── Page header ──────────────────────────────────────── */}
      <header className="ag-ph" style={{ marginBottom: 20 }}>
        <p className="ag-ph-ey">{greeting()}, Saswat</p>
        <h1 className="ag-ph-h">Command Center</h1>
        <p className="ag-ph-s">{today} · {activeClients} active clients · {pendingSignals} signals pending</p>
      </header>

      {/* ── KPI row ──────────────────────────────────────────── */}
      <section className="ag-kpi-row" style={{ marginBottom: 18 }}>

        {/* Total AUM */}
        <div className="ag-kpi" style={{
          background: 'linear-gradient(135deg, rgba(107,107,107,0.12) 0%, rgba(107,107,107,0.04) 100%)',
          borderColor: 'var(--bdr-gold)',
        }}>
          <div className="ag-kpi-label" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <DollarSign size={10} color="var(--gold)" />
            Total AUM
          </div>
          <div className="ag-kpi-value" style={{ color: 'var(--gold)', fontSize: 22 }}>
            {formatCurrency(totalAum)}
          </div>
          <div className="ag-kpi-sub" style={{ color: 'var(--gain)', display: 'flex', alignItems: 'center', gap: 3 }}>
            <ArrowUpRight size={10} />+{formatCurrency(totalReturn)} all-time
          </div>
        </div>

        {/* Realized P&L */}
        <div className="ag-kpi">
          <div className="ag-kpi-label" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <TrendingUp size={10} color="var(--gain)" />
            Realized P&amp;L
          </div>
          <div className="ag-kpi-value">+{formatCurrency(advisorPerformance.totalRealizedReturn)}</div>
          <div className="ag-kpi-sub">+{formatCurrency(advisorPerformance.totalDividends)} dividends</div>
        </div>

        {/* Open Positions */}
        <div className="ag-kpi">
          <div className="ag-kpi-label" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Activity size={10} color="var(--info)" />
            Open Positions
          </div>
          <div className="ag-kpi-value">{totalPositions}</div>
          <div className="ag-kpi-sub">across {activeClients} accounts</div>
        </div>

        {/* Fees Outstanding */}
        <div className="ag-kpi" style={totalOutstandingFees > 0 ? {
          background: 'rgba(220,38,38,0.06)',
          borderColor: 'rgba(220,38,38,0.22)',
        } : {}}>
          <div className="ag-kpi-label" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <AlertTriangle size={10} color={totalOutstandingFees > 0 ? 'var(--loss)' : 'var(--gain)'} />
            Fees Outstanding
          </div>
          <div className="ag-kpi-value" style={{ color: totalOutstandingFees > 0 ? 'var(--loss)' : 'var(--gain)' }}>
            {formatCurrency(totalOutstandingFees)}
          </div>
          <div className="ag-kpi-sub">
            {totalOutstandingFees > 0 ? 'DL2503 · Due Dec 5' : 'All fees collected'}
          </div>
        </div>

        {/* AGQuant Signals */}
        <div className="ag-kpi" style={pendingSignals > 0 ? {
          background: 'rgba(217,119,6,0.06)',
          borderColor: 'rgba(217,119,6,0.22)',
        } : {}}>
          <div className="ag-kpi-label" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Zap size={10} color="var(--warn)" />
            AGQuant Signals
          </div>
          <div className="ag-kpi-value" style={{ color: pendingSignals > 0 ? 'var(--warn)' : 'var(--t1)' }}>
            {pendingSignals}
          </div>
          <div className="ag-kpi-sub">pending review</div>
        </div>
      </section>

      {/* ── Quick action strip ────────────────────────────────── */}
      <section style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[
          { label: 'Place Order',    href: '/advisor/orders',     icon: ShoppingCart },
          { label: 'New Statement',  href: '/advisor/statements', icon: FileText },
          { label: 'View Signals',   href: '/advisor/signals',    icon: Activity },
          { label: 'Message Client', href: '/advisor/messages',   icon: MessageCircle },
        ].map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="ag-btn ag-btn-ghost"
            style={{ textDecoration: 'none', fontSize: 11 }}
          >
            <Icon size={12} />
            {label}
          </Link>
        ))}
      </section>

      {/* ── Main 2-col content grid ───────────────────────────── */}
      <div className="ag-g2" style={{ marginBottom: 18 }}>

        {/* ── Client Accounts table ─────────────────────────── */}
        <div className="ag-card">
          <div className="ag-card-head">
            <span className="ag-card-title">Client Accounts</span>
            <Link
              href="/advisor/clients"
              style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: 'var(--gold)', textDecoration: 'none' }}
            >
              All clients <ChevronRight size={10} />
            </Link>
          </div>
          <table className="ag-table" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th style={{ width: 36 }}></th>
                <th>Client</th>
                <th>AUM</th>
                <th>All-Time Return</th>
                <th>ROI</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {allClients.map((client) => {
                const gain = allTimeReturn(client.currentAUM, client.initialDeposit)
                const roi  = allTimeReturnPct(client.currentAUM, client.initialDeposit)
                return (
                  <tr key={client.id}>
                    <td>
                      <Link href={`/advisor/clients/${client.id}`} style={{ textDecoration: 'none', display: 'flex' }}>
                        <div className="ag-av" style={{ background: `${client.color}22`, color: client.color, width: 26, height: 26, fontSize: 9, borderRadius: 4 }}>
                          {client.initials}
                        </div>
                      </Link>
                    </td>
                    <td>
                      <Link href={`/advisor/clients/${client.id}`} style={{ textDecoration: 'none' }}>
                        <div className="ag-td-main">{client.name}</div>
                        <div style={{ fontSize: 10, color: 'var(--t3)', fontVariantNumeric: 'tabular-nums' }}>{client.id} · {client.riskProfile ?? client.tier}</div>
                      </Link>
                    </td>
                    <td className="ag-td-main" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {formatCurrency(client.currentAUM)}
                    </td>
                    <td style={{ color: gain >= 0 ? 'var(--gain)' : 'var(--loss)', fontVariantNumeric: 'tabular-nums' }}>
                      {gain >= 0 ? '+' : ''}{formatCurrency(gain)}
                    </td>
                    <td style={{ color: roi >= 0 ? 'var(--gain)' : 'var(--loss)', fontVariantNumeric: 'tabular-nums' }}>
                      {roi >= 0 ? '+' : ''}{formatPercent(roi)}
                    </td>
                    <td>
                      <span className="ag-pill ag-pill-gain" style={{ fontSize: 9 }}>Active</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr style={{ background: 'var(--bg-elevated)' }}>
                <td colSpan={2} style={{ color: 'var(--t3)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', paddingLeft: 12, paddingRight: 12, paddingTop: 9, paddingBottom: 9 }}>
                  Combined
                </td>
                <td style={{ color: 'var(--gold)', fontWeight: 700, fontVariantNumeric: 'tabular-nums', padding: '9px 12px' }}>
                  {formatCurrency(totalAum)}
                </td>
                <td style={{ color: 'var(--gain)', fontVariantNumeric: 'tabular-nums', padding: '9px 12px' }}>
                  +{formatCurrency(totalReturn)}
                </td>
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* ── AGQuant Signal feed ───────────────────────────── */}
        <div className="ag-card">
          <div className="ag-card-head">
            <span className="ag-card-title">AGQuant Signals</span>
            <Link
              href="/advisor/signals"
              style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: 'var(--gold)', textDecoration: 'none' }}
            >
              All signals <ChevronRight size={10} />
            </Link>
          </div>

          {allSignals.length === 0 ? (
            <div className="ag-empty">
              <Zap size={24} className="ag-empty-icon" />
              <span className="ag-empty-label">No pending signals</span>
            </div>
          ) : (
            allSignals.slice(0, 5).map((signal) => {
              const iconColor =
                signal.priority === 'critical' ? 'var(--loss)'
                : signal.priority === 'high'   ? 'var(--gold)'
                : signal.priority === 'medium' ? 'var(--warn)'
                : 'var(--info)'
              const iconBg =
                signal.priority === 'critical' ? 'var(--loss-bg)'
                : signal.priority === 'high'   ? 'var(--gold-dim)'
                : signal.priority === 'medium' ? 'var(--warn-bg)'
                : 'var(--info-bg)'

              return (
                <div key={signal.id} className="ag-signal-row">
                  <div className="ag-signal-icon" style={{ background: iconBg, color: iconColor }}>
                    <Zap size={12} />
                  </div>
                  <div className="ag-signal-body">
                    <div className="ag-signal-title">{signal.title}</div>
                    <div className="ag-signal-sub">{signal.suggestedAction}</div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 5, alignItems: 'center' }}>
                      <span style={{
                        fontSize: 9, fontWeight: 700, padding: '2px 6px',
                        background: 'var(--bg-elevated)', color: 'var(--t3)',
                        borderRadius: 3, fontVariantNumeric: 'tabular-nums',
                      }}>
                        {signal.confidence}% conf
                      </span>
                      <Link href="/advisor/orders" style={{ fontSize: 10, color: 'var(--gain)', textDecoration: 'none', fontWeight: 600 }}>
                        Execute →
                      </Link>
                      <Link href="/advisor/signals" style={{ fontSize: 10, color: 'var(--t3)', textDecoration: 'none' }}>
                        Review
                      </Link>
                    </div>
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--t3)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {new Date(signal.generatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* ── Bottom 2-col: Alerts + Schedule ──────────────────── */}
      <div className="ag-g2">

        {/* Recent Alerts */}
        <div className="ag-card">
          <div className="ag-card-head">
            <span className="ag-card-title">Recent Alerts</span>
            <Link
              href="/advisor/alerts"
              style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: 'var(--t3)', textDecoration: 'none' }}
            >
              View all <ChevronRight size={10} />
            </Link>
          </div>
          {allAlerts.slice(0, 5).map((alert) => (
            <div key={alert.id} className="ag-signal-row">
              <div
                className="ag-signal-icon"
                style={{
                  background: `${ALERT_COLORS[alert.severity]}15`,
                  color: ALERT_COLORS[alert.severity],
                  width: 6, height: 6, borderRadius: '50%', minWidth: 6,
                }}
              />
              <div className="ag-signal-body">
                <div className="ag-signal-title">{alert.title}</div>
                <div className="ag-signal-sub">{alert.body}</div>
              </div>
              <div style={{ fontSize: 10, color: 'var(--t3)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                {new Date(alert.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Schedule */}
        <div className="ag-card">
          <div className="ag-card-head">
            <span className="ag-card-title">Upcoming Schedule</span>
            <Link
              href="/advisor/calendar"
              style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: 'var(--t3)', textDecoration: 'none' }}
            >
              <Clock size={9} /> Calendar <ChevronRight size={10} />
            </Link>
          </div>
          {calendarEvents.slice(0, 6).map((event) => {
            const catColor = CAT_COLORS[event.category] ?? 'var(--t3)'
            return (
              <div key={event.id} className="ag-signal-row">
                <div style={{
                  width: 3, height: 36, borderRadius: 2, background: catColor, flexShrink: 0,
                }} />
                <div className="ag-signal-body">
                  <div className="ag-signal-title">{event.title}</div>
                  <div className="ag-signal-sub" style={{ display: 'flex', gap: 6 }}>
                    <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span className="ag-pill ag-pill-gray" style={{ fontSize: 8, textTransform: 'capitalize' }}>
                      {event.category}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
