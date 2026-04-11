import Link from 'next/link'
import type { Signal } from '@/lib/types'
import { formatDateLabel, formatPercent } from '@/lib/formatters'

interface SignalCardProps {
  signal: Signal
}

const priorityColor = {
  critical: 'var(--gold)',
  high: 'var(--gold)',
  medium: 'var(--warn)',
  low: 'var(--info)',
} as const

export default function SignalCard({ signal }: SignalCardProps) {
  const color = priorityColor[signal.priority]
  return (
    <article
      className={`alert-card ${
        signal.priority === 'critical' || signal.priority === 'high'
          ? 'al-gold'
          : signal.priority === 'medium'
            ? 'al-warn'
            : 'al-gold'
      }`}
      style={{ borderLeftColor: color }}
    >
      <div className="sig-dot" style={{ background: color }} />
      <div className="sig-body">
        <div className="sig-title">{signal.title}</div>
        <div className="sig-sub">{signal.symbol} · {signal.strategy.toUpperCase().replace('_', ' ')} · {signal.confidence.toFixed(2)}%</div>
        <div className="al-body" style={{ marginTop: 5 }}>{signal.body}</div>

        {signal.suggestedShares && (
          <p className="sig-sub" style={{ marginTop: 5 }}>
            {Object.entries(signal.suggestedShares)
              .map(([client, size]) => `${client}: ${size} shares`)
              .join(' · ')}
          </p>
        )}

        <p className="sig-sub" style={{ marginTop: 4 }}>
          Entry: {signal.targetEntry ? `${signal.targetEntry[0].toFixed(2)}-${signal.targetEntry[1].toFixed(2)}` : '--'} ·
          Stop: {signal.stopLoss ? signal.stopLoss.toFixed(2) : '--'} ·
          Target: {signal.targetExit ? signal.targetExit.toFixed(2) : '--'}
        </p>

        <div className="sig-sub" style={{ marginTop: 4 }}>
          Generated {formatDateLabel(signal.generatedAt)}
          {signal.expiresAt ? ` · Expires ${formatDateLabel(signal.expiresAt)}` : ''}
          {' · '}
          Confidence {formatPercent(signal.confidence)}
        </div>

        <div className="btn-row" style={{ marginTop: 8 }}>
          <Link href="/advisor/orders" className="sig-action sa-exec">
            Execute
          </Link>
          <Link href="/advisor/research" className="sig-action sa-watch">
            Research
          </Link>
          <button className="sig-action sa-watch">
            Dismiss
          </button>
        </div>
      </div>
    </article>
  )
}
