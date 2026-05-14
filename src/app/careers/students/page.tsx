import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import Navigation from '@/components/Navigation'

const PROGRAMS = [
  {
    tag: 'Internship',
    title: 'Summer Analyst Internship',
    duration: '10 Weeks',
    compensation: '$9,500 / month stipend',
    desc: 'An immersive, project-driven experience in wealth management, investment banking, quantitative research, or technology. Interns work alongside senior professionals on live client mandates and firm initiatives.',
    highlights: [
      '10-week structured program',
      'Senior mentor assigned on day one',
      'Conversion to full-time offer for top performers',
      'New York, London, Dubai, Singapore locations',
    ],
  },
  {
    tag: 'Full-Time',
    title: 'Full-Time Analyst Program',
    duration: '3-Year Rotational',
    compensation: '$185,000 base salary',
    desc: 'A rigorous three-year rotational program that develops the next generation of financial leaders. Analysts rotate across divisions, gaining exposure to deal execution, client management, and quantitative strategy.',
    highlights: [
      'Three rotations across divisions',
      'Formal training curriculum (200+ hours)',
      'Direct access to Managing Director mentors',
      'Consideration for Associate promotion at year three',
    ],
  },
  {
    tag: 'MBA',
    title: 'MBA Associate Program',
    duration: 'Post-MBA, Full-Time',
    compensation: '$225,000 base + performance bonus',
    desc: 'Designed for MBA graduates ready to accelerate into senior roles. Associates join with defined ownership from day one — leading client projects, managing analyst teams, and contributing to firm strategy.',
    highlights: [
      'Immediate client-facing responsibility',
      'Performance-linked bonus structure',
      'Fast-track promotion pathway to VP',
      'Leadership coaching and executive presence training',
    ],
  },
]

const TIMELINE = [
  { date: 'Sept 1', label: 'Applications Open', desc: 'Online applications open for all programs across all locations.' },
  { date: 'Oct – Nov', label: 'Interviews', desc: 'First-round video interviews followed by Superday at our offices.' },
  { date: 'Dec 15', label: 'Offers Extended', desc: 'All offers communicated by December 15th for the following year.' },
  { date: 'Jan – Feb', label: 'Offer Deadline', desc: 'Candidates have four weeks to accept and confirm start logistics.' },
]

const SCHOOLS = [
  'Harvard University', 'University of Pennsylvania (Wharton)', 'Columbia University',
  'University of Chicago (Booth)', 'NYU (Stern)', 'MIT (Sloan)', 'Stanford University',
  'London School of Economics', 'Oxford University', 'Cambridge University',
  'INSEAD', 'HEC Paris', 'NUS Singapore',
]

export default function StudentsPage() {
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
              'radial-gradient(circle at 20% 65%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 78% 20%, #C9A84C 0%, transparent 38%)',
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
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Students & Early Careers</p>
          <h1 className="font-playfair text-[52px] sm:text-[76px] leading-[1.03] text-pale-gold max-w-[780px] mb-8">
            Launch Your Career<br />in Finance.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed text-[#C8BEA8] max-w-[580px]">
            Aurum Global offers world-class early career programs designed to develop exceptional talent into the next generation of financial leaders.
          </p>
        </div>
      </section>

      {/* ── Programs ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(201,168,76,0.1)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Programs</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-14 leading-tight">Our Early Career Programs</h2>

        <div className="space-y-6">
          {PROGRAMS.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-[rgba(201,168,76,0.1)] bg-[rgba(17,17,20,0.6)] p-8 sm:p-10"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-dm text-[10px] uppercase tracking-[0.2em] text-[#0A0800] bg-aurum-gold px-3 py-1">{p.tag}</span>
                    <span className="font-dm text-[11px] text-[#5A5040] uppercase tracking-wider">{p.duration}</span>
                  </div>
                  <h3 className="font-playfair text-[28px] text-pale-gold mb-3">{p.title}</h3>
                  <p className="font-dm text-[14px] text-[#C8BEA8] leading-relaxed mb-6">{p.desc}</p>
                  <ul className="space-y-2">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 font-dm text-[13px] text-[#8A8070]">
                        <span className="w-1 h-1 rounded-full bg-aurum-gold mt-2 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sm:min-w-[220px] rounded-xl border border-[rgba(201,168,76,0.12)] bg-[rgba(17,17,20,0.8)] p-6">
                  <p className="font-dm text-[10px] uppercase tracking-[0.2em] text-[#5A5040] mb-2">Compensation</p>
                  <p className="font-playfair text-[20px] text-aurum-gold leading-snug">{p.compensation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Application Timeline ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(201,168,76,0.1)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Process</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-14 leading-tight">Application Timeline</h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden sm:block absolute left-[110px] top-3 bottom-3 w-px bg-[rgba(201,168,76,0.12)]" />

          <div className="space-y-10">
            {TIMELINE.map((t, i) => (
              <div key={t.date} className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
                <div className="sm:w-[110px] flex-shrink-0">
                  <p className="font-dm text-[11px] uppercase tracking-[0.14em] text-aurum-gold">{t.date}</p>
                </div>
                <div className="relative sm:pl-10">
                  <div className="hidden sm:block absolute -left-[5px] top-[5px] w-2.5 h-2.5 rounded-full border border-aurum-gold bg-obsidian" />
                  <h3 className="font-dm text-[15px] font-medium text-pale-gold mb-1">{t.label}</h3>
                  <p className="font-dm text-[13px] text-[#8A8070] leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recruiting Schools ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(201,168,76,0.1)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Campus Recruiting</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-6 leading-tight">Target Universities</h2>
        <p className="font-dm text-[14px] text-[#C8BEA8] max-w-[580px] mb-12 leading-relaxed">
          We recruit actively at leading universities worldwide. If your school is not listed, you may still apply through our general application portal.
        </p>
        <div className="flex flex-wrap gap-3">
          {SCHOOLS.map((s) => (
            <span
              key={s}
              className="font-dm text-[12px] text-[#C8BEA8] border border-[rgba(201,168,76,0.12)] bg-[rgba(17,17,20,0.5)] px-4 py-2"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24">
        <div className="rounded-2xl border border-[rgba(201,168,76,0.14)] bg-[rgba(17,17,20,0.7)] px-10 py-16 text-center">
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Apply Now</p>
          <h2 className="font-playfair text-[38px] sm:text-[48px] text-pale-gold mb-5 leading-tight">
            Begin Your Application
          </h2>
          <p className="font-dm text-[15px] text-[#C8BEA8] max-w-[500px] mx-auto mb-10 leading-relaxed">
            Applications are reviewed on a rolling basis. We encourage you to apply early.
          </p>
          <Link
            href="/careers/open-roles"
            className="inline-flex items-center gap-2 px-8 py-4 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.14em] text-[#0A0800] font-medium hover:bg-pale-gold transition-all duration-200"
          >
            View Student Openings <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </section>

    </main>
  )
}
