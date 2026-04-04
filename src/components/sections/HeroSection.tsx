'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import CountUp from '@/components/ui/CountUp'

// Lazy-load Three.js canvas after LCP
const ParticleNetwork = dynamic(() => import('@/components/three/ParticleNetwork'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-obsidian" />,
})

const STATS = [
  { value: 2.4, prefix: '$', suffix: 'B+', label: 'Assets Under Management', decimals: 1 },
  { value: 47, prefix: '', suffix: '+', label: 'Strategies Live', decimals: 0 },
  { value: 99.97, prefix: '', suffix: '%', label: 'Platform Uptime', decimals: 2 },
  { value: 12, prefix: '', suffix: '+', label: 'Asset Classes', decimals: 0 },
]

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-obsidian"
      aria-label="Hero — Aurum Global Inc."
    >
      {/* Three.js particle background */}
      {loaded && (
        <div className="absolute inset-0 z-0">
          <ParticleNetwork className="w-full h-full" />
        </div>
      )}

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(8,8,10,0.1) 0%, rgba(8,8,10,0.65) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #08080A)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        className="relative z-[3] flex flex-col items-center text-center px-6 max-w-[900px] mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4 mb-6"
        >
          <div className="h-px w-10 bg-aurum-gold opacity-60" />
          <span className="font-dm text-[10px] tracking-[0.3em] text-aurum-gold uppercase">
            Aurum Global Inc.
          </span>
          <div className="h-px w-10 bg-aurum-gold opacity-60" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="font-playfair font-bold text-pale-gold leading-[1.05]"
          style={{ fontSize: 'clamp(44px, 8vw, 96px)' }}
        >
          The Future of
          <br />
          <em className="not-italic text-aurum-gold">Institutional Finance.</em>
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={itemVariants}
          className="mt-7 font-dm text-[17px] text-[#B8AE99] max-w-[560px] leading-relaxed"
        >
          Multi-asset intelligence. Institutional-grade execution.
          AI-powered insight. One unified platform.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#terminal"
            className="group relative inline-flex items-center gap-2 px-8 h-12 rounded-full bg-aurum-gold text-[13px] font-dm font-medium uppercase tracking-[0.08em] text-[#0A0800] overflow-hidden transition-all duration-300 hover:shadow-[0_0_32px_rgba(201,168,76,0.35)]"
          >
            <span className="relative z-10">Explore Platform</span>
            <div className="absolute inset-0 bg-pale-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center px-8 h-12 rounded-full border border-aurum-gold text-[13px] font-dm font-medium uppercase tracking-[0.08em] text-aurum-gold transition-all duration-300 hover:bg-aurum-gold hover:text-[#0A0800]"
          >
            Request Demo
          </a>
        </motion.div>

        {/* Stats counters */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="font-playfair font-bold text-aurum-gold" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}>
                <CountUp
                  end={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  duration={1800}
                />
              </div>
              <div className="mt-1.5 font-dm text-[10px] uppercase tracking-[0.15em] text-muted-gold text-center">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        aria-hidden="true"
      >
        <motion.div
          className="w-px bg-aurum-gold"
          style={{ height: 64 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="font-mono text-[9px] tracking-[0.2em] text-muted-gold uppercase">Scroll</span>
      </motion.div>
    </section>
  )
}
