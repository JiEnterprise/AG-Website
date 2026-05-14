import Navigation from '@/components/Navigation'
import { ArrowRight } from 'lucide-react'

const FEATURES = [
  { title: 'AI Signal Generation', desc: 'Deep learning models trained on decades of multi-asset data generate 847 live trading signals across global markets.' },
  { title: 'Multi-Factor Models', desc: 'Proprietary factor models spanning value, momentum, quality, carry, and volatility — continuously updated and rebalanced.' },
  { title: 'Risk Decomposition', desc: 'Real-time attribution of portfolio risk across factors, sectors, geographies, and individual positions.' },
  { title: 'Live Backtesting', desc: 'Walk-forward backtesting engine with zero look-ahead bias — every strategy is validated before deployment.' },
  { title: 'Portfolio Optimization', desc: 'Mean-variance, Black-Litterman, and CVaR optimization frameworks adapted to your constraints and objectives.' },
  { title: 'Real-Time Execution', desc: 'Signals automatically route to AG\'s low-latency execution infrastructure for sub-8ms order placement.' },
]

const STATS = [
  { value: '847', label: 'Live Signals Active' },
  { value: '94.3%', label: 'Signal Accuracy (Backtested)' },
  { value: '$2.8B', label: 'AUM on Quant Strategies' },
]

export default function AGQuantPage() {
  return (
    <main className="bg-obsidian text-pale-gold min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[88vh] flex flex-col justify-end overflow-hidden border-b border-[rgba(201,168,76,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0900] via-[#0D0C08] to-[#08080A]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C9A84C 0%, transparent 40%)' }} />
        <div className="relative z-10 max-w-[1240px] mx-auto w-full px-6 sm:px-10 pb-20">
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">AGQuant Engine</p>
          <h1 className="font-playfair text-[56px] sm:text-[80px] leading-[1.0] text-pale-gold max-w-[700px] mb-8">
            Intelligence<br />Engineered for Alpha.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed text-[#C8BEA8] max-w-[560px] mb-10">
            AGQuant is Aurum Global's proprietary quantitative research and trading engine — combining artificial intelligence, factor investing, and institutional execution into a single, continuously learning system.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 px-7 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#0A0800] font-medium hover:bg-pale-gold transition-all duration-200">
            Access AGQuant Strategies <ArrowRight size={14} strokeWidth={2} />
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

      {/* About */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(201,168,76,0.1)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">About AGQuant</p>
        <p className="font-playfair text-[28px] sm:text-[36px] text-pale-gold leading-[1.35] max-w-[800px] mb-12">
          Built by Aurum Global's team of PhDs, quants, and technologists — AGQuant is the research infrastructure behind every systematic strategy we run.
        </p>
        <div className="rounded-2xl border border-[rgba(201,168,76,0.16)] bg-[rgba(17,17,20,0.7)] p-10 sm:p-14 flex flex-col sm:flex-row gap-10 items-center">
          <div className="flex-1">
            <p className="font-dm text-[11px] uppercase tracking-[0.16em] text-[#5A5040] mb-4">The AGQuant Edge</p>
            <h3 className="font-playfair text-[28px] text-pale-gold leading-[1.3] mb-6">
              From signal to execution in under 8 milliseconds.
            </h3>
            <p className="font-dm text-[13px] text-[#8A8070] leading-relaxed">
              AGQuant's architecture processes terabytes of alternative and traditional data in real time — generating, validating, and executing signals with zero human latency in the loop.
            </p>
          </div>
          <div className="w-full sm:w-64 h-48 rounded-xl bg-gradient-to-br from-[#1A1600] to-[#0D0C08] border border-[rgba(201,168,76,0.12)] flex items-center justify-center flex-shrink-0">
            <div className="text-center">
              <p className="font-playfair text-[32px] text-aurum-gold opacity-40">AQ</p>
              <p className="font-dm text-[9px] uppercase tracking-[0.2em] text-[#4A4030] mt-1">AGQuant Engine</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(201,168,76,0.1)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Engine Capabilities</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-14 leading-tight max-w-[600px]">
          Every layer of the quantitative process, refined.
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
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Invest with AGQuant</p>
        <h2 className="font-playfair text-[48px] sm:text-[60px] text-pale-gold leading-tight mb-6">
          Let the Machine<br />Find the Alpha.
        </h2>
        <p className="font-dm text-[15px] text-[#8A8070] leading-relaxed max-w-[480px] mx-auto mb-10">
          AGQuant strategies are available to Aurum Global advisory clients. Speak with your advisor or sign in to explore systematic allocations.
        </p>
        <a href="/sign-in" className="inline-flex items-center gap-2 px-8 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#0A0800] font-medium hover:bg-pale-gold transition-all duration-200">
          Explore AGQuant Strategies <ArrowRight size={14} strokeWidth={2} />
        </a>
      </section>
    </main>
  )
}
