'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react'
import Navigation from '@/components/Navigation'

const SOLUTIONS = [
  { title: 'Accessing Alternative Markets', desc: 'Private equity, hedge funds, real assets, and structured products — curated for your risk profile.' },
  { title: 'Building a Portfolio Strategy', desc: 'A bespoke, goals-based investment plan aligned to your time horizon and liquidity needs.' },
  { title: 'Navigating Liquidity Events', desc: 'Expert guidance for IPOs, business sales, secondary offerings, and concentrated positions.' },
  { title: 'Utilizing Strategic Lending', desc: 'Capital access solutions that work alongside your portfolio — without disrupting long-term strategy.' },
  { title: 'Developing a Philanthropic Strategy', desc: 'Purpose-driven giving vehicles that maximize impact and align with your family values.' },
  { title: 'Planning for an Inheritance', desc: 'Multigenerational wealth transfer, trust structures, and estate planning for lasting legacy.' },
]

const OFFERINGS = [
  {
    category: 'Investment Advice',
    items: ['Investment Strategy', 'Alternative Investments', 'Single Stock Risk Management', 'Sustainable and Impact Investing'],
  },
  {
    category: 'Wealth Planning',
    items: ['Tax-Efficient Wealth Planning', 'Trust and Estate Services', 'Philanthropic Strategy', 'Family Stewardship', 'Art and Collectibles Strategy'],
  },
  {
    category: 'Private Banking',
    items: ['Cash Management', 'Strategic Lending'],
  },
  {
    category: 'Specialized Services',
    items: ['AG Family Office', 'Institutional Client Solutions', 'Sports and Entertainment Solutions'],
  },
]

const INSIGHTS = [
  { tag: 'Investment Strategy', title: 'How Geopolitics, AI, and Rate Policy Could Impact HNW Investors in 2026', date: 'Mar 15, 2026', read: '8 min read' },
  { tag: 'In the Lead', title: 'Celebrating Exceptional Leadership: Insights & Inspiration from the AG Network', date: 'Mar 6, 2026', read: '12 min read' },
  { tag: 'Entrepreneurship', title: 'Navigating a Business Exit or IPO: A Wealth Advisor\'s Perspective', date: 'Oct 15, 2025', read: '2 min read' },
]

export default function PrivateWealthPage() {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <main className="bg-obsidian text-pale-gold min-h-screen">

      <Navigation />

      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex flex-col justify-end overflow-hidden border-b border-[rgba(201,168,76,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0900] via-[#0D0C08] to-[#08080A]" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C9A84C 0%, transparent 40%)' }} />

        <div className="relative z-10 max-w-[1240px] mx-auto w-full px-6 sm:px-10 pb-20">
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Private Wealth Management</p>
          <h1 className="font-playfair text-[56px] sm:text-[80px] leading-[1.0] text-pale-gold max-w-[700px] mb-8">
            Powering<br />Global Wealth.
          </h1>
          <p className="font-dm text-[16px] leading-relaxed text-[#C8BEA8] max-w-[560px] mb-10">
            Internationally recognized for delivering exceptional private banking to ultra-high net worth individuals, families, and institutions worldwide.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 px-7 h-12 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#0A0800] font-medium hover:bg-pale-gold transition-all duration-200">
            Request an Introduction <ArrowRight size={14} strokeWidth={2} />
          </a>
        </div>
      </section>

      {/* ── About ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(201,168,76,0.1)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">About Us</p>
        <p className="font-playfair text-[28px] sm:text-[36px] text-pale-gold leading-[1.35] max-w-[800px] mb-20">
          Aurum Global Private Wealth Management&apos;s strategies are intentionally designed for your unique needs and goals.
        </p>

        <div className="grid sm:grid-cols-3 gap-8">
          {[
            {
              title: 'Trusted Wealth Advisors',
              desc: 'Our 1:10 advisor-to-client ratio means your advisor can dedicate the full depth of the firm to delivering a bespoke, white-glove experience.',
              cta: 'Meet Our People',
              href: '/our-people',
            },
            {
              title: 'Curated For You',
              desc: 'We align deep insights and exclusive resources with your goals and interests — building a relationship that evolves with you.',
              cta: 'Why We\'re Different',
              href: '#different',
            },
            {
              title: 'Events & Community',
              desc: 'Perspectives on leadership, legacy, innovation, entrepreneurship, and more — exclusively for AG Private Wealth clients.',
              cta: 'Explore Insights',
              href: '#insights',
            },
          ].map(c => (
            <div key={c.title} className="rounded-2xl border border-[rgba(201,168,76,0.1)] bg-[rgba(17,17,20,0.6)] p-8 flex flex-col group hover:border-[rgba(201,168,76,0.28)] hover:-translate-y-1 transition-all duration-200">
              <div className="w-10 h-[1px] bg-aurum-gold mb-6 opacity-60" />
              <h3 className="font-playfair text-[22px] text-pale-gold mb-4">{c.title}</h3>
              <p className="font-dm text-[13px] text-[#8A8070] leading-relaxed flex-1 mb-6">{c.desc}</p>
              <Link href={c.href} className="inline-flex items-center gap-2 font-dm text-[11px] uppercase tracking-[0.12em] text-aurum-gold group-hover:gap-3 transition-all duration-200">
                {c.cta} <ArrowRight size={12} strokeWidth={1.75} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tailored Solutions ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(201,168,76,0.1)]">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Discover Our Tailored Solutions</p>
            <h2 className="font-playfair text-[40px] text-pale-gold leading-tight max-w-[500px]">
              Learn how we help you navigate your unique circumstances.
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <button onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))} className="w-10 h-10 rounded-full border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-aurum-gold hover:bg-aurum-gold hover:text-[#0A0800] transition-all duration-200 disabled:opacity-30" disabled={activeSlide === 0}>
              <ArrowLeft size={14} />
            </button>
            <button onClick={() => setActiveSlide(Math.min(SOLUTIONS.length - 3, activeSlide + 1))} className="w-10 h-10 rounded-full border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-aurum-gold hover:bg-aurum-gold hover:text-[#0A0800] transition-all duration-200 disabled:opacity-30" disabled={activeSlide >= SOLUTIONS.length - 3}>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {SOLUTIONS.slice(activeSlide, activeSlide + 3).map((s, i) => (
            <div key={i} className="group cursor-pointer rounded-2xl border border-[rgba(201,168,76,0.1)] bg-[rgba(17,17,20,0.6)] overflow-hidden hover:border-[rgba(201,168,76,0.28)] hover:-translate-y-1 transition-all duration-200">
              <div className="h-40 bg-gradient-to-br from-[#111110] to-[#1A1810] flex items-center justify-center">
                <div className="text-5xl opacity-10 font-playfair text-aurum-gold">{String(activeSlide + i + 1).padStart(2, '0')}</div>
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-[17px] text-pale-gold mb-3 leading-snug">{s.title}</h3>
                <p className="font-dm text-[12px] text-[#6A5E50] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Insight ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(201,168,76,0.1)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Featured Insights — Wealth Management Strategy Group</p>
        <div className="rounded-2xl border border-[rgba(201,168,76,0.16)] bg-[rgba(17,17,20,0.7)] p-10 sm:p-14 flex flex-col sm:flex-row gap-10 items-center">
          <div className="flex-1">
            <p className="font-dm text-[11px] uppercase tracking-[0.16em] text-[#5A5040] mb-4">2026 Outlook</p>
            <h3 className="font-playfair text-[28px] sm:text-[34px] text-pale-gold leading-[1.3] mb-6">
              Our 2026 Outlook: Why Resilience Remains Intact in the Face of Considerable Challenges.
            </h3>
            <p className="font-dm text-[13px] text-[#8A8070] leading-relaxed mb-8">Read our latest report on navigating macroeconomic uncertainty, geopolitical shifts, and AI-driven market dynamics — and how we're positioning client portfolios accordingly.</p>
            <a href="#insights" className="inline-flex items-center gap-2 font-dm text-[12px] uppercase tracking-[0.1em] text-aurum-gold hover:gap-4 transition-all duration-200">
              Read Our Report <ArrowRight size={13} strokeWidth={1.75} />
            </a>
          </div>
          <div className="w-full sm:w-64 h-48 rounded-xl bg-gradient-to-br from-[#1A1600] to-[#0D0C08] border border-[rgba(201,168,76,0.12)] flex items-center justify-center flex-shrink-0">
            <div className="text-center">
              <p className="font-playfair text-[42px] text-aurum-gold opacity-40">2026</p>
              <p className="font-dm text-[9px] uppercase tracking-[0.2em] text-[#4A4030] mt-1">AG Outlook</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Explore Offerings ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(201,168,76,0.1)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Explore Our Offerings</p>
        <h2 className="font-playfair text-[40px] text-pale-gold mb-14 leading-tight">
          We draw from a breadth of offerings<br className="hidden sm:block" /> to customize solutions for your full wealth picture.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {OFFERINGS.map(o => (
            <div key={o.category}>
              <p className="font-dm text-[9px] uppercase tracking-[0.22em] text-[#5A5040] mb-5">{o.category}</p>
              {o.items.map(item => (
                <a key={item} href="#" className="group flex items-center justify-between py-3 border-b border-[rgba(201,168,76,0.07)] last:border-0 hover:border-[rgba(201,168,76,0.2)] transition-colors duration-150">
                  <span className="font-dm text-[13px] text-[#C8BEA8] group-hover:text-pale-gold transition-colors duration-150">{item}</span>
                  <ChevronRight size={13} strokeWidth={1.5} className="text-[#3A3328] group-hover:text-aurum-gold transition-colors duration-150 flex-shrink-0" />
                </a>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Awards ── */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(201,168,76,0.1)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Awards and Recognition</p>
        <p className="font-playfair text-[22px] sm:text-[28px] text-pale-gold leading-[1.4] max-w-[820px] mb-12">
          Aurum Global Private Wealth Management has been recognized as a leading global private wealth firm for ultra-high net worth clients, family offices, and institutional investors.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { award: 'Best Private Bank for UHNW', org: 'Global Finance World\'s Best Private Bank Awards 2026', year: '2026' },
            { award: 'Best Private Bank — Net Worth $25M+', org: 'Euromoney Private Banking Awards 2026', year: '2026' },
            { award: 'Best Private Bank — Sustainable Investing', org: 'Global Finance World\'s Best Private Bank Awards 2026', year: '2026' },
          ].map(a => (
            <div key={a.award} className="rounded-2xl border border-[rgba(201,168,76,0.14)] bg-[rgba(17,17,20,0.5)] p-7">
              <div className="font-playfair text-[40px] text-aurum-gold opacity-20 mb-4">{a.year}</div>
              <p className="font-playfair text-[17px] text-pale-gold mb-3 leading-snug">{a.award}</p>
              <p className="font-dm text-[11px] text-[#5A5040] leading-relaxed">{a.org}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Wealth Management Insights ── */}
      <section id="insights" className="max-w-[1240px] mx-auto px-6 sm:px-10 py-24 border-b border-[rgba(201,168,76,0.1)]">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-4">Wealth Management Insights</p>
        <div className="grid sm:grid-cols-3 gap-6">
          {INSIGHTS.map((ins, i) => (
            <a key={i} href="#" className="group rounded-2xl border border-[rgba(201,168,76,0.1)] bg-[rgba(17,17,20,0.5)] overflow-hidden hover:border-[rgba(201,168,76,0.28)] hover:-translate-y-1 transition-all duration-200">
              <div className="h-36 bg-gradient-to-br from-[#111110] to-[#0D0C06] flex items-end p-5">
                <span className="font-dm text-[9px] uppercase tracking-[0.16em] px-3 py-1 rounded-full border border-[rgba(201,168,76,0.3)] text-aurum-gold">{ins.tag}</span>
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-[16px] text-pale-gold leading-snug mb-4 group-hover:text-aurum-gold transition-colors duration-150">{ins.title}</h3>
                <p className="font-dm text-[10px] text-[#4A4438]">{ins.date} · {ins.read}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" className="max-w-[1240px] mx-auto px-6 sm:px-10 py-28 text-center">
        <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-6">Start the Conversation</p>
        <h2 className="font-playfair text-[48px] sm:text-[60px] text-pale-gold leading-tight mb-6">
          Connect with an<br />AG Wealth Advisor.
        </h2>
        <p className="font-dm text-[15px] text-[#8A8070] leading-relaxed max-w-[480px] mx-auto mb-10">
          Connect with a dedicated Aurum Global wealth advisor on how we can help power your wealth and secure your legacy.
        </p>
        <a href="/sign-in" className="inline-flex items-center gap-2 px-8 h-13 bg-aurum-gold font-dm text-[12px] uppercase tracking-[0.12em] text-[#0A0800] font-medium hover:bg-pale-gold transition-all duration-200">
          Request an Introduction <ArrowRight size={14} strokeWidth={2} />
        </a>
      </section>

    </main>
  )
}
