interface StatRowProps {
  label: string
  value: string
  valueColor?: string
  mono?: boolean
}

export default function StatRow({ label, value, valueColor = 'var(--t1)', mono = true }: StatRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[rgba(255,255,255,0.03)] py-2 last:border-b-0">
      <span className="font-dm text-[10px] text-[var(--t3)]">{label}</span>
      <span className={`${mono ? 'font-mono' : 'font-dm'} text-[11px]`} style={{ color: valueColor }}>
        {value}
      </span>
    </div>
  )
}
