'use client'

import { useMemo, useState } from 'react'
import TradeRow from '@/components/advisor/TradeRow'
import { allTrades } from '@/lib/advisorMetrics'
import { allClients } from '@/lib/advisorMetrics'
import { formatCurrency } from '@/lib/formatters'

type FilterType = 'all' | 'BUY' | 'SELL' | 'DIV'

export default function TradesPage() {
  const [clientId, setClientId] = useState('all')
  const [type,     setType]     = useState<FilterType>('all')
  const [query,    setQuery]    = useState('')

  const filteredTrades = useMemo(() =>
    allTrades
      .filter((t) => clientId === 'all' || t.clientId === clientId)
      .filter((t) => type === 'all' || t.type === type)
      .filter((t) => !query || t.symbol.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => b.date.localeCompare(a.date)),
    [clientId, type, query]
  )

  const totalGain = filteredTrades.reduce((s, t) => s + (t.gain ?? 0), 0)
  const totalFees = filteredTrades.reduce((s, t) => s + t.transactionFee, 0)

  const pill = (active: boolean) => ({
    display: 'inline-flex', alignItems: 'center', padding: '4px 10px',
    borderRadius: 20, fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
    textTransform: 'uppercase' as const, cursor: 'pointer', border: 'none',
    background: active ? 'var(--gold-dim)' : 'transparent',
    color:      active ? 'var(--gold)'     : 'var(--t3)',
    outline:    active ? '1px solid var(--bdr-gold)' : '1px solid var(--bdr)',
  })

  return (
    <div className="ag-page">
      <header className="ag-ph" style={{ marginBottom: 20 }}>
        <p className="ag-ph-ey">Execution History</p>
        <h1 className="ag-ph-h">Trade Log</h1>
        <p className="ag-ph-s">All executed orders across managed accounts · {filteredTrades.length} trades shown</p>
      </header>

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 16 }}>
        <div className="ag-kpi">
          <div className="ag-kpi-label">Trades shown</div>
          <div className="ag-kpi-value">{filteredTrades.length}</div>
        </div>
        <div className="ag-kpi">
          <div className="ag-kpi-label">Realized gain</div>
          <div className="ag-kpi-value" style={{ color: totalGain >= 0 ? 'var(--gain)' : 'var(--loss)', fontSize: 18 }}>
            {totalGain >= 0 ? '+' : ''}{formatCurrency(totalGain)}
          </div>
        </div>
        <div className="ag-kpi">
          <div className="ag-kpi-label">Total fees</div>
          <div className="ag-kpi-value" style={{ color: 'var(--loss)', fontSize: 18 }}>{formatCurrency(totalFees)}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="ag-card" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', flexWrap: 'wrap' }}>
          <button style={pill(clientId === 'all')} onClick={() => setClientId('all')}>All</button>
          {allClients.map((c) => (
            <button key={c.id} style={pill(clientId === c.id)} onClick={() => setClientId(c.id)}>{c.id}</button>
          ))}
          <div style={{ width: 1, height: 20, background: 'var(--bdr)', margin: '0 4px' }} />
          {(['BUY', 'SELL', 'DIV'] as FilterType[]).map((t) => (
            <button key={t} style={pill(type === t)} onClick={() => setType((prev) => prev === t ? 'all' : t)}>{t}</button>
          ))}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol…"
            className="ag-input"
            style={{ marginLeft: 'auto', width: 140, height: 30 }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="ag-card">
        <div style={{ overflowX: 'auto' }}>
          <table className="ag-table" style={{ minWidth: 700 }}>
            <thead>
              <tr>
                <th>Symbol</th><th>Type</th><th>Description</th><th>Client</th><th>P&amp;L</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrades.map((trade) => <TradeRow key={trade.id} trade={trade} />)}
            </tbody>
          </table>
        </div>
        {filteredTrades.length === 0 && (
          <div className="ag-empty"><span className="ag-empty-label">No trades match filters</span></div>
        )}
      </div>
    </div>
  )
}
