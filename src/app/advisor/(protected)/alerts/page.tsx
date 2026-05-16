'use client'

import AlertCard from '@/components/advisor/AlertCard'
import { allAlerts } from '@/lib/advisorMetrics'
import { useAdvisorStore } from '@/lib/store/advisorStore'

export default function AlertsPage() {
  const markAlertsRead = useAdvisorStore((s) => s.markAlertsRead)
  const sorted = [...allAlerts].sort((a, b) => b.timestamp.localeCompare(a.timestamp))
  const unread = sorted.filter((a) => !a.read).length

  return (
    <div className="ag-page">
      <header className="ag-ph" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <p className="ag-ph-ey">System Alerts</p>
          <h1 className="ag-ph-h">Alerts</h1>
          <p className="ag-ph-s">Portfolio, risk, and market alerts — all sources</p>
        </div>
        {unread > 0 && (
          <button onClick={markAlertsRead} className="ag-btn ag-btn-ghost" style={{ fontSize: 11, flexShrink: 0 }}>
            Mark {unread} read
          </button>
        )}
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {sorted.map((alert) => <AlertCard key={alert.id} alert={alert} />)}
        {sorted.length === 0 && (
          <div className="ag-card">
            <div className="ag-empty">
              <span className="ag-empty-label">No alerts</span>
              <span className="ag-empty-sub">All clear — nothing to review</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
