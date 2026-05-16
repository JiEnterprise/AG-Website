'use client'

import { motion } from 'framer-motion'

const SIGNALS = [
  { label: 'Founded', value: '2022' },
  { label: 'Asset Classes', value: '12+' },
  { label: 'Years Building', value: '3+' },
  { label: 'Infrastructure', value: 'Institutional' },
  { label: 'Operations', value: '24/7' },
  { label: 'Coverage', value: 'Global' },
]

export default function TrustBar() {
  return (
    <div
      className="border-y border-[rgba(201,168,76,0.07)]"
      style={{ background: '#0D0D10' }}
      aria-label="Firm credentials"
      role="complementary"
    >
      <div className="max-w-[1400px] mx-auto px-6 py-5">
        <div className="flex flex-wrap items-stretch justify-center">
          {SIGNALS.map((sig, i) => (
            <motion.div
              key={sig.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center"
            >
              <div className="px-5 sm:px-8 py-2 flex flex-col items-center text-center min-w-0">
                <span className="font-dm text-[16px] sm:text-[18px] font-medium text-pale-gold leading-none">
                  {sig.value}
                </span>
                <span className="font-dm text-[8px] sm:text-[9px] uppercase tracking-[0.16em] text-muted-gold mt-1.5 whitespace-nowrap">
                  {sig.label}
                </span>
              </div>
              {i < SIGNALS.length - 1 && (
                <div className="self-stretch w-px bg-[rgba(201,168,76,0.08)]" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
