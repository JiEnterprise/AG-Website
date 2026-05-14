'use client'

import { motion } from 'framer-motion'
import { Building2, UserRound, Compass, Newspaper, ArrowRight } from 'lucide-react'

const AUDIENCES = [
  {
    Icon: Building2,
    eyebrow: 'Allocators & Institutions',
    title: 'Deploy with institutional-grade infrastructure.',
    body: 'Institutional-grade infrastructure, quantitative strategies, and multi-asset execution — purpose-built for family offices, sovereign funds, and allocators from day one.',
    cta: 'Explore Strategies',
    href: '#products',
  },
  {
    Icon: UserRound,
    eyebrow: 'Private Wealth',
    title: 'Grow and protect generational wealth.',
    body: 'A dedicated portfolio manager. Bespoke asset allocation. Concierge-level service with a $100,000 minimum — for clients who expect more.',
    cta: 'Schedule Consultation',
    href: '#contact',
  },
  {
    Icon: Compass,
    eyebrow: 'Curious & Exploring',
    title: 'See how institutional finance actually works.',
    body: 'From algorithmic trading to crypto management — explore the full breadth of Aurum Global across 12 asset classes, all in one platform.',
    cta: 'Start Exploring',
    href: '#products',
  },
  {
    Icon: Newspaper,
    eyebrow: 'Press & Media',
    title: 'Access our story, leadership, and press resources.',
    body: 'Leadership bios, company milestones, press releases, and brand assets — everything the media needs, in one place.',
    cta: 'Meet Our People',
    href: '/our-people',
  },
]

export default function AudienceSection() {
  return (
    <section
      id="who-we-serve"
      className="py-[140px] bg-obsidian"
      aria-label="Find Your Path — Who We Serve"
    >
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Section header — left-aligned, Apple editorial style */}
        <div className="mb-20 grid lg:grid-cols-2 gap-10 items-end">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-dm text-[10px] uppercase tracking-[0.28em] text-aurum-gold"
            >
              Find Your Path
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-playfair text-pale-gold leading-[1.05]"
              style={{ fontSize: 'clamp(34px, 4.5vw, 58px)' }}
            >
              Everyone here
              <br />
              for a{' '}
              <em className="not-italic text-aurum-gold">different reason.</em>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="font-dm text-[15px] text-[#B8AE99] leading-[1.75] max-w-[440px] lg:pb-2"
          >
            Whether you&apos;re deploying capital, protecting wealth,
            building knowledge, or covering the firm — Aurum Global
            was designed with your goals in mind.
          </motion.p>
        </div>

        {/* Audience cards — 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AUDIENCES.map((audience, i) => (
            <motion.a
              key={audience.eyebrow}
              href={audience.href}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.65,
                delay: i * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex flex-col p-8 rounded-2xl bg-carbon border border-[rgba(201,168,76,0.08)] hover:border-[rgba(201,168,76,0.28)] hover:-translate-y-1.5 hover:shadow-[0_28px_72px_rgba(201,168,76,0.06)] transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer"
              aria-label={audience.eyebrow}
            >
              {/* Top accent shimmer */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.2)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon container */}
              <div className="w-11 h-11 flex items-center justify-center rounded-xl border border-[rgba(201,168,76,0.15)] group-hover:border-[rgba(201,168,76,0.35)] mb-7 transition-colors duration-300">
                <audience.Icon
                  size={19}
                  className="text-aurum-gold"
                  strokeWidth={1.5}
                />
              </div>

              {/* Eyebrow */}
              <span className="font-dm text-[9px] uppercase tracking-[0.22em] text-muted-gold">
                {audience.eyebrow}
              </span>

              {/* Title */}
              <h3 className="mt-3 font-playfair text-[19px] text-pale-gold leading-snug flex-1">
                {audience.title}
              </h3>

              {/* Body */}
              <p className="mt-4 font-dm text-[13px] text-[#8A7E6E] leading-[1.72]">
                {audience.body}
              </p>

              {/* CTA */}
              <div className="mt-7 flex items-center gap-1.5 text-[12px] font-dm font-medium text-aurum-gold group-hover:text-pale-gold transition-colors duration-200">
                {audience.cta}
                <ArrowRight
                  size={12}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom tagline — Apple-style closing statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 pt-10 border-t border-[rgba(201,168,76,0.07)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        >
          <p className="font-dm text-[13px] text-[#5A5040] max-w-[460px] leading-relaxed">
            Aurum Global Inc. operates across private banking, asset management,
            quantitative strategies, and financial technology — one firm,
            one unified platform, every asset class.
          </p>
          <a
            href="#products"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 h-11 rounded-full border border-[rgba(201,168,76,0.25)] font-dm text-[11px] uppercase tracking-[0.1em] text-aurum-gold hover:bg-aurum-gold hover:text-[#0A0800] transition-all duration-250"
          >
            View All Products
            <ArrowRight size={11} />
          </a>
        </motion.div>

      </div>
    </section>
  )
}
