'use client'

import { useMemo, useState } from 'react'
import { Info, Zap, TrendingUp, AlertTriangle } from 'lucide-react'
import { clients } from '@/lib/mock-data/clients'
import { signals } from '@/lib/mock-data/signals'
import { kellyPositionSize } from '@/lib/calculations/kelly'
import { formatCurrency } from '@/lib/formatters'

const TX_FEE = 0.2

type OrderSide = 'BUY' | 'SELL'
type OrderType = 'market' | 'limit' | 'stop_limit'

const activeClients = clients.filter((c) => c.status === 'active')

const inputStyle: React.CSSProperties = {
  height: 38,
  width: '100%',
  borderRadius: 8,
  border: '1px solid var(--bdr)',
  background: 'var(--bg-input)',
  padding: '0 10px',
  fontFamily: 'var(--font-jetbrains)',
  fontSize: 12,
  color: 'var(--t1)',
  outline: 'none',
}

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  fontFamily: 'var(--font-dm-sans)',
  cursor: 'pointer',
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans)',
  fontSize: 9,
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: 'var(--t3)',
  display: 'block',
  marginBottom: 5,
}

export default function OrderTicket() {
  const [clientTarget, setClientTarget] = useState<string>(activeClients[0]?.id ?? '')
  const [symbol, setSymbol] = useState('TSLY')
  const [side, setSide] = useState<OrderSide>('BUY')
  const [orderType, setOrderType] = useState<OrderType>('limit')
  const [shares, setShares] = useState(100)
  const [limitPrice, setLimitPrice] = useState(14.50)
  const [stopPrice, setStopPrice] = useState(13.00)
  const [notes, setNotes] = useState('')
  const [message, setMessage] = useState('')

  const selectedSignal = useMemo(() => signals.find((s) => s.symbol === symbol.toUpperCase()), [symbol])

  const targetClients = useMemo(
    () => clientTarget === 'all' ? activeClients : activeClients.filter((c) => c.id === clientTarget),
    [clientTarget]
  )

  const estimatedCost   = Number((shares * limitPrice).toFixed(2))
  const transactionFee  = Number((TX_FEE * targetClients.length).toFixed(2))
  const totalCommitted  = side === 'BUY' ? estimatedCost + transactionFee : 0

  const remainingCash = targetClients.reduce<Record<string, number>>((acc, client) => {
    const perClientCost = clientTarget === 'all' ? estimatedCost / targetClients.length : estimatedCost
    const cash = side === 'BUY'
      ? client.cashBalance - perClientCost - TX_FEE
      : client.cashBalance + perClientCost - TX_FEE
    acc[client.id] = Number(cash.toFixed(2))
    return acc
  }, {})

  const insufficient = Object.values(remainingCash).some((v) => v < 0)
  const sideColor = side === 'BUY' ? 'var(--gain)' : 'var(--loss)'

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>

      {/* ── Left: Order form ──────────────────────────── */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bdr)', borderRadius: 12, padding: '20px 22px' }}>
        <h3 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--gold)', margin: '0 0 18px' }}>Order Ticket</h3>

        {/* Row 1: Client + Symbol */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <label>
            <span style={labelStyle}>Client Account</span>
            <select value={clientTarget} onChange={(e) => setClientTarget(e.target.value)} style={selectStyle as React.CSSProperties}>
              {activeClients.map((c) => (
                <option key={c.id} value={c.id}>{c.id} — {c.name}</option>
              ))}
              <option value="all">All accounts (proportional)</option>
            </select>
          </label>
          <label>
            <span style={labelStyle}>Symbol</span>
            <input
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              style={{ ...inputStyle, color: 'var(--gold)', fontWeight: 700 } as React.CSSProperties}
              placeholder="e.g. TSLY"
            />
          </label>
        </div>

        {/* Row 2: Side + Order Type */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <label>
            <span style={labelStyle}>Side</span>
            <select
              value={side}
              onChange={(e) => setSide(e.target.value as OrderSide)}
              style={{ ...selectStyle, color: sideColor, fontWeight: 700 } as React.CSSProperties}
            >
              <option value="BUY">BUY</option>
              <option value="SELL">SELL</option>
            </select>
          </label>
          <label>
            <span style={labelStyle}>Order Type</span>
            <select value={orderType} onChange={(e) => setOrderType(e.target.value as OrderType)} style={selectStyle as React.CSSProperties}>
              <option value="market">Market</option>
              <option value="limit">Limit</option>
              <option value="stop_limit">Stop-Limit</option>
            </select>
          </label>
        </div>

        {/* Row 3: Shares + Price */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <label>
            <span style={labelStyle}>Shares</span>
            <input type="number" min={1} value={shares} onChange={(e) => setShares(Number(e.target.value))} style={inputStyle as React.CSSProperties} />
          </label>
          <label>
            <span style={labelStyle}>{orderType === 'market' ? 'Reference Price' : 'Limit Price'}</span>
            <input type="number" step={0.01} min={0} value={limitPrice} onChange={(e) => setLimitPrice(Number(e.target.value))} style={inputStyle as React.CSSProperties} />
          </label>
        </div>

        {/* Stop price — only for stop_limit */}
        {orderType === 'stop_limit' && (
          <label style={{ display: 'block', marginBottom: 12 }}>
            <span style={labelStyle}>Stop Price</span>
            <input type="number" step={0.01} min={0} value={stopPrice} onChange={(e) => setStopPrice(Number(e.target.value))} style={inputStyle as React.CSSProperties} />
          </label>
        )}

        {/* Notes */}
        <label style={{ display: 'block', marginBottom: 16 }}>
          <span style={labelStyle}>Notes (optional)</span>
          <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Trade rationale, strategy reference..." style={{ ...inputStyle, fontFamily: 'var(--font-dm-sans)' } as React.CSSProperties} />
        </label>

        {/* Cost preview */}
        <div style={{
          background: side === 'BUY' ? 'rgba(201,168,76,0.06)' : 'rgba(212,75,58,0.06)',
          border: `1px solid ${side === 'BUY' ? 'rgba(201,168,76,0.22)' : 'rgba(212,75,58,0.22)'}`,
          borderRadius: 10, padding: '14px 16px', marginBottom: 16,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--t3)' }}>Order Preview</span>
            <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 14, fontWeight: 700, color: sideColor }}>
              {side} {shares.toLocaleString()} {symbol} @ {formatCurrency(limitPrice)}
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { label: 'Gross',        value: formatCurrency(estimatedCost),  color: 'var(--t1)' },
              { label: 'Tx Fee',       value: formatCurrency(transactionFee), color: 'var(--loss)' },
              { label: 'Total',        value: formatCurrency(totalCommitted), color: sideColor },
            ].map((m) => (
              <div key={m.label}>
                <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 9, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 2 }}>{m.label}</div>
                <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 12, color: m.color, fontWeight: 600 }}>{m.value}</div>
              </div>
            ))}
          </div>

          {/* Per-client cash remaining */}
          <div style={{ marginTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10 }}>
            {Object.entries(remainingCash).map(([clientId, cash]) => {
              const c = activeClients.find((cl) => cl.id === clientId)
              return (
                <div key={clientId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)' }}>{c?.name ?? clientId} remaining cash</span>
                  <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: cash < 0 ? 'var(--loss)' : 'var(--gain)', fontWeight: 600 }}>{formatCurrency(cash)}</span>
                </div>
              )
            })}
          </div>

          {insufficient && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, padding: '8px 10px', background: 'rgba(212,75,58,0.1)', borderRadius: 7 }}>
              <AlertTriangle size={11} color="var(--loss)" />
              <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--loss)' }}>Insufficient cash for one or more accounts</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="btn-row">
          <button
            onClick={() => setMessage('✓ Order submitted to Alpaca paper trading')}
            disabled={insufficient}
            className="btn-gold"
            style={{ opacity: insufficient ? 0.4 : 1, cursor: insufficient ? 'not-allowed' : 'pointer' }}
          >
            Submit to Alpaca
          </button>
          <button onClick={() => setMessage('✓ Trade logged manually')} className="btn-out">
            Log Manually
          </button>
        </div>
        {message && (
          <div style={{ marginTop: 10, padding: '8px 12px', background: 'rgba(48,209,88,0.08)', border: '1px solid rgba(48,209,88,0.2)', borderRadius: 7 }}>
            <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 11, color: 'var(--gain)' }}>{message}</span>
          </div>
        )}
        <p style={{ marginTop: 12, fontFamily: 'var(--font-dm-sans)', fontSize: 9, lineHeight: 1.6, color: 'var(--t3)' }}>
          Trades submitted to Alpaca paper mode. Auto-logged to client record. Confirm position sizing before live execution.
        </p>
      </div>

      {/* ── Right: Intelligence panel ─────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* AGQuant signal */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bdr)', borderRadius: 12, padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <Zap size={12} color="var(--gold)" />
            <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--gold)' }}>AGQuant Signal</span>
          </div>
          {selectedSignal ? (
            <>
              <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 12, color: 'var(--t1)', fontWeight: 500, marginBottom: 6 }}>{selectedSignal.title}</div>
              <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 11, color: 'var(--t2)', lineHeight: 1.5, marginBottom: 10 }}>{selectedSignal.body}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ background: 'var(--bg-elevated)', borderRadius: 6, padding: '6px 10px', fontFamily: 'var(--font-jetbrains)', fontSize: 10, color: 'var(--t2)' }}>
                  {selectedSignal.confidence}% conf.
                </div>
                <div style={{ background: 'var(--bg-elevated)', borderRadius: 6, padding: '6px 10px', fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t2)', textTransform: 'capitalize' }}>
                  {selectedSignal.priority} priority
                </div>
              </div>
              {selectedSignal.targetEntry && (
                <div style={{ marginTop: 10, fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)' }}>
                  Entry zone: <span style={{ color: 'var(--t1)', fontFamily: 'var(--font-jetbrains)' }}>{formatCurrency(selectedSignal.targetEntry[0])} – {formatCurrency(selectedSignal.targetEntry[1])}</span>
                </div>
              )}
              {selectedSignal.stopLoss && (
                <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)' }}>
                  Stop loss: <span style={{ color: 'var(--loss)', fontFamily: 'var(--font-jetbrains)' }}>{formatCurrency(selectedSignal.stopLoss)}</span>
                </div>
              )}
            </>
          ) : (
            <div style={{ padding: '12px 0', fontFamily: 'var(--font-dm-sans)', fontSize: 11, color: 'var(--t3)' }}>
              No active AGQuant signal for <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-jetbrains)' }}>{symbol}</span>
            </div>
          )}
        </div>

        {/* Kelly sizing */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bdr)', borderRadius: 12, padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <TrendingUp size={12} color="var(--info)" />
            <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--info)' }}>Kelly Sizing</span>
          </div>
          {targetClients.map((client) => {
            const rec = kellyPositionSize(client.cashBalance, 0.28, limitPrice || 1)
            const isOver = shares > rec.shares
            return (
              <div key={client.id} style={{ background: 'var(--bg-elevated)', borderRadius: 8, padding: '10px 12px', marginBottom: 8 }}>
                <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 11, color: 'var(--t1)', marginBottom: 4 }}>{client.name}</div>
                <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: isOver ? 'var(--loss)' : 'var(--gain)' }}>
                  Rec: {rec.shares} shares ({formatCurrency(rec.dollars)})
                </div>
                {isOver && (
                  <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 9, color: 'var(--loss)', marginTop: 3 }}>
                    ↑ {shares - rec.shares} over Kelly limit
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Info note */}
        <div style={{ background: 'rgba(55,138,221,0.06)', border: '1px solid rgba(55,138,221,0.18)', borderRadius: 10, padding: '12px 14px' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <Info size={12} color="var(--info)" style={{ flexShrink: 0, marginTop: 1 }} />
            <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 10, color: 'var(--t3)', lineHeight: 1.6 }}>
              Kelly criterion uses 28% win-rate assumption and current account cash balance. Verify position sizing against investment policy before execution.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
