'use client'

import { motion } from 'framer-motion'
import CountUp from '@/components/ui/CountUp'

const STATS = [
  { value: 2.4, prefix: '$', suffix: 'B+', decimals: 1, label: 'Assets Under Management' },
  { value: 47, prefix: '', suffix: '+', decimals: 0, label: 'Live Trading Strategies' },
  { value: 99.97, prefix: '', suffix: '%', decimals: 2, label: 'Platform Uptime' },
  { value: 3, prefix: '', suffix: '+', decimals: 0, label: 'Years of Excellence' },
]

export default function StatsBar() {
  return (
    <section
      id="solutions"
      className="relative py-[80px] grain-overlay overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #C9A84C 0%, #8B6E2E 100%)',
      }}
      aria-label="Key metrics"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div
                className="font-playfair font-bold text-[#0A0900]"
                style={{ fontSize: 'clamp(44px, 5.5vw, 68px)' }}
              >
                <CountUp
                  end={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  duration={2000}
                />
              </div>
              <div className="mt-2 font-dm text-[11px] uppercase tracking-[0.18em] text-[#3A2E1A]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
