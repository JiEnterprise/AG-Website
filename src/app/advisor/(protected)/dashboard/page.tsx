import Link from 'next/link'
import {
  FileText, Activity, MessageCircle, Search, ShoppingCart,
  TrendingUp, Users, DollarSign, Zap, AlertTriangle,
  ArrowUpRight, ArrowDownRight, Clock, ChevronRight,
} from 'lucide-react'
import PageHeader from '@/components/advisor/PageHeader'
import AlertCard from '@/components/advisor/AlertCard'
import CalendarRow from '@/components/advisor/CalendarRow'
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

const quickActions = [
  { label: 'Place Order',     href: '/advisor/orders',    icon: ShoppingCart },
  { label: 'New Statement',   href: '/advisor/statements', icon: FileText },
  { label: 'Review Signals',  href: '/advisor/signals',   icon: Activity },
  { label: 'Message Client',  href: '/advisor/messages',  icon: MessageCircle },
  { label: 'Research',        href: '/advisor/research',  icon: Search },
]

export default function DashboardPage() {
  const totalReturn = allClients.reduce(
    (sum, client) => sum + allTimeReturn(client.currentAUM, client.initialDeposit),
    0
  )
  const activeClients = allClients.filter((c) => c.status === 'active').length
  const totalPositions = allClients.reduce((sum, c) => sum + c.openPositions, 0)

  return (
    <div>
      <PageHeader
        eyebrow={`${greeting()}, Saswat`}
        title="Command Center"
        subtitle={`${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} · ${activeClients} active clients · ${pendingSignals} signals pending`}
      />

      {/* ── KPI Row ─────────────────────────────────────────── */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 20 }}>
        {/* Total AUM */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)',
          border: '1px solid rgba(201,168,76,0.22)',
          borderRadius: 10, padding: '16px 18px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <DollarSign size={12} color="var(--gold)" />
            <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--t2)' }}>Total AUM</span>
          </div>
          <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 22, fontWeight: 600, color: 'var(--gold)', letterSpacing: '-0.02em' }}>
            {formatCurrency(totalAum)}
          </div>
          <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--gain)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
            <ArrowUpRight size={10} />
            +{formatCurrency(totalReturn)} all-time
          </div>
        </div>

        {/* Realized Return */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bdr)', borderRadius: 10, padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <TrendingUp size={12} color="var(--gain)" />
            <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--t2)' }}>Realized P&amp;L</span>
          </div>
          <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 22, fontWeight: 600, color: 'var(--t1)', letterSpacing: '-0.02em' }}>
            +{formatCurrency(advisorPerformance.totalRealizedReturn)}
          </div>
          <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)', marginTop: 4 }}>
            +{formatCurrency(advisorPerformance.totalDividends)} dividends
          </div>
        </div>

        {/* Open Positions */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bdr)', borderRadius: 10, padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <Activity size={12} color="var(--info)" />
            <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--t2)' }}>Open Positions</span>
          </div>
          <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 22, fontWeight: 600, color: 'var(--t1)', letterSpacing: '-0.02em' }}>
            {totalPositions}
          </div>
          <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)', marginTop: 4 }}>
            across {activeClients} accounts
          </div>
        </div>

        {/* Fees Outstanding */}
        <div style={{
          background: totalOutstandingFees > 0 ? 'rgba(212,75,58,0.06)' : 'var(--bg-card)',
          border: `1px solid ${totalOutstandingFees > 0 ? 'rgba(212,75,58,0.22)' : 'var(--bdr)'}`,
          borderRadius: 10, padding: '16px 18px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <AlertTriangle size={12} color={totalOutstandingFees > 0 ? 'var(--loss)' : 'var(--gain)'} />
            <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--t2)' }}>Fees Outstanding</span>
          </div>
          <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 22, fontWeight: 600, color: totalOutstandingFees > 0 ? 'var(--loss)' : 'var(--gain)', letterSpacing: '-0.02em' }}>
            {formatCurrency(totalOutstandingFees)}
          </div>
          <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)', marginTop: 4 }}>
            {totalOutstandingFees > 0 ? 'DL2503 · Due Dec 5' : 'All fees collected'}
          </div>
        </div>

        {/* AGQuant Signals */}
        <div style={{
          background: pendingSignals > 0 ? 'rgba(232,160,32,0.06)' : 'var(--bg-card)',
          border: `1px solid ${pendingSignals > 0 ? 'rgba(232,160,32,0.22)' : 'var(--bdr)'}`,
          borderRadius: 10, padding: '16px 18px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <Zap size={12} color="var(--warn)" />
            <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--t2)' }}>Signals</span>
          </div>
          <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 22, fontWeight: 600, color: pendingSignals > 0 ? 'var(--warn)' : 'var(--t1)', letterSpacing: '-0.02em' }}>
            {pendingSignals}
          </div>
          <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)', marginTop: 4 }}>
            pending review
          </div>
        </div>
      </section>

      {/* ── Quick Actions ──────────────────────────────────── */}
      <section className="qa-row" style={{ marginBottom: 20 }}>
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <Link key={action.label} href={action.href} className="qa">
              <span className="qa-ic"><Icon size={13} color="var(--gold)" /></span>
              <span className="qa-lb">{action.label}</span>
            </Link>
          )
        })}
      </section>

      {/* ── Main 2-col grid ───────────────────────────────── */}
      <section className="g2" style={{ marginBottom: 20 }}>

        {/* Client Portfolio Table */}
        <article className="card" style={{ gridColumn: '1 / 2' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 className="card-h" style={{ margin: 0 }}>Client Accounts</h2>
            <Link href="/advisor/clients" style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--gold)', textDecoration: 'none' }}>
              All clients <ChevronRight size={10} />
            </Link>
          </div>

          {/* Table header */}
          <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr 110px 100px 80px 50px', gap: 8, paddingBottom: 8, borderBottom: '1px solid var(--bdr)', marginBottom: 4 }}>
            {['', 'Client', 'AUM', 'Return', 'ROI', 'Status'].map((h) => (
              <span key={h} style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--t3)' }}>{h}</span>
            ))}
          </div>

          {allClients.map((client) => {
            const gain = allTimeReturn(client.currentAUM, client.initialDeposit)
            const roi  = allTimeReturnPct(client.currentAUM, client.initialDeposit)
            return (
              <Link
                key={client.id}
                href={`/advisor/clients/${client.id}`}
                style={{ display: 'grid', gridTemplateColumns: '32px 1fr 110px 100px 80px 50px', gap: 8, alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', textDecoration: 'none' }}
              >
                {/* Avatar */}
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `${client.color}22`, color: client.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-dm-sans)', fontSize: 9, fontWeight: 700 }}>
                  {client.initials}
                </div>
                {/* Name + ID */}
                <div>
                  <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 12, color: 'var(--t1)', fontWeight: 500 }}>{client.name}</div>
                  <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 9, color: 'var(--t3)', marginTop: 1 }}>{client.id} · {client.riskProfile ?? client.tier}</div>
                </div>
                {/* AUM */}
                <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 12, color: 'var(--t1)', fontWeight: 500 }}>
                  {formatCurrency(client.currentAUM)}
                </div>
                {/* Return */}
                <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 12, color: 'var(--gain)', display: 'flex', alignItems: 'center', gap: 3 }}>
                  <ArrowUpRight size={9} />
                  {formatCurrency(gain)}
                </div>
                {/* ROI */}
                <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 12, color: 'var(--gain)' }}>
                  +{formatPercent(roi)}
                </div>
                {/* Status badge */}
                <span className="bx bg" style={{ fontSize: 8 }}>Active</span>
              </Link>
            )
          })}

          {/* Combined total */}
          <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr 110px 100px 80px 50px', gap: 8, alignItems: 'center', paddingTop: 10, borderTop: '1px solid var(--bdr)', marginTop: 4 }}>
            <div />
            <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Combined</div>
            <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 12, color: 'var(--gold)', fontWeight: 600 }}>{formatCurrency(totalAum)}</div>
            <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 12, color: 'var(--gain)' }}>
              +{formatCurrency(totalReturn)}
            </div>
            <div />
            <div />
          </div>
        </article>

        {/* AGQuant Signals */}
        <article className="card" style={{ gridColumn: '2 / 3' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 className="card-h" style={{ margin: 0 }}>AGQuant Signals</h2>
            <Link href="/advisor/signals" style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--gold)', textDecoration: 'none' }}>
              All signals <ChevronRight size={10} />
            </Link>
          </div>
          {allSignals.length === 0 ? (
            <div style={{ padding: '24px 0', textAlign: 'center', fontFamily: 'var(--font-dm-sans)', fontSize: 11, color: 'var(--t3)' }}>No pending signals</div>
          ) : (
            allSignals.slice(0, 4).map((signal) => {
              const dotColor = signal.priority === 'critical' ? 'var(--loss)' : signal.priority === 'high' ? 'var(--gold)' : signal.priority === 'medium' ? 'var(--warn)' : 'var(--info)'
              return (
                <div key={signal.id} className="sig-row">
                  <div className="sig-dot" style={{ background: dotColor }} />
                  <div className="sig-body">
                    <div className="sig-title">{signal.title}</div>
                    <div className="sig-sub">{signal.suggestedAction}</div>
                    <div style={{ display: 'flex', gap: 5, marginTop: 6, alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 9, color: 'var(--t3)', background: 'var(--bg-elevated)', padding: '2px 6px', borderRadius: 4 }}>
                        {signal.confidence}% confidence
                      </span>
                      <Link href="/advisor/orders" className="sig-action sa-exec">Execute</Link>
                      <Link href="/advisor/signals" className="sig-action sa-watch">Review</Link>
                    </div>
                  </div>
                  <div className="sig-time">{new Date(signal.generatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
              )
            })
          )}
        </article>
      </section>

      {/* ── Bottom 2-col grid ─────────────────────────────── */}
      <section className="g2">
        <article>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <h2 className="card-h" style={{ margin: 0 }}>Recent Alerts</h2>
            <Link href="/advisor/alerts" style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)', textDecoration: 'none' }}>
              View all <ChevronRight size={10} />
            </Link>
          </div>
          {allAlerts.slice(0, 4).map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </article>

        <article className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h2 className="card-h" style={{ margin: 0 }}>Upcoming Schedule</h2>
            <Link href="/advisor/calendar" style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)', textDecoration: 'none' }}>
              <Clock size={9} /> Calendar <ChevronRight size={10} />
            </Link>
          </div>
          {calendarEvents.slice(0, 6).map((event) => (
            <CalendarRow key={event.id} event={event} />
          ))}
        </article>
      </section>
    </div>
  )
}
