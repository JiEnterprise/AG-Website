'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

// Lazy-load Three.js canvas after LCP
const ParticleNetwork = dynamic(() => import('@/components/three/ParticleNetwork'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-obsidian" />,
})

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
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

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(0,0,0,0.55) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[2] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #000000)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        className="relative z-[3] flex flex-col items-center text-center px-6 max-w-[860px] mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.p
          variants={itemVariants}
          className="font-dm text-[10px] tracking-[0.32em] text-aurum-gold uppercase mb-8"
        >
          Aurum Global Inc.
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="font-playfair font-bold text-pale-gold leading-[1.04]"
          style={{ fontSize: 'clamp(48px, 8.5vw, 100px)' }}
        >
          The Future of
          <br />
          <em className="not-italic text-aurum-gold">Institutional Finance.</em>
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={itemVariants}
          className="mt-8 font-dm text-[16px] text-[#86868B] max-w-[520px] leading-[1.7]"
        >
          Private banking, quantitative trading, and market intelligence — built for clients who demand more.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-center gap-3"
        >
          <a
            href="#products"
            className="inline-flex items-center gap-2 px-8 h-12 rounded-full bg-aurum-gold text-[12px] font-dm font-medium tracking-[0.06em] text-[#000000] hover:bg-pale-gold transition-colors duration-250"
          >
            Explore Services
          </a>
          <a
            href="#contact"
            className="inline-flex items-center px-8 h-12 rounded-full border border-[rgba(255,255,255,0.2)] text-[12px] font-dm tracking-[0.06em] text-[#F5F5F7] hover:border-[rgba(255,255,255,0.45)] transition-colors duration-250"
          >
            Request an Introduction
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        aria-hidden="true"
      >
        <motion.div
          className="w-px h-14 bg-[rgba(255,255,255,0.2)]"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
