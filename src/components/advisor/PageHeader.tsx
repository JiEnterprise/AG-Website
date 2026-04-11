interface PageHeaderProps {
  eyebrow: string
  title: string
  subtitle: string
}

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <header className="ph">
      <p className="ph-ey">{eyebrow}</p>
      <h1 className="ph-h">{title}</h1>
      <p className="ph-s">{subtitle}</p>
    </header>
  )
}
