'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Twitter, MessageCircle, Mail } from 'lucide-react'
import { INITIAL_TICKERS, simulateTicker, type TickerItem } from '@/lib/marketData'

const FOOTER_LINKS = {
  Products: [
    'Private Wealth Management',
    'Institutional Banking',
    'Loans & Credit',
    'Asset Management',
    'AG Terminal',
    'AGQuant Algorithms',
    'Bot Trading',
    'M&A Advisory',
    'AG Insights',
    'Crypto Management',
  ],
  Solutions: [
    'Private Wealth',
    'Institutional Clients',
    'Algorithmic Trading',
    'Corporate Banking',
    'Family Offices',
    'Hedge Funds',
  ],
  Company: [
    'About Aurum Global',
    'Leadership Team',
    'Careers',
    'Press & Media',
    'Contact Us',
    'Disclosures',
  ],
}

const SOCIAL = [
  { Icon: Linkedin, label: 'LinkedIn', href: '#' },
  { Icon: Twitter, label: 'Twitter / X', href: '#' },
  { Icon: MessageCircle, label: 'Discord', href: '#' },
  { Icon: Mail, label: 'Newsletter', href: '#' },
]

function FooterTicker({ tickers }: { tickers: TickerItem[] }) {
  const double = [...tickers, ...tickers]
  return (
    <div className="overflow-hidden border-b border-[rgba(201,168,76,0.08)]" aria-label="Live market data">
      <div className="py-3 ticker-inner flex items-center gap-6">
        {double.map((t, i) => (
          <span key={i} className="flex items-center gap-1.5 text-[10px] font-mono whitespace-nowrap">
            <span className="text-muted-gold tracking-wider">{t.symbol}</span>
            <span className="text-pale-gold">
              {t.price > 1000
                ? t.price.toLocaleString('en-US', { maximumFractionDigits: 0 })
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

export default function Footer() {
  const [tickers, setTickers] = useState<TickerItem[]>(INITIAL_TICKERS)

  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(prev => simulateTicker(prev))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer
      className="bg-[#050506]"
      style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}
      aria-label="Site footer"
    >
      <FooterTicker tickers={tickers} />

      {/* Main footer grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 flex items-center justify-center border border-[rgba(201,168,76,0.5)] rounded-sm">
                <span className="font-playfair text-lg font-bold text-aurum-gold">AG</span>
              </div>
              <div>
                <div className="font-dm text-[10px] text-pale-gold tracking-[0.25em] uppercase">AURUM GLOBAL</div>
                <div className="font-dm text-[8px] text-muted-gold tracking-[0.1em] uppercase">INC.</div>
              </div>
            </div>
            <p className="font-dm text-[12px] text-muted-gold leading-relaxed mb-5 max-w-[220px]">
              Institutional Intelligence. Uncompromising Precision. Serving HNWIs, family offices,
              and institutions worldwide.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {SOCIAL.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-[rgba(201,168,76,0.15)] flex items-center justify-center text-muted-gold hover:border-aurum-gold hover:text-aurum-gold transition-colors duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-dm text-[10px] uppercase tracking-[0.2em] text-pale-gold mb-4">Products</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.Products.map(link => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-dm text-[12px] text-muted-gold hover:text-aurum-gold transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-dm text-[10px] uppercase tracking-[0.2em] text-pale-gold mb-4">Solutions</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.Solutions.map(link => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-dm text-[12px] text-muted-gold hover:text-aurum-gold transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-dm text-[10px] uppercase tracking-[0.2em] text-pale-gold mb-4">Company</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.Company.map(link => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-dm text-[12px] text-muted-gold hover:text-aurum-gold transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-dm text-[10px] uppercase tracking-[0.2em] text-pale-gold mb-4">Connect</h4>
            <p className="font-dm text-[12px] text-muted-gold mb-4 leading-relaxed">
              Get weekly market intelligence and product updates from AG Insights.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Newsletter email"
                className="flex-1 min-w-0 h-9 px-3 bg-carbon border border-[rgba(201,168,76,0.12)] rounded-lg font-dm text-[12px] text-pale-gold placeholder:text-muted-gold focus:outline-none focus:border-aurum-gold transition-colors"
              />
              <button
                className="h-9 px-4 rounded-lg bg-aurum-gold text-[11px] font-dm font-medium text-[#0A0800] hover:bg-pale-gold transition-colors whitespace-nowrap"
                aria-label="Subscribe to newsletter"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Regulatory text */}
      <div className="max-w-[1400px] mx-auto px-6 pb-6">
        <p className="font-mono text-[9px] text-muted-gold leading-[1.7] max-w-[800px] mx-auto text-center mb-6">
          Aurum Global Inc. is a registered investment advisor. Past performance is not indicative of
          future results. All investments involve risk, including the possible loss of principal. This
          website is for informational purposes only and does not constitute investment advice.
          Securities offered through regulated channels only.
        </p>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(201,168,76,0.06)] py-5">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-dm text-[11px] text-muted-gold">
            © 2025 Aurum Global Inc. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            {['Privacy Policy', 'Terms of Service', 'Disclosures'].map(link => (
              <a
                key={link}
                href="#"
                className="font-dm text-[11px] text-muted-gold hover:text-aurum-gold transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
