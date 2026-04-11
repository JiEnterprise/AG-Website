'use client'

import { useState } from 'react'
import PageHeader from '@/components/advisor/PageHeader'
import { allClients, totalAum } from '@/lib/advisorMetrics'
import { formatCurrency } from '@/lib/formatters'

export default function SettingsPage() {
  const [liveTicker, setLiveTicker] = useState(true)
  const [feeAlerts, setFeeAlerts] = useState(true)
  const [signalAlerts, setSignalAlerts] = useState(true)

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Configuration"
        title="Settings"
        subtitle="Advisor profile, portal preferences, and system connections"
      />

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
          <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Advisor Profile</h2>
          <div className="mt-2 space-y-1">
            <p className="font-mono text-[10px] text-[var(--t2)]">Name · Saswat C.</p>
            <p className="font-mono text-[10px] text-[var(--t2)]">Role · Founder / Portfolio Manager</p>
            <p className="font-mono text-[10px] text-[var(--t2)]">Firm · Aurum Global Inc.</p>
            <p className="font-mono text-[10px] text-[var(--t2)]">Email · saswat@aurumglobal.com</p>
            <p className="font-mono text-[10px] text-[var(--t2)]">Clients managed · {allClients.length}</p>
            <p className="font-mono text-[10px] text-[var(--t2)]">Total AUM · {formatCurrency(totalAum)}</p>
          </div>
        </article>

        <article className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
          <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Portal Preferences</h2>
          <div className="mt-2 space-y-2">
            <label className="flex items-center justify-between rounded-[var(--radius-sm)] border border-[var(--bdr)] bg-[var(--bg-elevated)] px-3 py-2 font-dm text-[11px] text-[var(--t2)]">
              <span>Dark mode (locked)</span>
              <input type="checkbox" checked readOnly />
            </label>
            <label className="flex items-center justify-between rounded-[var(--radius-sm)] border border-[var(--bdr)] bg-[var(--bg-elevated)] px-3 py-2 font-dm text-[11px] text-[var(--t2)]">
              <span>Live ticker enabled</span>
              <input type="checkbox" checked={liveTicker} onChange={(e) => setLiveTicker(e.target.checked)} />
            </label>
            <label className="flex items-center justify-between rounded-[var(--radius-sm)] border border-[var(--bdr)] bg-[var(--bg-elevated)] px-3 py-2 font-dm text-[11px] text-[var(--t2)]">
              <span>Email alerts for fee reminders</span>
              <input type="checkbox" checked={feeAlerts} onChange={(e) => setFeeAlerts(e.target.checked)} />
            </label>
            <label className="flex items-center justify-between rounded-[var(--radius-sm)] border border-[var(--bdr)] bg-[var(--bg-elevated)] px-3 py-2 font-dm text-[11px] text-[var(--t2)]">
              <span>AGQuant signal notifications</span>
              <input type="checkbox" checked={signalAlerts} onChange={(e) => setSignalAlerts(e.target.checked)} />
            </label>
            <div className="rounded-[var(--radius-sm)] border border-[var(--bdr)] bg-[var(--bg-elevated)] px-3 py-2">
              <p className="font-dm text-[10px] uppercase tracking-[0.12em] text-[var(--t3)]">Default Time Zone</p>
              <p className="mt-1 font-mono text-[10px] text-[var(--t2)]">America/New_York (EST)</p>
            </div>
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
          <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">API Connections</h2>
          <div className="mt-2 space-y-1">
            <p className="font-mono text-[10px] text-[var(--t2)]">Alpaca Paper · <span className="text-[var(--gain)]">Connected</span></p>
            <p className="font-mono text-[10px] text-[var(--t2)]">Alpaca Live · <span className="text-[var(--warn)]">Not connected</span></p>
            <p className="font-mono text-[10px] text-[var(--t2)]">Market data · <span className="text-[var(--gain)]">Alpaca WebSocket · streaming</span></p>
          </div>
        </article>

        <article className="rounded-[var(--radius-lg)] border border-[var(--loss)] bg-[var(--loss-bg)] p-4">
          <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--loss)]">Danger Zone</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <button className="rounded-[var(--radius-sm)] border border-[var(--bdr)] bg-[var(--bg-card)] px-3 py-1.5 font-dm text-[10px] uppercase tracking-[0.12em] text-[var(--t2)]">
              Export All Client Data
            </button>
            <button className="rounded-[var(--radius-sm)] border border-[var(--loss)] bg-transparent px-3 py-1.5 font-dm text-[10px] uppercase tracking-[0.12em] text-[var(--loss)]">
              Reset AGQuant to Factory Defaults
            </button>
          </div>
        </article>
      </section>
    </div>
  )
}
