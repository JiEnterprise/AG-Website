'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const SERVICES = [
  {
    n: '01',
    title: 'Private Wealth Management',
    desc: 'Dedicated advisors, bespoke portfolios, and full-spectrum wealth planning for high-net-worth individuals and family offices.',
    href: '/private-wealth-management',
  },
  {
    n: '02',
    title: 'Institutional Banking',
    desc: 'Corporate treasury, custody, and capital markets solutions for institutions, endowments, and sovereign clients.',
    href: '/institutional-banking',
  },
  {
    n: '03',
    title: 'Asset Management',
    desc: 'Multi-asset portfolios spanning equities, fixed income, alternatives, private credit, and real assets.',
    href: '/asset-management',
  },
  {
    n: '04',
    title: 'AG Terminal',
    desc: 'Real-time market data, candlestick charting, order management, and AI-powered analysis in one platform.',
    href: '/ag-terminal',
  },
  {
    n: '05',
    title: 'AGQuant',
    desc: 'Proprietary signal generation, factor models, and systematic strategies powered by machine learning.',
    href: '/agquant',
  },
  {
    n: '06',
    title: 'Mergers & Acquisitions',
    desc: 'Buy-side and sell-side advisory, cross-border transaction execution, and fairness opinions.',
    href: '/mergers-acquisitions',
  },
]

export default function BentoGrid() {
  return (
    <section id="products" className="py-32 bg-obsidian">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-5">What We Offer</p>
            <h2
              className="font-playfair text-pale-gold leading-[1.08]"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
            >
              Institutional finance,<br />at every level.
            </h2>
          </div>
          <Link
            href="/private-wealth-management"
            className="inline-flex items-center gap-1.5 font-dm text-[11px] uppercase tracking-[0.12em] text-[#6E6E73] hover:text-pale-gold transition-colors duration-200 flex-shrink-0"
          >
            View all services <ArrowRight size={11} strokeWidth={1.75} />
          </Link>
        </motion.div>

        {/* Services list — 2 columns, numbered rows */}
        <div className="grid sm:grid-cols-2">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={[
                'group py-10',
                'border-b border-[rgba(255,255,255,0.07)]',
                i % 2 === 0
                  ? 'sm:pr-16 sm:border-r sm:border-[rgba(255,255,255,0.07)]'
                  : 'sm:pl-16',
              ].join(' ')}
            >
              <span className="font-mono text-[10px] text-[#6E6E73] mb-5 block">{s.n}</span>
              <h3 className="font-playfair text-[21px] text-pale-gold mb-3 leading-snug">
                {s.title}
              </h3>
              <p className="font-dm text-[13px] text-[#86868B] leading-[1.75] mb-5 max-w-[420px]">
                {s.desc}
              </p>
              <Link
                href={s.href}
                className="inline-flex items-center gap-1.5 font-dm text-[11px] text-[#6E6E73] group-hover:text-aurum-gold transition-colors duration-200"
                aria-label={`Learn about ${s.title}`}
              >
                Learn more
                <ArrowRight
                  size={11}
                  strokeWidth={1.75}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
