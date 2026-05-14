import Navigation from '@/components/Navigation'
import { ArrowRight } from 'lucide-react'

const FEATURED = {
  tag: 'Market Outlook',
  title: 'Our 2026 Outlook: Resilience in the Face of Macro Uncertainty',
  desc: 'AG\'s Strategy Group examines how geopolitical risk, AI disruption, and rate normalization are reshaping optimal portfolio construction for UHNW investors.',
  date: 'May 2026',
  read: '14 min read',
}

const ARTICLES = [
  { tag: 'Fixed Income', title: 'The Case for Short-Duration Bonds as the Fed Navigates Its Next Move', date: 'May 10, 2026', read: '6 min read' },
  { tag: 'Equities', title: 'AI Infrastructure: Separating Signal from Hype in the Technology Supercycle', date: 'May 5, 2026', read: '9 min read' },
  { tag: 'Digital Assets', title: 'Bitcoin as a Reserve Asset: Institutional Adoption Reaches an Inflection Point', date: 'Apr 28, 2026', read: '7 min read' },
  { tag: 'Private Markets', title: 'Private Credit in 2026: Why Direct Lending Remains the Standout Asset Class', date: 'Apr 22, 2026', read: '8 min read' },
  { tag: 'Macro Strategy', title: 'Currency Wars Revisited: FX Volatility and What It Means for Global Portfolios', date: 'Apr 15, 2026', read: '10 min read' },
  { tag: 'Wealth Planning', title: 'Navigating the 2026 Estate Tax Cliff: Strategies for Ultra-High Net Worth Families', date: 'Apr 8, 2026', read: '5 min read' },
  { tag: 'Market Outlook', title: 'Emerging Markets at a Crossroads: India, Brazil, and Southeast Asia in Focus', date: 'Mar 30, 2026', read: '11 min read' },
  { tag: 'Equities', title: 'Dividend Growth Investing in a High-Rate World: The AG Framework', date: 'Mar 22, 2026', read: '6 min read' },
  { tag: 'Risk Management', title: 'Tail Risk Hedging: Building Resilient Portfolios for Low-Probability, High-Impact Events', date: 'Mar 15, 2026', read: '8 min read' },
]

const TAG_COLORS: Record<string, string> = {
  'Market Outlook': 'text-aurum-gold border-[rgba(201,168,76,0.3)]',
  'Fixed Income': 'text-[#A8C4C8] border-[rgba(168,196,200,0.3)]',
  'Equities': 'text-[#A8C4A8] border-[rgba(168,196,168,0.3)]',
  'Digital Assets': 'text-[#C4A8C8] border-[rgba(196,168,200,0.3)]',
  'Private Markets': 'text-[#C4C4A8] border-[rgba(196,196,168,0.3)]',
  'Macro Strategy': 'text-[#C8B8A8] border-[rgba(200,184,168,0.3)]',
  'Wealth Planning': 'text-[#A8B8C8] border-[rgba(168,184,200,0.3)]',
  'Risk Management': 'text-[#C8A8A8] border-[rgba(200,168,168,0.3)]',
}

export default function AGInsightsPage() {
  return (
    <main className="bg-obsidian text-pale-gold min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden border-b border-[rgba(201,168,76,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0900] via-[#0D0C08] to-[#08080A]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C9A84C 0%, transparent 40%)' }} />
        <div className="relative z-10 max-w-[1240px] mx-auto w-full px-6 sm:px-10 pb-20">
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">AG Insights</p>
          <h1 className="font-playfair text-[56px] sm:text-[80px] leading-[1.0] text-pale-gold max-w-[700px] mb-6">
            Ideas That<br />Move Markets.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed text-[#C8BEA8] max-w-[560px]">
            Research, market intelligence, and thought leadership from Aurum Global's Strategy Group — written for sophisticated investors navigating a complex world.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(201,168,76,0.1)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Featured Report</p>
        <a href="#" className="group rounded-2xl border border-[rgba(201,168,76,0.16)] bg-[rgba(17,17,20,0.7)] p-10 sm:p-14 flex flex-col sm:flex-row gap-10 items-center hover:border-[rgba(201,168,76,0.3)] transition-all duration-200 block">
          <div className="flex-1">
            <span className={`font-dm text-[9px] uppercase tracking-[0.16em] px-3 py-1 rounded-full border ${TAG_COLORS[FEATURED.tag]} mb-5 inline-block`}>{FEATURED.tag}</span>
            <h2 className="font-playfair text-[28px] sm:text-[36px] text-pale-gold leading-[1.3] mb-5 group-hover:text-aurum-gold transition-colors duration-200">
              {FEATURED.title}
            </h2>
            <p className="font-dm text-[13px] text-[#8A8070] leading-relaxed mb-6">{FEATURED.desc}</p>
            <div className="flex items-center gap-4">
              <p className="font-dm text-[11px] text-[#4A4438]">{FEATURED.date} · {FEATURED.read}</p>
              <span className="inline-flex items-center gap-1 font-dm text-[11px] uppercase tracking-[0.12em] text-aurum-gold group-hover:gap-2 transition-all duration-200">
                Read Report <ArrowRight size={11} strokeWidth={1.75} />
              </span>
            </div>
          </div>
          <div className="w-full sm:w-64 h-48 rounded-xl bg-gradient-to-br from-[#1A1600] to-[#0D0C08] border border-[rgba(201,168,76,0.12)] flex items-center justify-center flex-shrink-0">
            <div className="text-center">
              <p className="font-playfair text-[42px] text-aurum-gold opacity-40">2026</p>
              <p className="font-dm text-[9px] uppercase tracking-[0.2em] text-[#4A4030] mt-1">AG Outlook</p>
            </div>
          </div>
        </a>
      </section>

      {/* Articles grid */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(201,168,76,0.1)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Latest Research</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-14 leading-tight">Explore by Topic</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((a, i) => (
            <a key={i} href="#" className="group rounded-2xl border border-[rgba(201,168,76,0.1)] bg-[rgba(17,17,20,0.5)] overflow-hidden hover:border-[rgba(201,168,76,0.28)] hover:-translate-y-1 transition-all duration-200">
              <div className="h-36 bg-gradient-to-br from-[#111110] to-[#0D0C06] flex items-end p-5">
                <span className={`font-dm text-[9px] uppercase tracking-[0.16em] px-3 py-1 rounded-full border ${TAG_COLORS[a.tag] || TAG_COLORS['Market Outlook']}`}>{a.tag}</span>
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-[16px] text-pale-gold leading-snug mb-4 group-hover:text-aurum-gold transition-colors duration-150">{a.title}</h3>
                <p className="font-dm text-[10px] text-[#4A4438]">{a.date} · {a.read}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-28 text-center">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Stay Informed</p>
        <h2 className="font-playfair text-[48px] sm:text-[60px] text-pale-gold leading-tight mb-6">
          Intelligence Delivered<br />to Your Inbox.
        </h2>
        <p className="font-dm text-[15px] text-[#8A8070] leading-relaxed max-w-[480px] mx-auto mb-10">
          AG clients receive our weekly Insights briefing, quarterly strategy reports, and exclusive invitations to our investment roundtables.
        </p>
        <a href="/sign-in" className="inline-flex items-center gap-2 px-8 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#0A0800] font-medium hover:bg-pale-gold transition-all duration-200">
          Become a Client <ArrowRight size={14} strokeWidth={2} />
        </a>
      </section>
    </main>
  )
}
