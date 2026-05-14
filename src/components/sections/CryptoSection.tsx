'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { CRYPTO_PRICES } from '@/lib/marketData'

const CAPABILITIES = [
  'Multi-chain custody and settlement',
  'DeFi protocol access and yield strategies',
  'On-chain analytics and risk monitoring',
  'Tax optimisation and regulatory reporting',
]

export default function CryptoSection() {
  const [prices, setPrices] = useState(CRYPTO_PRICES)

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev =>
        prev.map(c => ({
          ...c,
          price: c.price * (1 + (Math.random() - 0.495) * 0.003),
          change24h: c.change24h + (Math.random() - 0.5) * 0.2,
        }))
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="crypto"
      className="py-32 border-t border-[rgba(255,255,255,0.07)]"
      aria-label="Crypto and Digital Assets"
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
              Digital Assets
            </p>
            <h2
              className="font-playfair text-pale-gold leading-[1.1]"
              style={{ fontSize: 'clamp(30px, 4vw, 46px)' }}
            >
              Digital assets managed<br />with institutional care.
            </h2>
            <p className="mt-7 font-dm text-[15px] text-[#86868B] leading-[1.8] max-w-[460px]">
              We provide cryptocurrency portfolio management for institutions and high-net-worth individuals seeking disciplined exposure to digital assets — with the same rigour applied to our traditional portfolios.
            </p>

            {/* Capabilities */}
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
              }}
              className="mt-8 flex flex-col divide-y divide-[rgba(255,255,255,0.07)]"
            >
              {CAPABILITIES.map(cap => (
                <motion.li
                  key={cap}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="py-4 first:pt-0 font-dm text-[14px] text-[#86868B]"
                >
                  {cap}
                </motion.li>
              ))}
            </motion.ul>

            <a
              href="/crypto-management"
              className="mt-10 inline-flex items-center gap-2 font-dm text-[12px] text-aurum-gold hover:gap-3 transition-all duration-200"
            >
              Learn more <ArrowRight size={13} strokeWidth={1.75} />
            </a>
          </motion.div>

          {/* Right — price table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border border-[rgba(255,255,255,0.09)] rounded-xl overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-3 px-5 py-3 border-b border-[rgba(255,255,255,0.07)]">
                <span className="font-dm text-[10px] uppercase tracking-[0.15em] text-[#6E6E73]">Asset</span>
                <span className="font-dm text-[10px] uppercase tracking-[0.15em] text-[#6E6E73] text-right">Price</span>
                <span className="font-dm text-[10px] uppercase tracking-[0.15em] text-[#6E6E73] text-right">24h</span>
              </div>

              {/* Rows */}
              {prices.map((coin, i) => (
                <div
                  key={coin.symbol}
                  className={`grid grid-cols-3 px-5 py-4 ${i < prices.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}
                >
                  <div>
                    <div className="font-mono text-[13px] text-pale-gold">{coin.symbol}</div>
                    <div className="font-dm text-[11px] text-[#6E6E73] mt-0.5">{coin.name}</div>
                  </div>
                  <div className="font-mono text-[13px] text-[#86868B] text-right self-center">
                    {coin.price > 10000
                      ? '$' + coin.price.toLocaleString('en-US', { maximumFractionDigits: 0 })
                      : '$' + coin.price.toFixed(2)}
                  </div>
                  <div
                    className={`font-mono text-[13px] text-right self-center ${coin.change24h >= 0 ? 'text-gain' : 'text-loss'}`}
                  >
                    {coin.change24h >= 0 ? '+' : ''}
                    {coin.change24h.toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 font-dm text-[11px] text-[#6E6E73]">
              Indicative prices. Not investment advice.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
