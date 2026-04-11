import { AlertCircle, CheckCircle2, Info } from 'lucide-react'
import type { Alert } from '@/lib/types'

const severityMap = {
  critical: { icon: AlertCircle, border: 'var(--loss)', bg: 'var(--loss-bg)', text: 'var(--loss)' },
  warning: { icon: AlertCircle, border: 'var(--warn)', bg: 'var(--warn-bg)', text: 'var(--warn)' },
  info: { icon: Info, border: 'var(--info)', bg: 'var(--info-bg)', text: 'var(--info)' },
  success: { icon: CheckCircle2, border: 'var(--gain)', bg: 'var(--gain-bg)', text: 'var(--gain)' },
} as const

interface AlertCardProps {
  alert: Alert
}

export default function AlertCard({ alert }: AlertCardProps) {
  const style = severityMap[alert.severity]
  const Icon = style.icon
  const toneClass =
    alert.severity === 'critical'
      ? 'al-red'
      : alert.severity === 'warning'
        ? 'al-warn'
        : alert.severity === 'success'
          ? 'al-green'
          : 'al-gold'

  return (
    <article className={`alert-card ${toneClass}`} style={{ borderLeftWidth: alert.read ? 3 : 4 }}>
      <div className="min-w-0 flex-1">
        <p className="al-title" style={{ color: style.text, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon size={14} />
          {alert.title}
        </p>
        <p className="al-body">{alert.body}</p>
        <div className="al-time">{new Date(alert.timestamp).toLocaleString()}</div>
        <div className="mt-1 flex items-center gap-1.5">
          {alert.relatedClientId && (
            <span className="si-badge sb-gold">
              {alert.relatedClientId}
            </span>
          )}
          {alert.relatedSymbol && (
            <span className="si-badge sb-gold">
              {alert.relatedSymbol}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
