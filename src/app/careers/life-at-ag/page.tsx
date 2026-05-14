import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import Navigation from '@/components/Navigation'

const VALUES_IN_ACTION = [
  {
    number: '01',
    title: 'Intellectual Rigor',
    desc: 'We ask hard questions, challenge assumptions, and pursue truth in every analysis. Our culture rewards intellectual honesty — even when the answer is inconvenient. Deep expertise is valued and developed deliberately.',
  },
  {
    number: '02',
    title: 'Collaborative Culture',
    desc: 'We win as a team. Across divisions, offices, and disciplines, Aurum Global people share knowledge, support one another, and celebrate collective success. Hierarchy does not impede collaboration here.',
  },
  {
    number: '03',
    title: 'Global Perspective',
    desc: 'With offices in 47 cities across 31 countries, our people bring a genuinely global lens to every challenge. We learn from one another\'s cultural contexts and leverage diverse viewpoints to serve clients better.',
  },
  {
    number: '04',
    title: 'Continuous Growth',
    desc: 'Learning never stops at Aurum Global. From $5,000 annual learning stipends to CFA sponsorship and leadership coaching, we invest heavily in the development of every person on the team.',
  },
]

const EMPLOYEE_VOICES = [
  {
    quote: 'What surprised me most was how much my perspective was valued from day one. As a VP in Quant Research, I\'m expected to challenge prevailing models — and leadership actually listens. The intellectual culture here is unlike anything I\'ve experienced at any other institution.',
    name: 'Dr. Arjun S.',
    title: 'VP, Quantitative Research',
    dept: 'New York',
  },
  {
    quote: 'In 14 years at Aurum Global, I\'ve had three international postings, launched two new product lines, and built a team of 40. The firm gave me the runway to grow — and trusted me with meaningful responsibility at every stage of my career.',
    name: 'Catherine L.',
    title: 'Managing Director',
    dept: 'Private Wealth, London',
  },
  {
    quote: 'I came from a non-traditional background — no Ivy League, no bulge bracket internship. What got me here was a genuine passion for financial planning and a drive to help clients make better decisions. Aurum Global sees that in people. They gave me a chance, and I\'ve never looked back.',
    name: 'Marcus O.',
    title: 'Associate Advisor',
    dept: 'Wealth Management, Dubai',
  },
]

const PERKS = [
  {
    title: 'Remote Flexibility',
    desc: 'Hybrid work arrangements available across most roles, with flexible scheduling to support work-life integration.',
    icon: '◈',
  },
  {
    title: 'Global Mobility',
    desc: 'Opportunities to rotate to offices in London, Dubai, Singapore, and beyond — supported by full relocation packages.',
    icon: '⬡',
  },
  {
    title: 'Mentorship',
    desc: 'Structured mentorship at every level — from your first week as an analyst to your first year as a Managing Director.',
    icon: '◇',
  },
  {
    title: '$5,000 Learning Stipend',
    desc: 'Annual learning and development allowance to invest in courses, certifications, conferences, and books of your choice.',
    icon: '△',
  },
]

export default function LifeAtAGPage() {
  return (
    <main className="bg-obsidian text-pale-gold min-h-screen">

      <Navigation />

      {/* ── Hero ── */}
      <section className="relative min-h-[82vh] flex flex-col justify-end overflow-hidden border-b border-[rgba(201,168,76,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0900] via-[#0D0C08] to-[#08080A]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 60%, #C9A84C 0%, transparent 48%), radial-gradient(circle at 80% 20%, #C9A84C 0%, transparent 40%)',
          }}
        />

        <div className="absolute top-28 left-6 sm:left-10 z-10">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-[rgba(201,168,76,0.3)] font-dm text-[11px] uppercase tracking-[0.12em] text-[#C8BEA8] hover:text-pale-gold hover:border-aurum-gold transition-all duration-200 backdrop-blur-sm bg-[rgba(0,0,0,0.2)]"
          >
            <ArrowLeft size={13} strokeWidth={1.75} />
            Careers
          </Link>
        </div>

        <div className="relative z-10 max-w-[1240px] mx-auto w-full px-6 sm:px-10 pb-20">
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Life at Aurum Global</p>
          <h1 className="font-playfair text-[52px] sm:text-[76px] leading-[1.03] text-pale-gold max-w-[820px] mb-8">
            More Than a Career.<br />A Legacy.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed text-[#C8BEA8] max-w-[580px]">
            At Aurum Global, we believe the best work happens when exceptional people are given meaningful challenges, genuine trust, and the resources to grow.
          </p>
        </div>
      </section>

      {/* ── Values in Action ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(201,168,76,0.1)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Culture</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-14 leading-tight">Our Values in Action</h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {VALUES_IN_ACTION.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-[rgba(201,168,76,0.1)] bg-[rgba(17,17,20,0.6)] p-8"
            >
              <p className="font-playfair text-[11px] text-[#5A5040] uppercase tracking-[0.2em] mb-4">{v.number}</p>
              <h3 className="font-playfair text-[24px] text-pale-gold mb-4">{v.title}</h3>
              <p className="font-dm text-[13px] text-[#8A8070] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Employee Voices ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(201,168,76,0.1)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Our People</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-14 leading-tight">Voices of the Firm</h2>

        <div className="grid sm:grid-cols-3 gap-6">
          {EMPLOYEE_VOICES.map((v) => (
            <div
              key={v.name}
              className="rounded-2xl border border-[rgba(201,168,76,0.1)] bg-[rgba(17,17,20,0.6)] p-8 flex flex-col"
            >
              <p className="font-playfair text-[17px] italic text-pale-gold leading-[1.5] flex-1 mb-8">
                &ldquo;{v.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-6 border-t border-[rgba(201,168,76,0.08)]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2A2520] to-[#5A4830] flex items-center justify-center font-dm text-[11px] text-aurum-gold font-medium flex-shrink-0">
                  {v.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="font-dm text-[13px] text-pale-gold font-medium">{v.name}</p>
                  <p className="font-dm text-[11px] text-[#5A5040] mt-0.5">{v.title} · {v.dept}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Perks ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(201,168,76,0.1)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">What We Offer</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-14 leading-tight">
          Built to Support Your Best Work
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PERKS.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-[rgba(201,168,76,0.1)] bg-[rgba(17,17,20,0.6)] p-7"
            >
              <div className="text-xl text-aurum-gold mb-5 opacity-70">{p.icon}</div>
              <h3 className="font-playfair text-[20px] text-pale-gold mb-3">{p.title}</h3>
              <p className="font-dm text-[13px] text-[#8A8070] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24">
        <div className="rounded-2xl border border-[rgba(201,168,76,0.14)] bg-[rgba(17,17,20,0.7)] px-10 py-16 text-center">
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Join Us</p>
          <h2 className="font-playfair text-[38px] sm:text-[48px] text-pale-gold mb-5 leading-tight">
            Ready to Be Part of Something Exceptional?
          </h2>
          <p className="font-dm text-[15px] text-[#C8BEA8] max-w-[500px] mx-auto mb-10 leading-relaxed">
            Explore open roles and take the first step toward a career that will define your legacy.
          </p>
          <Link
            href="/careers/open-roles"
            className="inline-flex items-center gap-2 px-8 py-4 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.14em] text-[#0A0800] font-medium hover:bg-pale-gold transition-all duration-200"
          >
            See Open Roles <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </section>

    </main>
  )
}
