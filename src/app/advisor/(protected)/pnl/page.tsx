'use client'

import { useState, useEffect } from 'react'
import PageHeader from '@/components/advisor/PageHeader'
import MetricCard from '@/components/advisor/MetricCard'
import { clients, accountSnapshots } from '@/lib/mock-data/clients'
import { personalAccount, personalPositions } from '@/lib/mock-data/personal'
import { formatCurrency } from '@/lib/formatters'

type BlotterRow = {
  account: string
  accountType: 'client' | 'personal'
  symbol: string
  shares: number
  entryPrice: number
  currentPrice: number
  strategy: string
  entryDate: string
}

// Build blotter from all accounts (Position type uses avgCost; both clients currently in cash)
const clientPositions: BlotterRow[] = accountSnapshots.flatMap((snap) =>
  snap.openPositions.map((pos) => {
    const client = clients.find((c) => c.id === snap.clientId)
    return {
      account: `${client?.name ?? snap.clientId} (${snap.clientId})`,
      accountType: 'client' as const,
      symbol: pos.symbol,
      shares: pos.shares,
      entryPrice: pos.avgCost,
      currentPrice: pos.currentPrice,
      strategy: 'AGQuant',
      entryDate: snap.asOf,
    }
  })
)

const personalBlotterRows: BlotterRow[] = personalPositions.map((pos) => ({
  account: 'Saswat C. (SC001)',
  accountType: 'personal',
  symbol: pos.symbol,
  shares: pos.shares,
  entryPrice: pos.entryPrice,
  currentPrice: pos.currentPrice,
  strategy: pos.strategy,
  entryDate: pos.entryDate,
}))

const allPositions: BlotterRow[] = [...clientPositions, ...personalBlotterRows]

export default function PnlPage() {
  const [prices, setPrices] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {}
    allPositions.forEach((p) => {
      map[`${p.account}::${p.symbol}`] = p.currentPrice
    })
    return map
  })

  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)

  useEffect(() => {
    setLastRefresh(new Date())
  }, [])
  const [filter, setFilter] = useState<'all' | 'client' | 'personal'>('all')

  // Simulate 15s WebSocket feed with micro price drift
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) => {
        const next = { ...prev }
        Object.keys(next).forEach((key) => {
          const delta = (Math.random() * 2 - 1) * 0.05
          next[key] = Math.max(0.01, Number((prev[key] + delta).toFixed(2)))
        })
        return next
      })
      setLastRefresh(new Date())
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  const visible = allPositions.filter(
    (p) => filter === 'all' || p.accountType === filter
  )

  const totalUnrealized = visible.reduce((sum, pos) => {
    const cur = prices[`${pos.account}::${pos.symbol}`] ?? pos.currentPrice
    return sum + (cur - pos.entryPrice) * pos.shares
  }, 0)

  const totalPositionValue = visible.reduce((sum, pos) => {
    const cur = prices[`${pos.account}::${pos.symbol}`] ?? pos.currentPrice
    return sum + cur * pos.shares
  }, 0)

  const winners = visible.filter((pos) => {
    const cur = prices[`${pos.account}::${pos.symbol}`] ?? pos.currentPrice
    return cur > pos.entryPrice
  }).length

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Live P&L · All accounts"
        title="Position Blotter"
        subtitle="Real-time unrealized P&L across all accounts · Updates every 15s"
      />

      {/* Live status bar */}
      <div
        className="flex items-center justify-between rounded-[var(--radius-sm)] border px-4 py-2"
        style={{ borderColor: 'rgba(201,168,76,0.2)', background: 'var(--gold-dim)' }}
      >
        <div className="flex items-center gap-3">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{
              background: 'var(--gain)',
              boxShadow: '0 0 6px var(--gain)',
              animation: 'pulse 2s infinite',
            }}
          />
          <span className="font-dm text-[10px] uppercase tracking-[0.14em] text-[var(--gold)]">
            Live Feed Active
          </span>
          <span className="font-mono text-[10px] text-[var(--t3)]">
            Last update: {lastRefresh ? lastRefresh.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '—'}
          </span>
        </div>
        <span className="font-mono text-[10px] text-[var(--t3)]">15s refresh · Alpaca WebSocket</span>
      </div>

      {/* Summary metrics */}
      <section className="mrow">
        <MetricCard
          label="Total Unrealized P&L"
          value={`${totalUnrealized >= 0 ? '+' : ''}${formatCurrency(totalUnrealized)}`}
          valueColor={totalUnrealized >= 0 ? 'var(--gain)' : 'var(--loss)'}
          badge={`${visible.length} open positions`}
        />
        <MetricCard
          label="Position Value"
          value={formatCurrency(totalPositionValue)}
          badge="Market value of open book"
        />
        <MetricCard
          label="Win Rate"
          value={`${visible.length > 0 ? Math.round((winners / visible.length) * 100) : 0}%`}
          valueColor="var(--gain)"
          badge={`${winners}/${visible.length} positions positive`}
        />
        <MetricCard
          label="Accounts"
          value="3"
          badge="DL2503 · SR2501 · SC001"
        />
      </section>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid var(--bdr)', marginBottom: -4 }}>
        {(['all', 'client', 'personal'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="font-dm text-[10px] uppercase tracking-[0.14em]"
            style={{
              padding: '8px 14px 7px',
              background: 'none',
              border: 'none',
              borderBottom: filter === f ? '2px solid var(--gold)' : '2px solid transparent',
              color: filter === f ? 'var(--gold)' : 'var(--t3)',
              cursor: 'pointer',
            }}
          >
            {f === 'all' ? 'All Accounts' : f === 'client' ? 'Client Accounts' : 'Personal (SC001)'}
          </button>
        ))}
      </div>

      {/* Blotter table */}
      <article className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] overflow-x-auto">
        {visible.length === 0 ? (
          <div className="p-10 text-center font-dm text-[11px] text-[var(--t3)]">
            No open positions in selected accounts
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--bdr)' }}>
                {['Account', 'Symbol', 'Shares', 'Entry', 'Current', '$ P&L', '% P&L', 'Strategy', 'Days Held'].map(
                  (h) => (
                    <th
                      key={h}
                      className="font-dm text-[9px] uppercase tracking-[0.14em] text-[var(--t3)]"
                      style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 500 }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {visible.map((pos, i) => {
                const cur = prices[`${pos.account}::${pos.symbol}`] ?? pos.currentPrice
                const dollarPnl = (cur - pos.entryPrice) * pos.shares
                const pctPnl = ((cur - pos.entryPrice) / pos.entryPrice) * 100
                const days = Math.floor(
                  (new Date('2025-11-28').getTime() - new Date(pos.entryDate).getTime()) / 86400000
                )
                const accentColor = pos.accountType === 'personal' ? '#A0A0BE' : 'var(--gold)'
                return (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '10px 14px' }}>
                      <span className="font-dm text-[10px]" style={{ color: accentColor }}>
                        {pos.account}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span className="font-mono text-[11px] font-semibold text-[var(--t1)]">{pos.symbol}</span>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span className="font-mono text-[11px] text-[var(--t2)]">{pos.shares}</span>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span className="font-mono text-[11px] text-[var(--t2)]">${pos.entryPrice.toFixed(2)}</span>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span className="font-mono text-[11px] text-[var(--t1)]">${cur.toFixed(2)}</span>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span
                        className="font-mono text-[11px] font-semibold"
                        style={{ color: dollarPnl >= 0 ? 'var(--gain)' : 'var(--loss)' }}
                      >
                        {dollarPnl >= 0 ? '+' : ''}{formatCurrency(dollarPnl)}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span
                        className="font-mono text-[10px]"
                        style={{ color: pctPnl >= 0 ? 'var(--gain)' : 'var(--loss)' }}
                      >
                        {pctPnl >= 0 ? '+' : ''}{pctPnl.toFixed(2)}%
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span className="font-dm text-[10px] text-[var(--t3)]">{pos.strategy}</span>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span className="font-mono text-[10px] text-[var(--t3)]">{days}d</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </article>

      {/* Combined book value footer */}
      <div
        className="flex items-center justify-between rounded-[var(--radius-sm)] border border-[var(--bdr)] bg-[var(--bg-card)] px-4 py-3"
        style={{ opacity: 0.8 }}
      >
        <span className="font-dm text-[10px] uppercase tracking-[0.14em] text-[var(--t3)]">
          Combined book — all accounts
        </span>
        <div className="flex items-center gap-6">
          <span className="font-mono text-[10px] text-[var(--t3)]">
            Personal: {formatCurrency(personalAccount.currentAUM)} AUM
          </span>
          <span className="font-mono text-[10px] text-[var(--t3)]">
            Clients: {formatCurrency(clients.reduce((s, c) => s + c.currentAUM, 0))} AUM
          </span>
          <span className="font-mono text-[11px] font-semibold" style={{ color: 'var(--gold)' }}>
            Total: {formatCurrency(personalAccount.currentAUM + clients.reduce((s, c) => s + c.currentAUM, 0))}
          </span>
        </div>
      </div>
    </div>
  )
}
