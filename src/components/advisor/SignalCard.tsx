import Link from 'next/link'
import { Zap } from 'lucide-react'
import type { Signal } from '@/lib/types'
import { formatDateLabel } from '@/lib/formatters'

interface SignalCardProps {
  signal: Signal
}

const PRIORITY_COLOR: Record<string, string> = {
  critical: 'var(--loss)',
  high:     'var(--gold)',
  medium:   'var(--warn)',
  low:      'var(--info)',
}
const PRIORITY_BG: Record<string, string> = {
  critical: 'var(--loss-bg)',
  high:     'var(--gold-dim)',
  medium:   'var(--warn-bg)',
  low:      'var(--info-bg)',
}

export default function SignalCard({ signal }: SignalCardProps) {
  const color = PRIORITY_COLOR[signal.priority] ?? 'var(--t2)'
  const bg    = PRIORITY_BG[signal.priority]    ?? 'var(--gold-dim)'

  return (
    <div className="ag-card" style={{ borderLeft: `3px solid ${color}` }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', borderBottom: '1px solid var(--bdr)' }}>
        <div style={{ width: 32, height: 32, borderRadius: 6, background: bg, color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Zap size={14} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap', marginBottom: 3 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)' }}>{signal.title}</span>
            <span className="ag-pill" style={{ background: bg, color, fontSize: 9 }}>{signal.priority}</span>
            <span className="ag-pill ag-pill-gray" style={{ fontSize: 9 }}>{signal.type}</span>
            <span className="ag-pill ag-pill-gray" style={{ fontSize: 9 }}>{signal.status}</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--t2)' }}>
            <span style={{ fontWeight: 600, color: 'var(--t1)' }}>{signal.symbol}</span>
            {' · '}{signal.strategy.toUpperCase().replace('_', ' ')}
            {' · '}<span style={{ color, fontWeight: 600 }}>{signal.confidence.toFixed(0)}% conf</span>
          </div>
        </div>
        <div style={{ fontSize: 10, color: 'var(--t3)', flexShrink: 0, textAlign: 'right' }}>
          {formatDateLabel(signal.generatedAt)}
          {signal.expiresAt && <div style={{ marginTop: 2 }}>Exp {formatDateLabel(signal.expiresAt)}</div>}
        </div>
      </div>

      <div style={{ padding: '10px 16px 12px' }}>
        <p style={{ fontSize: 12, color: 'var(--t2)', lineHeight: 1.5, marginBottom: 10 }}>{signal.body}</p>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 10 }}>
          {signal.targetEntry && (
            <span style={{ fontSize: 10, color: 'var(--t3)' }}>
              Entry: <span style={{ color: 'var(--t1)', fontVariantNumeric: 'tabular-nums' }}>${signal.targetEntry[0].toFixed(2)}–${signal.targetEntry[1].toFixed(2)}</span>
            </span>
          )}
          {signal.stopLoss && (
            <span style={{ fontSize: 10, color: 'var(--t3)' }}>
              Stop: <span style={{ color: 'var(--loss)', fontVariantNumeric: 'tabular-nums' }}>${signal.stopLoss.toFixed(2)}</span>
            </span>
          )}
          {signal.targetExit && (
            <span style={{ fontSize: 10, color: 'var(--t3)' }}>
              Target: <span style={{ color: 'var(--gain)', fontVariantNumeric: 'tabular-nums' }}>${signal.targetExit.toFixed(2)}</span>
            </span>
          )}
        </div>

        <div style={{ fontSize: 11, color: 'var(--t2)', marginBottom: 10 }}>
          <span style={{ fontWeight: 600 }}>{signal.suggestedAction}</span>
          {signal.suggestedShares && Object.keys(signal.suggestedShares).length > 0 && (
            <span style={{ color: 'var(--t3)' }}>
              {' · '}{Object.entries(signal.suggestedShares).map(([c, n]) => `${c}: ${n} sh`).join(' · ')}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <Link href="/advisor/orders" className="ag-btn ag-btn-primary" style={{ textDecoration: 'none', fontSize: 11 }}>Execute</Link>
          <Link href="/advisor/research" className="ag-btn ag-btn-ghost" style={{ textDecoration: 'none', fontSize: 11 }}>Research</Link>
          <button className="ag-btn ag-btn-ghost" style={{ fontSize: 11, marginLeft: 'auto' }}>Dismiss</button>
        </div>
      </div>
    </div>
  )
}
