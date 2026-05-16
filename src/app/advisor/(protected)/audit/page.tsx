'use client'

import { useState } from 'react'
import MetricCard from '@/components/advisor/MetricCard'
import { auditLog, type AuditCategory } from '@/lib/mock-data/audit'
import { clients } from '@/lib/mock-data/clients'

type ClientFilter = 'all' | 'DL2503' | 'SR2501' | 'firm'
type CategoryFilter = 'all' | AuditCategory

const categoryConfig: Record<AuditCategory, { label: string; color: string }> = {
  trade:      { label: 'Trade',      color: 'var(--gold)' },
  statement:  { label: 'Statement',  color: '#7F77DD' },
  fee:        { label: 'Fee',        color: 'var(--gain)' },
  client:     { label: 'Client',     color: '#378ADD' },
  message:    { label: 'Message',    color: '#A0A0BE' },
  order:      { label: 'Order',      color: '#E8A245' },
  system:     { label: 'System',     color: 'var(--t3)' },
  compliance: { label: 'Compliance', color: 'var(--loss)' },
}

function formatTimestamp(iso: string): { date: string; time: string } {
  const d = new Date(iso)
  return {
    date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
  }
}

export default function AuditPage() {
  const [clientFilter, setClientFilter] = useState<ClientFilter>('all')
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const visible = [...auditLog].reverse().filter((entry) => {
    if (clientFilter === 'firm' && entry.clientId) return false
    if (clientFilter !== 'all' && clientFilter !== 'firm' && entry.clientId !== clientFilter) return false
    if (categoryFilter !== 'all' && entry.category !== categoryFilter) return false
    return true
  })

  const counts = {
    trade: auditLog.filter((e) => e.category === 'trade').length,
    fee: auditLog.filter((e) => e.category === 'fee').length,
    statement: auditLog.filter((e) => e.category === 'statement').length,
  }

  return (
    <div className="ag-page" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <header className="ag-ph">
        <p className="ag-ph-ey">Compliance · Immutable</p>
        <h1 className="ag-ph-h">Audit Log</h1>
        <p className="ag-ph-s">Append-only record of every system action · Timestamp · Actor · Before/After</p>
      </header>

      {/* Immutable notice */}
      <div
        className="flex items-center gap-3 rounded-[var(--radius-sm)] border px-4 py-2"
        style={{ borderColor: 'rgba(212,75,58,0.25)', background: 'rgba(212,75,58,0.04)' }}
      >
        <span style={{ fontSize: 11, fontVariantNumeric: "tabular-nums", color: 'var(--loss)' }}>⚠</span>
        <span className="font-dm text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--loss)' }}>
          Immutable Audit Log
        </span>
        <span style={{ fontSize: 11, fontVariantNumeric: "tabular-nums" }}>
          Entries cannot be edited or deleted · Append-only · Compliance standard AGM-1
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
        <MetricCard label="Total Entries" value={String(auditLog.length)} badge="Since inception" />
        <MetricCard label="Trades Logged" value={String(counts.trade)} badge="All strategy actions" valueColor="var(--gold)" />
        <MetricCard label="Fee Events" value={String(counts.fee)} badge="Invoices + payments" valueColor="var(--gain)" />
        <MetricCard label="Statements" value={String(counts.statement)} badge="Generated + delivered" />
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid var(--bdr)' }}>
          {(['all', 'DL2503', 'SR2501', 'firm'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setClientFilter(f)}
              className="font-dm text-[10px] uppercase tracking-[0.14em]"
              style={{
                padding: '7px 12px 6px', background: 'none', border: 'none',
                borderBottom: clientFilter === f ? '2px solid var(--gold)' : '2px solid transparent',
                color: clientFilter === f ? 'var(--gold)' : 'var(--t3)', cursor: 'pointer',
              }}
            >
              {f === 'all' ? 'All' : f === 'firm' ? 'Firm-Level' : f}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid var(--bdr)' }}>
          {(['all', 'trade', 'fee', 'statement', 'client', 'message', 'order', 'system'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setCategoryFilter(f)}
              className="font-dm text-[10px] uppercase tracking-[0.14em]"
              style={{
                padding: '7px 10px 6px', background: 'none', border: 'none',
                borderBottom: categoryFilter === f ? '2px solid var(--gold)' : '2px solid transparent',
                color: categoryFilter === f ? 'var(--gold)' : 'var(--t3)', cursor: 'pointer',
              }}
            >
              {f === 'all' ? 'All Types' : (categoryConfig as Record<string, { label: string }>)[f]?.label ?? f}
            </button>
          ))}
        </div>
      </div>

      {/* Audit log entries */}
      <div className="ag-card">
        {visible.length === 0 ? (
          <div className="p-10 text-center font-dm text-[11px] text-[var(--t3)]">No entries match the selected filters</div>
        ) : (
          <div>
            {visible.map((entry, i) => {
              const { date, time } = formatTimestamp(entry.timestamp)
              const cat = categoryConfig[entry.category]
              const client = entry.clientId ? clients.find((c) => c.id === entry.clientId) : null
              const isExpanded = expanded === entry.id
              const hasDetail = !!(entry.before || entry.after || entry.detail.length > 80)
              return (
                <div
                  key={entry.id}
                  style={{ borderBottom: i < visible.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '130px 70px 80px 1fr auto',
                      gap: 0,
                      alignItems: 'center',
                      padding: '10px 14px',
                      cursor: hasDetail ? 'pointer' : 'default',
                    }}
                    onClick={() => hasDetail && setExpanded(isExpanded ? null : entry.id)}
                  >
                    {/* Timestamp */}
                    <div>
                      <p style={{ fontSize: 11, fontVariantNumeric: "tabular-nums" }}>{date}</p>
                      <p className="font-mono text-[9px] text-[var(--t3)]">{time} UTC</p>
                    </div>
                    {/* Category */}
                    <div>
                      <span
                        className="font-dm text-[9px] uppercase tracking-[0.1em] rounded px-1.5 py-0.5"
                        style={{ color: cat.color, background: `${cat.color}18` }}
                      >
                        {cat.label}
                      </span>
                    </div>
                    {/* Client */}
                    <div>
                      {client ? (
                        <span style={{ fontSize: 11, fontVariantNumeric: "tabular-nums", color: client.color }}>{client.id}</span>
                      ) : (
                        <span className="font-dm text-[9px] text-[var(--t3)]">—</span>
                      )}
                    </div>
                    {/* Action + detail preview */}
                    <div style={{ minWidth: 0 }}>
                      <p className="font-dm text-[11px] text-[var(--t1)] truncate">{entry.action}</p>
                      {!isExpanded && (
                        <p className="font-mono text-[9px] text-[var(--t3)] truncate">{entry.detail}</p>
                      )}
                    </div>
                    {/* Expand indicator */}
                    <div style={{ paddingLeft: 12 }}>
                      {hasDetail && (
                        <span style={{ fontSize: 11, fontVariantNumeric: "tabular-nums" }}>{isExpanded ? '▲' : '▼'}</span>
                      )}
                    </div>
                  </div>
                  {/* Expanded detail */}
                  {isExpanded && (
                    <div
                      style={{
                        padding: '0 14px 12px 224px',
                        display: 'grid',
                        gridTemplateColumns: entry.before ? '1fr 1fr 1fr' : '1fr',
                        gap: 12,
                      }}
                    >
                      <div>
                        <p className="font-dm text-[8px] uppercase tracking-[0.12em] text-[var(--t3)] mb-1">Detail</p>
                        <p style={{ fontSize: 11, fontVariantNumeric: "tabular-nums" }}>{entry.detail}</p>
                        <p className="font-dm text-[9px] text-[var(--t3)] mt-1">Actor: {entry.actor}</p>
                      </div>
                      {entry.before && (
                        <div>
                          <p className="font-dm text-[8px] uppercase tracking-[0.12em] mb-1" style={{ color: 'var(--loss)' }}>Before</p>
                          <p style={{ fontSize: 11, fontVariantNumeric: "tabular-nums" }}>{entry.before}</p>
                        </div>
                      )}
                      {entry.after && (
                        <div>
                          <p className="font-dm text-[8px] uppercase tracking-[0.12em] mb-1" style={{ color: 'var(--gain)' }}>After</p>
                          <p style={{ fontSize: 11, fontVariantNumeric: "tabular-nums" }}>{entry.after}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div
        className="flex items-center justify-between rounded-[var(--radius-sm)] border border-[var(--bdr)] bg-[var(--bg-card)] px-4 py-3"
        style={{ opacity: 0.8 }}
      >
        <span className="font-dm text-[10px] uppercase tracking-[0.14em] text-[var(--t3)]">
          Showing {visible.length} of {auditLog.length} entries
        </span>
        <span style={{ fontSize: 11, fontVariantNumeric: "tabular-nums" }}>
          Entries signed: SHA-256 · Compliant with AGM-1
        </span>
      </div>
    </div>
  )
}
