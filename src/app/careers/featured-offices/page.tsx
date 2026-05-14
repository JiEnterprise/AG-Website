import Navigation from '@/components/Navigation'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const OFFICES = [
  { city: 'New York', country: 'USA', role: 'Global Headquarters', employees: '1,200+', focus: 'Wealth Management, Trading & Technology', tag: 'HQ' },
  { city: 'London', country: 'United Kingdom', role: 'European Headquarters', employees: '620', focus: 'Private Banking, Fixed Income & M&A', tag: 'Regional HQ' },
  { city: 'Dubai', country: 'UAE', role: 'MENA Headquarters', employees: '280', focus: 'Institutional Banking & Asset Management', tag: 'Regional HQ' },
  { city: 'Singapore', country: 'Singapore', role: 'APAC Headquarters', employees: '340', focus: 'Private Wealth, Digital Assets & Equities', tag: 'Regional HQ' },
  { city: 'Zurich', country: 'Switzerland', role: 'European Private Banking Hub', employees: '380', focus: 'UHNW Advisory & Family Office Services', tag: 'Major Office' },
  { city: 'Hong Kong', country: 'China SAR', role: 'Greater China Hub', employees: '290', focus: 'Cross-Border M&A & Capital Markets', tag: 'Major Office' },
  { city: 'Tokyo', country: 'Japan', role: 'Japan & Korea Hub', employees: '210', focus: 'Institutional Clients & Fixed Income', tag: 'Major Office' },
  { city: 'Toronto', country: 'Canada', role: 'North America Hub', employees: '180', focus: 'Resource Sector Advisory & Wealth Management', tag: 'Major Office' },
]

const TAG_STYLES: Record<string, string> = {
  'HQ': 'text-aurum-gold border-[rgba(201,168,76,0.4)] bg-[rgba(201,168,76,0.06)]',
  'Regional HQ': 'text-[#A8C4C8] border-[rgba(168,196,200,0.3)]',
  'Major Office': 'text-[#8A8070] border-[rgba(138,128,112,0.25)]',
}

export default function FeaturedOfficesPage() {
  return (
    <main className="bg-obsidian text-pale-gold min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden border-b border-[rgba(201,168,76,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0900] via-[#0D0C08] to-[#08080A]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C9A84C 0%, transparent 40%)' }} />
        <div className="relative z-10 max-w-[1240px] mx-auto w-full px-6 sm:px-10 pb-20">
          <Link href="/careers" className="font-dm text-[10px] uppercase tracking-[0.28em] text-[#5A5040] hover:text-aurum-gold transition-colors duration-150 mb-4 inline-flex items-center gap-2">
            ← Careers
          </Link>
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6 mt-2">Featured Offices</p>
          <h1 className="font-playfair text-[56px] sm:text-[72px] leading-[1.0] text-pale-gold max-w-[700px] mb-8">
            A Global<br />Presence.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed text-[#C8BEA8] max-w-[520px] mb-8">
            Aurum Global operates in 47 cities across 31 countries — giving our clients local expertise backed by global resources.
          </p>
          <div className="flex gap-10">
            {[{ value: '47', label: 'Cities' }, { value: '31', label: 'Countries' }, { value: '4,200+', label: 'Employees' }].map(s => (
              <div key={s.label}>
                <p className="font-playfair text-[36px] text-aurum-gold leading-none">{s.value}</p>
                <p className="font-dm text-[10px] uppercase tracking-[0.18em] text-[#5A5040] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices grid */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(201,168,76,0.1)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-12">Featured Locations</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {OFFICES.map(o => (
            <div key={o.city} className="rounded-2xl border border-[rgba(201,168,76,0.1)] bg-[rgba(17,17,20,0.6)] p-7 hover:border-[rgba(201,168,76,0.28)] hover:-translate-y-1 transition-all duration-200">
              <span className={`font-dm text-[8px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full border mb-4 inline-block ${TAG_STYLES[o.tag]}`}>
                {o.tag}
              </span>
              <h3 className="font-playfair text-[24px] text-pale-gold mb-1">{o.city}</h3>
              <p className="font-dm text-[11px] text-[#5A5040] mb-4">{o.country}</p>
              <div className="w-8 h-[1px] bg-aurum-gold opacity-30 mb-4" />
              <p className="font-dm text-[12px] text-[#C8BEA8] mb-2">{o.role}</p>
              <p className="font-dm text-[11px] text-[#8A8070] mb-3 leading-relaxed">{o.focus}</p>
              <p className="font-dm text-[10px] uppercase tracking-[0.14em] text-aurum-gold opacity-60">{o.employees} employees</p>
            </div>
          ))}
        </div>
      </section>

      {/* Map placeholder */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-20 border-b border-[rgba(201,168,76,0.1)]">
        <div className="rounded-2xl border border-[rgba(201,168,76,0.14)] bg-[rgba(17,17,20,0.5)] h-64 flex items-center justify-center">
          <div className="text-center">
            <p className="font-playfair text-[32px] text-aurum-gold opacity-20 mb-3">◦ · ◦ · ◦</p>
            <p className="font-dm text-[11px] uppercase tracking-[0.2em] text-[#4A4030]">Offices in 47 cities across 31 countries</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-28 text-center">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Join a Global Team</p>
        <h2 className="font-playfair text-[48px] sm:text-[56px] text-pale-gold leading-tight mb-6">
          Where Would You<br />Like to Work?
        </h2>
        <p className="font-dm text-[15px] text-[#8A8070] leading-relaxed max-w-[440px] mx-auto mb-10">
          Explore our open roles and filter by location to find opportunities near you — or in a city you&apos;ve always wanted to work in.
        </p>
        <Link href="/careers/open-roles" className="inline-flex items-center gap-2 px-8 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#0A0800] font-medium hover:bg-pale-gold transition-all duration-200">
          View Open Roles <ArrowRight size={14} strokeWidth={2} />
        </Link>
      </section>
    </main>
  )
}
