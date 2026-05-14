import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'

const OFFERINGS = [
  {
    title: 'AG US Total Market ETF',
    desc: 'Broad, low-cost exposure to the entire US equity market — from mega-cap leaders to small-cap innovators — in a single efficient wrapper.',
  },
  {
    title: 'AG International ETF',
    desc: 'Diversified access to developed and emerging markets outside the US, tracking AG\'s proprietary global index with daily liquidity.',
  },
  {
    title: 'AG Fixed Income ETF',
    desc: 'Core bond exposure spanning government, corporate, and mortgage-backed securities with a focus on duration-managed income.',
  },
  {
    title: 'AG Dividend Leaders ETF',
    desc: 'A curated basket of high-quality dividend growers across sectors, screened for sustainability and consecutive payout history.',
  },
  {
    title: 'AG Sector Rotation ETF',
    desc: 'A rules-based strategy that dynamically reallocates across sectors based on momentum signals and macroeconomic conditions.',
  },
  {
    title: 'AG Crypto Basket ETF',
    desc: 'Regulated, exchange-listed exposure to a diversified basket of digital assets, rebalanced monthly using AG\'s proprietary weighting methodology.',
  },
]

const STATS = [
  { value: '23', label: 'ETFs Listed' },
  { value: '0.07%', label: 'Avg Expense Ratio' },
  { value: '$84B', label: 'ETF Assets Under Management' },
]

export default function ETFsPage() {
  return (
    <main className="bg-obsidian text-pale-gold min-h-screen">

      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[88vh] flex flex-col justify-end overflow-hidden border-b border-[rgba(201,168,76,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0900] via-[#0D0C08] to-[#08080A]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C9A84C 0%, transparent 40%)' }} />

        <div className="relative z-10 max-w-[1240px] mx-auto w-full px-6 sm:px-10 pb-20">
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Exchange-Traded Funds</p>
          <h1 className="font-playfair text-[56px] sm:text-[80px] leading-[1.0] text-pale-gold max-w-[700px] mb-8">
            Low Cost.<br />Tax Efficient.<br />Global.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed text-[#C8BEA8] max-w-[560px] mb-10">
            The AG ETF suite delivers institutional-grade market exposure at industry-leading cost — designed for investors who demand precision, transparency, and efficiency.
          </p>
          <Link href="/sign-in" className="inline-flex items-center gap-2 px-7 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#0A0800] font-medium hover:bg-pale-gold transition-all duration-200">
            Browse ETFs <ArrowRight size={14} strokeWidth={2} />
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
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Our ETF Suite</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-14 leading-tight max-w-[600px]">
          Precision exposure across every major asset class and geography.
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

      {/* Why AG ETFs */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(201,168,76,0.1)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">The AG ETF Advantage</p>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { title: 'Industry-Leading Costs', desc: 'With an average expense ratio of 0.07%, AG ETFs keep more of your return compounding in your portfolio — not in fees.' },
            { title: 'Tax Efficiency', desc: 'Optimized in-kind creation/redemption processes and low turnover strategies minimize capital gains distributions year after year.' },
            { title: 'Intraday Liquidity', desc: 'Trade AG ETFs throughout the market day at real-time prices with tight bid-ask spreads, supported by AG\'s own market-making desk.' },
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
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Start Building</p>
        <h2 className="font-playfair text-[48px] sm:text-[60px] text-pale-gold leading-tight mb-6">
          Access AG ETFs<br />Through Your Account.
        </h2>
        <p className="font-dm text-[15px] text-[#8A8070] leading-relaxed max-w-[480px] mx-auto mb-10">
          Open an Aurum Global account to access the full ETF suite with zero commission, institutional pricing, and dedicated support.
        </p>
        <Link href="/sign-in" className="inline-flex items-center gap-2 px-8 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#0A0800] font-medium hover:bg-pale-gold transition-all duration-200">
          Open an Account <ArrowRight size={14} strokeWidth={2} />
        </Link>
      </section>

    </main>
  )
}
