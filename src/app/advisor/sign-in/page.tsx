'use client'

import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react'
import { Lock } from 'lucide-react'

export default function AdvisorSignInPage() {
  const [username, setUsername] = useState('SaswatC')
  const [password, setPassword] = useState('Saswat')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    const result = await signIn('credentials', {
      username,
      password,
      redirect: true,
      callbackUrl: '/advisor/dashboard',
    })

    if (result?.error) {
      setError('Invalid credentials. Please try again.')
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg-root)] p-6">
      <div className="w-full max-w-[420px] rounded-[var(--radius-xl)] border border-[var(--gold-border)] bg-[var(--bg-card)] p-6">
        <p className="font-dm text-[9px] uppercase tracking-[0.22em] text-[var(--gold)]">Aurum Global</p>
        <h1 className="mt-2 font-playfair text-[28px] text-[var(--t1)]">Advisor Portal Access</h1>
        <p className="mt-1 font-dm text-[11px] text-[var(--t3)]">
          Internal command center access for authorized advisor/founder roles.
        </p>

        <form className="mt-5 space-y-3" onSubmit={onSubmit}>
          <label className="block space-y-1">
            <span className="font-dm text-[10px] uppercase tracking-[0.14em] text-[var(--t3)]">Username</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-10 w-full rounded-[var(--radius-sm)] border border-[var(--bdr)] bg-[var(--bg-input)] px-3 font-mono text-[11px] text-[var(--t1)] outline-none focus:border-[var(--gold-border)]"
            />
          </label>

          <label className="block space-y-1">
            <span className="font-dm text-[10px] uppercase tracking-[0.14em] text-[var(--t3)]">Password</span>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 w-full rounded-[var(--radius-sm)] border border-[var(--bdr)] bg-[var(--bg-input)] px-3 pr-9 font-mono text-[11px] text-[var(--t1)] outline-none focus:border-[var(--gold-border)]"
              />
              <Lock size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--t3)]" />
            </div>
          </label>

          {error && <p className="font-dm text-[10px] text-[var(--loss)]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="h-10 w-full rounded-full bg-[var(--gold)] font-dm text-[10px] uppercase tracking-[0.14em] text-black disabled:opacity-60"
          >
            {loading ? 'Authenticating…' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  )
}
