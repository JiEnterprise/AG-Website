'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageHeader from '@/components/advisor/PageHeader'

type Step = 1 | 2 | 3 | 4 | 5

type KYCData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  dob: string
  address: string
  city: string
  state: string
  zip: string
  employmentStatus: string
  annualIncome: string
  netWorth: string
}

type ObjectivesData = {
  riskTolerance: string
  horizon: string
  primaryGoal: string
  experience: string
  strategy: string
}

type DepositData = {
  amount: string
  method: string
  expectedDate: string
  reference: string
}

type IMAData = {
  reviewed: boolean
  idVerified: boolean
}

const STEPS = [
  { n: 1 as Step, label: 'KYC' },
  { n: 2 as Step, label: 'Objectives' },
  { n: 3 as Step, label: 'Deposit' },
  { n: 4 as Step, label: 'Agreement' },
  { n: 5 as Step, label: 'Confirm' },
]

function generateClientId(firstName: string, lastName: string): string {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  const year = new Date().getFullYear().toString().slice(2)
  const seq = String(Math.floor(Math.random() * 5) + 4).padStart(2, '0')
  return `${initials}${year}${seq}`
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--bg-inset)',
  border: '1px solid var(--bdr)',
  borderRadius: 'var(--radius-sm)',
  padding: '8px 12px',
  color: 'var(--t1)',
  fontSize: 12,
  fontFamily: 'var(--font-mono)',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-dm)',
  fontSize: 9,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.14em',
  color: 'var(--t3)',
  marginBottom: 5,
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

function SelectField({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
      <option value="">Select…</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}

export default function OnboardPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)

  const [kyc, setKyc] = useState<KYCData>({
    firstName: '', lastName: '', email: '', phone: '', dob: '',
    address: '', city: '', state: '', zip: '', employmentStatus: '',
    annualIncome: '', netWorth: '',
  })

  const [objectives, setObjectives] = useState<ObjectivesData>({
    riskTolerance: '', horizon: '', primaryGoal: '', experience: '', strategy: '',
  })

  const [deposit, setDeposit] = useState<DepositData>({
    amount: '', method: '', expectedDate: '', reference: '',
  })

  const [ima, setIma] = useState<IMAData>({ reviewed: false, idVerified: false })
  const [generatedId] = useState(() => generateClientId('', ''))
  const [finalId, setFinalId] = useState('')

  function canProceed(): boolean {
    if (step === 1) return !!(kyc.firstName && kyc.lastName && kyc.email && kyc.phone && kyc.dob)
    if (step === 2) return !!(objectives.riskTolerance && objectives.horizon && objectives.primaryGoal && objectives.strategy)
    if (step === 3) return !!(deposit.amount && deposit.method && deposit.expectedDate)
    if (step === 4) return ima.reviewed && ima.idVerified
    return true
  }

  function advance() {
    if (step === 4) {
      setFinalId(generateClientId(kyc.firstName, kyc.lastName))
      setStep(5)
    } else {
      setStep((s) => (s + 1) as Step)
    }
  }

  const accentBorder = '1px solid rgba(201,168,76,0.3)'

  return (
    <div className="space-y-5" style={{ maxWidth: 760, margin: '0 auto' }}>
      <PageHeader
        eyebrow="Client Operations · New Onboarding"
        title="Client Onboarding Wizard"
        subtitle="KYC · Investment Objectives · Deposit · IMA · Auto ID Generation"
      />

      {/* Progress bar */}
      <div
        className="rounded-[var(--radius-lg)] border bg-[var(--bg-card)] p-4"
        style={{ borderColor: 'var(--bdr)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {STEPS.map((s, i) => {
            const done = step > s.n
            const active = step === s.n
            const color = done ? 'var(--gain)' : active ? 'var(--gold)' : 'var(--t3)'
            return (
              <div key={s.n} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div
                    style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: done ? 'var(--gain-bg)' : active ? 'rgba(201,168,76,0.15)' : 'var(--bg-inset)',
                      border: `2px solid ${color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color,
                    }}
                  >
                    {done ? '✓' : s.n}
                  </div>
                  <span style={{ fontFamily: 'var(--font-dm)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color }}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      flex: 1, height: 2, margin: '0 6px', marginBottom: 20,
                      background: done ? 'var(--gain)' : 'var(--bdr)',
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Step panels */}
      {step === 1 && (
        <div
          className="rounded-[var(--radius-lg)] border bg-[var(--bg-card)] p-5 space-y-4"
          style={{ borderColor: 'var(--bdr)' }}
        >
          <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Step 1 — Know Your Client</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <FieldGroup label="First Name">
              <input style={inputStyle} value={kyc.firstName} onChange={(e) => setKyc({ ...kyc, firstName: e.target.value })} placeholder="John" />
            </FieldGroup>
            <FieldGroup label="Last Name">
              <input style={inputStyle} value={kyc.lastName} onChange={(e) => setKyc({ ...kyc, lastName: e.target.value })} placeholder="Smith" />
            </FieldGroup>
            <FieldGroup label="Email Address">
              <input style={inputStyle} type="email" value={kyc.email} onChange={(e) => setKyc({ ...kyc, email: e.target.value })} placeholder="john@example.com" />
            </FieldGroup>
            <FieldGroup label="Phone Number">
              <input style={inputStyle} type="tel" value={kyc.phone} onChange={(e) => setKyc({ ...kyc, phone: e.target.value })} placeholder="+1 (555) 000-0000" />
            </FieldGroup>
            <FieldGroup label="Date of Birth">
              <input style={inputStyle} type="date" value={kyc.dob} onChange={(e) => setKyc({ ...kyc, dob: e.target.value })} />
            </FieldGroup>
            <FieldGroup label="Employment Status">
              <SelectField
                value={kyc.employmentStatus}
                onChange={(v) => setKyc({ ...kyc, employmentStatus: v })}
                options={[
                  { value: 'employed', label: 'Employed (Full-time)' },
                  { value: 'self-employed', label: 'Self-Employed' },
                  { value: 'retired', label: 'Retired' },
                  { value: 'student', label: 'Student' },
                  { value: 'other', label: 'Other' },
                ]}
              />
            </FieldGroup>
            <FieldGroup label="Home Address">
              <input style={inputStyle} value={kyc.address} onChange={(e) => setKyc({ ...kyc, address: e.target.value })} placeholder="123 Main Street" />
            </FieldGroup>
            <FieldGroup label="City">
              <input style={inputStyle} value={kyc.city} onChange={(e) => setKyc({ ...kyc, city: e.target.value })} placeholder="New York" />
            </FieldGroup>
            <FieldGroup label="State">
              <input style={inputStyle} value={kyc.state} onChange={(e) => setKyc({ ...kyc, state: e.target.value })} placeholder="NY" />
            </FieldGroup>
            <FieldGroup label="ZIP Code">
              <input style={inputStyle} value={kyc.zip} onChange={(e) => setKyc({ ...kyc, zip: e.target.value })} placeholder="10001" />
            </FieldGroup>
            <FieldGroup label="Annual Income Range">
              <SelectField
                value={kyc.annualIncome}
                onChange={(v) => setKyc({ ...kyc, annualIncome: v })}
                options={[
                  { value: 'under-50k', label: 'Under $50,000' },
                  { value: '50k-100k', label: '$50,000 – $100,000' },
                  { value: '100k-250k', label: '$100,000 – $250,000' },
                  { value: '250k-500k', label: '$250,000 – $500,000' },
                  { value: 'over-500k', label: 'Over $500,000' },
                ]}
              />
            </FieldGroup>
            <FieldGroup label="Net Worth Range">
              <SelectField
                value={kyc.netWorth}
                onChange={(v) => setKyc({ ...kyc, netWorth: v })}
                options={[
                  { value: 'under-100k', label: 'Under $100,000' },
                  { value: '100k-500k', label: '$100,000 – $500,000' },
                  { value: '500k-1m', label: '$500,000 – $1,000,000' },
                  { value: 'over-1m', label: 'Over $1,000,000' },
                ]}
              />
            </FieldGroup>
          </div>
        </div>
      )}

      {step === 2 && (
        <div
          className="rounded-[var(--radius-lg)] border bg-[var(--bg-card)] p-5 space-y-4"
          style={{ borderColor: 'var(--bdr)' }}
        >
          <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Step 2 — Investment Objectives</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <FieldGroup label="Risk Tolerance">
              <SelectField
                value={objectives.riskTolerance}
                onChange={(v) => setObjectives({ ...objectives, riskTolerance: v })}
                options={[
                  { value: 'conservative', label: 'Conservative — Preserve capital' },
                  { value: 'moderate', label: 'Moderate — Balanced growth/income' },
                  { value: 'aggressive', label: 'Aggressive — Maximum growth' },
                ]}
              />
            </FieldGroup>
            <FieldGroup label="Investment Horizon">
              <SelectField
                value={objectives.horizon}
                onChange={(v) => setObjectives({ ...objectives, horizon: v })}
                options={[
                  { value: 'short', label: 'Short-term (< 1 year)' },
                  { value: 'medium', label: 'Medium (1–3 years)' },
                  { value: 'long', label: 'Long-term (3–5 years)' },
                  { value: 'very-long', label: 'Very long (5+ years)' },
                ]}
              />
            </FieldGroup>
            <FieldGroup label="Primary Goal">
              <SelectField
                value={objectives.primaryGoal}
                onChange={(v) => setObjectives({ ...objectives, primaryGoal: v })}
                options={[
                  { value: 'income', label: 'Income Generation' },
                  { value: 'growth', label: 'Capital Growth' },
                  { value: 'preservation', label: 'Capital Preservation' },
                  { value: 'balanced', label: 'Balanced (Income + Growth)' },
                ]}
              />
            </FieldGroup>
            <FieldGroup label="Investment Experience">
              <SelectField
                value={objectives.experience}
                onChange={(v) => setObjectives({ ...objectives, experience: v })}
                options={[
                  { value: 'none', label: 'None' },
                  { value: 'beginner', label: 'Beginner (< 2 years)' },
                  { value: 'intermediate', label: 'Intermediate (2–5 years)' },
                  { value: 'advanced', label: 'Advanced (5+ years)' },
                ]}
              />
            </FieldGroup>
            <div style={{ gridColumn: '1 / -1' }}>
              <FieldGroup label="Approved Strategy">
                <SelectField
                  value={objectives.strategy}
                  onChange={(v) => setObjectives({ ...objectives, strategy: v })}
                  options={[
                    { value: 'agquant-income', label: 'AGQuant Income — YieldMax ETF cycles, dividend capture' },
                    { value: 'agquant-growth', label: 'AGQuant Growth — Momentum + sector rotation' },
                    { value: 'agquant-hybrid', label: 'AGQuant Hybrid — Income 70% + Growth 30%' },
                    { value: 'custom', label: 'Custom — Defined separately in IMA' },
                  ]}
                />
              </FieldGroup>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div
          className="rounded-[var(--radius-lg)] border bg-[var(--bg-card)] p-5 space-y-4"
          style={{ borderColor: 'var(--bdr)' }}
        >
          <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Step 3 — Initial Deposit</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <FieldGroup label="Deposit Amount (USD)">
              <input
                style={inputStyle} type="number" min="0" step="0.01"
                value={deposit.amount}
                onChange={(e) => setDeposit({ ...deposit, amount: e.target.value })}
                placeholder="500.00"
              />
            </FieldGroup>
            <FieldGroup label="Payment Method">
              <SelectField
                value={deposit.method}
                onChange={(v) => setDeposit({ ...deposit, method: v })}
                options={[
                  { value: 'cash_app', label: 'Cash App' },
                  { value: 'zelle', label: 'Zelle' },
                  { value: 'wire', label: 'Wire Transfer' },
                  { value: 'ach', label: 'ACH' },
                  { value: 'check', label: 'Check' },
                ]}
              />
            </FieldGroup>
            <FieldGroup label="Expected Receipt Date">
              <input
                style={inputStyle} type="date"
                value={deposit.expectedDate}
                onChange={(e) => setDeposit({ ...deposit, expectedDate: e.target.value })}
              />
            </FieldGroup>
            <FieldGroup label="Reference / Note (optional)">
              <input
                style={inputStyle}
                value={deposit.reference}
                onChange={(e) => setDeposit({ ...deposit, reference: e.target.value })}
                placeholder="e.g. CA-04111"
              />
            </FieldGroup>
          </div>

          {deposit.amount && (
            <div
              className="rounded-[var(--radius-sm)] p-3 font-mono text-[10px]"
              style={{ background: 'rgba(201,168,76,0.06)', border: accentBorder, color: 'var(--t2)' }}
            >
              Monthly management fee at 1% AUM: ~{' '}
              <span style={{ color: 'var(--gold)' }}>
                ${(Number(deposit.amount) * 0.01).toFixed(2)} / month
              </span>
            </div>
          )}
        </div>
      )}

      {step === 4 && (
        <div
          className="rounded-[var(--radius-lg)] border bg-[var(--bg-card)] p-5 space-y-4"
          style={{ borderColor: 'var(--bdr)' }}
        >
          <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Step 4 — Investment Management Agreement</h2>

          {/* IMA preview */}
          <div
            className="rounded-[var(--radius-sm)] p-4 space-y-3 font-mono text-[10px] leading-[1.8]"
            style={{ background: 'var(--bg-inset)', border: '1px solid var(--bdr)', color: 'var(--t2)', maxHeight: 340, overflowY: 'auto' }}
          >
            <p style={{ color: 'var(--gold)', fontFamily: 'var(--font-dm)', fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Investment Management Agreement
            </p>
            <p style={{ color: 'var(--t3)', fontSize: 9 }}>
              Aurum Global Inc. · {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p>
              This Investment Management Agreement (&quot;Agreement&quot;) is entered into between{' '}
              <strong style={{ color: 'var(--t1)' }}>
                {kyc.firstName || 'CLIENT'} {kyc.lastName || 'NAME'}
              </strong>{' '}
              (&quot;Client&quot;) and <strong style={{ color: 'var(--t1)' }}>Aurum Global Inc.</strong> (&quot;Advisor&quot;),
              effective as of the date of signing.
            </p>
            <p>
              <strong style={{ color: 'var(--t1)' }}>1. Services.</strong> Advisor will manage Client&apos;s investment account using the{' '}
              <strong style={{ color: 'var(--gold)' }}>
                {objectives.strategy === 'agquant-income' ? 'AGQuant Income Strategy'
                  : objectives.strategy === 'agquant-growth' ? 'AGQuant Growth Strategy'
                  : objectives.strategy === 'agquant-hybrid' ? 'AGQuant Hybrid Strategy'
                  : 'Custom Strategy (defined separately)'}
              </strong>
              . Advisor has full discretionary authority to execute trades without prior Client approval.
            </p>
            <p>
              <strong style={{ color: 'var(--t1)' }}>2. Fees.</strong> Advisor shall be compensated at a rate of{' '}
              <strong style={{ color: 'var(--t1)' }}>1.00% of month-end AUM</strong>, billed monthly. A transaction
              fee of <strong style={{ color: 'var(--t1)' }}>$0.20 per trade side</strong> may also apply. Fees are due
              within 5 business days of invoice.
            </p>
            <p>
              <strong style={{ color: 'var(--t1)' }}>3. Risk Acknowledgment.</strong> Client acknowledges that investment
              involves risk of loss. Past performance does not guarantee future results. Client&apos;s risk tolerance
              has been assessed as{' '}
              <strong style={{ color: 'var(--t1)' }}>
                {objectives.riskTolerance || 'Moderate'}
              </strong>
              .
            </p>
            <p>
              <strong style={{ color: 'var(--t1)' }}>4. Termination.</strong> Either party may terminate this Agreement
              with 30 days written notice. Upon termination, all positions will be liquidated and proceeds returned
              to Client within 5 business days.
            </p>
            <p>
              <strong style={{ color: 'var(--t1)' }}>5. Confidentiality.</strong> All account information and trading
              activity shall remain strictly confidential between Client and Advisor.
            </p>
            <p>
              <strong style={{ color: 'var(--t1)' }}>6. Governing Law.</strong> This Agreement shall be governed by the
              laws of the State of New York. Disputes shall be resolved through binding arbitration.
            </p>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            {[
              { key: 'reviewed' as const, label: 'I have reviewed the IMA with the client and the client has agreed to all terms' },
              { key: 'idVerified' as const, label: 'Client identity has been verified via government-issued ID and records are on file' },
            ].map((item) => (
              <label
                key={item.key}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}
              >
                <div
                  onClick={() => setIma({ ...ima, [item.key]: !ima[item.key] })}
                  style={{
                    width: 16, height: 16, borderRadius: 3, flexShrink: 0, marginTop: 1,
                    border: `2px solid ${ima[item.key] ? 'var(--gain)' : 'var(--bdr)'}`,
                    background: ima[item.key] ? 'var(--gain-bg)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {ima[item.key] && <span style={{ color: 'var(--gain)', fontSize: 10, fontWeight: 700 }}>✓</span>}
                </div>
                <span className="font-dm text-[10px] leading-[1.6]" style={{ color: 'var(--t2)' }}>
                  {item.label}
                </span>
              </label>
            ))}
          </div>

          <button
            className="font-dm text-[10px] uppercase tracking-[0.12em]"
            style={{
              padding: '7px 14px', border: '1px solid var(--bdr)',
              borderRadius: 'var(--radius-sm)', background: 'var(--bg-inset)',
              color: 'var(--t2)', cursor: 'pointer',
            }}
          >
            ↓ Download IMA PDF (Mock)
          </button>
        </div>
      )}

      {step === 5 && (
        <div
          className="rounded-[var(--radius-lg)] border bg-[var(--bg-card)] p-6 space-y-5 text-center"
          style={{ borderColor: 'rgba(201,168,76,0.3)' }}
        >
          <div>
            <div
              style={{
                width: 56, height: 56, borderRadius: '50%', margin: '0 auto 16px',
                background: 'rgba(201,168,76,0.12)',
                border: '2px solid var(--gold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24,
              }}
            >
              ✓
            </div>
            <h2 className="font-dm text-[16px] text-[var(--t1)]" style={{ letterSpacing: '0.04em' }}>Client Onboarded</h2>
            <p className="font-dm text-[11px] text-[var(--t3)] mt-1">Account created and ready for funding</p>
          </div>

          {/* Generated ID */}
          <div
            className="rounded-[var(--radius-lg)] p-4 space-y-3"
            style={{ background: 'rgba(201,168,76,0.06)', border: accentBorder, textAlign: 'left' }}
          >
            <p className="font-dm text-[9px] uppercase tracking-[0.14em] text-[var(--t3)]">Generated Client Profile</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: 'Client ID', value: finalId, gold: true },
                { label: 'Full Name', value: `${kyc.firstName} ${kyc.lastName}` },
                { label: 'Email', value: kyc.email },
                { label: 'Phone', value: kyc.phone },
                { label: 'Strategy', value: objectives.strategy === 'agquant-income' ? 'AGQuant Income' : objectives.strategy === 'agquant-growth' ? 'AGQuant Growth' : objectives.strategy === 'agquant-hybrid' ? 'AGQuant Hybrid' : 'Custom' },
                { label: 'Risk Profile', value: objectives.riskTolerance ? objectives.riskTolerance.charAt(0).toUpperCase() + objectives.riskTolerance.slice(1) : '—' },
                { label: 'Initial Deposit', value: deposit.amount ? `$${Number(deposit.amount).toFixed(2)}` : '—' },
                { label: 'Payment Method', value: deposit.method ? deposit.method.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase()) : '—' },
              ].map((row) => (
                <div key={row.label}>
                  <p className="font-dm text-[9px] uppercase tracking-[0.12em] text-[var(--t3)]">{row.label}</p>
                  <p
                    className="font-mono text-[12px] font-semibold"
                    style={{ color: (row as { gold?: boolean }).gold ? 'var(--gold)' : 'var(--t1)' }}
                  >
                    {row.value || '—'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <button
              onClick={() => router.push('/advisor/clients')}
              className="font-dm text-[10px] uppercase tracking-[0.12em]"
              style={{
                padding: '9px 20px',
                background: 'var(--gold)', color: 'black',
                border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              View Client Roster
            </button>
            <button
              onClick={() => router.push('/advisor/compliance')}
              className="font-dm text-[10px] uppercase tracking-[0.12em]"
              style={{
                padding: '9px 20px',
                border: '1px solid var(--bdr)', background: 'var(--bg-inset)',
                color: 'var(--t2)', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
              }}
            >
              View Compliance
            </button>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      {step < 5 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => step > 1 && setStep((s) => (s - 1) as Step)}
            disabled={step === 1}
            className="font-dm text-[10px] uppercase tracking-[0.12em]"
            style={{
              padding: '8px 16px',
              border: '1px solid var(--bdr)', background: 'none',
              color: step === 1 ? 'var(--t3)' : 'var(--t2)',
              borderRadius: 'var(--radius-sm)', cursor: step === 1 ? 'default' : 'pointer',
              opacity: step === 1 ? 0.4 : 1,
            }}
          >
            ← Back
          </button>
          <button
            onClick={advance}
            disabled={!canProceed()}
            className="font-dm text-[10px] uppercase tracking-[0.12em]"
            style={{
              padding: '8px 20px',
              background: canProceed() ? 'var(--gold)' : 'var(--bg-inset)',
              color: canProceed() ? 'black' : 'var(--t3)',
              border: canProceed() ? 'none' : '1px solid var(--bdr)',
              borderRadius: 'var(--radius-sm)', cursor: canProceed() ? 'pointer' : 'default',
              fontWeight: canProceed() ? 600 : 400,
            }}
          >
            {step === 4 ? 'Generate Client ID →' : 'Continue →'}
          </button>
        </div>
      )}
    </div>
  )
}
