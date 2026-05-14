'use client'

import { useState } from 'react'
import PageHeader from '@/components/advisor/PageHeader'
import MetricCard from '@/components/advisor/MetricCard'
import { emailTemplates, type EmailTemplate, type TemplateCategory } from '@/lib/mock-data/templates'
import { clients } from '@/lib/mock-data/clients'

type CategoryFilter = 'all' | TemplateCategory

const categoryConfig: Record<TemplateCategory, { label: string; color: string }> = {
  onboarding: { label: 'Onboarding', color: '#378ADD' },
  statement:  { label: 'Statement',  color: '#7F77DD' },
  fee:        { label: 'Fee',        color: 'var(--gold)' },
  trade:      { label: 'Trade',      color: 'var(--gain)' },
  quarterly:  { label: 'Quarterly',  color: '#E8A245' },
  holiday:    { label: 'Holiday',    color: '#A0A0BE' },
  compliance: { label: 'Compliance', color: 'var(--loss)' },
}

type SendState = 'idle' | 'composing' | 'sent'

export default function TemplatesPage() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
  const [selected, setSelected] = useState<EmailTemplate | null>(null)
  const [sendState, setSendState] = useState<SendState>('idle')
  const [sendClient, setSendClient] = useState<string>('')
  const [customVars, setCustomVars] = useState<Record<string, string>>({})

  const visible = emailTemplates.filter((t) =>
    categoryFilter === 'all' || t.category === categoryFilter
  )

  const totalSent = emailTemplates.reduce((s, t) => s + t.usageCount, 0)

  function openCompose(tpl: EmailTemplate) {
    setSelected(tpl)
    setSendState('composing')
    setSendClient(clients[0]?.id ?? '')
    const vars: Record<string, string> = {}
    tpl.variables.forEach((v) => { vars[v] = '' })
    setCustomVars(vars)
  }

  function handleSend() {
    setSendState('sent')
    setTimeout(() => {
      setSendState('idle')
      setSelected(null)
    }, 2000)
  }

  function fillPreview(body: string, vars: Record<string, string>, clientId: string): string {
    const client = clients.find((c) => c.id === clientId)
    let result = body
    result = result.replace(/\{\{CLIENT_NAME\}\}/g, client?.name ?? '{{CLIENT_NAME}}')
    result = result.replace(/\{\{CLIENT_ID\}\}/g, clientId || '{{CLIENT_ID}}')
    Object.entries(vars).forEach(([key, value]) => {
      if (value) result = result.replace(new RegExp(key.replace(/[{}]/g, '\\$&'), 'g'), value)
    })
    return result
  }

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Communications · Branded"
        title="Email Template System"
        subtitle="Aurum-branded templates · One-click send · Welcome · Statement · Fee · Compliance"
      />

      <section className="mrow">
        <MetricCard label="Templates" value={String(emailTemplates.length)} badge="Ready to send" />
        <MetricCard label="Total Sent" value={String(totalSent)} badge="All-time usage" valueColor="var(--gold)" />
        <MetricCard
          label="Most Used"
          value="Statement"
          badge="9 sends · Monthly statement"
        />
        <MetricCard
          label="Categories"
          value="7"
          badge="Onboarding · Fee · Trade · More"
        />
      </section>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid var(--bdr)', flexWrap: 'wrap' }}>
        {(['all', 'onboarding', 'statement', 'fee', 'trade', 'quarterly', 'holiday', 'compliance'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setCategoryFilter(f)}
            className="font-dm text-[10px] uppercase tracking-[0.14em]"
            style={{
              padding: '8px 14px 7px', background: 'none', border: 'none',
              borderBottom: categoryFilter === f ? '2px solid var(--gold)' : '2px solid transparent',
              color: categoryFilter === f ? 'var(--gold)' : 'var(--t3)', cursor: 'pointer',
            }}
          >
            {f === 'all' ? 'All Templates' : categoryConfig[f as TemplateCategory]?.label ?? f}
          </button>
        ))}
      </div>

      {/* Template cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 12 }}>
        {visible.map((tpl) => {
          const cat = categoryConfig[tpl.category]
          return (
            <article
              key={tpl.id}
              className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4"
              style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <div
                  style={{
                    width: 32, height: 32, borderRadius: 7, flexShrink: 0,
                    background: `${cat.color}18`, color: cat.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14,
                  }}
                >
                  {tpl.category === 'onboarding' ? '👋' :
                   tpl.category === 'statement' ? '📊' :
                   tpl.category === 'fee' ? '💳' :
                   tpl.category === 'trade' ? '📈' :
                   tpl.category === 'quarterly' ? '📅' :
                   tpl.category === 'holiday' ? '🎄' : '📋'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <p className="font-dm text-[12px] text-[var(--t1)] truncate">{tpl.name}</p>
                    <span
                      className="font-dm text-[8px] uppercase tracking-[0.1em] rounded px-1.5 py-0.5 flex-shrink-0"
                      style={{ color: cat.color, background: `${cat.color}18` }}
                    >
                      {cat.label}
                    </span>
                  </div>
                  <p className="font-mono text-[9px] text-[var(--t3)] truncate mt-0.5">{tpl.subject}</p>
                </div>
              </div>

              {/* Preview */}
              <p className="font-dm text-[10px] leading-[1.6] text-[var(--t3)]">{tpl.preview}</p>

              {/* Variables */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {tpl.variables.slice(0, 4).map((v) => (
                  <span
                    key={v}
                    className="font-mono text-[8px] rounded px-1.5 py-0.5"
                    style={{ background: 'var(--bg-inset)', color: 'var(--t3)', border: '1px solid var(--bdr)' }}
                  >
                    {v}
                  </span>
                ))}
                {tpl.variables.length > 4 && (
                  <span className="font-mono text-[8px] text-[var(--t3)]">+{tpl.variables.length - 4} more</span>
                )}
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 4 }}>
                <span className="font-mono text-[9px] text-[var(--t3)]">
                  {tpl.usageCount > 0 ? `Used ${tpl.usageCount}×` : 'Never used'}
                  {tpl.lastUsed ? ` · Last: ${tpl.lastUsed}` : ''}
                </span>
                <button
                  onClick={() => openCompose(tpl)}
                  className="font-dm text-[9px] uppercase tracking-[0.12em]"
                  style={{
                    padding: '5px 12px',
                    background: 'var(--gold)', color: 'black',
                    border: 'none', borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer', fontWeight: 600,
                  }}
                >
                  Send →
                </button>
              </div>
            </article>
          )
        })}
      </div>

      {/* Compose modal */}
      {selected && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 50,
            background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) { setSendState('idle'); setSelected(null) } }}
        >
          <div
            style={{
              width: '100%', maxWidth: 660,
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--bdr)',
              padding: 24,
              display: 'flex', flexDirection: 'column', gap: 16,
              maxHeight: '90vh', overflowY: 'auto',
            }}
          >
            {sendState === 'sent' ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
                <p className="font-dm text-[14px] text-[var(--gain)]">Email Sent</p>
                <p className="font-dm text-[11px] text-[var(--t3)] mt-1">Logged to audit trail</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p className="font-dm text-[12px] text-[var(--gold)] uppercase tracking-[0.14em]">Compose Email</p>
                    <p className="font-dm text-[11px] text-[var(--t2)] mt-0.5">{selected.name}</p>
                  </div>
                  <button
                    onClick={() => { setSendState('idle'); setSelected(null) }}
                    className="font-mono text-[12px] text-[var(--t3)]"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                  >
                    ✕
                  </button>
                </div>

                {/* Recipient */}
                <div>
                  <label style={{ fontFamily: 'var(--font-dm)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--t3)', display: 'block', marginBottom: 5 }}>
                    Send To
                  </label>
                  <select
                    value={sendClient}
                    onChange={(e) => setSendClient(e.target.value)}
                    style={{ width: '100%', background: 'var(--bg-inset)', border: '1px solid var(--bdr)', borderRadius: 'var(--radius-sm)', padding: '7px 10px', color: 'var(--t1)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
                  >
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>{c.name} ({c.id})</option>
                    ))}
                  </select>
                </div>

                {/* Variable fills */}
                {selected.variables.filter((v) => v !== '{{CLIENT_NAME}}' && v !== '{{CLIENT_ID}}').length > 0 && (
                  <div>
                    <p className="font-dm text-[9px] uppercase tracking-[0.14em] text-[var(--t3)] mb-2">Fill Variables</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      {selected.variables
                        .filter((v) => v !== '{{CLIENT_NAME}}' && v !== '{{CLIENT_ID}}')
                        .map((v) => (
                          <div key={v}>
                            <label style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--t3)', display: 'block', marginBottom: 3 }}>
                              {v}
                            </label>
                            <input
                              value={customVars[v] ?? ''}
                              onChange={(e) => setCustomVars({ ...customVars, [v]: e.target.value })}
                              style={{ width: '100%', background: 'var(--bg-inset)', border: '1px solid var(--bdr)', borderRadius: 'var(--radius-sm)', padding: '6px 10px', color: 'var(--t1)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
                              placeholder={v.replace(/[{}]/g, '')}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Email preview */}
                <div>
                  <p className="font-dm text-[9px] uppercase tracking-[0.14em] text-[var(--t3)] mb-2">Preview</p>
                  <div
                    style={{
                      background: 'var(--bg-inset)', border: '1px solid var(--bdr)',
                      borderRadius: 'var(--radius-sm)', padding: '12px 14px',
                      maxHeight: 220, overflowY: 'auto',
                    }}
                  >
                    <p className="font-mono text-[9px] text-[var(--t3)] mb-3">
                      Subject: {selected.subject.replace('{{CLIENT_ID}}', sendClient).replace('{{MONTH}}', customVars['{{MONTH}}'] ?? '{{MONTH}}')}
                    </p>
                    <pre
                      className="font-mono text-[10px] leading-[1.7] text-[var(--t2)] whitespace-pre-wrap"
                    >
                      {fillPreview(selected.body, customVars, sendClient)}
                    </pre>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => { setSendState('idle'); setSelected(null) }}
                    className="font-dm text-[10px] uppercase tracking-[0.12em]"
                    style={{ padding: '8px 16px', border: '1px solid var(--bdr)', background: 'none', color: 'var(--t2)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSend}
                    className="font-dm text-[10px] uppercase tracking-[0.12em]"
                    style={{ padding: '8px 20px', background: 'var(--gold)', color: 'black', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Send Email →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
