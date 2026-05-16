'use client'

import { useState } from 'react'
import { allClients, totalAum } from '@/lib/advisorMetrics'
import { formatCurrency } from '@/lib/formatters'

export default function SettingsPage() {
  const [liveTicker,   setLiveTicker]   = useState(true)
  const [feeAlerts,    setFeeAlerts]    = useState(true)
  const [signalAlerts, setSignalAlerts] = useState(true)

  const toggle = (checked: boolean, color = 'var(--gold)') => ({
    width: 32, height: 18, borderRadius: 9,
    background: checked ? color : 'var(--bg-elevated)',
    border: `1px solid ${checked ? color : 'var(--bdr)'}`,
    cursor: 'pointer', flexShrink: 0, position: 'relative' as const,
    transition: 'background 200ms, border-color 200ms',
  })

  return (
    <div className="ag-page">
      <header className="ag-ph" style={{ marginBottom: 24 }}>
        <p className="ag-ph-ey">Configuration</p>
        <h1 className="ag-ph-h">Settings</h1>
        <p className="ag-ph-s">Advisor profile, portal preferences, and system connections</p>
      </header>

      <div className="ag-g2" style={{ marginBottom: 16 }}>
        {/* Advisor Profile */}
        <div className="ag-card">
          <div className="ag-card-head"><span className="ag-card-title">Advisor Profile</span></div>
          <div style={{ padding: '4px 0' }}>
            {[
              ['Name',      'Saswat C.'],
              ['Role',      'Founder / Portfolio Manager'],
              ['Firm',      'Aurum Global Inc.'],
              ['Email',     'saswat@aurumglobal.com'],
              ['Clients',   String(allClients.length)],
              ['Total AUM', formatCurrency(totalAum)],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px', borderBottom: '1px solid var(--bdr)' }}>
                <span style={{ fontSize: 11, color: 'var(--t3)' }}>{label}</span>
                <span style={{ fontSize: 11, color: 'var(--t1)', fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="ag-card">
          <div className="ag-card-head"><span className="ag-card-title">Portal Preferences</span></div>
          <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'Dark mode',                    checked: true,         locked: true,  setter: () => {} },
              { label: 'Live ticker enabled',          checked: liveTicker,   locked: false, setter: setLiveTicker },
              { label: 'Email alerts for fee reminders', checked: feeAlerts,  locked: false, setter: setFeeAlerts },
              { label: 'AGQuant signal notifications', checked: signalAlerts, locked: false, setter: setSignalAlerts },
            ].map((item) => (
              <div key={item.label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 12px', background: 'var(--bg-elevated)', borderRadius: 6,
                border: '1px solid var(--bdr)',
              }}>
                <span style={{ fontSize: 11, color: item.locked ? 'var(--t3)' : 'var(--t2)' }}>{item.label}{item.locked ? ' (locked)' : ''}</span>
                <input
                  type="checkbox"
                  checked={item.checked}
                  disabled={item.locked}
                  onChange={(e) => !item.locked && item.setter(e.target.checked)}
                  style={{ cursor: item.locked ? 'default' : 'pointer' }}
                />
              </div>
            ))}
            <div style={{ padding: '8px 12px', background: 'var(--bg-elevated)', borderRadius: 6, border: '1px solid var(--bdr)' }}>
              <div style={{ fontSize: 9, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>Default Time Zone</div>
              <div style={{ fontSize: 11, color: 'var(--t2)' }}>America/New_York (EST)</div>
            </div>
          </div>
        </div>
      </div>

      <div className="ag-g2">
        {/* API Connections */}
        <div className="ag-card">
          <div className="ag-card-head"><span className="ag-card-title">API Connections</span></div>
          <div style={{ padding: '4px 0' }}>
            {[
              ['Alpaca Paper',  'Connected',       'var(--gain)'],
              ['Alpaca Live',   'Not connected',   'var(--warn)'],
              ['Market Data',   'WebSocket · live','var(--gain)'],
            ].map(([label, status, color]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 16px', borderBottom: '1px solid var(--bdr)' }}>
                <span style={{ fontSize: 11, color: 'var(--t3)' }}>{label}</span>
                <span style={{ fontSize: 11, color, fontWeight: 600 }}>{status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="ag-card" style={{ border: '1px solid rgba(220,38,38,0.3)', background: 'rgba(220,38,38,0.04)' }}>
          <div className="ag-card-head" style={{ borderColor: 'rgba(220,38,38,0.2)' }}>
            <span className="ag-card-title" style={{ color: 'var(--loss)' }}>Danger Zone</span>
          </div>
          <div style={{ padding: '14px 16px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <button className="ag-btn ag-btn-ghost" style={{ fontSize: 11 }}>Export All Client Data</button>
            <button className="ag-btn ag-btn-danger" style={{ fontSize: 11 }}>Reset AGQuant to Factory Defaults</button>
          </div>
        </div>
      </div>
    </div>
  )
}
