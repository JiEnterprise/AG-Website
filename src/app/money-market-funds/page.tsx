import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'

const OFFERINGS = [
  {
    title: 'AG Government Money Market',
    desc: 'Invests exclusively in US government securities and repurchase agreements — the highest-quality short-term instruments available.',
  },
  {
    title: 'AG Prime Money Market',
    desc: 'Diversified exposure to high-quality commercial paper, CDs, and short-term corporate obligations for enhanced yield potential.',
  },
  {
    title: 'AG Municipal Money Market',
    desc: 'Tax-exempt income from high-grade short-term municipal securities, optimized for investors in higher federal tax brackets.',
  },
  {
    title: 'AG Treasury Obligations Fund',
    desc: 'Concentrated in direct obligations of the US Treasury — maximum safety with competitive yields backed by full government guarantee.',
  },
  {
    title: 'AG Ultra-Short Bond Fund',
    desc: 'A step up in yield from traditional money markets, investing in investment-grade bonds with maturities under one year.',
  },
]

const STATS = [
  { value: '$96B', label: 'Money Market Assets' },
  { value: '5.12%', label: 'Current Yield APY' },
  { value: 'Same-Day', label: 'Liquidity' },
]

export default function MoneyMarketFundsPage() {
  return (
    <main className="bg-obsidian text-pale-gold min-h-screen">

      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[88vh] flex flex-col justify-end overflow-hidden border-b border-[rgba(255,255,255,0.09)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#000000] to-[#000000]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(120,119,198,0.07) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(120,119,198,0.05) 0%, transparent 50%)' }} />

        <div className="relative z-10 max-w-[1240px] mx-auto w-full px-6 sm:px-10 pb-20">
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Money Market Funds</p>
          <h1 className="font-playfair text-[56px] sm:text-[80px] leading-[1.0] text-pale-gold max-w-[700px] mb-8">
            Preserve Capital.<br />Stay Liquid.<br />Earn More.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed text-[#F5F5F7] max-w-[560px] mb-10">
            Aurum Global money market funds offer competitive yields, same-day liquidity, and capital preservation — the intelligent home for cash between deployments.
          </p>
          <Link href="/sign-in" className="inline-flex items-center gap-2 px-7 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#000000] font-medium hover:bg-pale-gold transition-all duration-200">
            Start Earning <ArrowRight size={14} strokeWidth={2} />
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
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Our Fund Options</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-14 leading-tight max-w-[600px]">
          The right cash solution for every investor profile.
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

      {/* Why AG Money Market */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(255,255,255,0.09)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Why AG Money Markets</p>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { title: 'Capital Preservation', desc: 'Rigorous credit standards and diversification protocols ensure your principal remains protected against market volatility.' },
            { title: 'Competitive Yields', desc: 'AG\'s scale and institutional access allow us to source the highest-quality short-term instruments at superior rates.' },
            { title: 'Instant Access', desc: 'Same-day liquidity means your cash is always available when opportunity calls — no lock-up periods, no waiting.' },
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
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Put Your Cash to Work</p>
        <h2 className="font-playfair text-[48px] sm:text-[60px] text-pale-gold leading-tight mb-6">
          Earn 5.12% APY<br />on Idle Cash.
        </h2>
        <p className="font-dm text-[15px] text-[#86868B] leading-relaxed max-w-[480px] mx-auto mb-10">
          Open an Aurum Global account and instantly access our full suite of money market funds with same-day liquidity and competitive institutional yields.
        </p>
        <Link href="/sign-in" className="inline-flex items-center gap-2 px-8 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#000000] font-medium hover:bg-pale-gold transition-all duration-200">
          Open an Account <ArrowRight size={14} strokeWidth={2} />
        </Link>
      </section>

    </main>
  )
}
