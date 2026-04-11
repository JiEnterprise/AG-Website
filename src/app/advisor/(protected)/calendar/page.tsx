import PageHeader from '@/components/advisor/PageHeader'
import CalendarRow from '@/components/advisor/CalendarRow'
import { calendarEvents } from '@/lib/mock-data/calendar'

export default function CalendarPage() {
  const sortedEvents = [...calendarEvents].sort((a, b) => a.date.localeCompare(b.date))
  const weeklyGroups = sortedEvents.reduce<Record<string, typeof sortedEvents>>((acc, event) => {
    const date = new Date(event.date)
    const key = `Week of ${new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay()).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })}`
    const existing = acc[key] ?? []
    existing.push(event)
    acc[key] = existing
    return acc
  }, {})

  const dividends = sortedEvents.filter((event) => event.category === 'dividend')

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Scheduling"
        title="Event Calendar"
        subtitle="Dividend dates, fee deadlines, market events, client reviews"
      />

      <section className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
        <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">December 2025 — key dates</h2>
        <div className="mt-2 space-y-1">
          {sortedEvents.map((event) => (
            <CalendarRow key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
        <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Next 30 Days</h2>
        <div className="mt-2 space-y-3">
          {Object.entries(weeklyGroups).map(([week, events]) => (
            <div key={week}>
              <p className="mb-1 font-dm text-[10px] uppercase tracking-[0.14em] text-[var(--t3)]">{week}</p>
              <div className="space-y-1">
                {events.map((event) => (
                  <CalendarRow key={event.id} event={event} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
        <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Upcoming Dividends</h2>
        <div className="mt-2 space-y-1">
          {dividends.map((event) => (
            <div key={event.id} className="flex items-center justify-between rounded-[var(--radius-sm)] border border-[rgba(255,255,255,0.04)] bg-[var(--bg-elevated)] px-3 py-2">
              <p className="font-mono text-[10px] text-[var(--gold)]">{new Date(event.date).toLocaleDateString('en-US')}</p>
              <p className="font-dm text-[11px] text-[var(--t2)]">{event.title}</p>
              <p className="font-mono text-[10px] text-[var(--t3)]">Est. $0.13–$0.15</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
