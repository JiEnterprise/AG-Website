'use client'

import { useState } from 'react'
import MetricCard from '@/components/advisor/MetricCard'
import {
  personalAccount,
  personalPositions,
  personalTrades,
  personalMonthlyReturns,
} from '@/lib/mock-data/personal'
import { formatCurrency, formatPercent } from '@/lib/formatters'

function unrealizedPnl(pos: typeof personalPositions[0]) {
  return (pos.currentPrice - pos.entryPrice) * pos.shares
}

function unrealizedPct(pos: typeof personalPositions[0]) {
  return ((pos.currentPrice - pos.entryPrice) / pos.entryPrice) * 100
}

export default function PersonalPage() {
  const [tab, setTab] = useState<'positions' | 'history' | 'monthly'>('positions')

  const totalUnrealized = personalPositions.reduce((sum, p) => sum + unrealizedPnl(p), 0)
  const positionValue = personalPositions.reduce((sum, p) => sum + p.currentPrice * p.shares, 0)

  return (
    <div className="ag-page" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <header className="ag-ph">
        <p className="ag-ph-ey">Personal Account</p>
        <h1 className="ag-ph-h">SC001 — Saswat C.</h1>
        <p className="ag-ph-s">Personal portfolio managed alongside client accounts</p>
      </header>

      {/* Firewall notice */}
      <div
        className="rounded-[var(--radius-sm)] border px-4 py-3 font-dm text-[11px] leading-[1.6] text-[var(--t2)]"
        style={{
          borderColor: 'rgba(160,160,190,0.2)',
          background: 'rgba(160,160,190,0.04)',
        }}
      >
        <span
          className="mr-2 font-dm text-[9px] uppercase tracking-[0.16em]"
          style={{ color: '#A0A0BE' }}
        >
          Firewall Active
        </span>
        This account is completely separate from DL2503 and SR2501 client capital. No client funds are mixed with personal positions.
      </div>

      {/* Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
        <MetricCard
          label="Personal AUM"
          value={formatCurrency(personalAccount.currentAUM)}
          badge={`+${formatCurrency(personalAccount.allTimeReturn)} (${formatPercent(personalAccount.allTimeReturnPct)})`}
          badgeVariant="gain"
          accent
        />
        <MetricCard
          label="Unrealized P&L"
          value={totalUnrealized >= 0 ? `+${formatCurrency(totalUnrealized)}` : formatCurrency(totalUnrealized)}
          valueColor={totalUnrealized >= 0 ? 'var(--gain)' : 'var(--loss)'}
          badge={`${personalAccount.openPositions} open positions`}
        />
        <MetricCard
          label="Cash Available"
          value={formatCurrency(personalAccount.cashBalance)}
          badge="Ready to deploy"
          badgeVariant="gain"
        />
        <MetricCard
          label="All-Time Dividends"
          value={formatCurrency(personalAccount.totalDividends)}
          badge="Income earned"
          badgeVariant="gain"
        />
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 2,
          borderBottom: '1px solid var(--bdr)',
          marginBottom: -4,
        }}
      >
        {(['positions', 'history', 'monthly'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="font-dm text-[10px] uppercase tracking-[0.14em]"
            style={{
              padding: '8px 14px 7px',
              background: 'none',
              border: 'none',
              borderBottom: tab === t ? '2px solid var(--gold)' : '2px solid transparent',
              color: tab === t ? 'var(--gold)' : 'var(--t3)',
              cursor: 'pointer',
              transition: 'color 0.12s',
            }}
          >
            {t === 'positions' ? 'Open Positions' : t === 'history' ? 'Trade History' : 'Monthly Returns'}
          </button>
        ))}
      </div>

      {/* Open Positions */}
      {tab === 'positions' && (
        <article className="ag-card">
          {personalPositions.length === 0 ? (
            <div className="p-8 text-center font-dm text-[11px] text-[var(--t3)]">No open positions — fully in cash</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--bdr)' }}>
                  {['Symbol', 'Shares', 'Entry', 'Current', 'Unrlz P&L', 'Days', 'Strategy'].map((h) => (
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
                {personalPositions.map((pos) => {
                  const upnl = unrealizedPnl(pos)
                  const upct = unrealizedPct(pos)
                  const days = Math.floor(
                    (new Date('2025-11-28').getTime() - new Date(pos.entryDate).getTime()) / 86400000
                  )
                  return (
                    <tr
                      key={pos.symbol}
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                    >
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{ fontSize: 11, fontVariantNumeric: "tabular-nums", color: '#A0A0BE' }}>
                          {pos.symbol}
                        </span>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{ fontSize: 11, fontVariantNumeric: "tabular-nums" }}>{pos.shares}</span>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{ fontSize: 11, fontVariantNumeric: "tabular-nums" }}>${pos.entryPrice.toFixed(2)}</span>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{ fontSize: 11, fontVariantNumeric: "tabular-nums" }}>${pos.currentPrice.toFixed(2)}</span>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <span
                          style={{ fontSize: 11, fontVariantNumeric: "tabular-nums", color: upnl >= 0 ? 'var(--gain)' : 'var(--loss)' }}
                        >
                          {upnl >= 0 ? '+' : ''}
                          {formatCurrency(upnl)} ({upnl >= 0 ? '+' : ''}
                          {upct.toFixed(2)}%)
                        </span>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{ fontSize: 11, fontVariantNumeric: "tabular-nums" }}>{days}d</span>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <span className="font-dm text-[10px] text-[var(--t3)]">{pos.strategy}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr style={{ borderTop: '1px solid var(--bdr)' }}>
                  <td colSpan={4} style={{ padding: '10px 14px' }}>
                    <span className="font-dm text-[10px] text-[var(--t3)]">Position value</span>
                  </td>
                  <td colSpan={3} style={{ padding: '10px 14px' }}>
                    <span style={{ fontSize: 11, fontVariantNumeric: "tabular-nums", color: '#A0A0BE', fontWeight: 500 }}>
                      {formatCurrency(positionValue)}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </article>
      )}

      {/* Trade History */}
      {tab === 'history' && (
        <article className="ag-card">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--bdr)' }}>
                {['Date', 'Symbol', 'Type', 'Shares', 'Price', 'Amount', 'Gain/Loss', 'Notes'].map((h) => (
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
              {[...personalTrades].reverse().map((trade) => (
                <tr key={trade.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '9px 14px' }}>
                    <span style={{ fontSize: 11, fontVariantNumeric: "tabular-nums" }}>{trade.date}</span>
                  </td>
                  <td style={{ padding: '9px 14px' }}>
                    <span style={{ fontSize: 11, fontVariantNumeric: "tabular-nums", color: '#A0A0BE' }}>
                      {trade.symbol}
                    </span>
                  </td>
                  <td style={{ padding: '9px 14px' }}>
                    <span
                      className="font-dm text-[9px] uppercase tracking-[0.1em] rounded px-1.5 py-0.5"
                      style={{
                        color: trade.type === 'BUY' ? 'var(--info)' : trade.type === 'SELL' ? 'var(--gain)' : 'var(--gold)',
                        background: trade.type === 'BUY' ? 'var(--info-bg)' : trade.type === 'SELL' ? 'var(--gain-bg)' : 'var(--gold-dim)',
                      }}
                    >
                      {trade.type === 'DIV' ? 'Div' : trade.type}
                    </span>
                  </td>
                  <td style={{ padding: '9px 14px' }}>
                    <span style={{ fontSize: 11, fontVariantNumeric: "tabular-nums" }}>
                      {trade.shares > 0 ? trade.shares : '—'}
                    </span>
                  </td>
                  <td style={{ padding: '9px 14px' }}>
                    <span style={{ fontSize: 11, fontVariantNumeric: "tabular-nums" }}>
                      {trade.price > 0 ? `$${trade.price.toFixed(2)}` : '—'}
                    </span>
                  </td>
                  <td style={{ padding: '9px 14px' }}>
                    <span
                      style={{ fontSize: 11, fontVariantNumeric: "tabular-nums", color: trade.amount >= 0 ? 'var(--gain)' : 'var(--t2)' }}
                    >
                      {trade.amount >= 0 ? '+' : ''}
                      {formatCurrency(trade.amount)}
                    </span>
                  </td>
                  <td style={{ padding: '9px 14px' }}>
                    <span
                      style={{ fontSize: 11, fontVariantNumeric: "tabular-nums", color: trade.gain === null ? 'var(--t3)' : trade.gain >= 0 ? 'var(--gain)' : 'var(--loss)' }}
                    >
                      {trade.gain === null ? '—' : `+${formatCurrency(trade.gain)}`}
                    </span>
                  </td>
                  <td style={{ padding: '9px 14px' }}>
                    <span className="font-dm text-[10px] text-[var(--t3)]">{trade.notes}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      )}

      {/* Monthly Returns */}
      {tab === 'monthly' && (
        <article className="ag-card">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--bdr)' }}>
                {['Month', 'Opening AUM', 'Realized Gain', 'Dividends', 'Net Return', 'Closing AUM', 'Return %'].map(
                  (h) => (
                    <th
                      key={h}
                      style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--t3)", padding: '10px 14px', textAlign: 'left', fontWeight: 500 }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {personalMonthlyReturns.map((row) => {
                const returnPct = (row.netReturn / row.openingAum) * 100
                return (
                  <tr key={row.month} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ fontSize: 11, fontVariantNumeric: "tabular-nums" }}>{row.month}</span>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ fontSize: 11, fontVariantNumeric: "tabular-nums" }}>
                        {formatCurrency(row.openingAum)}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ fontSize: 11, fontVariantNumeric: "tabular-nums", color: 'var(--gain)' }}>
                        +{formatCurrency(row.realizedGain)}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ fontSize: 11, fontVariantNumeric: "tabular-nums", color: 'var(--gold)' }}>
                        +{formatCurrency(row.dividends)}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ fontSize: 11, fontVariantNumeric: "tabular-nums", color: 'var(--gain)', fontWeight: 600 }}>
                        +{formatCurrency(row.netReturn)}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ fontSize: 11, fontVariantNumeric: "tabular-nums" }}>
                        {formatCurrency(row.closingAum)}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span
                        style={{ fontSize: 11, fontVariantNumeric: "tabular-nums", color: returnPct >= 0 ? 'var(--gain)' : 'var(--loss)' }}
                      >
                        +{returnPct.toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </article>
      )}
    </div>
  )
}
