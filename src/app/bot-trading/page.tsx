import Navigation from '@/components/Navigation'
import { ArrowRight } from 'lucide-react'

const STRATEGIES = [
  { title: 'DCA Automation', desc: 'Dollar-cost average into any asset on your schedule — daily, weekly, or monthly — fully automated and tax-optimized.' },
  { title: 'Grid Trading', desc: 'Profit from sideways markets with range-bound grid strategies that buy low and sell high automatically.' },
  { title: 'Momentum Strategies', desc: 'Ride strong trends with signal-driven momentum bots that enter and exit based on AG\'s proprietary indicators.' },
  { title: 'Mean Reversion', desc: 'Capitalize on price dislocations with stat-arb and mean-reversion algorithms calibrated to each asset\'s behavior.' },
  { title: 'Custom Strategy Builder', desc: 'Design your own automated strategy using AG\'s no-code builder or Python SDK — then deploy it with one click.' },
  { title: 'Backtesting Engine', desc: 'Test any strategy against 10+ years of tick-level historical data before committing a single dollar.' },
]

const STATS = [
  { value: '99.97%', label: 'Platform Uptime' },
  { value: '<8ms', label: 'Execution Latency' },
  { value: '$4.2B', label: 'Traded by Bots Monthly' },
]

export default function BotTradingPage() {
  return (
    <main className="bg-obsidian text-pale-gold min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[88vh] flex flex-col justify-end overflow-hidden border-b border-[rgba(255,255,255,0.09)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#000000] to-[#000000]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(120,119,198,0.07) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(120,119,198,0.05) 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-[1240px] mx-auto w-full px-6 sm:px-10 pb-20">
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Bot Trading</p>
          <h1 className="font-playfair text-[56px] sm:text-[80px] leading-[1.0] text-pale-gold max-w-[700px] mb-8">
            Your Strategy.<br />Automated.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed text-[#F5F5F7] max-w-[560px] mb-10">
            AG Bot Trading brings institutional-grade algorithmic execution to every client. Deploy proven strategies or build your own — and let the market work for you around the clock.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 px-7 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#000000] font-medium hover:bg-pale-gold transition-all duration-200">
            Start Automating <ArrowRight size={14} strokeWidth={2} />
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

      {/* How it works */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(255,255,255,0.09)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">How It Works</p>
        <p className="font-playfair text-[28px] sm:text-[36px] text-pale-gold leading-[1.35] max-w-[800px] mb-12">
          From configuration to live trading in minutes — with full transparency and control at every step.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { step: '01', title: 'Choose a Strategy', desc: 'Select from AG\'s library of pre-built strategies or design your own with the no-code builder or Python SDK.' },
            { step: '02', title: 'Backtest & Optimize', desc: 'Run your strategy against years of historical data. Refine parameters until you\'re confident in the results.' },
            { step: '03', title: 'Deploy & Monitor', desc: 'Go live with one click. Monitor real-time performance, adjust parameters, and pause anytime from your dashboard.' },
          ].map(c => (
            <div key={c.step} className="rounded-2xl border border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.04)] p-8 hover:border-[rgba(255,255,255,0.18)] hover:-translate-y-1 transition-all duration-200">
              <p className="font-playfair text-[40px] text-aurum-gold opacity-20 mb-4">{c.step}</p>
              <h3 className="font-playfair text-[20px] text-pale-gold mb-3">{c.title}</h3>
              <p className="font-dm text-[13px] text-[#86868B] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Strategies */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(255,255,255,0.09)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Available Strategies</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-14 leading-tight max-w-[600px]">
          A strategy for every market condition.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STRATEGIES.map(s => (
            <div key={s.title} className="rounded-2xl border border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.04)] p-7 hover:border-[rgba(255,255,255,0.18)] hover:-translate-y-1 transition-all duration-200">
              <h3 className="font-playfair text-[18px] text-pale-gold mb-3">{s.title}</h3>
              <p className="font-dm text-[12px] text-[#86868B] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="max-w-[1240px] mx-auto px-6 sm:px-10 py-28 text-center">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Get Started</p>
        <h2 className="font-playfair text-[48px] sm:text-[60px] text-pale-gold leading-tight mb-6">
          Let Your Capital<br />Work While You Sleep.
        </h2>
        <p className="font-dm text-[15px] text-[#86868B] leading-relaxed max-w-[480px] mx-auto mb-10">
          AG Bot Trading is available to all Aurum Global clients. Sign in to access the strategy builder and deploy your first bot.
        </p>
        <a href="/sign-in" className="inline-flex items-center gap-2 px-8 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#000000] font-medium hover:bg-pale-gold transition-all duration-200">
          Sign In to Get Started <ArrowRight size={14} strokeWidth={2} />
        </a>
      </section>
    </main>
  )
}
