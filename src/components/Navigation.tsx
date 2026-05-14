'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown } from 'lucide-react'
import { INITIAL_TICKERS, simulateTicker, type TickerItem } from '@/lib/marketData'

const CAREERS_LINKS = [
  { label: 'Students', href: '/careers/students' },
  { label: 'Life at AG', href: '/careers/life-at-ag' },
  { label: 'Benefits', href: '/careers/benefits' },
  { label: 'Featured Offices', href: '/careers/featured-offices' },
  { label: 'Open Roles', href: '/careers/open-roles' },
]

const OUR_FIRM_LINKS = [
  { label: 'Our People and Leadership', href: '/our-people' },
  { label: '157 Years of Excellence', href: '#firm-history' },
  { label: 'Community Impact', href: '#firm-community' },
  { label: 'Our Focus on Sustainability', href: '#firm-sustainability' },
  { label: 'Our Vendor Program', href: '#firm-vendor' },
  { label: 'Partnerships', href: '#firm-partnerships' },
  { label: 'Locations', href: '/careers/featured-offices' },
]

const WHAT_WE_DO = [
  {
    group: 'Private Banking',
    links: [
      { label: 'Private Wealth Management', href: '/private-wealth-management' },
      { label: 'Institutional Banking', href: '/institutional-banking' },
      { label: 'Loans & Credit', href: '/loans-credit' },
    ],
  },
  {
    group: 'Asset Management',
    links: [
      { label: 'Asset Management', href: '/asset-management' },
      { label: 'Crypto Management', href: '/crypto-management' },
      { label: 'Mergers & Acquisitions', href: '/mergers-acquisitions' },
    ],
  },
  {
    group: 'Products',
    links: [
      { label: 'Mutual Funds', href: '/mutual-funds' },
      { label: 'ETFs', href: '/etfs' },
      { label: 'Money Market Funds', href: '/money-market-funds' },
      { label: 'Stocks', href: '/stocks' },
      { label: 'CDs', href: '/cds' },
      { label: 'Bonds', href: '/bonds' },
      { label: 'AG Terminal', href: '/ag-terminal' },
      { label: 'AGQuant', href: '/agquant' },
      { label: 'Bot Trading', href: '/bot-trading' },
    ],
  },
  {
    group: 'Intelligence',
    links: [
      { label: 'AG Insights', href: '/ag-insights' },
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
            <span className="text-[#86868B] tracking-wider">{t.symbol}</span>
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
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-[background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? 'border-b border-[rgba(255,255,255,0.09)] bg-[rgba(0,0,0,0.84)] backdrop-blur-[20px]'
            : 'bg-[rgba(0,0,0,0.75)] backdrop-blur-[12px]'
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
                className="flex items-center gap-1 font-dm text-[11px] tracking-[0.12em] uppercase text-[#86868B] hover:text-aurum-gold transition-colors duration-200"
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
                className="font-dm text-[11px] tracking-[0.12em] uppercase text-[#86868B] hover:text-aurum-gold transition-colors duration-200"
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
                className="flex items-center gap-1 font-dm text-[11px] tracking-[0.12em] uppercase text-[#86868B] hover:text-aurum-gold transition-colors duration-200"
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
                className="flex items-center gap-1 font-dm text-[11px] tracking-[0.12em] uppercase text-[#86868B] hover:text-aurum-gold transition-colors duration-200"
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
            <motion.a
              href="/sign-in"
              whileHover={{ scale: 1.05, backgroundColor: '#E8D5A3' }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 450, damping: 22 }}
              className="hidden sm:flex items-center px-5 h-9 rounded-full bg-aurum-gold text-[11px] font-dm uppercase tracking-[0.1em] font-medium text-[#000000] whitespace-nowrap"
            >
              Sign In
            </motion.a>
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="fixed top-16 left-0 right-0 z-40"
            style={{
              background: 'rgba(0,0,0,0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.09)',
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
                  <p className="font-dm text-[14px] text-[#86868B] leading-relaxed mb-7">
                    Learn more about how we cultivate and harness world-class intellectual capital and expertise to solve our clients&apos; most complex challenges.
                  </p>
                  <a
                    href="#products"
                    role="menuitem"
                    className="inline-flex items-center px-5 h-10 border border-aurum-gold font-dm text-[12px] uppercase tracking-[0.1em] text-aurum-gold hover:bg-aurum-gold hover:text-[#000000] transition-all duration-200"
                  >
                    Explore Our Businesses
                  </a>
                </div>

                {/* Right — 4 columns */}
                <div className="grid grid-cols-4 gap-8 pt-1">
                  {WHAT_WE_DO.map(col => (
                    <div key={col.group}>
                      <p className="font-dm text-[9px] uppercase tracking-[0.22em] text-[#6E6E73] mb-4 leading-tight">{col.group}</p>
                      {col.links.map(link => (
                        <a
                          key={link.label}
                          href={link.href}
                          role="menuitem"
                          className="block font-dm text-[14px] text-[#F5F5F7] hover:text-pale-gold py-2.5 border-b border-[rgba(255,255,255,0.06)] transition-colors duration-150 last:border-0"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>

              </div>

              {/* Bottom bar */}
              <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.07)]">
                <p className="font-dm text-[12px] text-[#6E6E73]">
                  <span className="text-[#F5F5F7] font-medium">Serving Clients</span> — We harness every resource, insight, relationship, and competitive advantage to drive superior results for our clients.
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="fixed top-16 left-0 right-0 z-40"
            style={{
              background: 'rgba(0,0,0,0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.09)',
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
                  <p className="font-dm text-[15px] text-[#86868B] leading-relaxed mb-7">
                    We aspire to be the world&apos;s most exceptional financial institution.
                  </p>
                  <a
                    href="#company"
                    role="menuitem"
                    className="inline-flex items-center px-5 h-10 border border-aurum-gold font-dm text-[12px] uppercase tracking-[0.1em] text-aurum-gold hover:bg-aurum-gold hover:text-[#000000] transition-all duration-200"
                  >
                    About Us
                  </a>
                </div>

                {/* Right — links */}
                <div className="pt-1">
                  <p className="font-dm text-[10px] uppercase tracking-[0.22em] text-[#6E6E73] mb-4">
                    About AG
                  </p>
                  <div>
                    {OUR_FIRM_LINKS.map(link => (
                      <a
                        key={link.label}
                        href={link.href}
                        role="menuitem"
                        className="block font-dm text-[15px] text-[#F5F5F7] hover:text-pale-gold py-3 border-b border-[rgba(255,255,255,0.06)] transition-colors duration-150 last:border-0"
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="fixed top-16 left-0 right-0 z-40"
            style={{
              background: 'rgba(0,0,0,0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.09)',
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
                  <p className="font-dm text-[15px] text-[#86868B] leading-relaxed mb-7">
                    There are many chapters in a career.
                    There is only one Aurum Global.
                  </p>
                  <a
                    href="#careers"
                    role="menuitem"
                    className="inline-flex items-center px-5 h-10 border border-aurum-gold font-dm text-[12px] uppercase tracking-[0.1em] text-aurum-gold hover:bg-aurum-gold hover:text-[#000000] transition-all duration-200"
                  >
                    Discover Careers
                  </a>
                </div>

                {/* Right — links */}
                <div className="pt-1">
                  <p className="font-dm text-[10px] uppercase tracking-[0.22em] text-[#6E6E73] mb-4">
                    Working at AG
                  </p>
                  <div>
                    {CAREERS_LINKS.map(link => (
                      <a
                        key={link.label}
                        href={link.href}
                        role="menuitem"
                        className="block font-dm text-[15px] text-[#F5F5F7] hover:text-pale-gold py-3 border-b border-[rgba(255,255,255,0.06)] transition-colors duration-150 last:border-0"
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
            className="fixed inset-0 z-[60] bg-[rgba(0,0,0,0.88)] backdrop-blur-xl"
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
                  className="font-playfair text-4xl text-pale-gold hover:text-aurum-gold transition-colors py-3 border-b border-[rgba(255,255,255,0.07)]"
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
                className="mt-7 inline-flex self-start items-center px-6 h-12 rounded-full bg-aurum-gold text-[12px] font-dm uppercase tracking-[0.1em] font-medium text-[#000000]"
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
