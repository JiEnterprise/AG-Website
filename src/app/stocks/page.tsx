import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'

const OFFERINGS = [
  {
    title: 'US Equities',
    desc: 'Full access to NYSE, NASDAQ, and OTC markets — from blue-chip staples to high-growth technology names — with institutional execution quality.',
  },
  {
    title: 'International Equities',
    desc: 'Trade equities on major exchanges across Europe, Asia-Pacific, and emerging markets through a single unified AG account.',
  },
  {
    title: 'Pre-IPO Access',
    desc: 'Exclusive allocation to pre-IPO and late-stage private placements sourced through AG\'s institutional banking relationships.',
  },
  {
    title: 'Block Trading',
    desc: 'AG\'s dedicated block desk facilitates large institutional-size transactions with minimum market impact and discreet execution.',
  },
  {
    title: 'Dividend Reinvestment',
    desc: 'Automatic reinvestment of cash dividends into additional shares, enabling seamless compounding without manual intervention.',
  },
  {
    title: 'Fractional Shares',
    desc: 'Invest any dollar amount into the world\'s leading companies — removing minimum price barriers to true portfolio diversification.',
  },
]

const STATS = [
  { value: '60+', label: 'Global Exchanges' },
  { value: 'Sub-ms', label: 'Execution Speed' },
  { value: '$0', label: 'Commission for AG Clients' },
]

export default function StocksPage() {
  return (
    <main className="bg-obsidian text-pale-gold min-h-screen">

      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[88vh] flex flex-col justify-end overflow-hidden border-b border-[rgba(201,168,76,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0900] via-[#0D0C08] to-[#08080A]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C9A84C 0%, transparent 40%)' }} />

        <div className="relative z-10 max-w-[1240px] mx-auto w-full px-6 sm:px-10 pb-20">
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Equities</p>
          <h1 className="font-playfair text-[56px] sm:text-[80px] leading-[1.0] text-pale-gold max-w-[700px] mb-8">
            Research-Driven.<br />Global Markets.<br />Flawless Execution.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed text-[#C8BEA8] max-w-[560px] mb-10">
            Aurum Global provides institutional-grade equity access across 60+ global exchanges — with zero commission, sub-millisecond execution, and the full depth of our research coverage.
          </p>
          <Link href="/sign-in" className="inline-flex items-center gap-2 px-7 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#0A0800] font-medium hover:bg-pale-gold transition-all duration-200">
            Start Trading <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[rgba(201,168,76,0.1)]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10 py-20 grid sm:grid-cols-3 gap-12">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <p className="font-playfair text-[56px] sm:text-[64px] text-aurum-gold leading-none mb-3">{s.value}</p>
              <p className="font-dm text-[11px] uppercase tracking-[0.2em] text-[#8A8070]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Offerings */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(201,168,76,0.1)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Equity Capabilities</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-14 leading-tight max-w-[600px]">
          Every way to own equities, on a single platform.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFERINGS.map((o, i) => (
            <div key={o.title} className="rounded-2xl border border-[rgba(201,168,76,0.1)] bg-[rgba(17,17,20,0.6)] p-8 flex flex-col group hover:border-[rgba(201,168,76,0.28)] hover:-translate-y-1 transition-all duration-200">
              <div className="font-playfair text-[36px] text-aurum-gold opacity-[0.12] mb-4 leading-none">{String(i + 1).padStart(2, '0')}</div>
              <div className="w-8 h-[1px] bg-aurum-gold mb-5 opacity-50" />
              <h3 className="font-playfair text-[18px] text-pale-gold mb-3 leading-snug">{o.title}</h3>
              <p className="font-dm text-[12px] text-[#8A8070] leading-relaxed flex-1">{o.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why AG Equities */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(201,168,76,0.1)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">The AG Edge</p>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { title: 'Proprietary Research', desc: 'Our global equity research team covers 3,000+ securities across 40 countries, delivering actionable insights unavailable anywhere else.' },
            { title: 'Smart Order Routing', desc: 'AG\'s proprietary SOR technology scans 60+ venues in real time to guarantee best execution on every order — large or small.' },
            { title: 'Zero-Commission Trading', desc: 'All AG clients trade US equities with zero commission. No hidden fees, no payment for order flow — just transparent, fair execution.' },
          ].map(c => (
            <div key={c.title} className="rounded-2xl border border-[rgba(201,168,76,0.1)] bg-[rgba(17,17,20,0.6)] p-8 hover:border-[rgba(201,168,76,0.28)] hover:-translate-y-1 transition-all duration-200">
              <div className="w-10 h-[1px] bg-aurum-gold mb-6 opacity-60" />
              <h3 className="font-playfair text-[20px] text-pale-gold mb-4">{c.title}</h3>
              <p className="font-dm text-[12px] text-[#8A8070] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="max-w-[1240px] mx-auto px-6 sm:px-10 py-28 text-center">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Access Global Markets</p>
        <h2 className="font-playfair text-[48px] sm:text-[60px] text-pale-gold leading-tight mb-6">
          Trade the World<br />from One Account.
        </h2>
        <p className="font-dm text-[15px] text-[#8A8070] leading-relaxed max-w-[480px] mx-auto mb-10">
          Open an Aurum Global account to access 60+ global exchanges with zero commission, institutional execution, and proprietary research coverage.
        </p>
        <Link href="/sign-in" className="inline-flex items-center gap-2 px-8 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#0A0800] font-medium hover:bg-pale-gold transition-all duration-200">
          Open an Account <ArrowRight size={14} strokeWidth={2} />
        </Link>
      </section>

    </main>
  )
}
