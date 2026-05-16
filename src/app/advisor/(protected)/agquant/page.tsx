'use client'

import { useState } from 'react'
import PageHeader from '@/components/advisor/PageHeader'
import MetricCard from '@/components/advisor/MetricCard'
import { agquantStrategies, systemStatus } from '@/lib/mock-data/research'
import { allSignals } from '@/lib/advisorMetrics'
import { agquantLiveState } from '@/lib/mock-data/yieldmax'

function rsiBar(rsi: number) {
  const w = `${rsi}%`
  const color = rsi <= 30 ? 'var(--gain)' : rsi >= 70 ? 'var(--loss)' : rsi >= 55 ? 'var(--warn)' : 'var(--info)'
  return (
    <div style={{ position: 'relative', height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, width: '100%' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: w, background: color, borderRadius: 2, transition: 'width 0.5s' }} />
    </div>
  )
}

function watchStatusColor(status: string) {
  switch (status) {
    case 'signal_generated': return 'var(--gold)'
    case 'approaching_entry': return 'var(--warn)'
    case 'in_position': return 'var(--gain)'
    case 'approaching_exit': return 'var(--loss)'
    default: return 'var(--t3)'
  }
}

function watchStatusLabel(status: string) {
  switch (status) {
    case 'signal_generated': return 'Signal Generated'
    case 'approaching_entry': return 'Approaching Entry'
    case 'in_position': return 'In Position'
    case 'approaching_exit': return 'Approaching Exit'
    default: return 'Monitoring'
  }
}

type ModalState = 'closed' | 'confirm' | 'confirmed'

export default function AgquantPage() {
  const [liveMode, setLiveMode] = useState(false)
  const [modal, setModal] = useState<ModalState>('closed')
  const [confirmText, setConfirmText] = useState('')

  function handleToggle() {
    if (liveMode) {
      // Going back to paper — no confirmation needed
      setLiveMode(false)
    } else {
      setModal('confirm')
      setConfirmText('')
    }
  }

  function handleConfirm() {
    if (confirmText === 'CONFIRM LIVE TRADING') {
      setLiveMode(true)
      setModal('confirmed')
      setTimeout(() => setModal('closed'), 2000)
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Systematic trading"
        title="AGQuant Engine"
        subtitle="Algorithmic strategy management · Live state monitor · Signal feed"
      />

      {/* Live mode banner */}
      {liveMode && (
        <div
          className="flex items-center justify-between rounded-[var(--radius-sm)] border px-4 py-3"
          style={{ borderColor: 'rgba(212,75,58,0.4)', background: 'rgba(212,75,58,0.08)' }}
        >
          <div className="flex items-center gap-3">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: 'var(--loss)', boxShadow: '0 0 8px var(--loss)', animation: 'pulse 1s infinite' }}
            />
            <span className="font-dm text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--loss)' }}>
              Live Trading Mode Active
            </span>
            <span className="font-dm text-[11px] text-[var(--t2)]">
              Orders will be placed in your real Alpaca account. Proceed with caution.
            </span>
          </div>
          <button
            onClick={handleToggle}
            className="font-dm text-[9px] uppercase tracking-[0.12em] rounded-[var(--radius-sm)] border border-[rgba(212,75,58,0.4)] px-3 py-1.5"
            style={{ color: 'var(--loss)', cursor: 'pointer', background: 'transparent' }}
          >
            Return to Paper
          </button>
        </div>
      )}

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Engine Status" value={systemStatus.agquantEngine} valueColor="var(--gain)" />
        <MetricCard
          label="Mode"
          value={liveMode ? 'LIVE TRADING' : systemStatus.alpacaMode}
          valueColor={liveMode ? 'var(--loss)' : 'var(--gold)'}
        />
        <MetricCard label="Active Strategies" value={String(agquantStrategies.filter((s) => s.status === 'active').length)} />
        <MetricCard label="Signals Today" value={String(allSignals.length)} valueColor="var(--warn)" />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {/* Left column */}
        <div className="space-y-4">
          {/* AGQuant Live State Monitor */}
          <article className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">
                AGQuant Live State Monitor
              </h2>
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: 'var(--gain)', boxShadow: '0 0 5px var(--gain)' }}
              />
              <span className="font-mono text-[9px] text-[var(--t3)]">Real-time</span>
            </div>
            <div className="space-y-3">
              {agquantLiveState.map((sym) => (
                <div
                  key={sym.symbol}
                  className="rounded-[var(--radius-sm)] border border-[rgba(255,255,255,0.04)] bg-[var(--bg-elevated)] p-3"
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span className="font-mono text-[12px] font-semibold text-[var(--t1)]">{sym.symbol}</span>
                      <span className="font-mono text-[11px]" style={{ color: 'var(--gold)' }}>
                        ${sym.lastPrice.toFixed(2)}
                      </span>
                      <span
                        className="font-dm text-[8px] uppercase tracking-[0.12em] rounded px-1.5 py-0.5"
                        style={{
                          color: watchStatusColor(sym.watchStatus),
                          background: `${watchStatusColor(sym.watchStatus)}18`,
                        }}
                      >
                        {watchStatusLabel(sym.watchStatus)}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[var(--t3)]">{sym.strategy}</span>
                  </div>

                  {/* RSI bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span className="font-dm text-[9px] uppercase tracking-[0.12em] text-[var(--t3)]" style={{ minWidth: 28 }}>
                      RSI
                    </span>
                    <div style={{ flex: 1 }}>{rsiBar(sym.rsi14)}</div>
                    <span
                      className="font-mono text-[11px] font-semibold"
                      style={{
                        minWidth: 24,
                        color:
                          sym.rsi14 <= 30
                            ? 'var(--gain)'
                            : sym.rsi14 >= 70
                              ? 'var(--loss)'
                              : sym.rsi14 >= 55
                                ? 'var(--warn)'
                                : 'var(--info)',
                      }}
                    >
                      {sym.rsi14}
                    </span>
                  </div>

                  {/* Trigger levels */}
                  <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
                    <span className="font-mono text-[9px] text-[var(--t3)]">
                      Entry trigger: <span style={{ color: 'var(--gain)' }}>${sym.entryTriggerLevel.toFixed(2)}</span>
                    </span>
                    <span className="font-mono text-[9px] text-[var(--t3)]">
                      Exit trigger: <span style={{ color: 'var(--loss)' }}>${sym.exitTriggerLevel.toFixed(2)}</span>
                    </span>
                    <span className="font-mono text-[9px] text-[var(--t3)]">
                      BB: <span style={{ color: 'var(--info)' }}>{sym.bollingerPosition.replace(/_/g, ' ')}</span>
                    </span>
                  </div>

                  {/* Wait reason */}
                  <p className="font-dm text-[10px] leading-[1.6] text-[var(--t3)]">{sym.waitReason}</p>

                  {sym.lastSignalTime && (
                    <p className="mt-1 font-mono text-[9px] text-[var(--t3)]">
                      Last signal: {new Date(sym.lastSignalTime).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </article>

          {/* Active Strategies */}
          <article className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
            <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Active Strategies</h2>
            <div className="mt-2 space-y-2">
              {agquantStrategies.map((strategy) => (
                <div key={strategy.id} className="rounded-[var(--radius-sm)] border border-[rgba(255,255,255,0.04)] bg-[var(--bg-elevated)] p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-dm text-[11px] text-[var(--t1)]">{strategy.name}</p>
                    <span
                      className="rounded-full px-2 py-[1px] font-dm text-[8px] uppercase tracking-[0.12em]"
                      style={{
                        color:
                          strategy.status === 'active'
                            ? 'var(--gain)'
                            : strategy.status === 'paused'
                              ? 'var(--warn)'
                              : strategy.status === 'backtesting'
                                ? 'var(--info)'
                                : 'var(--t3)',
                        background:
                          strategy.status === 'active'
                            ? 'var(--gain-bg)'
                            : strategy.status === 'paused'
                              ? 'var(--warn-bg)'
                              : strategy.status === 'backtesting'
                                ? 'var(--info-bg)'
                                : 'rgba(255,255,255,0.06)',
                      }}
                    >
                      {strategy.status}
                    </span>
                  </div>
                  <p className="mt-1 font-dm text-[10px] text-[var(--t3)]">{strategy.description}</p>
                  <p className="mt-1 font-mono text-[10px] text-[var(--t2)]">{strategy.symbols.join(', ')}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* System Connections */}
          <article className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
            <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">System Connections</h2>
            <div className="mt-2 space-y-1">
              <p className="font-mono text-[10px] text-[var(--t2)]">Alpaca API · <span className="text-[var(--gain)]">{systemStatus.alpacaApi}</span></p>
              <p className="font-mono text-[10px] text-[var(--t2)]">Market data · <span className="text-[var(--gain)]">Streaming</span></p>
              <p className="font-mono text-[10px] text-[var(--t2)]">Circuit breakers · <span className="text-[var(--gain)]">{systemStatus.circuitBreakers}</span></p>
              <p className="font-mono text-[10px] text-[var(--t2)]">Kelly sizing · <span className="text-[var(--gold)]">{systemStatus.kellyPositionLimit.toFixed(2)}%</span></p>
              <p className="font-mono text-[10px] text-[var(--t2)]">Log sync · <span className="text-[var(--gain)]">{systemStatus.logSync}</span></p>
              <p className="font-mono text-[10px] text-[var(--t2)]">
                Live mode ·{' '}
                <span style={{ color: liveMode ? 'var(--loss)' : 'var(--warn)' }}>
                  {liveMode ? 'Active — CAUTION' : 'Disabled'}
                </span>
              </p>
            </div>
          </article>

          {/* Paper → Live Toggle */}
          <article
            className="rounded-[var(--radius-lg)] border p-4"
            style={{
              borderColor: liveMode ? 'rgba(212,75,58,0.4)' : 'rgba(107,107,107,0.2)',
              background: liveMode ? 'rgba(212,75,58,0.05)' : 'var(--gold-dim)',
            }}
          >
            <h2
              className="font-dm text-[11px] uppercase tracking-[0.2em]"
              style={{ color: liveMode ? 'var(--loss)' : 'var(--gold)' }}
            >
              Trading Mode
            </h2>
            <div className="mt-3 space-y-3">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: liveMode ? 'rgba(212,75,58,0.08)' : 'rgba(107,107,107,0.06)',
                  border: liveMode ? '1px solid rgba(212,75,58,0.2)' : '1px solid rgba(107,107,107,0.15)',
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: liveMode ? 'var(--loss)' : 'var(--warn)',
                    boxShadow: liveMode ? '0 0 8px var(--loss)' : 'none',
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p
                    className="font-dm text-[12px]"
                    style={{ color: liveMode ? 'var(--loss)' : 'var(--gold)', fontWeight: 600 }}
                  >
                    {liveMode ? 'LIVE TRADING' : 'PAPER TRADING'}
                  </p>
                  <p className="font-mono text-[9px] text-[var(--t3)]">
                    {liveMode
                      ? 'Real orders · Real capital · Alpaca Live'
                      : 'Simulated orders · No real capital · Alpaca Paper'}
                  </p>
                </div>
                <button
                  onClick={handleToggle}
                  className="font-dm text-[9px] uppercase tracking-[0.12em] rounded-[var(--radius-sm)] border px-3 py-1.5"
                  style={{
                    color: liveMode ? 'var(--t2)' : 'var(--loss)',
                    borderColor: liveMode ? 'var(--bdr)' : 'rgba(212,75,58,0.4)',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  {liveMode ? '← Return to Paper' : 'Activate Live →'}
                </button>
              </div>
              <p className="font-dm text-[10px] leading-[1.65] text-[var(--t3)]">
                Live mode requires Alpaca live account authorization and typed confirmation.
                All client orders will route to real markets. Use only when ready.
              </p>
            </div>
          </article>

          {/* Signal Feed */}
          <article className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
            <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Signal Feed (last 24h)</h2>
            <div className="mt-2 space-y-1">
              {allSignals.map((signal) => (
                <p key={signal.id} className="font-mono text-[10px] text-[var(--t2)]">
                  {new Date(signal.generatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} · {signal.symbol} {signal.type} signal · Confidence {signal.confidence.toFixed(2)}%
                </p>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* Confirmation Modal */}
      {modal === 'confirm' && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setModal('closed')}
        >
          <div
            style={{
              background: '#0D0D11',
              border: '1px solid rgba(212,75,58,0.4)',
              borderRadius: 12,
              padding: 32,
              maxWidth: 440,
              width: '90%',
              boxShadow: '0 0 60px rgba(212,75,58,0.15)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-dm text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--loss)', marginBottom: 12 }}>
              ⚠ Live Trading Activation
            </p>
            <p className="font-dm text-[14px] text-[var(--t1)]" style={{ marginBottom: 8, fontWeight: 500 }}>
              Switch to Live Trading Mode?
            </p>
            <p className="font-dm text-[12px] leading-[1.65] text-[var(--t2)]" style={{ marginBottom: 20 }}>
              This will route all orders to real markets using your Alpaca Live account.
              Client capital and personal capital will be at market risk.
              This action cannot be auto-reversed.
            </p>
            <p className="font-dm text-[10px] text-[var(--t3)]" style={{ marginBottom: 8 }}>
              Type <strong style={{ color: 'var(--loss)' }}>CONFIRM LIVE TRADING</strong> to proceed:
            </p>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="CONFIRM LIVE TRADING"
              className="font-mono text-[12px]"
              style={{
                width: '100%',
                background: 'rgba(212,75,58,0.06)',
                border: `1px solid ${confirmText === 'CONFIRM LIVE TRADING' ? 'rgba(212,75,58,0.6)' : 'rgba(212,75,58,0.2)'}`,
                borderRadius: 6,
                padding: '8px 12px',
                color: 'var(--t1)',
                outline: 'none',
                marginBottom: 16,
              }}
            />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setModal('closed')}
                className="font-dm text-[10px] uppercase tracking-[0.12em] rounded-[var(--radius-sm)] border border-[var(--bdr)] px-4 py-2 text-[var(--t2)]"
                style={{ background: 'transparent', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={confirmText !== 'CONFIRM LIVE TRADING'}
                className="font-dm text-[10px] uppercase tracking-[0.12em] rounded-[var(--radius-sm)] border px-4 py-2"
                style={{
                  background: confirmText === 'CONFIRM LIVE TRADING' ? 'rgba(212,75,58,0.15)' : 'rgba(255,255,255,0.04)',
                  borderColor: confirmText === 'CONFIRM LIVE TRADING' ? 'rgba(212,75,58,0.4)' : 'rgba(255,255,255,0.06)',
                  color: confirmText === 'CONFIRM LIVE TRADING' ? 'var(--loss)' : 'var(--t3)',
                  cursor: confirmText === 'CONFIRM LIVE TRADING' ? 'pointer' : 'not-allowed',
                }}
              >
                Activate Live Trading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmed state */}
      {modal === 'confirmed' && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: '#0D0D11',
              border: '1px solid rgba(212,75,58,0.5)',
              borderRadius: 12,
              padding: 32,
              textAlign: 'center',
            }}
          >
            <p className="font-dm text-[12px] uppercase tracking-[0.2em]" style={{ color: 'var(--loss)' }}>
              Live Trading Activated
            </p>
            <p className="font-mono text-[10px] text-[var(--t3)]" style={{ marginTop: 8 }}>
              All orders now route to Alpaca Live
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
