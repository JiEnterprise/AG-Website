'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Loader2, Diamond } from 'lucide-react'

const PRODUCTS = [
  'Private Wealth Management',
  'Institutional Banking',
  'Loans & Credit',
  'Asset Management',
  'AG Terminal',
  'AGQuant Algorithms',
  'Bot Trading',
  'Mergers & Acquisitions',
  'AG Insights',
  'Crypto Management',
]

const AUM_RANGES = [
  '$100K – $500K',
  '$500K – $2M',
  '$2M – $10M',
  '$10M+',
]

const WHY_BULLETS = [
  'Institutional-grade infrastructure and execution',
  'Transparent fee structures — 1% management fee',
  'Dedicated relationship management',
  'Regulated and fully compliant operations',
]

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    aum: '',
    products: [] as string[],
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const toggleProduct = (product: string) => {
    setFormState(prev => ({
      ...prev,
      products: prev.products.includes(product)
        ? prev.products.filter(p => p !== product)
        : [...prev.products, product],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1800)
  }

  const inputClass =
    'w-full h-11 px-4 bg-[#0A0A0C] border border-[rgba(201,168,76,0.12)] rounded-lg font-dm text-[13px] text-pale-gold placeholder:text-muted-gold focus:outline-none focus:border-aurum-gold transition-colors duration-200'

  const labelClass = 'block font-dm text-[11px] uppercase tracking-[0.12em] text-muted-gold mb-1.5'

  return (
    <section
      id="contact"
      className="py-[140px] bg-[#0A0A0C] relative overflow-hidden"
      aria-label="Contact Aurum Global"
    >
      {/* Background particle field hint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-playfair text-pale-gold leading-tight"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            Ready to Elevate
            <br />
            <span className="text-aurum-gold">Your Portfolio?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-dm text-[16px] text-[#B8AE99] max-w-[560px] mx-auto leading-relaxed"
          >
            Join Aurum Global and access institutional-grade financial services,
            technology, and intelligence.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="rounded-xl p-8 md:p-12"
              style={{
                background: '#111114',
                border: '1px solid rgba(201,168,76,0.15)',
              }}
            >
              {status === 'success' ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-[rgba(45,140,94,0.15)] border border-gain flex items-center justify-center mb-5">
                    <Check size={28} className="text-gain" />
                  </div>
                  <h3 className="font-playfair text-[26px] text-pale-gold">Request Submitted</h3>
                  <p className="mt-3 font-dm text-[14px] text-[#B8AE99] max-w-[320px] leading-relaxed">
                    A member of our team will contact you within one business day.
                    We look forward to discussing your goals.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className={labelClass}>Full Name *</label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="John Smith"
                        value={formState.name}
                        onChange={e => setFormState(p => ({ ...p, name: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className={labelClass}>Company / Organization</label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Acme Capital"
                        value={formState.company}
                        onChange={e => setFormState(p => ({ ...p, company: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className={labelClass}>Email Address *</label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={e => setFormState(p => ({ ...p, email: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>Phone (optional)</label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formState.phone}
                        onChange={e => setFormState(p => ({ ...p, phone: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* AUM Range */}
                  <div>
                    <label htmlFor="aum" className={labelClass}>AUM Range</label>
                    <select
                      id="aum"
                      value={formState.aum}
                      onChange={e => setFormState(p => ({ ...p, aum: e.target.value }))}
                      className={`${inputClass} cursor-pointer`}
                      style={{ appearance: 'none' }}
                    >
                      <option value="">Select range...</option>
                      {AUM_RANGES.map(r => (
                        <option key={r} value={r} className="bg-carbon text-pale-gold">{r}</option>
                      ))}
                    </select>
                  </div>

                  {/* Products of interest */}
                  <div>
                    <span className={labelClass}>Products of Interest</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {PRODUCTS.map(p => {
                        const selected = formState.products.includes(p)
                        return (
                          <button
                            key={p}
                            type="button"
                            onClick={() => toggleProduct(p)}
                            className={`px-3 py-1.5 rounded-full text-[11px] font-dm border transition-all duration-200 ${
                              selected
                                ? 'bg-aurum-gold border-aurum-gold text-[#0A0800] font-medium'
                                : 'border-[rgba(201,168,76,0.2)] text-muted-gold hover:border-aurum-gold hover:text-pale-gold'
                            }`}
                            aria-pressed={selected}
                          >
                            {p}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className={labelClass}>Message / Investment Goals</label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Tell us about your investment objectives..."
                      value={formState.message}
                      onChange={e => setFormState(p => ({ ...p, message: e.target.value }))}
                      className={`${inputClass} h-auto py-3 resize-none`}
                    />
                  </div>

                  {/* Disclaimer */}
                  <p className="font-mono text-[10px] text-muted-gold leading-relaxed">
                    For accredited investors and qualified institutional buyers.
                    Minimum investment requirements apply.
                  </p>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full h-12 rounded-full bg-aurum-gold text-[13px] font-dm font-medium uppercase tracking-[0.1em] text-[#0A0800] hover:bg-pale-gold hover:shadow-[0_0_32px_rgba(201,168,76,0.3)] transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Request'
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Why Aurum Global */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:pt-8"
          >
            <h3 className="font-playfair text-[28px] text-pale-gold mb-8">
              Why Aurum Global?
            </h3>
            <ul className="space-y-6" aria-label="Aurum Global advantages">
              {WHY_BULLETS.map((bullet, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-4"
                >
                  <Diamond
                    size={10}
                    className="text-aurum-gold flex-shrink-0 mt-1.5"
                    fill="#C9A84C"
                  />
                  <span className="font-dm text-[15px] text-[#B8AE99] leading-relaxed">
                    {bullet}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-[rgba(201,168,76,0.1)]">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Regulated', sub: 'Registered Investment Advisor' },
                  { label: 'Secure', sub: 'Bank-grade encryption' },
                  { label: 'Transparent', sub: 'No hidden fees' },
                  { label: 'Institutional', sub: 'Tier-1 infrastructure' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-aurum-gold mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-dm text-[13px] font-medium text-pale-gold">{item.label}</div>
                      <div className="font-dm text-[12px] text-muted-gold mt-0.5">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
