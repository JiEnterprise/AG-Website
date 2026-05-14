import Navigation from '@/components/Navigation'
import { ArrowRight } from 'lucide-react'

const OFFERINGS = [
  { title: 'US Treasuries', desc: 'Direct access to T-Bills, T-Notes, and T-Bonds at competitive auction and secondary market prices.' },
  { title: 'Corporate Bonds', desc: 'Investment-grade and high-yield corporate debt from 2,400+ issuers across sectors and maturities.' },
  { title: 'Municipal Bonds', desc: 'Tax-exempt income through carefully curated state, city, and agency general obligation and revenue bonds.' },
  { title: 'Agency Bonds', desc: 'GSE and federal agency securities offering government-backed yield above Treasuries.' },
  { title: 'International Bonds', desc: 'Sovereign and corporate debt from developed and emerging markets, available in local and USD-denominated form.' },
  { title: 'Inflation-Protected Securities', desc: 'TIPS and I-Bonds providing real return protection in rising-rate and inflationary environments.' },
]

const STATS = [
  { value: '$180B', label: 'Fixed Income AUM' },
  { value: '12,000+', label: 'Bonds Available' },
  { value: '5.8%', label: 'Average Portfolio Yield' },
]

export default function BondsPage() {
  return (
    <main className="bg-obsidian text-pale-gold min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[88vh] flex flex-col justify-end overflow-hidden border-b border-[rgba(255,255,255,0.09)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#000000] to-[#000000]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(120,119,198,0.07) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(120,119,198,0.05) 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-[1240px] mx-auto w-full px-6 sm:px-10 pb-20">
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Bonds & Fixed Income</p>
          <h1 className="font-playfair text-[56px] sm:text-[80px] leading-[1.0] text-pale-gold max-w-[700px] mb-8">
            Steady Income.<br />Proven Returns.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed text-[#F5F5F7] max-w-[560px] mb-10">
            Access the world's deepest fixed income markets through AG's institutional bond desk — 12,000+ bonds, competitive pricing, and expert portfolio construction.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 px-7 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#000000] font-medium hover:bg-pale-gold transition-all duration-200">
            Explore Fixed Income <ArrowRight size={14} strokeWidth={2} />
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(255,255,255,0.09)]">
        <div className="grid sm:grid-cols-3 gap-12">
          {STATS.map(s => (
            <div key={s.label}>
              <p className="font-playfair text-[56px] sm:text-[72px] text-aurum-gold leading-none mb-3">{s.value}</p>
              <p className="font-dm text-[12px] uppercase tracking-[0.18em] text-[#6E6E73]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why AG Bonds */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(255,255,255,0.09)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">The AG Fixed Income Advantage</p>
        <p className="font-playfair text-[28px] sm:text-[36px] text-pale-gold leading-[1.35] max-w-[800px] mb-12">
          Institutional pricing, deep liquidity, and expert portfolio construction — available to every AG client.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { title: 'Institutional Pricing', desc: 'AG\'s scale gives clients access to bond prices typically reserved for billion-dollar institutional buyers.' },
            { title: 'Dedicated Bond Desk', desc: 'Our fixed income specialists build laddered, barbell, and custom portfolios around your income and duration needs.' },
            { title: 'Credit Research', desc: 'In-house credit analysts cover 800+ issuers, providing independent risk assessment on every position.' },
          ].map(c => (
            <div key={c.title} className="rounded-2xl border border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.04)] p-8 hover:border-[rgba(255,255,255,0.18)] hover:-translate-y-1 transition-all duration-200">
              <div className="w-10 h-[1px] bg-aurum-gold mb-6 opacity-60" />
              <h3 className="font-playfair text-[20px] text-pale-gold mb-3">{c.title}</h3>
              <p className="font-dm text-[13px] text-[#86868B] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Offerings */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(255,255,255,0.09)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Bond Categories</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-14 leading-tight max-w-[600px]">
          Every corner of the fixed income market, covered.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFERINGS.map(o => (
            <div key={o.title} className="rounded-2xl border border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.04)] p-7 hover:border-[rgba(255,255,255,0.18)] hover:-translate-y-1 transition-all duration-200">
              <h3 className="font-playfair text-[18px] text-pale-gold mb-3">{o.title}</h3>
              <p className="font-dm text-[12px] text-[#86868B] leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="max-w-[1240px] mx-auto px-6 sm:px-10 py-28 text-center">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Start Earning</p>
        <h2 className="font-playfair text-[48px] sm:text-[60px] text-pale-gold leading-tight mb-6">
          Build Your<br />Bond Portfolio.
        </h2>
        <p className="font-dm text-[15px] text-[#86868B] leading-relaxed max-w-[480px] mx-auto mb-10">
          Connect with an AG fixed income specialist to design a bond portfolio tailored to your income needs and risk profile.
        </p>
        <a href="/sign-in" className="inline-flex items-center gap-2 px-8 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#000000] font-medium hover:bg-pale-gold transition-all duration-200">
          Request an Introduction <ArrowRight size={14} strokeWidth={2} />
        </a>
      </section>
    </main>
  )
}
