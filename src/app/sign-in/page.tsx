'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Lock, ShieldCheck } from 'lucide-react'

const trustNotes = [
  'Enterprise-grade encryption and secure session handling.',
  'Multi-asset access controls for private and institutional accounts.',
  'Continuous monitoring and compliance-aligned audit controls.',
]

export default function SignInPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      if ((username === 'DL2503' && password === 'David') || (username === 'SaswatC' && password === 'Saswat')) {
        router.push('/portal')
      } else {
        setError('Invalid username or password. Please try again.')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <main
      id="main-content"
      className="relative min-h-screen overflow-hidden bg-obsidian text-pale-gold"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,168,76,0.08),transparent_42%),radial-gradient(circle_at_80%_80%,rgba(201,168,76,0.05),transparent_36%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,8,10,0.92),rgba(8,8,10,0.72))]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1240px] flex-col px-6 pb-10 pt-24 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="mb-8 inline-flex h-11 w-fit items-center gap-2 rounded-full border border-[rgba(201,168,76,0.24)] px-4 font-dm text-[12px] uppercase tracking-[0.12em] text-[#C8BEA8] transition-all duration-200 hover:border-aurum-gold hover:text-pale-gold"
        >
          <ArrowLeft size={14} strokeWidth={1.75} />
          Back to Site
        </Link>

        <section className="grid flex-1 gap-6 lg:grid-cols-[1.2fr_0.9fr]">
          <div className="rounded-2xl border border-[rgba(201,168,76,0.16)] bg-[rgba(17,17,20,0.82)] p-8 backdrop-blur-xl sm:p-10 lg:p-12">
            <p className="font-dm text-[10px] uppercase tracking-[0.24em] text-aurum-gold">
              Institutional Access
            </p>
            <h1 className="mt-5 font-playfair text-[42px] leading-[1.1] text-pale-gold sm:text-[56px]">
              Secure Client Login
            </h1>
            <p className="mt-5 max-w-[560px] font-dm text-[15px] leading-relaxed text-[#B8AE99] sm:text-[16px]">
              Access portfolios, execution tools, and institutional reporting from one
              protected interface.
            </p>

            <div className="mt-10 space-y-4">
              {trustNotes.map((note) => (
                <div
                  key={note}
                  className="flex min-h-11 items-start gap-3 rounded-xl border border-[rgba(201,168,76,0.1)] bg-[rgba(26,26,30,0.55)] px-4 py-3"
                >
                  <ShieldCheck
                    size={16}
                    strokeWidth={1.8}
                    className="mt-0.5 shrink-0 text-aurum-gold"
                  />
                  <p className="font-dm text-[13px] leading-relaxed text-[#C8BEA8]">{note}</p>
                </div>
              ))}
            </div>

            <p className="mt-10 max-w-[580px] font-mono text-[10px] leading-relaxed text-muted-gold">
              For accredited investors and qualified institutional buyers only. By
              signing in, you confirm that your account activity remains subject to all
              applicable disclosures and risk acknowledgements.
            </p>
          </div>

          <div className="rounded-2xl border border-[rgba(201,168,76,0.2)] bg-[rgba(10,10,12,0.88)] p-7 shadow-[0_24px_64px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-9">
            <div className="mb-7">
              <p className="font-dm text-[10px] uppercase tracking-[0.2em] text-muted-gold">
                Account
              </p>
              <h2 className="mt-2 font-playfair text-[34px] leading-tight text-pale-gold">
                Sign In
              </h2>
            </div>

            <form className="space-y-4" aria-label="Sign in form" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label
                  htmlFor="username"
                  className="font-dm text-[11px] uppercase tracking-[0.12em] text-[#B8AE99]"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="h-12 w-full rounded-xl border border-[rgba(201,168,76,0.2)] bg-[rgba(26,26,30,0.7)] px-4 font-dm text-[14px] text-pale-gold placeholder:text-muted-gold transition-colors duration-200 focus:border-aurum-gold focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="font-dm text-[11px] uppercase tracking-[0.12em] text-[#B8AE99]"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="h-12 w-full rounded-xl border border-[rgba(201,168,76,0.2)] bg-[rgba(26,26,30,0.7)] px-4 pr-10 font-dm text-[14px] text-pale-gold placeholder:text-muted-gold transition-colors duration-200 focus:border-aurum-gold focus:outline-none"
                    required
                  />
                  <Lock
                    size={16}
                    strokeWidth={1.8}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-gold"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {error && (
                <p className="font-dm text-[12px] text-loss">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-1 inline-flex h-12 w-full items-center justify-center rounded-full bg-aurum-gold font-dm text-[12px] font-medium uppercase tracking-[0.1em] text-[#0A0800] transition-colors duration-200 hover:bg-pale-gold disabled:opacity-60"
              >
                {loading ? 'Verifying…' : 'Sign In Securely'}
              </button>
            </form>

            <p className="mt-6 border-t border-[rgba(201,168,76,0.1)] pt-5 font-mono text-[10px] leading-relaxed text-muted-gold">
              Need institutional onboarding?{' '}
              <Link href="/#contact" className="text-aurum-gold hover:text-pale-gold">
                Request Access
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
