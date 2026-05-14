import Navigation from '@/components/Navigation'
import { ArrowRight } from 'lucide-react'

const OFFERINGS = [
  { title: 'Buy-Side Advisory', desc: 'Rigorous target identification, valuation, due diligence, and negotiation support for acquisitions of any scale.' },
  { title: 'Sell-Side Advisory', desc: 'Maximizing transaction value through competitive processes, strategic positioning, and buyer relationship management.' },
  { title: 'Cross-Border M&A', desc: 'Global deal execution across 47 countries with deep local regulatory knowledge and relationship networks.' },
  { title: 'Fairness Opinions', desc: 'Independent, defensible fairness opinions delivered by senior bankers with decades of transaction experience.' },
  { title: 'Restructuring', desc: 'Complex balance sheet restructuring, debt renegotiation, and operational transformation for distressed situations.' },
  { title: 'Joint Ventures & Partnerships', desc: 'Strategic partnership structuring, joint venture formation, and alliance negotiation across sectors and geographies.' },
]

const STATS = [
  { value: '$340B+', label: 'In Deals Closed' },
  { value: '97%', label: 'Deal Completion Rate' },
  { value: '6.2×', label: 'Average Client Return Multiple' },
]

const SECTORS = ['Technology & Software', 'Financial Services', 'Healthcare & Life Sciences', 'Energy & Infrastructure', 'Consumer & Retail', 'Real Estate & Hospitality']

export default function MergersAcquisitionsPage() {
  return (
    <main className="bg-obsidian text-pale-gold min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[88vh] flex flex-col justify-end overflow-hidden border-b border-[rgba(255,255,255,0.09)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#000000] to-[#000000]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(120,119,198,0.07) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(120,119,198,0.05) 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-[1240px] mx-auto w-full px-6 sm:px-10 pb-20">
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Mergers & Acquisitions</p>
          <h1 className="font-playfair text-[56px] sm:text-[80px] leading-[1.0] text-pale-gold max-w-[700px] mb-8">
            Deals That<br />Define Legacies.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed text-[#F5F5F7] max-w-[560px] mb-10">
            Aurum Global's M&A advisory team has executed some of the most complex cross-border transactions in modern finance — bringing elite deal execution to founders, families, and institutions.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 px-7 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#000000] font-medium hover:bg-pale-gold transition-all duration-200">
            Speak with Our Team <ArrowRight size={14} strokeWidth={2} />
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

      {/* Advisory approach */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(255,255,255,0.09)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Our Approach</p>
        <p className="font-playfair text-[28px] sm:text-[36px] text-pale-gold leading-[1.35] max-w-[800px] mb-12">
          We are your trusted partner from the first conversation through closing — and beyond.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { step: '01', title: 'Strategic Assessment', desc: 'Deep analysis of your strategic objectives, market positioning, and value creation potential.' },
            { step: '02', title: 'Deal Origination', desc: 'Proprietary access to counterparties through our global network of 12,000+ institutional relationships.' },
            { step: '03', title: 'Execution & Close', desc: 'Relentless deal management, creative structuring, and experienced negotiation to maximize your outcome.' },
          ].map(c => (
            <div key={c.step} className="rounded-2xl border border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.04)] p-8 hover:border-[rgba(255,255,255,0.18)] hover:-translate-y-1 transition-all duration-200">
              <p className="font-playfair text-[40px] text-aurum-gold opacity-20 mb-4">{c.step}</p>
              <h3 className="font-playfair text-[20px] text-pale-gold mb-3">{c.title}</h3>
              <p className="font-dm text-[13px] text-[#86868B] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Offerings */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(255,255,255,0.09)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">M&A Capabilities</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-14 leading-tight max-w-[600px]">
          Full-spectrum advisory across every transaction type.
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

      {/* Sectors */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(255,255,255,0.09)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Sector Coverage</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-10 leading-tight">Deep sector expertise.</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTORS.map(s => (
            <div key={s} className="flex items-center gap-4 py-5 border-b border-[rgba(255,255,255,0.06)]">
              <div className="w-1.5 h-1.5 rounded-full bg-aurum-gold opacity-60 flex-shrink-0" />
              <span className="font-dm text-[14px] text-[#F5F5F7]">{s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="max-w-[1240px] mx-auto px-6 sm:px-10 py-28 text-center">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Begin the Conversation</p>
        <h2 className="font-playfair text-[48px] sm:text-[60px] text-pale-gold leading-tight mb-6">
          Your Next Chapter<br />Starts Here.
        </h2>
        <p className="font-dm text-[15px] text-[#86868B] leading-relaxed max-w-[480px] mx-auto mb-10">
          Whether you are buying, selling, or restructuring — our senior bankers are ready to deliver the outcome you deserve.
        </p>
        <a href="/sign-in" className="inline-flex items-center gap-2 px-8 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#000000] font-medium hover:bg-pale-gold transition-all duration-200">
          Request an Introduction <ArrowRight size={14} strokeWidth={2} />
        </a>
      </section>
    </main>
  )
}
