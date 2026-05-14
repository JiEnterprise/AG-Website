import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'

const STATS = [
  { value: '4,200+', label: 'Employees Worldwide' },
  { value: '47',     label: 'Offices Globally' },
  { value: '94%',    label: 'Employee Satisfaction' },
  { value: '$180K',  label: 'Avg Total Compensation' },
]

const NAV_CARDS = [
  {
    label: 'Students & Early Careers',
    title: 'Launch Your Career in Finance',
    desc: 'Summer internships, full-time analyst programs, and MBA associate opportunities for exceptional emerging talent.',
    href: '/careers/students',
    tag: 'Students',
  },
  {
    label: 'Culture',
    title: 'Life at Aurum Global',
    desc: 'A collaborative, intellectually rigorous environment where ambition meets purpose — across 47 cities worldwide.',
    href: '/careers/life-at-ag',
    tag: 'Life at AG',
  },
  {
    label: 'Total Rewards',
    title: 'Exceptional Benefits',
    desc: 'Market-leading compensation, comprehensive health coverage, generous PTO, and robust professional development.',
    href: '/careers/benefits',
    tag: 'Benefits',
  },
  {
    label: 'Opportunities',
    title: 'Open Roles',
    desc: 'Browse current openings across wealth management, technology, investment banking, and more.',
    href: '/careers/open-roles',
    tag: 'Open Roles',
  },
]

const VALUES = [
  {
    title: 'Excellence',
    desc: 'We pursue exceptional outcomes in everything we do — for clients, colleagues, and communities.',
  },
  {
    title: 'Integrity',
    desc: 'We hold ourselves to the highest ethical standard in every decision, relationship, and interaction.',
  },
  {
    title: 'Innovation',
    desc: 'We combine intellectual curiosity with proprietary technology to stay at the forefront of global finance.',
  },
  {
    title: 'Client First',
    desc: 'Every strategy, every product, every hire begins with a single question: what is best for our clients?',
  },
]

const OFFICES = [
  { city: 'New York', role: 'Global HQ' },
  { city: 'London', role: 'European HQ' },
  { city: 'Dubai', role: 'MENA HQ' },
  { city: 'Singapore', role: 'APAC HQ' },
  { city: 'Zurich', role: 'Private Banking' },
  { city: 'Hong Kong', role: 'Asia Pacific' },
  { city: 'Tokyo', role: 'Asia Pacific' },
  { city: 'Toronto', role: 'North America' },
]

export default function CareersPage() {
  return (
    <main className="bg-obsidian text-pale-gold min-h-screen">

      <Navigation />

      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex flex-col justify-end overflow-hidden border-b border-[rgba(255,255,255,0.09)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#000000] to-[#000000]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 15% 60%, #C9A84C 0%, transparent 48%), radial-gradient(circle at 85% 25%, #C9A84C 0%, transparent 42%)',
          }}
        />

        <div className="relative z-10 max-w-[1240px] mx-auto w-full px-6 sm:px-10 pb-20">
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Careers</p>
          <h1 className="font-playfair text-[54px] sm:text-[80px] leading-[1.03] text-pale-gold max-w-[780px] mb-8">
            Build Your Career<br />at Aurum Global.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed text-[#F5F5F7] max-w-[580px] mb-10">
            World-class careers in finance, technology, and strategy — across 47 offices and every corner of global markets.
          </p>
          <Link
            href="/careers/open-roles"
            className="inline-flex items-center gap-2 px-7 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#000000] font-medium hover:bg-pale-gold transition-all duration-200"
          >
            View Open Roles <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-b border-[rgba(255,255,255,0.09)]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10 py-16 grid grid-cols-2 lg:grid-cols-4 gap-10">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-playfair text-[44px] sm:text-[52px] text-aurum-gold leading-none mb-2">{s.value}</p>
              <p className="font-dm text-[11px] uppercase tracking-[0.2em] text-[#86868B]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Navigation Cards ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(255,255,255,0.09)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Explore</p>
        <h2 className="font-playfair text-[40px] sm:text-[48px] text-pale-gold mb-14 leading-tight">
          Everything You Need<br />to Know About a Career at AG
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {NAV_CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-2xl border border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.04)] p-8 hover:border-[rgba(255,255,255,0.20)] hover:-translate-y-1 transition-all duration-200"
            >
              <p className="font-dm text-[10px] uppercase tracking-[0.22em] text-aurum-gold mb-5">{card.label}</p>
              <h3 className="font-playfair text-[24px] text-pale-gold mb-3">{card.title}</h3>
              <p className="font-dm text-[13px] text-[#86868B] leading-relaxed mb-6">{card.desc}</p>
              <span className="inline-flex items-center gap-1.5 font-dm text-[11px] uppercase tracking-[0.1em] text-aurum-gold group-hover:gap-3 transition-all duration-200">
                Learn More <ArrowRight size={12} strokeWidth={1.75} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Offices Strip ── */}
      <section className="border-b border-[rgba(255,255,255,0.09)]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10 py-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-3">Global Presence</p>
              <h2 className="font-playfair text-[34px] text-pale-gold">Featured Offices</h2>
            </div>
            <Link
              href="/careers/featured-offices"
              className="hidden sm:inline-flex items-center gap-2 font-dm text-[11px] uppercase tracking-[0.12em] text-aurum-gold border border-[rgba(255,255,255,0.22)] px-5 h-10 hover:bg-aurum-gold hover:text-[#000000] transition-all duration-200"
            >
              View All <ArrowRight size={12} strokeWidth={1.75} />
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            {OFFICES.map((o) => (
              <Link
                key={o.city}
                href="/careers/featured-offices"
                className="group flex items-center gap-3 rounded-full border border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.04)] px-5 h-11 hover:border-[rgba(255,255,255,0.25)] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-200"
              >
                <span className="font-dm text-[13px] text-pale-gold">{o.city}</span>
                <span className="font-dm text-[10px] text-[#6E6E73] uppercase tracking-wider">{o.role}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(255,255,255,0.09)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Our Values</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-14 leading-tight">
          What We Stand For
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className="rounded-2xl border border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.04)] p-7"
            >
              <p className="font-playfair text-[11px] text-[#6E6E73] uppercase tracking-[0.2em] mb-4">0{i + 1}</p>
              <h3 className="font-playfair text-[22px] text-pale-gold mb-3">{v.title}</h3>
              <p className="font-dm text-[13px] text-[#86868B] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.05)] px-10 py-16 text-center">
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Join the Firm</p>
          <h2 className="font-playfair text-[40px] sm:text-[52px] text-pale-gold mb-5 leading-tight">
            Ready to Make Your Mark?
          </h2>
          <p className="font-dm text-[15px] text-[#F5F5F7] max-w-[520px] mx-auto mb-10 leading-relaxed">
            Explore open positions across every division, region, and career level. Your next chapter starts here.
          </p>
          <Link
            href="/careers/open-roles"
            className="inline-flex items-center gap-2 px-8 h-13 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.14em] text-[#000000] font-medium hover:bg-pale-gold transition-all duration-200 py-4"
          >
            View Open Roles <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </section>

    </main>
  )
}
