import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import Navigation from '@/components/Navigation'

const STATS = [
  { value: '$890B', label: 'Assets Under Management' },
  { value: '94.2%', label: 'Client Retention Rate' },
  { value: '38yr', label: 'Track Record' },
]

const FEATURES = [
  {
    title: 'Multi-Asset Portfolios',
    desc: 'Dynamically allocated across equities, fixed income, alternatives, and real assets — calibrated to your risk tolerance and return objectives.',
  },
  {
    title: 'Alternative Investments',
    desc: 'Curated access to hedge funds, private equity, private credit, and real assets through our global network of top-tier managers.',
  },
  {
    title: 'Active Management',
    desc: 'Rigorous fundamental research, macro overlay, and disciplined portfolio construction driving consistent alpha above benchmarks.',
  },
  {
    title: 'Risk Architecture',
    desc: 'Proprietary risk frameworks monitor factor exposures, drawdown limits, and tail risks across every client portfolio in real time.',
  },
  {
    title: 'ESG Integration',
    desc: 'Sustainable and responsible investing principles woven into our research process, with bespoke impact mandates available.',
  },
  {
    title: 'Institutional Reporting',
    desc: 'Comprehensive performance attribution, risk analytics, and regulatory reporting delivered on a frequency that meets your governance requirements.',
  },
]

const OFFERINGS = [
  'Multi-Asset Portfolios',
  'Equity Strategies',
  'Fixed Income',
  'Hedge Fund Access',
  'Private Equity',
  'Real Assets',
]

export default function AssetManagementPage() {
  return (
    <main className="bg-obsidian text-pale-gold min-h-screen">

      <Navigation />

      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex flex-col justify-end overflow-hidden border-b border-[rgba(255,255,255,0.09)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#000000] to-[#000000]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 30% 55%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 70% 20%, #C9A84C 0%, transparent 40%)' }} />

        <div className="relative z-10 max-w-[1240px] mx-auto w-full px-6 sm:px-10 pb-20">
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Asset Management</p>
          <h1 className="font-playfair text-[56px] sm:text-[80px] leading-[1.0] text-pale-gold max-w-[760px] mb-8">
            Institutional-Grade<br />Asset Management.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed text-[#F5F5F7] max-w-[560px] mb-10">
            Aurum Global Asset Management delivers decades of investment excellence across multi-asset portfolios, alternatives, and active strategies — with the scale, access, and discipline that only a top-tier institution can provide.
          </p>
          <Link href="/sign-in" className="inline-flex items-center gap-2 px-7 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#000000] font-medium hover:bg-pale-gold transition-all duration-200">
            Explore Investment Solutions <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(255,255,255,0.09)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-16">Our Investment Platform</p>
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
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Investment Philosophy</p>
        <h2 className="font-playfair text-[40px] text-pale-gold leading-tight max-w-[600px] mb-14">
          Rigorous process. Relentless pursuit of performance.
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
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Investment Strategies</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-14 leading-tight">
          Every strategy. Every asset class.<br className="hidden sm:block" /> One platform.
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
          Invest with a<br />38-year edge.
        </h2>
        <p className="font-dm text-[15px] text-[#86868B] leading-relaxed max-w-[480px] mx-auto mb-10">
          Connect with an Aurum Global investment specialist to explore how our asset management capabilities can be deployed for your portfolio.
        </p>
        <Link href="/sign-in" className="inline-flex items-center gap-2 px-8 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#000000] font-medium hover:bg-pale-gold transition-all duration-200">
          Request an Introduction <ArrowRight size={14} strokeWidth={2} />
        </Link>
      </section>

    </main>
  )
}
