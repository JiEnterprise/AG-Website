'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowRight } from 'lucide-react'
import { INSIGHTS_FEED } from '@/lib/marketData'

const CATEGORY_COLORS: Record<string, string> = {
  MACRO: 'text-[#7CA8D4] border-[rgba(124,168,212,0.3)] bg-[rgba(124,168,212,0.08)]',
  EQUITY: 'text-gain border-[rgba(45,140,94,0.3)] bg-[rgba(45,140,94,0.08)]',
  CRYPTO: 'text-aurum-gold border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.08)]',
  OPTIONS: 'text-[#C47ACE] border-[rgba(196,122,206,0.3)] bg-[rgba(196,122,206,0.08)]',
}

const FEATURED = {
  category: 'MACRO',
  headline: 'The Great Monetary Reset: How Central Bank Divergence Is Reshaping Global Capital Flows',
  author: 'Dr. Alicia Wentworth, Chief Macro Strategist',
  date: 'April 4, 2026',
  excerpt: [
    'As the Federal Reserve signals a prolonged pause and the ECB moves toward easing, institutional capital is flowing in unprecedented patterns across G10 currency markets. Our proprietary flow analysis suggests a structural shift that could define portfolio positioning for the next 18–24 months.',
    'The divergence in monetary policy cycles presents both risk and opportunity. For sophisticated investors willing to look beyond conventional allocation frameworks, the cross-asset dislocations emerging from this environment offer asymmetric return potential that warrants immediate strategic attention.',
  ],
}

function CategoryPill({ category }: { category: string }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded text-[9px] font-dm uppercase tracking-[0.15em] font-medium border ${CATEGORY_COLORS[category] || 'text-muted-gold border-[rgba(90,80,64,0.3)]'}`}
    >
      {category}
    </span>
  )
}

export default function InsightsSection() {
  const [query, setQuery] = useState('')
  const filtered = INSIGHTS_FEED.filter(
    item =>
      !query ||
      item.headline.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <section
      id="insights"
      className="py-[120px] bg-[#0A0A0C]"
      aria-label="AG Insights Intelligence"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section header */}
        <div className="mb-14 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-dm text-[10px] uppercase tracking-[0.25em] text-aurum-gold"
          >
            AG Insights
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-playfair text-pale-gold"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}
          >
            Market Intelligence.{' '}
            <span className="text-aurum-gold">Elevated.</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-11 gap-8">
          {/* Left — feed */}
          <div className="lg:col-span-6">
            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-5"
            >
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-gold pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search insights..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-carbon border border-[rgba(201,168,76,0.1)] rounded-lg font-dm text-[13px] text-pale-gold placeholder:text-muted-gold focus:outline-none focus:border-aurum-gold transition-colors duration-200"
                aria-label="Search market insights"
              />
            </motion.div>

            {/* Insight cards */}
            <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1 custom-scroll">
              {filtered.map((item, i) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="group rounded-xl p-5 bg-carbon border border-[rgba(201,168,76,0.08)] hover:border-[rgba(201,168,76,0.3)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3">
                    <CategoryPill category={item.category} />
                    <span className="font-mono text-[10px] text-muted-gold whitespace-nowrap">
                      {item.timestamp}
                    </span>
                  </div>
                  <h3 className="mt-3 font-dm text-[14px] font-medium text-pale-gold leading-snug">
                    {item.headline}
                  </h3>
                  <p className="mt-2 font-dm text-[12px] text-muted-gold leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-muted-gold">{item.author}</span>
                    <span className="text-[11px] font-dm text-aurum-gold group-hover:text-pale-gold transition-colors flex items-center gap-1">
                      Read <ArrowRight size={11} />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Right — featured */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="sticky top-24 bg-carbon border border-[rgba(201,168,76,0.12)] rounded-xl p-7">
              <div className="flex items-center justify-between mb-4">
                <CategoryPill category={FEATURED.category} />
                <span className="font-mono text-[10px] text-muted-gold">Featured Report</span>
              </div>

              {/* Decorative chart */}
              <div className="mb-5 rounded-lg overflow-hidden bg-[#080809] border border-[rgba(201,168,76,0.06)] p-3">
                <svg viewBox="0 0 300 60" className="w-full" aria-hidden="true">
                  <defs>
                    <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 45 C 30 42 60 38 90 35 S 150 22 180 20 S 240 28 270 18 L 300 12"
                    fill="none"
                    stroke="#C9A84C"
                    strokeWidth="1.5"
                    opacity="0.7"
                  />
                  <path
                    d="M 0 45 C 30 42 60 38 90 35 S 150 22 180 20 S 240 28 270 18 L 300 12 L 300 60 L 0 60 Z"
                    fill="url(#chart-fill)"
                  />
                </svg>
              </div>

              <h3 className="font-playfair text-[22px] text-pale-gold leading-snug">
                {FEATURED.headline}
              </h3>
              <div className="mt-3 flex items-center gap-2">
                <span className="font-mono text-[10px] text-aurum-gold">{FEATURED.author}</span>
                <span className="text-muted-gold text-[10px]">·</span>
                <span className="font-mono text-[10px] text-muted-gold">{FEATURED.date}</span>
              </div>
              {FEATURED.excerpt.map((para, i) => (
                <p key={i} className="mt-4 font-lora text-[14px] text-[#B8AE99] leading-[1.8]">
                  {para}
                </p>
              ))}
              <a
                href="#"
                className="mt-6 inline-flex items-center gap-1.5 text-[12px] font-dm text-aurum-gold hover:text-pale-gold transition-colors"
              >
                Read Full Report <ArrowRight size={12} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
