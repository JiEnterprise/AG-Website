import Navigation from '@/components/Navigation'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const ROLES = [
  {
    title: 'VP, Quantitative Research',
    location: 'New York, NY',
    department: 'Quant & Technology',
    type: 'Full-Time',
    desc: 'Lead factor model development and signal research for the AGQuant engine. Requires PhD in STEM and 5+ years of systematic trading experience.',
  },
  {
    title: 'Senior Advisor, Private Wealth',
    location: 'London, UK',
    department: 'Wealth Management',
    type: 'Full-Time',
    desc: 'Manage and grow a book of UHNW clients across Europe. Requires 8+ years of private wealth experience and CFA or equivalent.',
  },
  {
    title: 'Associate, M&A Advisory',
    location: 'Dubai, UAE',
    department: 'Investment Banking',
    type: 'Full-Time',
    desc: 'Support cross-border M&A transactions across the MENA region. Requires 2-4 years of investment banking experience and strong financial modeling skills.',
  },
  {
    title: 'Software Engineer, AGQuant Platform',
    location: 'New York, NY',
    department: 'Technology',
    type: 'Full-Time',
    desc: 'Build and scale the infrastructure powering AG\'s quantitative trading engine. Python/C++ expertise required, low-latency systems experience a strong plus.',
  },
  {
    title: 'Portfolio Manager, Fixed Income',
    location: 'Singapore',
    department: 'Asset Management',
    type: 'Full-Time',
    desc: 'Manage multi-billion dollar fixed income mandates across APAC markets. Requires 7+ years of portfolio management experience and CFA designation.',
  },
  {
    title: 'Compliance Officer',
    location: 'New York, NY',
    department: 'Legal & Compliance',
    type: 'Full-Time',
    desc: 'Oversee regulatory compliance programs across AG\'s US advisory and trading operations. JD or equivalent compliance certification preferred.',
  },
  {
    title: 'Summer Analyst Intern — Wealth Management',
    location: 'Multiple Locations',
    department: 'Internship',
    type: 'Summer 2027',
    desc: 'Ten-week paid internship in AG\'s Private Wealth Management division. Open to penultimate-year undergraduate students with strong academic record.',
  },
  {
    title: 'Associate, Digital Assets',
    location: 'New York, NY',
    department: 'Crypto & Digital Assets',
    type: 'Full-Time',
    desc: 'Support institutional digital asset product development and client advisory. Background in crypto markets or structured products preferred.',
  },
]

const DEPT_COLORS: Record<string, string> = {
  'Quant & Technology': 'text-[#A8C4C8] border-[rgba(168,196,200,0.3)]',
  'Wealth Management': 'text-aurum-gold border-[rgba(255,255,255,0.18)]',
  'Investment Banking': 'text-[#C4C4A8] border-[rgba(196,196,168,0.3)]',
  'Technology': 'text-[#A8C4A8] border-[rgba(168,196,168,0.3)]',
  'Asset Management': 'text-[#C4A8C8] border-[rgba(196,168,200,0.3)]',
  'Legal & Compliance': 'text-[#C8A8A8] border-[rgba(200,168,168,0.3)]',
  'Internship': 'text-[#F5F5F7] border-[rgba(200,184,168,0.3)]',
  'Crypto & Digital Assets': 'text-[#A8B8C8] border-[rgba(168,184,200,0.3)]',
}

export default function OpenRolesPage() {
  return (
    <main className="bg-obsidian text-pale-gold min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden border-b border-[rgba(255,255,255,0.09)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#000000] to-[#000000]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(120,119,198,0.07) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(120,119,198,0.05) 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-[1240px] mx-auto w-full px-6 sm:px-10 pb-20">
          <Link href="/careers" className="font-dm text-[10px] uppercase tracking-[0.28em] text-[#6E6E73] hover:text-aurum-gold transition-colors duration-150 mb-4 inline-flex items-center gap-2">
            ← Careers
          </Link>
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6 mt-2">Open Roles</p>
          <h1 className="font-playfair text-[56px] sm:text-[72px] leading-[1.0] text-pale-gold max-w-[700px] mb-6">
            Find Your Role<br />at Aurum Global.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed text-[#F5F5F7] max-w-[520px]">
            {ROLES.length} open positions across wealth management, technology, trading, and more.
          </p>
        </div>
      </section>

      {/* Roles list */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-20">
        <div className="flex flex-col gap-4">
          {ROLES.map((role, i) => (
            <div key={i} className="group rounded-2xl border border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.04)] p-7 hover:border-[rgba(255,255,255,0.18)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`font-dm text-[9px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full border ${DEPT_COLORS[role.department] || 'text-aurum-gold border-[rgba(255,255,255,0.18)]'}`}>
                    {role.department}
                  </span>
                  <span className="font-dm text-[9px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full border text-[#86868B] border-[rgba(138,128,112,0.3)]">
                    {role.type}
                  </span>
                </div>
                <h3 className="font-playfair text-[20px] text-pale-gold mb-2 group-hover:text-aurum-gold transition-colors duration-150">{role.title}</h3>
                <p className="font-dm text-[12px] text-[#6E6E73] mb-3">{role.location}</p>
                <p className="font-dm text-[12px] text-[#86868B] leading-relaxed max-w-[640px]">{role.desc}</p>
              </div>
              <a href="/sign-in" className="flex-shrink-0 inline-flex items-center gap-2 px-6 h-10 border border-[rgba(255,255,255,0.18)] font-dm text-[11px] uppercase tracking-[0.1em] text-aurum-gold hover:bg-aurum-gold hover:text-[#000000] transition-all duration-200 rounded-full whitespace-nowrap">
                Apply <ArrowRight size={12} strokeWidth={1.75} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[rgba(255,255,255,0.09)] max-w-[1240px] mx-auto px-6 sm:px-10 py-24 text-center">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Don&apos;t See a Fit?</p>
        <h2 className="font-playfair text-[40px] text-pale-gold leading-tight mb-6">
          Send Us Your Profile.
        </h2>
        <p className="font-dm text-[14px] text-[#86868B] leading-relaxed max-w-[400px] mx-auto mb-8">
          Exceptional talent is always welcome at AG. Share your background and we&apos;ll reach out when the right role opens.
        </p>
        <Link href="/sign-in" className="inline-flex items-center gap-2 px-7 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#000000] font-medium hover:bg-pale-gold transition-all duration-200">
          Submit Your Profile <ArrowRight size={14} strokeWidth={2} />
        </Link>
      </section>
    </main>
  )
}
