import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'

const OFFERINGS = [
  {
    title: 'AG Global Equity Fund',
    desc: 'Actively managed exposure to the world\'s leading companies across developed and emerging markets, targeting long-term capital appreciation.',
  },
  {
    title: 'AG Income & Growth Fund',
    desc: 'A balanced approach combining dividend-paying equities and investment-grade bonds for steady income alongside capital growth.',
  },
  {
    title: 'AG Emerging Markets Fund',
    desc: 'Concentrated exposure to high-growth emerging economies in Asia, Latin America, and Africa, managed by our dedicated EM desk.',
  },
  {
    title: 'AG Balanced Allocation Fund',
    desc: 'A multi-asset strategy dynamically adjusted to macroeconomic conditions, blending equities, fixed income, and real assets.',
  },
  {
    title: 'AG ESG Leaders Fund',
    desc: 'A rigorously screened portfolio of companies demonstrating superior environmental, social, and governance practices globally.',
  },
  {
    title: 'AG Small-Cap Opportunities',
    desc: 'Access to high-conviction small and mid-cap names identified through proprietary fundamental research and sector expertise.',
  },
]

const STATS = [
  { value: '47', label: 'Actively Managed Funds' },
  { value: '$280B', label: 'Total Fund Assets' },
  { value: '12.4%', label: 'Avg 10-Year Return' },
]

export default function MutualFundsPage() {
  return (
    <main className="bg-obsidian text-pale-gold min-h-screen">

      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[88vh] flex flex-col justify-end overflow-hidden border-b border-[rgba(255,255,255,0.09)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#000000] to-[#000000]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(120,119,198,0.07) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(120,119,198,0.05) 0%, transparent 50%)' }} />

        <div className="relative z-10 max-w-[1240px] mx-auto w-full px-6 sm:px-10 pb-20">
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Mutual Funds</p>
          <h1 className="font-playfair text-[56px] sm:text-[80px] leading-[1.0] text-pale-gold max-w-[700px] mb-8">
            Actively Managed.<br />Globally Diversified.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed text-[#F5F5F7] max-w-[560px] mb-10">
            Aurum Global&apos;s mutual fund suite delivers institutional-grade active management across global asset classes — built to compound wealth through every market cycle.
          </p>
          <Link href="/sign-in" className="inline-flex items-center gap-2 px-7 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#000000] font-medium hover:bg-pale-gold transition-all duration-200">
            Explore Funds <ArrowRight size={14} strokeWidth={2} />
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
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Our Fund Lineup</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-14 leading-tight max-w-[600px]">
          Strategies built for every objective and time horizon.
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

      {/* Why AG Mutual Funds */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(255,255,255,0.09)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Why Aurum Global</p>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { title: 'Institutional Research', desc: 'Every fund is backed by AG\'s global research team — combining macro analysis, bottom-up fundamentals, and proprietary data signals.' },
            { title: 'Active Risk Management', desc: 'Continuous portfolio monitoring with dynamic hedging overlays and strict drawdown controls to protect capital in volatile markets.' },
            { title: 'Tax-Efficient Structure', desc: 'Optimized fund architecture and harvesting strategies designed to minimize taxable events for high-net-worth investors.' },
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
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Begin Investing</p>
        <h2 className="font-playfair text-[48px] sm:text-[60px] text-pale-gold leading-tight mb-6">
          Access the Full<br />AG Fund Suite.
        </h2>
        <p className="font-dm text-[15px] text-[#86868B] leading-relaxed max-w-[480px] mx-auto mb-10">
          Speak with an Aurum Global investment specialist to identify the funds best aligned with your goals, risk profile, and time horizon.
        </p>
        <Link href="/sign-in" className="inline-flex items-center gap-2 px-8 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#000000] font-medium hover:bg-pale-gold transition-all duration-200">
          Get Started <ArrowRight size={14} strokeWidth={2} />
        </Link>
      </section>

    </main>
  )
}
