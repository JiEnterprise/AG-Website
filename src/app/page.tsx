'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import BentoGrid from '@/components/sections/BentoGrid'
import TerminalSection from '@/components/sections/TerminalSection'
import QuantSection from '@/components/sections/QuantSection'
import StatsBar from '@/components/sections/StatsBar'
import WealthSection from '@/components/sections/WealthSection'
import InsightsSection from '@/components/sections/InsightsSection'
import CryptoSection from '@/components/sections/CryptoSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/sections/Footer'

// Client-only intro animation
const IntroAnimation  = dynamic(() => import('@/components/IntroAnimation'),             { ssr: false })

export default function HomePage() {
  // Scroll progress bar — direct DOM, zero React overhead
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      bar.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  // Initialize Lenis smooth scroll
  useEffect(() => {
    interface LenisInstance {
      raf: (time: number) => void
      destroy: () => void
    }
    let lenis: LenisInstance | null = null
    let rafId: number

    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('lenis')
        lenis = new Lenis({
          lerp: 0.065,        // silkier — slower lerp = more luxurious glide
          smoothWheel: true,
          touchMultiplier: 2,
          wheelMultiplier: 0.9,
        }) as LenisInstance

        const tick = (time: number) => {
          lenis?.raf(time)
          rafId = requestAnimationFrame(tick)
        }
        rafId = requestAnimationFrame(tick)
      } catch {
        // Lenis not critical — fall back gracefully
      }
    }

    initLenis()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (lenis) lenis.destroy()
    }
  }, [])

  return (
    <>
      {/* Scroll progress — thin gold line at top */}
      <div id="scroll-progress" className="scroll-progress" aria-hidden="true" />

      <IntroAnimation />
      <Navigation />

      <main id="main-content">
        {/* S01 — Hero */}
        <HeroSection />

        {/* S02 — Business Lines Bento Grid */}
        <BentoGrid />

        {/* S03 — AG Terminal Spotlight */}
        <TerminalSection />

        {/* S04 — AGQuant Algorithms */}
        <QuantSection />

        {/* S05 — Stats Bar */}
        <StatsBar />

        {/* S06 — Private Wealth Management */}
        <WealthSection />

        {/* S07 — AG Insights */}
        <InsightsSection />

        {/* S08 — Crypto Management */}
        <CryptoSection />

        {/* S09 — CTA / Contact */}
        <ContactSection />
      </main>

      {/* S10 — Footer */}
      <Footer />
    </>
  )
}
