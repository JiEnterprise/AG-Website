import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import Navigation from '@/components/Navigation'

const STATS = [
  { value: '$2.4T', label: 'Assets Under Management' },
  { value: '180+', label: 'Institutional Clients' },
  { value: '47', label: 'Countries Served' },
]

const FEATURES = [
  {
    title: 'Treasury Solutions',
    desc: 'Comprehensive cash management, liquidity optimization, and short-term investment strategies tailored for institutional balance sheets.',
  },
  {
    title: 'Corporate Lending',
    desc: 'Bespoke credit facilities, revolving lines, and term loans structured to meet the capital requirements of large corporates and sovereigns.',
  },
  {
    title: 'Capital Markets Access',
    desc: 'Direct access to global debt and equity capital markets with full underwriting, structuring, and distribution capabilities.',
  },
  {
    title: 'Securities Custody',
    desc: 'Institutional-grade safekeeping, settlement, and reporting for equities, fixed income, and alternative assets across all major markets.',
  },
  {
    title: 'Payments Infrastructure',
    desc: 'Cross-border payment rails, real-time settlement, and FX conversion built for the velocity and scale of institutional flows.',
  },
  {
    title: 'Risk & Derivatives',
    desc: 'Interest rate, FX, and commodity hedging solutions engineered to precisely match each institution\'s risk exposure and policy framework.',
  },
]

const OFFERINGS = [
  'Corporate Treasury Management',
  'Syndicated Lending',
  'Trade Finance',
  'Securities Custody',
  'FX & Derivatives',
  'Capital Markets Advisory',
]

export default function InstitutionalBankingPage() {
  return (
    <main className="bg-obsidian text-pale-gold min-h-screen">

      <Navigation />

      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex flex-col justify-end overflow-hidden border-b border-[rgba(255,255,255,0.09)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#000000] to-[#000000]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 25% 60%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 75% 15%, #C9A84C 0%, transparent 40%)' }} />

        <div className="relative z-10 max-w-[1240px] mx-auto w-full px-6 sm:px-10 pb-20">
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Institutional Banking</p>
          <h1 className="font-playfair text-[56px] sm:text-[80px] leading-[1.0] text-pale-gold max-w-[760px] mb-8">
            Banking at<br />Institutional Scale.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed text-[#F5F5F7] max-w-[560px] mb-10">
            Aurum Global delivers sophisticated banking solutions for corporations, sovereign wealth funds, pension funds, and endowments — enabling the world&apos;s most consequential institutions to operate with precision and confidence.
          </p>
          <Link href="/sign-in" className="inline-flex items-center gap-2 px-7 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#000000] font-medium hover:bg-pale-gold transition-all duration-200">
            Request an Introduction <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(255,255,255,0.09)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-16">By The Numbers</p>
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
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Core Capabilities</p>
        <h2 className="font-playfair text-[40px] text-pale-gold leading-tight max-w-[600px] mb-14">
          The full depth of Aurum Global, deployed for your institution.
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
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Our Offerings</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-14 leading-tight">
          A complete suite of institutional<br className="hidden sm:block" /> banking solutions.
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
          Partner with Aurum<br />Global Institutional.
        </h2>
        <p className="font-dm text-[15px] text-[#86868B] leading-relaxed max-w-[480px] mx-auto mb-10">
          Connect with our institutional banking team to explore how Aurum Global can serve as a strategic financial partner to your organization.
        </p>
        <Link href="/sign-in" className="inline-flex items-center gap-2 px-8 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#000000] font-medium hover:bg-pale-gold transition-all duration-200">
          Request an Introduction <ArrowRight size={14} strokeWidth={2} />
        </Link>
      </section>

    </main>
  )
}
