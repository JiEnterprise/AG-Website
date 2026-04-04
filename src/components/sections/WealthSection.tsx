'use client'

import { motion } from 'framer-motion'
import { User, BarChart3, FileText, Globe } from 'lucide-react'

const FEATURES = [
  {
    Icon: User,
    title: 'Dedicated Portfolio Manager',
    description:
      'A senior portfolio manager assigned exclusively to your account — personal, consistent, and accountable.',
  },
  {
    Icon: BarChart3,
    title: 'Custom Asset Allocation',
    description:
      'Portfolio construction built around your specific risk tolerance, time horizon, and life goals.',
  },
  {
    Icon: FileText,
    title: 'Monthly Performance Reporting',
    description:
      'Comprehensive, transparent reporting with full attribution analysis and forward-looking commentary.',
  },
  {
    Icon: Globe,
    title: 'Real-time Portfolio Access',
    description:
      'Monitor your portfolio 24/7 via the AG Terminal — full transparency, on any device.',
  },
]

export default function WealthSection() {
  return (
    <section
      id="wealth"
      className="py-[140px] bg-[#F5F3EE]"
      aria-label="Private Wealth Management"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-16 items-center">
          {/* Left — editorial copy */}
          <div className="lg:col-span-3">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-dm text-[10px] uppercase tracking-[0.25em] text-[#7A6A50]"
            >
              Private Wealth Management
            </motion.span>

            {/* Gold accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 h-[3px] w-12 bg-aurum-gold origin-left"
            />

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-playfair italic font-bold text-[#1A1510] leading-tight"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
            >
              "Protecting and growing
              <br />
              generational wealth —
              <br />
              with precision, discretion,
              <br />
              and institutional rigor."
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-lora text-[16px] text-[#3A3328] leading-[1.8] max-w-[520px]"
            >
              Our Private Wealth Management division provides bespoke portfolio
              management for high-net-worth individuals, family offices, and
              institutional clients seeking concierge-level financial service.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 font-dm text-[13px] text-[#7A6A50] italic"
            >
              Minimum investment: $100,000
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              href="#contact"
              className="mt-8 inline-flex items-center px-7 h-12 rounded-full border border-[#1A1510] text-[12px] font-dm font-medium uppercase tracking-[0.1em] text-[#1A1510] hover:bg-aurum-gold hover:border-aurum-gold hover:text-[#0A0800] transition-all duration-300"
            >
              Schedule Consultation
            </motion.a>
          </div>

          {/* Right — feature cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
            }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {FEATURES.map(feat => (
              <motion.div
                key={feat.title}
                variants={{
                  hidden: { opacity: 0, x: 24 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="flex gap-4 p-5 rounded-lg bg-white border-l-[3px] border-aurum-gold shadow-sm"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <feat.Icon size={18} className="text-aurum-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-dm text-[14px] font-medium text-[#1A1510]">
                    {feat.title}
                  </div>
                  <p className="mt-1 font-dm text-[13px] text-[#6A5A48] leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
