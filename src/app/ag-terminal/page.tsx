import Navigation from '@/components/Navigation'
import { ArrowRight } from 'lucide-react'

const FEATURES = [
  { title: 'Real-Time Market Data', desc: 'Sub-2ms streaming quotes across equities, fixed income, FX, commodities, and digital assets — all in one workspace.' },
  { title: 'Advanced Charting Suite', desc: '40+ chart types and 150+ technical indicators with fully customizable multi-panel layouts and annotation tools.' },
  { title: 'Multi-Asset Order Management', desc: 'Execute across all asset classes from a single order blotter with advanced order types: TWAP, VWAP, iceberg, and more.' },
  { title: 'Integrated Research', desc: 'AG research reports, third-party analyst coverage, and real-time news feeds woven directly into your workflow.' },
  { title: 'Risk Analytics Dashboard', desc: 'Live portfolio Greeks, VaR calculations, stress testing, and scenario analysis updated tick-by-tick.' },
  { title: 'API Access', desc: 'Full programmatic access via REST and WebSocket APIs — integrate AG Terminal data into your own systems and models.' },
]

const STATS = [
  { value: '2ms', label: 'Market Data Latency' },
  { value: '40+', label: 'Chart Types' },
  { value: '150+', label: 'Technical Indicators' },
]

export default function AGTerminalPage() {
  return (
    <main className="bg-obsidian text-pale-gold min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[88vh] flex flex-col justify-end overflow-hidden border-b border-[rgba(201,168,76,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0900] via-[#0D0C08] to-[#08080A]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C9A84C 0%, transparent 40%)' }} />
        <div className="relative z-10 max-w-[1240px] mx-auto w-full px-6 sm:px-10 pb-20">
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">AG Terminal</p>
          <h1 className="font-playfair text-[56px] sm:text-[80px] leading-[1.0] text-pale-gold max-w-[700px] mb-8">
            Your Edge.<br />Fully Equipped.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed text-[#C8BEA8] max-w-[560px] mb-10">
            The professional-grade trading terminal built for Aurum Global clients and advisors. Real-time data, advanced analytics, and institutional-grade execution — in one seamless platform.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 px-7 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#0A0800] font-medium hover:bg-pale-gold transition-all duration-200">
            Request Terminal Access <ArrowRight size={14} strokeWidth={2} />
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(201,168,76,0.1)]">
        <div className="grid sm:grid-cols-3 gap-12">
          {STATS.map(s => (
            <div key={s.label}>
              <p className="font-playfair text-[56px] sm:text-[72px] text-aurum-gold leading-none mb-3">{s.value}</p>
              <p className="font-dm text-[12px] uppercase tracking-[0.18em] text-[#5A5040]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Overview */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(201,168,76,0.1)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Built for Professionals</p>
        <p className="font-playfair text-[28px] sm:text-[36px] text-pale-gold leading-[1.35] max-w-[800px] mb-12">
          AG Terminal brings institutional-grade market infrastructure to every Aurum Global client — from portfolio monitoring to active trading.
        </p>
        <div className="rounded-2xl border border-[rgba(201,168,76,0.16)] bg-[rgba(17,17,20,0.7)] p-10 sm:p-14 flex flex-col sm:flex-row gap-10 items-center">
          <div className="flex-1">
            <p className="font-dm text-[11px] uppercase tracking-[0.16em] text-[#5A5040] mb-4">Terminal Preview</p>
            <h3 className="font-playfair text-[28px] text-pale-gold leading-[1.3] mb-6">
              One workspace. Every market. Zero compromise.
            </h3>
            <p className="font-dm text-[13px] text-[#8A8070] leading-relaxed">
              AG Terminal aggregates real-time data, research, order management, and risk analytics into a single, customizable interface — built on the same infrastructure used by the AG trading desk.
            </p>
          </div>
          <div className="w-full sm:w-64 h-48 rounded-xl bg-gradient-to-br from-[#1A1600] to-[#0D0C08] border border-[rgba(201,168,76,0.12)] flex items-center justify-center flex-shrink-0">
            <div className="text-center">
              <p className="font-playfair text-[28px] text-aurum-gold opacity-40">AG</p>
              <p className="font-dm text-[9px] uppercase tracking-[0.2em] text-[#4A4030] mt-1">Terminal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(201,168,76,0.1)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Terminal Features</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-14 leading-tight max-w-[600px]">
          Every tool a professional trader needs.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(f => (
            <div key={f.title} className="rounded-2xl border border-[rgba(201,168,76,0.1)] bg-[rgba(17,17,20,0.6)] p-7 hover:border-[rgba(201,168,76,0.28)] hover:-translate-y-1 transition-all duration-200">
              <h3 className="font-playfair text-[18px] text-pale-gold mb-3">{f.title}</h3>
              <p className="font-dm text-[12px] text-[#8A8070] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="max-w-[1240px] mx-auto px-6 sm:px-10 py-28 text-center">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Get Access</p>
        <h2 className="font-playfair text-[48px] sm:text-[60px] text-pale-gold leading-tight mb-6">
          Trade at the<br />Institutional Level.
        </h2>
        <p className="font-dm text-[15px] text-[#8A8070] leading-relaxed max-w-[480px] mx-auto mb-10">
          AG Terminal is available to all Aurum Global advisory and wealth management clients. Sign in to activate your access.
        </p>
        <a href="/sign-in" className="inline-flex items-center gap-2 px-8 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#0A0800] font-medium hover:bg-pale-gold transition-all duration-200">
          Sign In to Access Terminal <ArrowRight size={14} strokeWidth={2} />
        </a>
      </section>
    </main>
  )
}
