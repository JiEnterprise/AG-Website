import Navigation from '@/components/Navigation'
import { ArrowRight } from 'lucide-react'

const OFFERINGS = [
  { title: 'Spot Digital Assets', desc: 'Direct exposure to BTC, ETH, SOL, and 80+ curated digital assets through institutional-grade custody.' },
  { title: 'Staking & Yield', desc: 'Earn protocol rewards through AG-managed staking programs with compounding yield strategies.' },
  { title: 'DeFi Strategies', desc: 'Curated decentralized finance yield opportunities, liquidity provision, and protocol participation.' },
  { title: 'Digital Asset Custody', desc: 'Institutional-grade multi-signature cold storage with $1B insurance coverage per client.' },
  { title: 'OTC Desk', desc: 'Large-block digital asset transactions executed with zero market impact through our global OTC network.' },
  { title: 'Tokenized Real Assets', desc: 'Fractional exposure to tokenized real estate, private equity, and infrastructure via blockchain rails.' },
]

const STATS = [
  { value: '$12.4B', label: 'Digital Assets Under Management' },
  { value: '99.99%', label: 'Custody Uptime SLA' },
  { value: '80+', label: 'Supported Digital Assets' },
]

export default function CryptoManagementPage() {
  return (
    <main className="bg-obsidian text-pale-gold min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[88vh] flex flex-col justify-end overflow-hidden border-b border-[rgba(255,255,255,0.09)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#000000] to-[#000000]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(120,119,198,0.07) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(120,119,198,0.05) 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-[1240px] mx-auto w-full px-6 sm:px-10 pb-20">
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Crypto & Digital Assets</p>
          <h1 className="font-playfair text-[56px] sm:text-[80px] leading-[1.0] text-pale-gold max-w-[700px] mb-8">
            The Future of<br />Wealth Is Digital.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed text-[#F5F5F7] max-w-[560px] mb-10">
            Institutional-grade digital asset management for ultra-high net worth clients — combining the security of traditional private banking with the opportunity of decentralized finance.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 px-7 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#000000] font-medium hover:bg-pale-gold transition-all duration-200">
            Explore Digital Assets <ArrowRight size={14} strokeWidth={2} />
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

      {/* Overview */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(255,255,255,0.09)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Why AG Digital Assets</p>
        <p className="font-playfair text-[28px] sm:text-[36px] text-pale-gold leading-[1.35] max-w-[800px] mb-12">
          We bring institutional rigor to decentralized markets — custody, compliance, and yield in a single managed solution.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { title: 'Institutional Custody', desc: 'Multi-signature cold storage, $1B insurance coverage, and SOC 2 Type II certified infrastructure.' },
            { title: '24/7 Desk Coverage', desc: 'Digital asset markets never close — and neither does our monitoring, trading, and risk team.' },
            { title: 'Regulatory Clarity', desc: 'Full compliance with evolving digital asset regulation across all operating jurisdictions.' },
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
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Digital Asset Offerings</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-14 leading-tight max-w-[600px]">
          Comprehensive digital asset solutions for every mandate.
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
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Get Started</p>
        <h2 className="font-playfair text-[48px] sm:text-[60px] text-pale-gold leading-tight mb-6">
          Enter the Digital<br />Asset Frontier.
        </h2>
        <p className="font-dm text-[15px] text-[#86868B] leading-relaxed max-w-[480px] mx-auto mb-10">
          Speak with an AG Digital Asset Specialist about building a crypto allocation that fits your wealth strategy.
        </p>
        <a href="/sign-in" className="inline-flex items-center gap-2 px-8 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#000000] font-medium hover:bg-pale-gold transition-all duration-200">
          Request an Introduction <ArrowRight size={14} strokeWidth={2} />
        </a>
      </section>
    </main>
  )
}
