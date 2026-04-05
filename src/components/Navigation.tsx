'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown } from 'lucide-react'
import { INITIAL_TICKERS, simulateTicker, type TickerItem } from '@/lib/marketData'

const CAREERS_LINKS = [
  { label: 'Students', href: '#careers-students' },
  { label: 'Life at AG', href: '#careers-life' },
  { label: 'Benefits', href: '#careers-benefits' },
  { label: 'Featured Offices', href: '#careers-offices' },
  { label: 'Open Roles', href: '#careers-roles' },
]

const OUR_FIRM_LINKS = [
  { label: 'Our People and Leadership', href: '/our-people' },
  { label: '157 Years of Excellence', href: '#firm-history' },
  { label: 'Community Impact', href: '#firm-community' },
  { label: 'Our Focus on Sustainability', href: '#firm-sustainability' },
  { label: 'Our Vendor Program', href: '#firm-vendor' },
  { label: 'Partnerships', href: '#firm-partnerships' },
  { label: 'Locations', href: '#firm-locations' },
]

const WHAT_WE_DO = [
  {
    group: 'Private Banking',
    links: [
      { label: 'Private Wealth Management', href: '/private-wealth-management' },
      { label: 'Institutional Banking', href: '#institutional' },
      { label: 'Loans & Credit', href: '#loans' },
    ],
  },
  {
    group: 'Asset Management',
    links: [
      { label: 'Asset Management', href: '#asset-mgmt' },
      { label: 'Mergers & Acquisitions', href: '#ma' },
    ],
  },
  {
    group: 'Markets & Trading',
    links: [
      { label: 'AG Terminal', href: '#ag-terminal' },
      { label: 'AGQuant', href: '#agquant' },
      { label: 'Bot Trading', href: '#bot-trading' },
      { label: 'Crypto Management', href: '#crypto' },
    ],
  },
  {
    group: 'Intelligence',
    links: [
      { label: 'AG Insights', href: '#insights' },
    ],
  },
]

const NAV_LINKS = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Markets', href: '#markets' },
  { label: 'Insights', href: '#insights' },
]

const ALL_MOBILE_LINKS = [
  { label: 'What We Do', href: '#products' },
  ...NAV_LINKS,
  { label: 'Our Firm', href: '#company' },
  { label: 'Careers', href: '#careers' },
]

function TickerStrip({ tickers }: { tickers: TickerItem[] }) {
  const double = [...tickers, ...tickers]
  return (
    <div className="overflow-hidden" aria-label="Live market data" role="marquee">
      <div className="ticker-inner flex items-center gap-6">
        {double.map((t, i) => (
          <span key={i} className="flex items-center gap-1.5 text-[10px] font-mono whitespace-nowrap">
            <span className="text-[#B8AE99] tracking-wider">{t.symbol}</span>
            <span className="text-pale-gold font-medium">
              {['BTC','ETH','SOL','BNB'].includes(t.symbol)
                ? t.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                : t.price.toFixed(2)}
            </span>
            <span className={t.changePercent >= 0 ? 'text-gain' : 'text-loss'}>
              {t.changePercent >= 0 ? '+' : ''}{t.changePercent.toFixed(2)}%
            </span>
            <span className="text-muted-gold opacity-40 ml-1">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}


export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [careersOpen, setCareersOpen] = useState(false)
  const [firmOpen, setFirmOpen] = useState(false)
  const [whatWeDoOpen, setWhatWeDoOpen] = useState(false)
  const [tickers, setTickers] = useState<TickerItem[]>(INITIAL_TICKERS)
  const careersRef = useRef<HTMLDivElement>(null)
  const firmRef = useRef<HTMLDivElement>(null)
  const whatWeDoRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const firmCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const whatWeDoCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(prev => simulateTicker(prev))
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (careersRef.current && !careersRef.current.contains(e.target as Node)) {
        setCareersOpen(false)
      }
      if (firmRef.current && !firmRef.current.contains(e.target as Node)) {
        setFirmOpen(false)
      }
      if (whatWeDoRef.current && !whatWeDoRef.current.contains(e.target as Node)) {
        setWhatWeDoOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const openCareers = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setCareersOpen(true)
  }
  const scheduleCareersClose = () => {
    closeTimer.current = setTimeout(() => setCareersOpen(false), 120)
  }

  const openWhatWeDo = () => {
    if (whatWeDoCloseTimer.current) clearTimeout(whatWeDoCloseTimer.current)
    setWhatWeDoOpen(true)
  }
  const scheduleWhatWeDoClose = () => {
    whatWeDoCloseTimer.current = setTimeout(() => setWhatWeDoOpen(false), 120)
  }

  const openFirm = () => {
    if (firmCloseTimer.current) clearTimeout(firmCloseTimer.current)
    setFirmOpen(true)
  }
  const scheduleFirmClose = () => {
    firmCloseTimer.current = setTimeout(() => setFirmOpen(false), 120)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
          scrolled
            ? 'border-b border-[rgba(201,168,76,0.12)] bg-[rgba(8,8,10,0.92)] backdrop-blur-[20px]'
            : 'bg-[rgba(8,8,10,0.75)] backdrop-blur-[12px]'
        }`}
      >
        <div className="max-w-[1400px] mx-auto h-full px-6 flex items-center justify-between gap-4">

          {/* Logo */}
          <a
            href="/"
            className="flex items-center flex-shrink-0"
            aria-label="Aurum Global Inc. — Home"
          >
            <div
              className="flex flex-col justify-center leading-none"
              style={{ fontFamily: 'var(--font-cormorant)', letterSpacing: '0.06em' }}
            >
              <span style={{ fontSize: 17, fontWeight: 400, color: '#C9A84C', lineHeight: 1.15 }}>Aurum</span>
              <span style={{ fontSize: 17, fontWeight: 400, color: '#C9A84C', lineHeight: 1.15 }}>Global</span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">

            {/* What We Do with dropdown */}
            <div
              ref={whatWeDoRef}
              className="relative"
              onMouseEnter={openWhatWeDo}
              onMouseLeave={scheduleWhatWeDoClose}
            >
              <button
                onClick={() => setWhatWeDoOpen(o => !o)}
                aria-expanded={whatWeDoOpen}
                aria-haspopup="true"
                className="flex items-center gap-1 font-dm text-[11px] tracking-[0.12em] uppercase text-[#B8AE99] hover:text-aurum-gold transition-colors duration-200"
              >
                What We Do
                <motion.span
                  animate={{ rotate: whatWeDoOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex"
                >
                  <ChevronDown size={12} strokeWidth={1.5} />
                </motion.span>
              </button>
            </div>

            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="font-dm text-[11px] tracking-[0.12em] uppercase text-[#B8AE99] hover:text-aurum-gold transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}

            {/* Our Firm with dropdown */}
            <div
              ref={firmRef}
              className="relative"
              onMouseEnter={openFirm}
              onMouseLeave={scheduleFirmClose}
            >
              <button
                onClick={() => setFirmOpen(o => !o)}
                aria-expanded={firmOpen}
                aria-haspopup="true"
                className="flex items-center gap-1 font-dm text-[11px] tracking-[0.12em] uppercase text-[#B8AE99] hover:text-aurum-gold transition-colors duration-200"
              >
                Our Firm
                <motion.span
                  animate={{ rotate: firmOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex"
                >
                  <ChevronDown size={12} strokeWidth={1.5} />
                </motion.span>
              </button>
            </div>

            {/* Careers with dropdown */}
            <div
              ref={careersRef}
              className="relative"
              onMouseEnter={openCareers}
              onMouseLeave={scheduleCareersClose}
            >
              <button
                onClick={() => setCareersOpen(o => !o)}
                aria-expanded={careersOpen}
                aria-haspopup="true"
                className="flex items-center gap-1 font-dm text-[11px] tracking-[0.12em] uppercase text-[#B8AE99] hover:text-aurum-gold transition-colors duration-200"
              >
                Careers
                <motion.span
                  animate={{ rotate: careersOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex"
                >
                  <ChevronDown size={12} strokeWidth={1.5} />
                </motion.span>
              </button>
            </div>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="hidden xl:block w-[320px] overflow-hidden">
              <TickerStrip tickers={tickers} />
            </div>
            <a
              href="/sign-in"
              className="hidden sm:flex items-center px-5 h-9 rounded-full bg-aurum-gold text-[11px] font-dm uppercase tracking-[0.1em] font-medium text-[#0A0800] hover:bg-pale-gold transition-colors duration-200 whitespace-nowrap"
            >
              Sign In
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <span className="block w-6 h-[1.5px] bg-aurum-gold" />
              <span className="block w-4 h-[1.5px] bg-aurum-gold" />
              <span className="block w-6 h-[1.5px] bg-aurum-gold" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-width What We Do mega menu */}
      <AnimatePresence>
        {whatWeDoOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-16 left-0 right-0 z-40"
            style={{
              background: 'rgba(8,8,10,0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(201,168,76,0.12)',
            }}
            role="menu"
            aria-label="What We Do menu"
            onMouseEnter={openWhatWeDo}
            onMouseLeave={scheduleWhatWeDoClose}
          >
            <div className="max-w-[1400px] mx-auto px-6 py-10">
              <div className="grid grid-cols-[1fr_2.4fr] gap-16">

                {/* Left — editorial */}
                <div>
                  <h3 className="font-playfair text-[38px] font-normal text-pale-gold mb-3 leading-tight">
                    What We Do
                  </h3>
                  <p className="font-dm text-[14px] text-[#B8AE99] leading-relaxed mb-7">
                    Learn more about how we cultivate and harness world-class intellectual capital and expertise to solve our clients&apos; most complex challenges.
                  </p>
                  <a
                    href="#products"
                    role="menuitem"
                    className="inline-flex items-center px-5 h-10 border border-aurum-gold font-dm text-[12px] uppercase tracking-[0.1em] text-aurum-gold hover:bg-aurum-gold hover:text-[#0A0800] transition-all duration-200"
                  >
                    Explore Our Businesses
                  </a>
                </div>

                {/* Right — 4 columns */}
                <div className="grid grid-cols-4 gap-8 pt-1">
                  {WHAT_WE_DO.map(col => (
                    <div key={col.group}>
                      <p className="font-dm text-[9px] uppercase tracking-[0.22em] text-[#5A5040] mb-4 leading-tight">{col.group}</p>
                      {col.links.map(link => (
                        <a
                          key={link.label}
                          href={link.href}
                          role="menuitem"
                          className="block font-dm text-[14px] text-[#C8BEA8] hover:text-pale-gold py-2.5 border-b border-[rgba(201,168,76,0.07)] transition-colors duration-150 last:border-0"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>

              </div>

              {/* Bottom bar */}
              <div className="mt-8 pt-6 border-t border-[rgba(201,168,76,0.08)]">
                <p className="font-dm text-[12px] text-[#6A5E50]">
                  <span className="text-[#C8BEA8] font-medium">Serving Clients</span> — We harness every resource, insight, relationship, and competitive advantage to drive superior results for our clients.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-width Our Firm mega menu */}
      <AnimatePresence>
        {firmOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-16 left-0 right-0 z-40"
            style={{
              background: 'rgba(8,8,10,0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(201,168,76,0.12)',
            }}
            role="menu"
            aria-label="Our Firm menu"
            onMouseEnter={openFirm}
            onMouseLeave={scheduleFirmClose}
          >
            <div className="max-w-[1400px] mx-auto px-6 py-10">
              <div className="grid grid-cols-2 gap-20">

                {/* Left — editorial */}
                <div>
                  <h3 className="font-playfair text-[38px] font-normal text-pale-gold mb-3 leading-tight">
                    Our Firm
                  </h3>
                  <p className="font-dm text-[15px] text-[#B8AE99] leading-relaxed mb-7">
                    We aspire to be the world&apos;s most exceptional financial institution.
                  </p>
                  <a
                    href="#company"
                    role="menuitem"
                    className="inline-flex items-center px-5 h-10 border border-aurum-gold font-dm text-[12px] uppercase tracking-[0.1em] text-aurum-gold hover:bg-aurum-gold hover:text-[#0A0800] transition-all duration-200"
                  >
                    About Us
                  </a>
                </div>

                {/* Right — links */}
                <div className="pt-1">
                  <p className="font-dm text-[10px] uppercase tracking-[0.22em] text-[#5A5040] mb-4">
                    About AG
                  </p>
                  <div>
                    {OUR_FIRM_LINKS.map(link => (
                      <a
                        key={link.label}
                        href={link.href}
                        role="menuitem"
                        className="block font-dm text-[15px] text-[#C8BEA8] hover:text-pale-gold py-3 border-b border-[rgba(201,168,76,0.07)] transition-colors duration-150 last:border-0"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-width Careers mega menu */}
      <AnimatePresence>
        {careersOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-16 left-0 right-0 z-40"
            style={{
              background: 'rgba(8,8,10,0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(201,168,76,0.12)',
            }}
            role="menu"
            aria-label="Careers menu"
            onMouseEnter={openCareers}
            onMouseLeave={scheduleCareersClose}
          >
            <div className="max-w-[1400px] mx-auto px-6 py-10">
              <div className="grid grid-cols-2 gap-20">

                {/* Left — editorial */}
                <div>
                  <h3 className="font-playfair text-[38px] font-normal text-pale-gold mb-3 leading-tight">
                    Careers
                  </h3>
                  <p className="font-dm text-[15px] text-[#B8AE99] leading-relaxed mb-7">
                    There are many chapters in a career.
                    There is only one Aurum Global.
                  </p>
                  <a
                    href="#careers"
                    role="menuitem"
                    className="inline-flex items-center px-5 h-10 border border-aurum-gold font-dm text-[12px] uppercase tracking-[0.1em] text-aurum-gold hover:bg-aurum-gold hover:text-[#0A0800] transition-all duration-200"
                  >
                    Discover Careers
                  </a>
                </div>

                {/* Right — links */}
                <div className="pt-1">
                  <p className="font-dm text-[10px] uppercase tracking-[0.22em] text-[#5A5040] mb-4">
                    Working at AG
                  </p>
                  <div>
                    {CAREERS_LINKS.map(link => (
                      <a
                        key={link.label}
                        href={link.href}
                        role="menuitem"
                        className="block font-dm text-[15px] text-[#C8BEA8] hover:text-pale-gold py-3 border-b border-[rgba(201,168,76,0.07)] transition-colors duration-150 last:border-0"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-[rgba(8,8,10,0.97)] backdrop-blur-xl"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-6 p-2 text-pale-gold"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>

            <div className="absolute top-5 left-6 flex items-center">
              <div className="flex flex-col leading-none" style={{ fontFamily: 'var(--font-cormorant)', letterSpacing: '0.04em' }}>
                <span style={{ fontSize: 22, fontWeight: 500, color: '#C9A84C', lineHeight: 1.1 }}>Aurum</span>
                <span style={{ fontSize: 22, fontWeight: 500, color: '#C9A84C', lineHeight: 1.1 }}>Global</span>
              </div>
            </div>

            <nav className="flex flex-col justify-center h-full px-8 gap-0" aria-label="Mobile navigation">
              {ALL_MOBILE_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="font-playfair text-4xl text-pale-gold hover:text-aurum-gold transition-colors py-3 border-b border-[rgba(201,168,76,0.08)]"
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Mobile Our Firm sub-links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: ALL_MOBILE_LINKS.length * 0.07 + 0.05 }}
                className="flex flex-wrap gap-x-5 gap-y-1 mt-2 pl-1"
              >
                {OUR_FIRM_LINKS.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-dm text-[12px] text-muted-gold hover:text-aurum-gold transition-colors uppercase tracking-wider"
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div>

              {/* Mobile careers sub-links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: ALL_MOBILE_LINKS.length * 0.07 + 0.1 }}
                className="flex flex-wrap gap-x-5 gap-y-1 mt-4 pl-1"
              >
                {CAREERS_LINKS.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-dm text-[12px] text-muted-gold hover:text-aurum-gold transition-colors uppercase tracking-wider"
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div>

              <motion.a
                href="/sign-in"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: ALL_MOBILE_LINKS.length * 0.07 + 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 inline-flex self-start items-center px-6 h-12 rounded-full bg-aurum-gold text-[12px] font-dm uppercase tracking-[0.1em] font-medium text-[#0A0800]"
              >
                Sign In
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
