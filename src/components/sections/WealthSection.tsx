'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const PILLARS = [
  {
    title: 'Dedicated Advisory',
    desc: 'A senior portfolio manager assigned exclusively to your account — with a 1:10 advisor-to-client ratio that ensures genuine attention.',
  },
  {
    title: 'Bespoke Portfolios',
    desc: 'Asset allocation built around your specific risk tolerance, time horizon, liquidity needs, and life objectives.',
  },
  {
    title: 'Transparent Reporting',
    desc: 'Comprehensive monthly performance reports with full attribution analysis and forward-looking commentary.',
  },
  {
    title: 'Real-Time Access',
    desc: 'Monitor your portfolio at any time via AG Terminal — complete transparency across all positions and transactions.',
  },
]

export default function WealthSection() {
  return (
    <section
      id="wealth"
      className="py-32 border-t border-[rgba(255,255,255,0.07)]"
      aria-label="Private Wealth Management"
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">

        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold mb-8">
              Private Wealth Management
            </p>
            <h2
              className="font-playfair text-pale-gold leading-[1.1]"
              style={{ fontSize: 'clamp(30px, 4vw, 46px)' }}
            >
              Wealth managed with<br />precision and discretion.
            </h2>
            <p className="mt-7 font-dm text-[15px] text-[#86868B] leading-[1.8] max-w-[460px]">
              Our Private Wealth Management division provides bespoke portfolio management for high-net-worth individuals, family offices, and institutions seeking a genuinely personal service — not a product.
            </p>
            <p className="mt-5 font-dm text-[13px] text-[#6E6E73]">
              Minimum investment: $100,000
            </p>
            <a
              href="#contact"
              className="mt-10 inline-flex items-center gap-2 font-dm text-[12px] text-aurum-gold hover:gap-3 transition-all duration-200"
            >
              Schedule a consultation <ArrowRight size={13} strokeWidth={1.75} />
            </a>
          </motion.div>

          {/* Right — pillars */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
            }}
            className="flex flex-col divide-y divide-[rgba(255,255,255,0.07)]"
          >
            {PILLARS.map(p => (
              <motion.div
                key={p.title}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="py-7 first:pt-0 last:pb-0"
              >
                <h3 className="font-dm text-[15px] font-medium text-pale-gold mb-2">
                  {p.title}
                </h3>
                <p className="font-dm text-[13px] text-[#86868B] leading-relaxed">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
