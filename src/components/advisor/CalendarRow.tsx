import type { CalendarEvent } from '@/lib/types'

const categoryStyle = {
  dividend: { color: 'var(--gold)', bg: 'var(--gold-dim)' },
  billing: { color: 'var(--loss)', bg: 'var(--loss-bg)' },
  macro: { color: 'var(--info)', bg: 'var(--info-bg)' },
  client: { color: 'var(--purple)', bg: 'var(--purple-bg)' },
  reporting: { color: 'var(--gain)', bg: 'var(--gain-bg)' },
  trading: { color: 'var(--gold)', bg: 'var(--gold-dim)' },
  critical: { color: 'var(--loss)', bg: 'var(--loss-bg)' },
} as const

interface CalendarRowProps {
  event: CalendarEvent
}

export default function CalendarRow({ event }: CalendarRowProps) {
  const badge = categoryStyle[event.category]
  return (
    <div className="cal-row">
      <p className="cal-date">
        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      </p>
      <div className="cal-ev">
        <p>{event.title}</p>
        {event.body && <p style={{ fontSize: 10, color: 'var(--t3)', marginTop: 2 }}>{event.body}</p>}
      </div>
      <span className="cal-tag" style={{ color: badge.color, background: badge.bg }}>
        {event.category}
      </span>
    </div>
  )
}
