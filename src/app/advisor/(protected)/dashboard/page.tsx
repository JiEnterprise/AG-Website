import Link from 'next/link'
import { FileText, Activity, MessageCircle, Search, ShoppingCart } from 'lucide-react'
import PageHeader from '@/components/advisor/PageHeader'
import MetricCard from '@/components/advisor/MetricCard'
import AlertCard from '@/components/advisor/AlertCard'
import CalendarRow from '@/components/advisor/CalendarRow'
import {
  allAlerts,
  allSignals,
  allClients,
  totalAum,
  novRealized,
  totalOutstandingFees,
  pendingSignals,
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
  { label: 'Place Order', href: '/advisor/orders', icon: ShoppingCart },
  { label: 'New Statement', href: '/advisor/statements', icon: FileText },
  { label: 'Review Signals', href: '/advisor/signals', icon: Activity },
  { label: 'Message Client', href: '/advisor/messages', icon: MessageCircle },
  { label: 'Research', href: '/advisor/research', icon: Search },
]

export default function DashboardPage() {
  const subtitle = `${new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })} · 2 active clients · ${pendingSignals} AGQuant signals pending · ${
    totalOutstandingFees > 0 ? '1 fee outstanding' : 'all fees current'
  }`

  const totalReturn = allClients.reduce(
    (sum, client) => sum + allTimeReturn(client.currentAUM, client.initialDeposit),
    0
  )

  return (
    <div>
      <PageHeader eyebrow={`${greeting()}, Saswat`} title="Command Center" subtitle={subtitle} />

      <section className="mrow">
        <MetricCard
          label="Total AUM Managed"
          value={formatCurrency(totalAum)}
          badge={`+${formatCurrency(totalReturn)} total return`}
          badgeVariant="gain"
          accent
        />
        <MetricCard
          label="Nov Realized Gains"
          value={`+${formatCurrency(novRealized)}`}
          valueColor="var(--gain)"
          badge="across 2 clients"
          badgeVariant="gain"
        />
        <MetricCard
          label="Fees Outstanding"
          value={formatCurrency(totalOutstandingFees)}
          valueColor={totalOutstandingFees > 0 ? 'var(--loss)' : 'var(--gain)'}
          badge={totalOutstandingFees > 0 ? 'DL2503 · Due Dec 5' : 'All collected'}
          badgeVariant={totalOutstandingFees > 0 ? 'loss' : 'gain'}
        />
        <MetricCard label="AGQuant Signals" value={String(pendingSignals)} valueColor="var(--warn)" badge="Pending review" badgeVariant="warn" />
      </section>

      <section className="qa-row">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <Link key={action.label} href={action.href} className="qa">
              <span className="qa-ic">
                <Icon size={13} color="var(--gold)" />
              </span>
              <span className="qa-lb">{action.label}</span>
            </Link>
          )
        })}
      </section>

      <section className="g2">
        <article className="card">
          <h2 className="card-h">Client portfolio snapshot</h2>
          {allClients.map((client) => {
            const roi = allTimeReturnPct(client.currentAUM, client.initialDeposit)
            const gain = allTimeReturn(client.currentAUM, client.initialDeposit)
            return (
              <div key={client.id} className="cl-row">
                <div className="cl-av" style={{ background: `${client.color}26`, color: client.color }}>
                  {client.initials}
                </div>
                <div className="cl-info">
                  <div className="cl-name">
                    {client.name}{' '}
                    <span style={{ fontSize: 9, color: 'var(--t3)', fontFamily: 'var(--font-jetbrains, monospace)' }}>
                      {client.id}
                    </span>
                  </div>
                  <div className="cl-meta">PWM · {client.tier} · Active</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="cl-aum">{formatCurrency(client.currentAUM)}</div>
                  <div className="cl-ret" style={{ color: 'var(--gain)' }}>
                    +{formatCurrency(gain)} ({formatPercent(roi)})
                  </div>
                </div>
                <span className="bx bg">Active</span>
              </div>
            )
          })}
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--bdr)', display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
            <span style={{ color: 'var(--t3)' }}>Combined AUM</span>
            <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-jetbrains, monospace)', fontWeight: 500 }}>{formatCurrency(totalAum)}</span>
          </div>
        </article>

        <article className="card">
          <h2 className="card-h">AGQuant signals — pending</h2>
          {allSignals.slice(0, 3).map((signal) => (
            <div key={signal.id} className="sig-row">
              <div className="sig-dot" style={{ background: signal.priority === 'high' ? 'var(--gold)' : signal.priority === 'medium' ? 'var(--warn)' : 'var(--info)' }} />
              <div className="sig-body">
                <div className="sig-title">{signal.title}</div>
                <div className="sig-sub">{signal.suggestedAction}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                  <Link href="/advisor/orders" className="sig-action sa-exec">Execute</Link>
                  <Link href="/advisor/signals" className="sig-action sa-watch">Watch</Link>
                  <Link href="/advisor/research" className="sig-action sa-watch">Research</Link>
                </div>
              </div>
              <div className="sig-time">{new Date(signal.generatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          ))}
        </article>
      </section>

      <section className="g2">
        <article>
          <h2 className="card-h" style={{ marginBottom: 8 }}>Recent alerts</h2>
          {allAlerts.slice(0, 3).map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </article>

        <article className="card">
          <h2 className="card-h">Today's schedule</h2>
          {calendarEvents.slice(0, 6).map((event) => (
            <CalendarRow key={event.id} event={event} />
          ))}
        </article>
      </section>
    </div>
  )
}
