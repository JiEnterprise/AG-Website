'use client'

import { useMemo, useState } from 'react'
import PageHeader from '@/components/advisor/PageHeader'
import TradeRow from '@/components/advisor/TradeRow'
import { allTrades } from '@/lib/advisorMetrics'
import { formatCurrency } from '@/lib/formatters'

type FilterClient = 'all' | 'DL2503' | 'SR2501'
type FilterType = 'all' | 'BUY' | 'SELL' | 'DIV'

export default function TradesPage() {
  const [client, setClient] = useState<FilterClient>('all')
  const [type, setType] = useState<FilterType>('all')
  const [query, setQuery] = useState('')

  const filteredTrades = useMemo(() => {
    return allTrades
      .filter((trade) => (client === 'all' ? true : trade.clientId === client))
      .filter((trade) => (type === 'all' ? true : trade.type === type))
      .filter((trade) => (query ? trade.symbol.toLowerCase().includes(query.toLowerCase()) : true))
      .sort((a, b) => b.date.localeCompare(a.date))
  }, [client, type, query])

  const novRealized = filteredTrades
    .filter((trade) => trade.gain !== null && trade.date.startsWith('2025-11'))
    .reduce((sum, trade) => sum + (trade.gain ?? 0), 0)

  const totalFees = filteredTrades.reduce((sum, trade) => sum + trade.transactionFee, 0)

  const pillClass = (active: boolean) =>
    `rounded-full border px-2 py-1 font-dm text-[9px] uppercase tracking-[0.12em] ${active ? 'border-[var(--gold)] text-[var(--gold)] bg-[var(--gold-dim)]' : 'border-[var(--bdr)] text-[var(--t3)]'}`

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Execution history"
        title="Trade Log"
        subtitle="All executed orders across managed accounts"
      />

      <section className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-3">
        <div className="flex flex-wrap items-center gap-2">
          <button className={pillClass(client === 'all')} onClick={() => setClient('all')}>All</button>
          <button className={pillClass(client === 'DL2503')} onClick={() => setClient('DL2503')}>DL2503</button>
          <button className={pillClass(client === 'SR2501')} onClick={() => setClient('SR2501')}>SR2501</button>
          <button className={pillClass(type === 'BUY')} onClick={() => setType((prev) => (prev === 'BUY' ? 'all' : 'BUY'))}>BUY</button>
          <button className={pillClass(type === 'SELL')} onClick={() => setType((prev) => (prev === 'SELL' ? 'all' : 'SELL'))}>SELL</button>
          <button className={pillClass(type === 'DIV')} onClick={() => setType((prev) => (prev === 'DIV' ? 'all' : 'DIV'))}>DIV</button>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol..."
            className="ml-auto h-8 rounded-[var(--radius-sm)] border border-[var(--bdr)] bg-[var(--bg-input)] px-2 font-mono text-[10px] text-[var(--t2)] outline-none focus:border-[var(--gold-border)]"
          />
        </div>
      </section>

      <section className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)]">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.05)] text-left">
              <th className="px-3 pb-2 pt-3 font-dm text-[9px] uppercase tracking-[0.16em] text-[var(--t3)]">Symbol</th>
              <th className="px-3 pb-2 pt-3 font-dm text-[9px] uppercase tracking-[0.16em] text-[var(--t3)]">Type</th>
              <th className="px-3 pb-2 pt-3 font-dm text-[9px] uppercase tracking-[0.16em] text-[var(--t3)]">Description</th>
              <th className="px-3 pb-2 pt-3 font-dm text-[9px] uppercase tracking-[0.16em] text-[var(--t3)]">Client</th>
              <th className="px-3 pb-2 pt-3 font-dm text-[9px] uppercase tracking-[0.16em] text-[var(--t3)]">P&L</th>
              <th className="px-3 pb-2 pt-3 font-dm text-[9px] uppercase tracking-[0.16em] text-[var(--t3)]">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrades.map((trade) => (
              <TradeRow key={trade.id} trade={trade} />
            ))}
          </tbody>
        </table>
        <div className="border-t border-[rgba(255,255,255,0.05)] px-3 py-2 font-dm text-[10px] text-[var(--t3)]">
          Total trades: <span className="text-[var(--t1)]">{filteredTrades.length}</span> · Nov realized (both clients):
          <span className="text-[var(--gain)]"> +{formatCurrency(novRealized)}</span> · Total fees:
          <span className="text-[var(--loss)]"> {formatCurrency(totalFees)}</span>
        </div>
      </section>
    </div>
  )
}
