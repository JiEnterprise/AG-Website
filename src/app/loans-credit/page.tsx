import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import Navigation from '@/components/Navigation'

const STATS = [
  { value: '$38B', label: 'Total Credit Deployed' },
  { value: '4.2%', label: 'Rates From (APR)' },
  { value: '72hr', label: 'Approval Timeline' },
]

const FEATURES = [
  {
    title: 'Bespoke Loan Structuring',
    desc: 'Every credit facility is engineered around your specific assets, cash flows, and objectives — not a standardized product template.',
  },
  {
    title: 'Competitive Rates',
    desc: 'Our institutional funding base and balance sheet strength allow us to offer rates that reflect the true quality of your collateral and creditworthiness.',
  },
  {
    title: 'Rapid Approval',
    desc: 'Dedicated credit analysts and streamlined underwriting deliver binding term sheets within 72 hours for qualified borrowers.',
  },
  {
    title: 'Multi-Asset Collateral',
    desc: 'Accept a wide range of collateral types — public securities, private equity, real estate, fine art, and other hard assets.',
  },
  {
    title: 'Flexible Structures',
    desc: 'Interest-only periods, deferred principal, revolving facilities, and bespoke covenant packages aligned to your liquidity profile.',
  },
  {
    title: 'Confidential & Discreet',
    desc: 'All lending relationships are managed with strict confidentiality, ensuring your financial strategy remains private.',
  },
]

const OFFERINGS = [
  'Securities-Based Lending',
  'Real Estate Finance',
  'Margin Lending',
  'Structured Credit',
  'Bridge Financing',
  'Revolving Credit Facilities',
]

export default function LoansCreditPage() {
  return (
    <main className="bg-obsidian text-pale-gold min-h-screen">

      <Navigation />

      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex flex-col justify-end overflow-hidden border-b border-[rgba(255,255,255,0.09)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#000000] to-[#000000]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 15% 70%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 85% 25%, #C9A84C 0%, transparent 40%)' }} />

        <div className="relative z-10 max-w-[1240px] mx-auto w-full px-6 sm:px-10 pb-20">
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Loans & Credit</p>
          <h1 className="font-playfair text-[56px] sm:text-[80px] leading-[1.0] text-pale-gold max-w-[760px] mb-8">
            Capital When<br />You Need It.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed text-[#F5F5F7] max-w-[560px] mb-10">
            Aurum Global delivers premium lending solutions for ultra-high net worth individuals and institutions — from securities-backed credit to complex real estate financing — engineered for speed, discretion, and flexibility.
          </p>
          <Link href="/sign-in" className="inline-flex items-center gap-2 px-7 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#000000] font-medium hover:bg-pale-gold transition-all duration-200">
            Explore Credit Solutions <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(255,255,255,0.09)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-16">Our Lending Platform</p>
        <div className="grid sm:grid-cols-3 gap-12">
          {STATS.map(s => (
            <div key={s.label}>
              <p className="font-playfair text-[64px] sm:text-[80px] text-aurum-gold leading-none mb-4">{s.value}</p>
              <p className="font-dm text-[13px] text-[#86868B] uppercase tracking-[0.16em]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(255,255,255,0.09)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Why Aurum Global Credit</p>
        <h2 className="font-playfair text-[40px] text-pale-gold leading-tight max-w-[600px] mb-14">
          Lending that works as hard as your assets.
        </h2>

        <div className="grid sm:grid-cols-3 gap-6">
          {FEATURES.map(f => (
            <div key={f.title} className="rounded-2xl border border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.04)] p-8 flex flex-col group hover:border-[rgba(255,255,255,0.18)] hover:-translate-y-1 transition-all duration-200">
              <div className="w-10 h-[1px] bg-aurum-gold mb-6 opacity-60" />
              <h3 className="font-playfair text-[20px] text-pale-gold mb-4 leading-snug">{f.title}</h3>
              <p className="font-dm text-[13px] text-[#86868B] leading-relaxed flex-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Offerings ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(255,255,255,0.09)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Credit Products</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-14 leading-tight">
          A full spectrum of credit solutions<br className="hidden sm:block" /> for every need.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0">
          {OFFERINGS.map(item => (
            <a key={item} href="#" className="group flex items-center justify-between py-5 border-b border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.13)] transition-colors duration-150 pr-4">
              <span className="font-playfair text-[20px] text-[#F5F5F7] group-hover:text-pale-gold transition-colors duration-150">{item}</span>
              <ChevronRight size={15} strokeWidth={1.5} className="text-[#6E6E73] group-hover:text-aurum-gold transition-colors duration-150 flex-shrink-0" />
            </a>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-28 text-center">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Start the Conversation</p>
        <h2 className="font-playfair text-[48px] sm:text-[60px] text-pale-gold leading-tight mb-6">
          Access capital on<br />your terms.
        </h2>
        <p className="font-dm text-[15px] text-[#86868B] leading-relaxed max-w-[480px] mx-auto mb-10">
          Speak with an Aurum Global credit specialist to explore a lending solution designed around your balance sheet and objectives.
        </p>
        <Link href="/sign-in" className="inline-flex items-center gap-2 px-8 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#000000] font-medium hover:bg-pale-gold transition-all duration-200">
          Request a Credit Review <ArrowRight size={14} strokeWidth={2} />
        </Link>
      </section>

    </main>
  )
}
