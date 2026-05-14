'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const STRATEGIES = [
  {
    name: 'Mean Reversion',
    desc: 'Exploits statistical price deviations across correlated equity pairs with disciplined entry and exit rules.',
  },
  {
    name: 'Statistical Arbitrage',
    desc: 'Identifies pricing inefficiencies in correlated securities using cointegration and factor models.',
  },
  {
    name: 'Options Income',
    desc: 'Systematic theta-decay strategies — iron condors, covered calls — generating consistent premium income.',
  },
  {
    name: 'Trend Following',
    desc: 'Multi-timeframe momentum across futures, FX, and equities with volatility-adjusted position sizing.',
  },
  {
    name: 'Market Making',
    desc: 'Algorithmic two-sided liquidity provision in liquid equity and ETF markets.',
  },
]

export default function QuantSection() {
  return (
    <section
      id="markets"
      className="py-32 border-t border-[rgba(255,255,255,0.07)]"
      aria-label="AGQuant Trading System"
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
              AGQuant
            </p>
            <h2
              className="font-playfair text-pale-gold leading-[1.1]"
              style={{ fontSize: 'clamp(30px, 4vw, 46px)' }}
            >
              Systematic strategies,<br />rigorously tested.
            </h2>
            <p className="mt-7 font-dm text-[15px] text-[#86868B] leading-[1.8] max-w-[460px]">
              AGQuant is our proprietary quantitative research and trading division. We develop systematic strategies across equities, futures, FX, and options — grounded in statistical rigour and designed for consistent, risk-adjusted performance.
            </p>
            <p className="mt-5 font-dm text-[15px] text-[#86868B] leading-[1.8] max-w-[460px]">
              Each strategy undergoes extensive out-of-sample validation before deployment. Position sizing, drawdown limits, and correlation constraints are enforced at the portfolio level.
            </p>
            <a
              href="/agquant"
              className="mt-10 inline-flex items-center gap-2 font-dm text-[12px] text-aurum-gold hover:gap-3 transition-all duration-200"
            >
              Learn about AGQuant <ArrowRight size={13} strokeWidth={1.75} />
            </a>
          </motion.div>

          {/* Right — strategy list */}
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
            {STRATEGIES.map(s => (
              <motion.div
                key={s.name}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="py-7 first:pt-0 last:pb-0"
              >
                <h3 className="font-dm text-[15px] font-medium text-pale-gold mb-2">
                  {s.name}
                </h3>
                <p className="font-dm text-[13px] text-[#86868B] leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
