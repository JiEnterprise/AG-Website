'use client'

import { useState } from 'react'
import PageHeader from '@/components/advisor/PageHeader'
import MetricCard from '@/components/advisor/MetricCard'
import { complianceItems, getComplianceScore, type ComplianceItem, type ComplianceStatus } from '@/lib/mock-data/compliance'
import { clients } from '@/lib/mock-data/clients'

type ClientFilter = 'all' | 'DL2503' | 'SR2501'
type CategoryFilter = 'all' | 'onboarding' | 'ongoing' | 'annual' | 'regulatory'

const categoryLabel: Record<string, string> = {
  onboarding: 'Onboarding',
  ongoing: 'Ongoing',
  annual: 'Annual',
  regulatory: 'Regulatory',
}

const statusConfig: Record<ComplianceStatus, { label: string; color: string; bg: string }> = {
  complete: { label: 'Complete', color: 'var(--gain)', bg: 'var(--gain-bg)' },
  pending: { label: 'Pending', color: 'var(--gold)', bg: 'rgba(107,107,107,0.1)' },
  overdue: { label: 'Overdue', color: 'var(--loss)', bg: 'var(--loss-bg)' },
  na: { label: 'N/A', color: 'var(--t3)', bg: 'rgba(255,255,255,0.04)' },
}

function ScoreBar({ complete, total }: { complete: number; total: number }) {
  const pct = total > 0 ? (complete / total) * 100 : 0
  const color = pct === 100 ? 'var(--gain)' : pct >= 70 ? 'var(--gold)' : 'var(--loss)'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 4, background: 'var(--bg-inset)', borderRadius: 2 }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 2, transition: 'width 0.4s' }} />
      </div>
      <span className="font-mono text-[9px]" style={{ color, minWidth: 32 }}>{complete}/{total}</span>
    </div>
  )
}

export default function CompliancePage() {
  const [clientFilter, setClientFilter] = useState<ClientFilter>('all')
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')

  const scores = {
    DL2503: getComplianceScore('DL2503'),
    SR2501: getComplianceScore('SR2501'),
  }

  const totalItems = complianceItems.filter((i) => i.status !== 'na').length
  const totalComplete = complianceItems.filter((i) => i.status === 'complete').length
  const totalOverdue = complianceItems.filter((i) => i.status === 'overdue').length
  const totalPending = complianceItems.filter((i) => i.status === 'pending').length

  const visible = complianceItems.filter((item) => {
    if (clientFilter !== 'all' && item.clientId !== clientFilter) return false
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false
    return true
  })

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Compliance · Per-Client"
        title="Compliance Checklist"
        subtitle="Green/red status board · Onboarding · Ongoing · Annual · Regulatory"
      />

      <section className="mrow">
        <MetricCard
          label="Firm-Wide Score"
          value={`${Math.round((totalComplete / totalItems) * 100)}%`}
          valueColor={totalComplete === totalItems ? 'var(--gain)' : 'var(--gold)'}
          badge={`${totalComplete}/${totalItems} items complete`}
        />
        <MetricCard
          label="Overdue Items"
          value={String(totalOverdue)}
          valueColor={totalOverdue > 0 ? 'var(--loss)' : 'var(--gain)'}
          badge={totalOverdue > 0 ? 'Action required' : 'All clear'}
          badgeVariant={totalOverdue > 0 ? 'loss' : 'gain'}
        />
        <MetricCard
          label="Pending Items"
          value={String(totalPending)}
          valueColor="var(--gold)"
          badge="Upcoming obligations"
        />
        <MetricCard
          label="Clients Tracked"
          value="2"
          badge="DL2503 · SR2501"
        />
      </section>

      {/* Per-client score cards */}
      <div className="grid gap-3 md:grid-cols-2">
        {clients.map((client) => {
          const score = scores[client.id as 'DL2503' | 'SR2501']
          const pct = score.total > 0 ? Math.round((score.complete / score.total) * 100) : 0
          const scoreColor = pct === 100 ? 'var(--gain)' : pct >= 70 ? 'var(--gold)' : 'var(--loss)'
          return (
            <article
              key={client.id}
              className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div
                  style={{
                    width: 32, height: 32, borderRadius: 7,
                    background: `${client.color}22`, color: client.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)',
                  }}
                >
                  {client.initials}
                </div>
                <div>
                  <p className="font-dm text-[12px] text-[var(--t1)]">{client.name}</p>
                  <p className="font-mono text-[9px] text-[var(--t3)]">{client.id}</p>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <p className="font-mono text-[16px] font-bold" style={{ color: scoreColor }}>{pct}%</p>
                  <p className="font-dm text-[8px] uppercase tracking-[0.1em] text-[var(--t3)]">compliance</p>
                </div>
              </div>
              <ScoreBar complete={score.complete} total={score.total} />
              {score.overdue > 0 && (
                <p className="font-dm text-[9px] mt-2" style={{ color: 'var(--loss)' }}>
                  {score.overdue} overdue item{score.overdue > 1 ? 's' : ''} — action required
                </p>
              )}
            </article>
          )
        })}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid var(--bdr)' }}>
          {(['all', 'DL2503', 'SR2501'] as const).map((f) => (
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
              {f === 'all' ? 'All Clients' : f}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid var(--bdr)' }}>
          {(['all', 'onboarding', 'ongoing', 'annual', 'regulatory'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setCategoryFilter(f)}
              className="font-dm text-[10px] uppercase tracking-[0.14em]"
              style={{
                padding: '7px 12px 6px', background: 'none', border: 'none',
                borderBottom: categoryFilter === f ? '2px solid var(--gold)' : '2px solid transparent',
                color: categoryFilter === f ? 'var(--gold)' : 'var(--t3)', cursor: 'pointer',
              }}
            >
              {f === 'all' ? 'All Categories' : categoryLabel[f]}
            </button>
          ))}
        </div>
      </div>

      {/* Compliance table */}
      <article className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] overflow-x-auto">
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--bdr)' }}>
              {['Status', 'Client', 'Category', 'Requirement', 'Completed', 'Due Date', 'Notes'].map((h) => (
                <th
                  key={h}
                  className="font-dm text-[9px] uppercase tracking-[0.14em] text-[var(--t3)]"
                  style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 500 }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((item: ComplianceItem) => {
              const cfg = statusConfig[item.status]
              const client = clients.find((c) => c.id === item.clientId)
              return (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                    background: item.status === 'overdue' ? 'rgba(212,75,58,0.03)' : 'transparent',
                  }}
                >
                  <td style={{ padding: '10px 14px' }}>
                    <span
                      className="font-dm text-[9px] uppercase tracking-[0.1em] rounded px-1.5 py-0.5"
                      style={{ color: cfg.color, background: cfg.bg }}
                    >
                      {cfg.label}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <span className="font-mono text-[10px]" style={{ color: client?.color ?? 'var(--t2)' }}>
                      {item.clientId}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <span className="font-dm text-[9px] uppercase tracking-[0.08em] text-[var(--t3)]">
                      {categoryLabel[item.category]}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', maxWidth: 260 }}>
                    <span className="font-dm text-[11px] text-[var(--t1)]">{item.label}</span>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <span className="font-mono text-[10px] text-[var(--t3)]">
                      {item.completedDate ?? '—'}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <span
                      className="font-mono text-[10px]"
                      style={{ color: item.status === 'overdue' ? 'var(--loss)' : 'var(--t3)' }}
                    >
                      {item.dueDate ?? '—'}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', maxWidth: 220 }}>
                    <span className="font-dm text-[10px] leading-[1.5] text-[var(--t3)]">
                      {item.notes ?? '—'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </article>

      <div
        className="flex items-center justify-between rounded-[var(--radius-sm)] border border-[var(--bdr)] bg-[var(--bg-card)] px-4 py-3"
        style={{ opacity: 0.8 }}
      >
        <span className="font-dm text-[10px] uppercase tracking-[0.14em] text-[var(--t3)]">
          Compliance framework — Aurum Global Inc.
        </span>
        <span className="font-mono text-[10px] text-[var(--t3)]">
          {totalItems} total requirements · Updated quarterly
        </span>
      </div>
    </div>
  )
}
