'use client'

import { useMemo, useState } from 'react'
import { clients } from '@/lib/mock-data/clients'
import { signals } from '@/lib/mock-data/signals'
import { kellyPositionSize } from '@/lib/calculations/kelly'
import { formatCurrency } from '@/lib/formatters'

const TX_FEE = 0.2

type ClientTarget = 'DL2503' | 'SR2501' | 'both'
type OrderSide = 'BUY' | 'SELL'
type OrderType = 'market' | 'limit' | 'stop_limit'

export default function OrderTicket() {
  const [clientTarget, setClientTarget] = useState<ClientTarget>('DL2503')
  const [symbol, setSymbol] = useState('TSLY')
  const [side, setSide] = useState<OrderSide>('BUY')
  const [orderType, setOrderType] = useState<OrderType>('limit')
  const [shares, setShares] = useState(115)
  const [limitPrice, setLimitPrice] = useState(7.2)
  const [stopPrice, setStopPrice] = useState(6.5)
  const [message, setMessage] = useState('')

  const selectedSignal = useMemo(() => signals.find((signal) => signal.symbol === symbol.toUpperCase()), [symbol])
  const activeClients = useMemo(
    () => (clientTarget === 'both' ? clients.filter((client) => client.id === 'DL2503' || client.id === 'SR2501') : clients.filter((client) => client.id === clientTarget)),
    [clientTarget]
  )

  const referencePrice = orderType === 'market' ? limitPrice : limitPrice
  const estimatedCost = Number((shares * referencePrice).toFixed(2))
  const transactionFee = Number((TX_FEE * (clientTarget === 'both' ? 2 : 1)).toFixed(2))

  const remainingCash = activeClients.reduce<Record<string, number>>((acc, client) => {
    const accountCost = clientTarget === 'both' ? estimatedCost / 2 : estimatedCost
    const nextCash = side === 'BUY' ? client.cashBalance - accountCost - TX_FEE : client.cashBalance + accountCost - TX_FEE
    acc[client.id] = Number(nextCash.toFixed(2))
    return acc
  }, {})

  const insufficient = Object.values(remainingCash).some((value) => value < 0)

  return (
    <div className="g2">
      <article className="card">
        <h3 className="card-h">Order ticket</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <label className="space-y-1.5">
            <span className="font-dm text-[10px] uppercase tracking-[0.12em] text-[var(--t3)]">Client Account</span>
            <select value={clientTarget} onChange={(e) => setClientTarget(e.target.value as ClientTarget)} className="h-9 w-full rounded-[var(--radius-sm)] border border-[var(--bdr)] bg-[var(--bg-input)] px-2 font-mono text-[11px] text-[var(--t1)]">
              <option value="DL2503">DL2503 — David Low ({formatCurrency(882.75)} available)</option>
              <option value="SR2501">SR2501 — Rehan Shaikh ({formatCurrency(882.75)} available)</option>
              <option value="both">Both clients (proportional)</option>
            </select>
          </label>
          <label className="space-y-1.5">
            <span className="font-dm text-[10px] uppercase tracking-[0.12em] text-[var(--t3)]">Symbol</span>
            <input value={symbol} onChange={(e) => setSymbol(e.target.value.toUpperCase())} className="h-9 w-full rounded-[var(--radius-sm)] border border-[var(--bdr)] bg-[var(--bg-input)] px-2 font-mono text-[11px] text-[var(--gold)]" />
          </label>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <label className="space-y-1.5">
            <span className="font-dm text-[10px] uppercase tracking-[0.12em] text-[var(--t3)]">Side</span>
            <select value={side} onChange={(e) => setSide(e.target.value as OrderSide)} className="h-9 w-full rounded-[var(--radius-sm)] border border-[var(--bdr)] bg-[var(--bg-input)] px-2 font-dm text-[11px] text-[var(--t1)]">
              <option value="BUY">BUY</option>
              <option value="SELL">SELL</option>
            </select>
          </label>
          <label className="space-y-1.5">
            <span className="font-dm text-[10px] uppercase tracking-[0.12em] text-[var(--t3)]">Order Type</span>
            <select value={orderType} onChange={(e) => setOrderType(e.target.value as OrderType)} className="h-9 w-full rounded-[var(--radius-sm)] border border-[var(--bdr)] bg-[var(--bg-input)] px-2 font-dm text-[11px] text-[var(--t1)]">
              <option value="market">Market</option>
              <option value="limit">Limit</option>
              <option value="stop_limit">Stop-Limit</option>
            </select>
          </label>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <label className="space-y-1.5">
            <span className="font-dm text-[10px] uppercase tracking-[0.12em] text-[var(--t3)]">Shares</span>
            <input type="number" min={1} value={shares} onChange={(e) => setShares(Number(e.target.value))} className="h-9 w-full rounded-[var(--radius-sm)] border border-[var(--bdr)] bg-[var(--bg-input)] px-2 font-mono text-[11px] text-[var(--t1)]" />
          </label>
          <label className="space-y-1.5">
            <span className="font-dm text-[10px] uppercase tracking-[0.12em] text-[var(--t3)]">Limit Price</span>
            <input type="number" step={0.01} value={limitPrice} onChange={(e) => setLimitPrice(Number(e.target.value))} className="h-9 w-full rounded-[var(--radius-sm)] border border-[var(--bdr)] bg-[var(--bg-input)] px-2 font-mono text-[11px] text-[var(--t1)]" />
          </label>
        </div>

        {orderType === 'stop_limit' && (
          <label className="mt-3 block space-y-1.5">
            <span className="font-dm text-[10px] uppercase tracking-[0.12em] text-[var(--t3)]">Stop Price</span>
            <input type="number" step={0.01} value={stopPrice} onChange={(e) => setStopPrice(Number(e.target.value))} className="h-9 w-full rounded-[var(--radius-sm)] border border-[var(--bdr)] bg-[var(--bg-input)] px-2 font-mono text-[11px] text-[var(--t1)]" />
          </label>
        )}

        <div style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold-border)', borderRadius: 8, padding: 12, marginTop: 12 }}>
          <p style={{ fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gold)' }}>Estimated cost</p>
          <p className="mt-1 font-mono text-[12px] text-[var(--t1)]">{formatCurrency(estimatedCost)}</p>
          <p className="font-mono text-[10px] text-[var(--t3)]">Transaction Fee: {formatCurrency(transactionFee)}</p>
          {Object.entries(remainingCash).map(([clientId, cash]) => (
            <p key={clientId} className="font-mono text-[10px]" style={{ color: cash < 0 ? 'var(--loss)' : 'var(--t2)' }}>
              {clientId} Cash Remaining: {formatCurrency(cash)}
            </p>
          ))}
          {insufficient && <p className="mt-1 font-dm text-[10px] text-[var(--loss)]">Insufficient cash for one or more accounts.</p>}
        </div>

        <div className="btn-row" style={{ marginTop: 12 }}>
          <button onClick={() => setMessage('Order submitted to Alpaca paper trading')} className="btn-gold">
            Submit to Alpaca
          </button>
          <button onClick={() => setMessage('Trade logged manually')} className="btn-out">
            Log Manually
          </button>
        </div>
        {message && <p className="mt-2 font-dm text-[10px] text-[var(--gain)]">{message}</p>}
        <p className="mt-3 font-mono text-[9px] leading-[1.6] text-[var(--t3)]">
          Orders submitted to Alpaca paper trading. All trades auto-logged to client internal record. Confirm before live execution.
        </p>
      </article>

      <article className="card">
        <h3 className="card-h">AGQuant suggestion for this trade</h3>
        <div style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid var(--gold-border)', borderRadius: 8, padding: 14, marginBottom: 12 }}>
          <p style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 6 }}>Signal context</p>
          <p className="mt-1 font-dm text-[11px] text-[var(--t1)]">{selectedSignal?.title ?? 'No active signal for this symbol.'}</p>
          <p className="mt-1 font-dm text-[10px] leading-[1.5] text-[var(--t3)]">{selectedSignal?.body ?? 'Set symbol to review AGQuant signal context.'}</p>
        </div>

        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--bdr)', borderRadius: 8, padding: 12 }}>
          <p style={{ fontSize: 10, color: 'var(--t3)', letterSpacing: '.12em', textTransform: 'uppercase' }}>Kelly sizing recommendation</p>
          {activeClients.map((client) => {
            const recommendation = kellyPositionSize(client.cashBalance, 0.28, limitPrice || 1)
            return (
              <p key={client.id} className="mt-1 font-mono text-[10px] text-[var(--t2)]">
                {client.id}: {formatCurrency(recommendation.dollars)} · {recommendation.shares} shares
              </p>
            )
          })}
        </div>
      </article>
    </div>
  )
}
