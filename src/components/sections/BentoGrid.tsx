'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Shield, Building2, Link2, PieChart, Monitor, Zap,
  Bot, GitMerge, Brain, Hexagon, ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Card {
  title: string
  category: string
  description: string
  Icon: React.ElementType
  featured?: boolean
  href?: string
}

const CARDS: Card[] = [
  {
    title: 'Private Wealth Management',
    category: 'Wealth',
    description:
      'Bespoke portfolio management for high-net-worth individuals and family offices. Dedicated relationship management with institutional-grade infrastructure.',
    Icon: Shield,
    featured: true,
    href: '#wealth',
  },
  {
    title: 'Institutional Banking',
    category: 'Banking',
    description:
      'Corporate banking solutions with institutional-grade service infrastructure and dedicated relationship managers.',
    Icon: Building2,
    href: '#banking',
  },
  {
    title: 'Loans & Credit',
    category: 'Credit',
    description:
      'Structured lending, certificates of deposit, and tailored credit facilities for businesses and individuals.',
    Icon: Link2,
    href: '#credit',
  },
  {
    title: 'Asset Management',
    category: 'Investments',
    description:
      'Diversified portfolio strategies across equities, fixed income, real assets, and alternative investments.',
    Icon: PieChart,
    href: '#assets',
  },
  {
    title: 'AG Terminal',
    category: 'Technology',
    description:
      'The Bloomberg alternative. Real-time data, AI analysis, options flow, and portfolio intelligence in one interface.',
    Icon: Monitor,
    featured: true,
    href: '#terminal',
  },
  {
    title: 'AGQuant Algorithms',
    category: 'Quant',
    description:
      'Institutional algorithmic trading: mean reversion, momentum, statistical arbitrage, and custom systematic strategies.',
    Icon: Zap,
    href: '#quant',
  },
  {
    title: 'Bot Trading',
    category: 'Automation',
    description:
      'Automated execution engines for systematic trading strategies, running 24/7 across multiple asset classes.',
    Icon: Bot,
    href: '#bots',
  },
  {
    title: 'Mergers & Acquisitions',
    category: 'Advisory',
    description:
      'Strategic M&A advisory and transaction execution for corporate clients across all sectors.',
    Icon: GitMerge,
    href: '#ma',
  },
  {
    title: 'AG Insights',
    category: 'Research',
    description:
      'Proprietary market intelligence, deep research, and AI-powered analytics for sophisticated investors.',
    Icon: Brain,
    href: '#insights',
  },
  {
    title: 'Crypto Management',
    category: 'Digital Assets',
    description:
      'Institutional-grade digital asset management and structured crypto exposure with cold custody and DeFi integration.',
    Icon: Hexagon,
    href: '#crypto',
  },
]

function BentoCard({ card, index }: { card: Card; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        'group relative flex flex-col rounded-xl p-7',
        'bg-carbon border border-[rgba(201,168,76,0.08)]',
        'transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'hover:border-[rgba(201,168,76,0.35)] hover:-translate-y-1',
        'hover:shadow-[0_20px_60px_rgba(201,168,76,0.07)]',
        card.featured && 'md:col-span-2',
      )}
    >
      {/* Icon */}
      <div className="w-9 h-9 flex items-center justify-center rounded-lg border border-[rgba(201,168,76,0.2)] mb-5">
        <card.Icon size={18} className="text-aurum-gold" strokeWidth={1.5} />
      </div>

      {/* Category */}
      <span className="font-dm text-[9px] uppercase tracking-[0.2em] text-muted-gold">
        {card.category}
      </span>

      {/* Title */}
      <h3 className="mt-2 font-dm text-[17px] font-medium text-pale-gold leading-snug">
        {card.title}
      </h3>

      {/* Description */}
      <p className="mt-2 font-dm text-[13px] text-muted-gold leading-relaxed flex-1">
        {card.description}
      </p>

      {/* Link */}
      <a
        href={card.href || '#'}
        className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-dm text-aurum-gold hover:text-pale-gold transition-colors duration-200"
        aria-label={`Learn more about ${card.title}`}
      >
        Learn more
        <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-1" />
      </a>

      {/* Featured accent line */}
      {card.featured && (
        <div className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.4)] to-transparent" />
      )}
    </motion.article>
  )
}

export default function BentoGrid() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <section
      id="products"
      className="py-[120px] bg-[#0D0D10]"
      ref={ref}
      aria-label="Business Lines"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-dm text-[10px] uppercase tracking-[0.25em] text-aurum-gold"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-playfair text-pale-gold leading-tight"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            One Platform.{' '}
            <span className="text-aurum-gold">Every Asset Class.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-dm text-[15px] text-[#B8AE99] max-w-[600px] mx-auto leading-relaxed"
          >
            From private wealth to algorithmic trading — Aurum Global operates
            across the full spectrum of institutional financial services.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {CARDS.map((card, i) => (
            <BentoCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
