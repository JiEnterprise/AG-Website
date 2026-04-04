'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { CRYPTO_PRICES } from '@/lib/marketData'

const CrystalScene = dynamic(() => import('@/components/three/CrystalScene'), {
  ssr: false,
  loading: () => <div className="w-full h-[400px]" />,
})

const PILLS = [
  'Multi-chain',
  'Cold Custody',
  'DeFi Integration',
  'Risk-Managed',
  'Tax Optimization',
  '24/7 Monitoring',
]

export default function CryptoSection() {
  const [prices, setPrices] = useState(CRYPTO_PRICES)
  const [prevPrices, setPrevPrices] = useState(CRYPTO_PRICES)

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevPrices(prices)
      setPrices(prev =>
        prev.map(c => ({
          ...c,
          price: c.price * (1 + (Math.random() - 0.495) * 0.003),
          change24h: c.change24h + (Math.random() - 0.5) * 0.2,
        }))
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [prices])

  return (
    <section
      id="crypto"
      className="py-[120px] relative overflow-hidden"
      style={{
        background: '#070810',
      }}
      aria-label="Crypto and Digital Assets"
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 60% 50%, rgba(56,97,200,0.07) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-dm text-[10px] uppercase tracking-[0.25em] text-aurum-gold"
            >
              Crypto & Digital Assets
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 font-playfair text-pale-gold leading-tight"
              style={{ fontSize: 'clamp(30px, 4.5vw, 48px)' }}
            >
              Institutional Digital
              <br />
              <span className="text-aurum-gold">Asset Management.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-lora text-[16px] text-[#B8AE99] leading-[1.8] max-w-[480px]"
            >
              Aurum Global provides sophisticated cryptocurrency portfolio
              management for institutions and HNWIs. Multi-chain exposure with
              institutional-grade custody, risk management, and reporting.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 flex flex-wrap gap-2"
            >
              {PILLS.map(pill => (
                <span
                  key={pill}
                  className="px-3 py-1.5 rounded-full border border-[rgba(201,168,76,0.25)] font-dm text-[11px] text-[#B8AE99] hover:border-aurum-gold hover:text-aurum-gold transition-colors duration-200"
                >
                  {pill}
                </span>
              ))}
            </motion.div>

            {/* Live price grid */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 grid grid-cols-2 gap-3"
            >
              {prices.map(coin => (
                <div
                  key={coin.symbol}
                  className="bg-carbon border border-[rgba(201,168,76,0.08)] rounded-lg p-4 hover:border-[rgba(201,168,76,0.2)] transition-colors duration-300"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[11px] font-medium text-pale-gold">
                      {coin.symbol}
                    </span>
                    <span
                      className={`font-mono text-[10px] ${coin.change24h >= 0 ? 'text-gain' : 'text-loss'}`}
                    >
                      {coin.change24h >= 0 ? '+' : ''}
                      {coin.change24h.toFixed(2)}%
                    </span>
                  </div>
                  <div className="font-mono text-[13px] text-[#B8AE99]">
                    {coin.price > 10000
                      ? '$' + coin.price.toLocaleString('en-US', { maximumFractionDigits: 0 })
                      : '$' + coin.price.toFixed(2)}
                  </div>
                  <div className="font-dm text-[10px] text-muted-gold mt-0.5">{coin.name}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — 3D Crystal */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center justify-center"
          >
            <div className="w-full max-w-[480px] h-[440px]">
              <CrystalScene />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
