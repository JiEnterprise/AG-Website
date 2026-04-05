'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react'

const TESTIMONIALS = [
  {
    quote: 'The culture here genuinely encourages people to take initiative. That has helped me grow faster than anywhere else — and inspired me in ways I didn\'t expect.',
    name: 'Priya M.',
    title: 'Analyst',
    dept: 'Portfolio Strategy, Singapore',
  },
  {
    quote: 'What sets Aurum Global apart is that trust flows in both directions. Leadership trusts us to do exceptional work, and we trust that the firm has our backs.',
    name: 'James T.',
    title: 'Senior Associate',
    dept: 'Private Wealth, New York',
  },
  {
    quote: 'Being part of a firm that genuinely values diverse perspectives makes every client interaction richer and every strategy more robust.',
    name: 'Naledi K.',
    title: 'Director',
    dept: 'Institutional Coverage, London',
  },
]

export default function OurPeoplePage() {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <main className="bg-obsidian text-pale-gold min-h-screen">

      {/* ── Hero with background image ── */}
      <section className="relative min-h-[92vh] flex flex-col justify-end border-b border-[rgba(201,168,76,0.1)] overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/people-hero.jpg')" }}
        />
        {/* Dark overlay — stronger at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(7,7,10,0.45)] via-[rgba(7,7,10,0.55)] to-[rgba(7,7,10,0.88)]" />

        {/* Back link — top left */}
        <div className="absolute top-28 left-6 sm:left-10 z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-[rgba(201,168,76,0.3)] font-dm text-[11px] uppercase tracking-[0.12em] text-[#C8BEA8] hover:text-pale-gold hover:border-aurum-gold transition-all duration-200 backdrop-blur-sm bg-[rgba(0,0,0,0.2)]"
          >
            <ArrowLeft size={13} strokeWidth={1.75} />
            Back to Site
          </Link>
        </div>

        {/* Text content — bottom */}
        <div className="relative z-10 max-w-[1240px] mx-auto w-full px-6 sm:px-10 pb-16 sm:pb-20">
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Our People & Leadership</p>
          <h1 className="font-playfair text-[52px] sm:text-[72px] leading-[1.05] text-pale-gold max-w-[820px] mb-8">
            The People of<br />Aurum Global<br />Are Aurum Global.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed text-[#C8BEA8] max-w-[620px]">
            Our people are our greatest asset — we say it often and with good reason. It is only with the determination and dedication of our people that we can serve our clients, generate long-term value, and contribute meaningfully to our communities.
          </p>
        </div>
      </section>

      {/* ── Founder quote ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-20 border-b border-[rgba(201,168,76,0.1)]">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
          <div>
            <p className="font-playfair text-[28px] sm:text-[34px] italic text-pale-gold leading-[1.35] mb-10">
              &ldquo;Our culture is what defines us — it is our identity and it is at the heart of everything we do for our clients.&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-[rgba(201,168,76,0.3)]">
                <img src="/saswat-profile.jpg" alt="Saswat C." style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 12%' }} />
              </div>
              <div>
                <p className="font-dm text-[13px] font-medium text-pale-gold">Saswat C.</p>
                <p className="font-dm text-[11px] text-muted-gold tracking-wider uppercase mt-0.5">Chairman and Chief Executive Officer</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-[rgba(201,168,76,0.14)] bg-[rgba(17,17,20,0.7)] p-8 backdrop-blur-sm">
            <p className="font-dm text-[10px] uppercase tracking-[0.22em] text-muted-gold mb-5">Our Values</p>
            {[
              { title: 'Client First', desc: 'Every decision begins and ends with what is best for our clients.' },
              { title: 'Integrity Always', desc: 'We hold ourselves to the highest ethical standard in every interaction.' },
              { title: 'Excellence', desc: 'We pursue exceptional outcomes — for clients, shareholders, and communities.' },
              { title: 'Partnership', desc: 'We succeed together. Our people collaborate across every level and discipline.' },
            ].map(v => (
              <div key={v.title} className="flex gap-4 py-4 border-b border-[rgba(201,168,76,0.07)] last:border-0">
                <div className="w-1 h-1 mt-2 rounded-full bg-aurum-gold flex-shrink-0" />
                <div>
                  <p className="font-dm text-[13px] font-medium text-pale-gold mb-1">{v.title}</p>
                  <p className="font-dm text-[12px] text-[#8A8070] leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-20 border-b border-[rgba(201,168,76,0.1)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Leadership</p>
        <h2 className="font-playfair text-[42px] text-pale-gold mb-4">Our Leadership</h2>
        <p className="font-dm text-[15px] text-[#B8AE99] leading-relaxed max-w-[600px] mb-14">
          Aurum Global leaders are committed to ensuring the firm operates at the highest possible level — for our clients, our shareholders, and our people.
        </p>

        {/* Leadership cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-14">
          {[
            { title: 'Board of Directors', desc: 'Providing strategic oversight and governance to ensure long-term value for all stakeholders.', icon: '⬡' },
            { title: 'Executive Officers', desc: 'The senior leadership team driving Aurum Global\'s strategy, culture, and client focus.', icon: '◈' },
            { title: 'Management Committee', desc: 'Cross-functional leaders ensuring excellence across every division and client relationship.', icon: '◇' },
          ].map(l => (
            <div
              key={l.title}
              className="group rounded-2xl border border-[rgba(201,168,76,0.12)] bg-[rgba(17,17,20,0.6)] p-7 hover:border-[rgba(201,168,76,0.32)] hover:-translate-y-1 transition-all duration-200 cursor-pointer"
            >
              <div className="text-2xl text-aurum-gold mb-5 opacity-70">{l.icon}</div>
              <h3 className="font-playfair text-[20px] text-pale-gold mb-3">{l.title}</h3>
              <p className="font-dm text-[13px] text-[#8A8070] leading-relaxed mb-5">{l.desc}</p>
              <span className="inline-flex items-center gap-1.5 font-dm text-[11px] uppercase tracking-[0.1em] text-aurum-gold group-hover:gap-3 transition-all duration-200">
                View <ArrowRight size={12} strokeWidth={1.75} />
              </span>
            </div>
          ))}
        </div>

        {/* Founder profile */}
        <div className="rounded-2xl border border-[rgba(201,168,76,0.18)] bg-[rgba(17,17,20,0.7)] p-8 sm:p-10 flex flex-col sm:flex-row gap-8 items-start">
          <div className="w-20 h-20 rounded-full flex-shrink-0 overflow-hidden border-2 border-[rgba(201,168,76,0.3)]" style={{ boxShadow: '0 0 0 3px rgba(201,168,76,0.12)' }}>
            <img src="/saswat-profile.jpg" alt="Saswat C." style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 12%' }} />
          </div>
          <div className="flex-1">
            <p className="font-dm text-[10px] uppercase tracking-[0.22em] text-muted-gold mb-2">Leadership</p>
            <h3 className="font-playfair text-[28px] text-pale-gold mb-1">Saswat C.</h3>
            <p className="font-dm text-[12px] uppercase tracking-[0.14em] text-aurum-gold mb-5">Chairman and Chief Executive Officer</p>
            <p className="font-dm text-[14px] text-[#8A8070] leading-relaxed max-w-[680px]">
              Saswat founded Aurum Global with the conviction that institutional-grade wealth management should be accessible, transparent, and relentlessly client-focused. With a background spanning private equity, alternative assets, and quantitative strategy, he leads the firm's investment process and client relationships directly.
            </p>
          </div>
        </div>
      </section>

      {/* ── Voices of the Firm ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-20 border-b border-[rgba(201,168,76,0.1)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Our People</p>
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-playfair text-[42px] text-pale-gold leading-tight">Voices of the Firm</h2>
          <p className="hidden sm:block font-dm text-[13px] text-[#6A5E50] max-w-[340px] text-right">
            Our people share their experiences, insights, and reflections on what it means to be a part of Aurum Global.
          </p>
        </div>

        {/* Testimonial slider */}
        <div className="relative">
          <div className="rounded-2xl border border-[rgba(201,168,76,0.14)] bg-[rgba(17,17,20,0.7)] p-10 sm:p-14 min-h-[240px] transition-all duration-300">
            <p className="font-playfair text-[22px] sm:text-[26px] italic text-pale-gold leading-[1.4] mb-8">
              &ldquo;{TESTIMONIALS[activeSlide].quote}&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2A2520] to-[#5A4830] flex items-center justify-center font-dm text-[11px] text-aurum-gold font-medium">
                {TESTIMONIALS[activeSlide].name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-dm text-[13px] text-pale-gold font-medium">{TESTIMONIALS[activeSlide].name}</p>
                <p className="font-dm text-[11px] text-muted-gold mt-0.5">{TESTIMONIALS[activeSlide].title} · {TESTIMONIALS[activeSlide].dept}</p>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-3 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === activeSlide ? 'w-8 bg-aurum-gold' : 'w-3 bg-[rgba(201,168,76,0.25)]'}`}
              />
            ))}
            <span className="font-dm text-[10px] text-muted-gold ml-2">Slide {activeSlide + 1} of {TESTIMONIALS.length}</span>
          </div>
        </div>

        <div className="mt-10">
          <a href="#company" className="inline-flex items-center gap-2 font-dm text-[12px] uppercase tracking-[0.1em] text-aurum-gold border border-aurum-gold px-6 h-11 hover:bg-aurum-gold hover:text-[#0A0800] transition-all duration-200">
            Meet Our People <ArrowRight size={13} strokeWidth={1.75} />
          </a>
        </div>
      </section>

      {/* ── Diversity ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-20 border-b border-[rgba(201,168,76,0.1)]">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Life at AG</p>
            <h2 className="font-playfair text-[38px] text-pale-gold mb-5 leading-tight">Our Commitment<br />to Diversity</h2>
            <p className="font-dm text-[14px] text-[#B8AE99] leading-relaxed mb-8">
              Our people are our greatest asset. We believe that a major strength and principal reason for our success is the quality, dedication, determination, and collaboration of our people — which enables us to serve our clients, generate long-term value for our shareholders, and contribute to the broader community.
            </p>
            <a href="#company" className="inline-flex items-center gap-2 font-dm text-[12px] uppercase tracking-[0.1em] text-aurum-gold hover:text-pale-gold transition-colors duration-200">
              Learn More <ChevronRight size={14} strokeWidth={1.75} />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Countries Represented', value: '30+' },
              { label: 'Languages Spoken', value: '18+' },
              { label: 'Women in Leadership', value: '44%' },
              { label: 'Client Satisfaction', value: '98%' },
            ].map(s => (
              <div key={s.label} className="rounded-xl border border-[rgba(201,168,76,0.12)] bg-[rgba(17,17,20,0.6)] p-6">
                <p className="font-playfair text-[38px] text-aurum-gold mb-2">{s.value}</p>
                <p className="font-dm text-[11px] text-[#6A5E50] leading-relaxed uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Alumni ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-20 border-b border-[rgba(201,168,76,0.1)]">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Alumni</p>
            <h2 className="font-playfair text-[38px] text-pale-gold mb-5 leading-tight">A Strong and Active<br />Alumni Network</h2>
            <p className="font-dm text-[14px] text-[#B8AE99] leading-relaxed mb-8">
              Our people become a part of Aurum Global's history, and the firm becomes a part of theirs. Our alumni network keeps former colleagues around the world connected to the firm and one another, creating opportunities for business collaboration, thought leadership, and lasting relationships.
            </p>
            <a href="#company" className="inline-flex items-center gap-2 font-dm text-[12px] uppercase tracking-[0.1em] text-aurum-gold border border-aurum-gold px-6 h-11 hover:bg-aurum-gold hover:text-[#0A0800] transition-all duration-200">
              Explore our Alumni Network <ArrowRight size={13} strokeWidth={1.75} />
            </a>
          </div>
          <div className="space-y-4">
            {[
              { value: '2,400+', label: 'Total Alumni Population', note: 'As of January 2026' },
              { value: '40+',    label: 'Countries Represented',   note: 'Global reach across 6 continents' },
              { value: '120+',   label: 'Alumni in Executive Roles at Leading Firms', note: 'C-Suite, MD, and Founder-level positions' },
            ].map(s => (
              <div key={s.label} className="rounded-xl border border-[rgba(201,168,76,0.12)] bg-[rgba(17,17,20,0.6)] p-6 flex gap-6 items-center">
                <p className="font-playfair text-[36px] text-aurum-gold flex-shrink-0">{s.value}</p>
                <div>
                  <p className="font-dm text-[13px] text-pale-gold font-medium mb-1">{s.label}</p>
                  <p className="font-dm text-[11px] text-muted-gold">{s.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Discover AG ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-20">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Discover Aurum Global</p>
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-playfair text-[38px] text-pale-gold">Explore More</h2>
          <p className="hidden sm:block font-dm text-[13px] text-[#6A5E50] max-w-[340px] text-right">Learn more about life at Aurum Global and our impact on the communities in which we live and work.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: 'Our Purpose and Values', href: '#company' },
            { title: 'Community Commitments', href: '#firm-community' },
            { title: 'Careers at AG', href: '#careers' },
            { title: 'Corporate Governance', href: '#firm-governance' },
          ].map(l => (
            <a
              key={l.title}
              href={l.href}
              className="group rounded-xl border border-[rgba(201,168,76,0.1)] bg-[rgba(17,17,20,0.5)] p-6 hover:border-[rgba(201,168,76,0.3)] hover:-translate-y-1 transition-all duration-200"
            >
              <p className="font-dm text-[14px] text-[#C8BEA8] group-hover:text-pale-gold transition-colors duration-150 mb-4">{l.title}</p>
              <ArrowRight size={14} strokeWidth={1.75} className="text-aurum-gold opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </a>
          ))}
        </div>
      </section>

    </main>
  )
}
