import type { ReactNode } from 'react'

interface PageHeaderProps {
  eyebrow: string
  title: string
  subtitle: string
  action?: ReactNode
}

export default function PageHeader({ eyebrow, title, subtitle, action }: PageHeaderProps) {
  return (
    <header className="ph" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
      <div>
        <p className="ph-ey">{eyebrow}</p>
        <h1 className="ph-h">{title}</h1>
        <p className="ph-s">{subtitle}</p>
      </div>
      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
    </header>
  )
}
