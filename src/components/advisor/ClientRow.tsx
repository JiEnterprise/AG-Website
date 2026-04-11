import Link from 'next/link'
import type { Client } from '@/lib/types'
import { formatCurrency, formatPercent } from '@/lib/formatters'
import { allTimeReturn, allTimeReturnPct } from '@/lib/calculations/returns'

interface ClientRowProps {
  client: Client
}

export default function ClientRow({ client }: ClientRowProps) {
  const totalReturn = allTimeReturn(client.currentAUM, client.initialDeposit)
  const roi = allTimeReturnPct(client.currentAUM, client.initialDeposit)

  return (
    <div className="card">
      <div className="card-h">{client.name} — {client.id}</div>
      <div className="cl-row" style={{ marginBottom: 12 }}>
        <div className="cl-av" style={{ background: `${client.color}26`, color: client.color }}>
          {client.initials}
        </div>
        <div className="cl-info">
          <div className="cl-name">
            {client.name} <span style={{ fontSize: 9, color: 'var(--t3)', fontFamily: 'var(--font-jetbrains, monospace)' }}>{client.id}</span>
          </div>
          <div className="cl-meta">PWM · {client.tier} · Onb {new Date(client.onboarded).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="cl-aum">{formatCurrency(client.currentAUM)}</div>
          <div className="cl-ret" style={{ color: 'var(--gain)' }}>
            +{formatCurrency(totalReturn)} ({formatPercent(roi)})
          </div>
        </div>
        <span className="bx bg">Active</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: 'var(--t2)' }}>
          <div className="tr-row"><span className="tr-desc">Account ID</span><span className="tr-pnl">{client.id}</span></div>
          <div className="tr-row"><span className="tr-desc">Onboarded</span><span className="tr-pnl">{new Date(client.onboarded).toLocaleDateString()}</span></div>
          <div className="tr-row"><span className="tr-desc">Tier</span><span className="tr-pnl" style={{ color: 'var(--gold)' }}>{client.tier}</span></div>
          <div className="tr-row"><span className="tr-desc">Fee rate</span><span className="tr-pnl">{(client.feeRate * 100).toFixed(2)}%</span></div>
        </div>
        <div style={{ fontSize: 11, color: 'var(--t2)' }}>
          <div className="tr-row"><span className="tr-desc">Current AUM</span><span className="tr-pnl" style={{ color: 'var(--gold)' }}>{formatCurrency(client.currentAUM)}</span></div>
          <div className="tr-row"><span className="tr-desc">Initial deposit</span><span className="tr-pnl">{formatCurrency(client.initialDeposit)}</span></div>
          <div className="tr-row"><span className="tr-desc">Total return</span><span className="tr-pnl" style={{ color: 'var(--gain)' }}>{formatCurrency(totalReturn)}</span></div>
          <div className="tr-row"><span className="tr-desc">ROI</span><span className="tr-pnl" style={{ color: 'var(--gain)' }}>{formatPercent(roi)}</span></div>
        </div>
        <div style={{ fontSize: 11, color: 'var(--t2)' }}>
          <div className="tr-row"><span className="tr-desc">Open positions</span><span className="tr-pnl">{client.openPositions.toString()}</span></div>
          <div className="tr-row"><span className="tr-desc">Cash balance</span><span className="tr-pnl">{formatCurrency(client.cashBalance)}</span></div>
          <div className="tr-row"><span className="tr-desc">Fee status</span><span className="tr-pnl" style={{ color: client.feeStatus === 'paid' ? 'var(--gain)' : 'var(--loss)' }}>{client.feeStatus}</span></div>
          <div className="tr-row"><span className="tr-desc">Fee due</span><span className="tr-pnl">{formatCurrency(client.feeDue ?? 0)}</span></div>
        </div>
      </div>

      <div className="btn-row">
        <Link href="/advisor/orders" className="btn-gold">
          Place Trade for {client.initials}
        </Link>
        <Link href="/advisor/statements" className="btn-out">
          Generate Statement
        </Link>
        <Link href="/advisor/messages" className="btn-out">
          Message Client
        </Link>
        <Link href={`/advisor/clients/${client.id}`} className="btn-out">
          Open Detail
        </Link>
      </div>
    </div>
  )
}
