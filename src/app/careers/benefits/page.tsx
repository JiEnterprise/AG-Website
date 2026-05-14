import Navigation from '@/components/Navigation'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const CATEGORIES = [
  {
    title: 'Health & Wellness',
    items: [
      { name: 'Medical, Dental & Vision', detail: '100% premium covered for employee and family' },
      { name: 'Mental Health Support', detail: 'Unlimited therapy sessions via Spring Health' },
      { name: 'Wellness Credit', detail: '$2,000 annual credit for gym, fitness, or wellness apps' },
      { name: 'On-Site Fitness', detail: 'Fully equipped gym in all major AG offices' },
    ],
  },
  {
    title: 'Financial',
    items: [
      { name: '401(k) with 6% Match', detail: 'Immediate vesting on all employer contributions' },
      { name: 'Employee Stock Plan', detail: 'Purchase AG equity at a 15% discount' },
      { name: 'Annual Performance Bonus', detail: 'Competitive cash bonus tied to individual and firm results' },
      { name: 'Profit Sharing', detail: 'Firm-wide profit sharing pool distributed annually' },
    ],
  },
  {
    title: 'Time Off',
    items: [
      { name: '25 Days PTO', detail: 'Plus all federal holidays and AG-observed firm holidays' },
      { name: 'Parental Leave', detail: '16 weeks fully paid for all parents — birth, adoption, or foster' },
      { name: 'Sabbatical Program', detail: '6-week paid sabbatical after every 7 years of service' },
      { name: 'Flexible Scheduling', detail: 'Hybrid and flexible work arrangements for most roles' },
    ],
  },
  {
    title: 'Growth & Development',
    items: [
      { name: 'Learning Stipend', detail: '$5,000 annual budget for courses, conferences, and books' },
      { name: 'CFA & MBA Sponsorship', detail: 'Full exam fees, study materials, and prep time covered' },
      { name: 'Global Rotation', detail: 'Competitive program for cross-office and cross-function rotations' },
      { name: 'Executive Mentorship', detail: '1:1 mentorship pairings with AG Managing Directors and Partners' },
    ],
  },
]

export default function BenefitsPage() {
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
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6 mt-2">Benefits</p>
          <h1 className="font-playfair text-[56px] sm:text-[72px] leading-[1.0] text-pale-gold max-w-[700px] mb-8">
            Exceptional Benefits<br />for Exceptional People.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed text-[#C8BEA8] max-w-[560px]">
            We invest in our people the same way we invest for our clients — comprehensively, thoughtfully, and for the long term.
          </p>
        </div>
      </section>

      {/* Benefits grid */}
      {CATEGORIES.map((cat, i) => (
        <section key={cat.title} className={`max-w-[1240px] mx-auto px-6 sm:px-10 py-20 ${i < CATEGORIES.length - 1 ? 'border-b border-[rgba(201,168,76,0.1)]' : ''}`}>
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-10">{cat.title}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {cat.items.map(item => (
              <div key={item.name} className="rounded-2xl border border-[rgba(201,168,76,0.1)] bg-[rgba(17,17,20,0.6)] p-7 hover:border-[rgba(201,168,76,0.28)] transition-all duration-200">
                <h3 className="font-playfair text-[18px] text-pale-gold mb-2">{item.name}</h3>
                <p className="font-dm text-[13px] text-[#8A8070] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="border-t border-[rgba(201,168,76,0.1)] max-w-[1240px] mx-auto px-6 sm:px-10 py-28 text-center">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Join the Team</p>
        <h2 className="font-playfair text-[48px] sm:text-[56px] text-pale-gold leading-tight mb-6">
          Ready to Build<br />Your Future with AG?
        </h2>
        <p className="font-dm text-[15px] text-[#8A8070] leading-relaxed max-w-[440px] mx-auto mb-10">
          Explore our open roles and find where your ambition meets our mission.
        </p>
        <Link href="/careers/open-roles" className="inline-flex items-center gap-2 px-8 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#0A0800] font-medium hover:bg-pale-gold transition-all duration-200">
          View Open Roles <ArrowRight size={14} strokeWidth={2} />
        </Link>
      </section>
    </main>
  )
}
