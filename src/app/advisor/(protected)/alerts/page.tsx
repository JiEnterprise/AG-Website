'use client'

import PageHeader from '@/components/advisor/PageHeader'
import AlertCard from '@/components/advisor/AlertCard'
import { allAlerts } from '@/lib/advisorMetrics'
import { useAdvisorStore } from '@/lib/store/advisorStore'

export default function AlertsPage() {
  const markAlertsRead = useAdvisorStore((state) => state.markAlertsRead)
  const sorted = [...allAlerts].sort((a, b) => b.timestamp.localeCompare(a.timestamp))

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <PageHeader
          eyebrow="System alerts"
          title="Alerts"
          subtitle="Portfolio, risk, and market alerts — all sources"
        />
        <button onClick={markAlertsRead} className="rounded-[var(--radius-sm)] border border-[var(--bdr)] px-3 py-1.5 font-dm text-[10px] uppercase tracking-[0.12em] text-[var(--t2)]">
          Read All
        </button>
      </div>

      <section className="space-y-2">
        {sorted.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </section>
    </div>
  )
}
