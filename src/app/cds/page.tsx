import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'

const OFFERINGS = [
  {
    title: 'Standard CDs',
    desc: 'Guaranteed returns with fixed terms from 3 months to 5 years. Lock in today\'s rates with FDIC insurance up to $250,000.',
  },
  {
    title: 'Jumbo CDs',
    desc: 'Enhanced rates for deposits of $100,000 or more — AG\'s institutional relationships enable premium yields unavailable at retail banks.',
  },
  {
    title: 'No-Penalty CDs',
    desc: 'Enjoy a competitive fixed rate with the flexibility to withdraw your full principal before maturity — zero early withdrawal fees.',
  },
  {
    title: 'Step-Up CDs',
    desc: 'Your rate automatically increases at predetermined intervals — designed for investors expecting rates to rise over their holding period.',
  },
  {
    title: 'Brokered CDs',
    desc: 'Access CDs from a curated network of FDIC-insured banks, often at rates significantly higher than single-institution offerings.',
  },
  {
    title: 'IRA CDs',
    desc: 'Combine the safety and guaranteed returns of CDs with the tax advantages of an Individual Retirement Account — ideal for capital preservation within retirement portfolios.',
  },
]

const STATS = [
  { value: '5.40%', label: 'Rates up to APY' },
  { value: '3M–5Y', label: 'Flexible Terms' },
  { value: '$250K', label: 'FDIC Insured' },
]

export default function CDsPage() {
  return (
    <main className="bg-obsidian text-pale-gold min-h-screen">

      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[88vh] flex flex-col justify-end overflow-hidden border-b border-[rgba(255,255,255,0.09)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#000000] to-[#000000]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(120,119,198,0.07) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(120,119,198,0.05) 0%, transparent 50%)' }} />

        <div className="relative z-10 max-w-[1240px] mx-auto w-full px-6 sm:px-10 pb-20">
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Certificates of Deposit</p>
          <h1 className="font-playfair text-[56px] sm:text-[80px] leading-[1.0] text-pale-gold max-w-[700px] mb-8">
            Guaranteed Returns.<br />FDIC Insured.<br />Flexible Terms.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed text-[#F5F5F7] max-w-[560px] mb-10">
            Aurum Global CDs deliver up to 5.40% APY with FDIC insurance and terms tailored to your liquidity timeline — the secure foundation of any wealth preservation strategy.
          </p>
          <Link href="/sign-in" className="inline-flex items-center gap-2 px-7 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#000000] font-medium hover:bg-pale-gold transition-all duration-200">
            View Current Rates <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[rgba(255,255,255,0.09)]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10 py-20 grid sm:grid-cols-3 gap-12">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <p className="font-playfair text-[56px] sm:text-[64px] text-aurum-gold leading-none mb-3">{s.value}</p>
              <p className="font-dm text-[11px] uppercase tracking-[0.2em] text-[#86868B]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Offerings */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(255,255,255,0.09)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">CD Options</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-14 leading-tight max-w-[600px]">
          A CD for every investor objective and timeline.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFERINGS.map((o, i) => (
            <div key={o.title} className="rounded-2xl border border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.04)] p-8 flex flex-col group hover:border-[rgba(255,255,255,0.18)] hover:-translate-y-1 transition-all duration-200">
              <div className="font-playfair text-[36px] text-aurum-gold opacity-[0.12] mb-4 leading-none">{String(i + 1).padStart(2, '0')}</div>
              <div className="w-8 h-[1px] bg-aurum-gold mb-5 opacity-50" />
              <h3 className="font-playfair text-[18px] text-pale-gold mb-3 leading-snug">{o.title}</h3>
              <p className="font-dm text-[12px] text-[#86868B] leading-relaxed flex-1">{o.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why AG CDs */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(255,255,255,0.09)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Why AG Certificates of Deposit</p>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { title: 'FDIC Protection', desc: 'Every CD opened through Aurum Global is FDIC insured up to $250,000 per depositor — your principal is fully protected.' },
            { title: 'Institutional Rates', desc: 'AG\'s relationships with hundreds of FDIC-insured institutions allow us to source rates consistently above national averages.' },
            { title: 'Laddering Strategies', desc: 'Our advisors can structure a customized CD ladder across multiple maturities to optimize yield while managing liquidity needs.' },
          ].map(c => (
            <div key={c.title} className="rounded-2xl border border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.04)] p-8 hover:border-[rgba(255,255,255,0.18)] hover:-translate-y-1 transition-all duration-200">
              <div className="w-10 h-[1px] bg-aurum-gold mb-6 opacity-60" />
              <h3 className="font-playfair text-[20px] text-pale-gold mb-4">{c.title}</h3>
              <p className="font-dm text-[12px] text-[#86868B] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="max-w-[1240px] mx-auto px-6 sm:px-10 py-28 text-center">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Lock In Your Rate</p>
        <h2 className="font-playfair text-[48px] sm:text-[60px] text-pale-gold leading-tight mb-6">
          Earn Up to 5.40% APY<br />with Full FDIC Coverage.
        </h2>
        <p className="font-dm text-[15px] text-[#86868B] leading-relaxed max-w-[480px] mx-auto mb-10">
          Open an Aurum Global account to access today&apos;s top CD rates from our curated network of FDIC-insured institutions.
        </p>
        <Link href="/sign-in" className="inline-flex items-center gap-2 px-8 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#000000] font-medium hover:bg-pale-gold transition-all duration-200">
          Open an Account <ArrowRight size={14} strokeWidth={2} />
        </Link>
      </section>

    </main>
  )
}
