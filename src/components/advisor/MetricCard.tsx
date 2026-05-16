interface MetricCardProps {
  label: string
  value: string
  sub?: string
  badge?: string
  badgeVariant?: 'gain' | 'loss' | 'warn' | 'gold'
  accent?: boolean
  valueColor?: string
}

const BADGE_CLASS: Record<string, string> = {
  gain: 'ag-pill-gain',
  loss: 'ag-pill-loss',
  warn: 'ag-pill-warn',
  gold: 'ag-pill-gray',
}

export default function MetricCard({
  label,
  value,
  sub,
  badge,
  badgeVariant = 'gold',
  accent = false,
  valueColor = 'var(--gold)',
}: MetricCardProps) {
  return (
    <div className="ag-kpi" style={accent ? {
      background: 'linear-gradient(135deg, rgba(107,107,107,0.12) 0%, rgba(107,107,107,0.04) 100%)',
      borderColor: 'var(--bdr-gold)',
    } : {}}>
      <div className="ag-kpi-label">{label}</div>
      <div className="ag-kpi-value" style={{ color: valueColor, fontSize: 18 }}>{value}</div>
      {(badge || sub) && (
        <div className="ag-kpi-sub" style={{ display: 'flex', gap: 5, alignItems: 'center', marginTop: 4 }}>
          {badge && <span className={`ag-pill ${BADGE_CLASS[badgeVariant] ?? 'ag-pill-gray'}`} style={{ fontSize: 9 }}>{badge}</span>}
          {sub && <span>{sub}</span>}
        </div>
      )}
    </div>
  )
}
