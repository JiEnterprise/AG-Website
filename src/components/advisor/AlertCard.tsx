import { AlertCircle, CheckCircle2, Info } from 'lucide-react'
import type { Alert } from '@/lib/types'

const SEV: Record<string, { icon: typeof AlertCircle; color: string; bg: string }> = {
  critical: { icon: AlertCircle,   color: 'var(--loss)', bg: 'var(--loss-bg)' },
  warning:  { icon: AlertCircle,   color: 'var(--warn)', bg: 'var(--warn-bg)' },
  info:     { icon: Info,          color: 'var(--info)', bg: 'var(--info-bg)' },
  success:  { icon: CheckCircle2,  color: 'var(--gain)', bg: 'var(--gain-bg)' },
}

interface AlertCardProps {
  alert: Alert
}

export default function AlertCard({ alert }: AlertCardProps) {
  const s    = SEV[alert.severity] ?? SEV.info
  const Icon = s.icon

  return (
    <div
      className="ag-card"
      style={{
        borderLeft: `${alert.read ? 3 : 4}px solid ${s.color}`,
        opacity: alert.read ? 0.75 : 1,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 14px' }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: s.bg, color: s.color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={13} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: s.color, marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
            {alert.title}
            {!alert.read && <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.color, flexShrink: 0 }} />}
          </div>
          <div style={{ fontSize: 11, color: 'var(--t2)', lineHeight: 1.5, marginBottom: 4 }}>{alert.body}</div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 10, color: 'var(--t3)' }}>
              {new Date(alert.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </span>
            {alert.relatedClientId && (
              <span className="ag-pill ag-pill-gray" style={{ fontSize: 9 }}>{alert.relatedClientId}</span>
            )}
            {alert.relatedSymbol && (
              <span className="ag-pill ag-pill-gray" style={{ fontSize: 9 }}>{alert.relatedSymbol}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
