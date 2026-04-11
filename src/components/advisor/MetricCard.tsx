interface MetricCardProps {
  label: string
  value: string
  sub?: string
  badge?: string
  badgeVariant?: 'gain' | 'loss' | 'warn' | 'gold'
  accent?: boolean
  valueColor?: string
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
  const badgeStyles = {
    gain: 'bg',
    loss: 'br',
    warn: 'bo',
    gold: 'ba',
  }[badgeVariant]

  return (
    <article className={`mc ${accent ? 'ac' : ''}`}>
      <p className="mc-l">{label}</p>
      <p className="mc-v" style={{ color: valueColor }}>
        {value}
      </p>
      {(badge || sub) && (
        <div className="mc-s">
          {badge && (
            <span className={`bx ${badgeStyles}`}>
              {badge}
            </span>
          )}
          {sub && <span>{sub}</span>}
        </div>
      )}
    </article>
  )
}
