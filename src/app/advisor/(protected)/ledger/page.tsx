'use client'

import { useState } from 'react'
import MetricCard from '@/components/advisor/MetricCard'
import { ledger, getTotalDeposited, getTotalFeesCollected } from '@/lib/mock-data/ledger'
import { formatCurrency } from '@/lib/formatters'

type ClientFilter = 'all' | 'SR2501' | 'DL2503'
type TypeFilter = 'all' | 'deposit' | 'withdrawal' | 'fee'

const methodLabel: Record<string, string> = {
  cash_app: 'Cash App',
  wire: 'Wire',
  ach: 'ACH',
  zelle: 'Zelle',
  check: 'Check',
  internal: 'Internal',
}

export default function LedgerPage() {
  const [clientFilter, setClientFilter] = useState<ClientFilter>('all')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')

  const visible = ledger.filter((entry) => {
    if (clientFilter !== 'all' && entry.clientId !== clientFilter) return false
    if (typeFilter !== 'all' && entry.type !== typeFilter) return false
    return true
  })

  const totalDeposits = ledger.filter((e) => e.type === 'deposit').reduce((s, e) => s + e.amount, 0)
  const totalFees = ledger.filter((e) => e.type === 'fee' && e.amount < 0).reduce((s, e) => s + Math.abs(e.amount), 0)
  const outstanding = ledger.filter((e) => e.notes.includes('OUTSTANDING')).reduce((s, e) => s + Math.abs(e.amount), 0)

  return (
    <div className="ag-page" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <header className="ag-ph">
        <p className="ag-ph-ey">Accounting · Auditable</p>
        <h1 className="ag-ph-h">Deposit & Withdrawal Ledger</h1>
        <p className="ag-ph-s">Immutable record of all client cash movements · Deposits · Fees · Withdrawals</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
        <MetricCard
          label="Total Deposited"
          value={formatCurrency(totalDeposits)}
          badge="All clients combined"
          badgeVariant="gain"
          accent
        />
        <MetricCard
          label="Total Fees Collected"
          value={formatCurrency(totalFees - outstanding)}
          valueColor="var(--gain)"
          badge="Management fees received"
          badgeVariant="gain"
        />
        <MetricCard
          label="Fees Outstanding"
          value={formatCurrency(outstanding)}
          valueColor={outstanding > 0 ? 'var(--loss)' : 'var(--gain)'}
          badge={outstanding > 0 ? 'DL2503 · Due Dec 5' : 'All clear'}
          badgeVariant={outstanding > 0 ? 'loss' : 'gain'}
        />
        <MetricCard
          label="Ledger Entries"
          value={String(ledger.length)}
          badge="Complete audit trail"
        />
      </div>

      {/* Per-client summary */}
      <div className="grid gap-3 md:grid-cols-2">
        {(['SR2501', 'DL2503'] as const).map((id) => {
          const name = id === 'SR2501' ? 'Rehan Shaikh' : 'David Low'
          const color = id === 'SR2501' ? '#7F77DD' : '#378ADD'
          const deposited = getTotalDeposited(id)
          const feesCollected = getTotalFeesCollected(id)
          const entries = ledger.filter((e) => e.clientId === id)
          return (
            <div
              key={id}
              className="ag-card"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: `${color}22`,
                    color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 600,
                  }}
                >
                  {id === 'SR2501' ? 'RS' : 'DL'}
                </div>
                <div>
                  <p className="font-dm text-[12px] text-[var(--t1)]">{name}</p>
                  <p className="font-mono text-[9px] text-[var(--t3)]">{id}</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <p style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--t3)" }}>Deposited</p>
                  <p className="font-mono text-[13px] text-[var(--t1)] font-semibold">{formatCurrency(deposited)}</p>
                </div>
                <div>
                  <p style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--t3)" }}>Fees Collected</p>
                  <p className="font-mono text-[13px]" style={{ color: 'var(--gain)', fontWeight: 600 }}>
                    {formatCurrency(feesCollected)}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--t3)" }}>Entries</p>
                  <p className="font-mono text-[13px] text-[var(--t1)] font-semibold">{entries.length}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid var(--bdr)' }}>
          {(['all', 'SR2501', 'DL2503'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setClientFilter(f)}
              className="font-dm text-[10px] uppercase tracking-[0.14em]"
              style={{
                padding: '7px 12px 6px',
                background: 'none',
                border: 'none',
                borderBottom: clientFilter === f ? '2px solid var(--gold)' : '2px solid transparent',
                color: clientFilter === f ? 'var(--gold)' : 'var(--t3)',
                cursor: 'pointer',
              }}
            >
              {f === 'all' ? 'All Clients' : f}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid var(--bdr)' }}>
          {(['all', 'deposit', 'fee', 'withdrawal'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setTypeFilter(f)}
              className="font-dm text-[10px] uppercase tracking-[0.14em]"
              style={{
                padding: '7px 12px 6px',
                background: 'none',
                border: 'none',
                borderBottom: typeFilter === f ? '2px solid var(--gold)' : '2px solid transparent',
                color: typeFilter === f ? 'var(--gold)' : 'var(--t3)',
                cursor: 'pointer',
              }}
            >
              {f === 'all' ? 'All Types' : f.charAt(0).toUpperCase() + f.slice(1) + 's'}
            </button>
          ))}
        </div>
      </div>

      {/* Ledger table */}
      <div className="ag-card">
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--bdr)' }}>
              {['Date', 'Client', 'Type', 'Amount', 'Method', 'Reference', 'Running Balance', 'Notes'].map((h) => (
                <th
                  key={h}
                  style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--t3)", padding: '10px 14px', textAlign: 'left', fontWeight: 500 }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...visible].reverse().map((entry) => {
              const isOutstanding = entry.notes.includes('OUTSTANDING')
              return (
                <tr
                  key={entry.id}
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                    background: isOutstanding ? 'rgba(212,75,58,0.04)' : 'transparent',
                  }}
                >
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{ fontSize: 11, fontVariantNumeric: "tabular-nums" }}>{entry.date}</span>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <span
                      style={{ fontSize: 11, fontVariantNumeric: "tabular-nums", color: entry.clientId === 'SR2501' ? '#7F77DD' : '#378ADD' }}
                    >
                      {entry.clientId}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <span
                      className="font-dm text-[9px] uppercase tracking-[0.1em] rounded px-1.5 py-0.5"
                      style={{
                        color:
                          entry.type === 'deposit'
                            ? 'var(--gain)'
                            : entry.type === 'withdrawal'
                              ? 'var(--loss)'
                              : isOutstanding
                                ? 'var(--loss)'
                                : 'var(--t3)',
                        background:
                          entry.type === 'deposit'
                            ? 'var(--gain-bg)'
                            : entry.type === 'withdrawal'
                              ? 'var(--loss-bg)'
                              : isOutstanding
                                ? 'var(--loss-bg)'
                                : 'rgba(255,255,255,0.04)',
                      }}
                    >
                      {entry.type}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <span
                      style={{ fontSize: 11, fontVariantNumeric: "tabular-nums", color:
                          entry.amount > 0
                            ? 'var(--gain)'
                            : isOutstanding
                              ? 'var(--loss)'
                              : 'var(--t2)' }}
                    >
                      {entry.amount > 0 ? '+' : ''}
                      {formatCurrency(entry.amount)}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <span className="font-dm text-[10px] text-[var(--t3)]">
                      {methodLabel[entry.method] ?? entry.method}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <span className="font-mono text-[9px] text-[var(--t3)]">{entry.reference}</span>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{ fontSize: 11, fontVariantNumeric: "tabular-nums" }}>
                      {formatCurrency(entry.runningBalance)}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', maxWidth: 260 }}>
                    <span className="font-dm text-[10px] leading-[1.5] text-[var(--t3)]">
                      {entry.notes}
                    </span>
                    {isOutstanding && (
                      <span
                        className="ml-2 font-dm text-[8px] uppercase tracking-[0.1em] rounded px-1.5 py-0.5"
                        style={{ background: 'var(--loss-bg)', color: 'var(--loss)' }}
                      >
                        Outstanding
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
