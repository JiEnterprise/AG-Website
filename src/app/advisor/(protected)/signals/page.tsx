import SignalCard from '@/components/advisor/SignalCard'
import { allSignals } from '@/lib/advisorMetrics'

export default function SignalsPage() {
  const pending   = allSignals.filter((s) => s.status === 'pending')
  const executed  = allSignals.filter((s) => s.status === 'executed')
  const dismissed = allSignals.filter((s) => s.status === 'dismissed' || s.status === 'expired')

  return (
    <div className="ag-page">
      <header className="ag-ph" style={{ marginBottom: 20 }}>
        <p className="ag-ph-ey">AGQuant Engine</p>
        <h1 className="ag-ph-h">Live Signals</h1>
        <p className="ag-ph-s">AI-generated signals pending your review — human-approved execution only</p>
      </header>

      {/* Summary strip */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        {[
          { label: 'Pending',   count: pending.length,   color: 'var(--warn)' },
          { label: 'Executed',  count: executed.length,  color: 'var(--gain)' },
          { label: 'Dismissed', count: dismissed.length, color: 'var(--t3)'   },
        ].map((s) => (
          <div key={s.label} className="ag-kpi" style={{ flex: 1, padding: '10px 14px' }}>
            <div className="ag-kpi-label">{s.label}</div>
            <div className="ag-kpi-value" style={{ color: s.color, fontSize: 22 }}>{s.count}</div>
          </div>
        ))}
      </div>

      {pending.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div className="ag-section-label">Pending review</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {pending.map((signal) => <SignalCard key={signal.id} signal={signal} />)}
          </div>
        </div>
      )}

      {executed.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div className="ag-section-label">Executed</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {executed.map((signal) => <SignalCard key={signal.id} signal={signal} />)}
          </div>
        </div>
      )}

      {dismissed.length > 0 && (
        <div>
          <div className="ag-section-label">Dismissed / expired</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {dismissed.map((signal) => <SignalCard key={signal.id} signal={signal} />)}
          </div>
        </div>
      )}

      {allSignals.length === 0 && (
        <div className="ag-card">
          <div className="ag-empty">
            <span className="ag-empty-label">No signals at this time</span>
            <span className="ag-empty-sub">AGQuant engine is monitoring markets</span>
          </div>
        </div>
      )}
    </div>
  )
}
