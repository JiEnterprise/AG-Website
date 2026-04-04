'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function IntroAnimation() {
  const [show, setShow] = useState(true)
  const [phase, setPhase] = useState<'lines' | 'logo' | 'scatter'>('lines')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('logo'), 500)
    const t2 = setTimeout(() => setPhase('scatter'), 1300)
    const t3 = setTimeout(() => setShow(false), 1900)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col items-center gap-4">
            {/* Horizontal gold lines converging to form AG */}
            <motion.div
              className="flex flex-col gap-2 items-center"
              animate={phase === 'scatter' ? { opacity: 0, scale: 1.1 } : {}}
              transition={{ duration: 0.4 }}
            >
              {/* Top line */}
              <motion.div
                className="h-px bg-aurum-gold"
                initial={{ width: 0 }}
                animate={{ width: phase === 'lines' ? 0 : 64 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* AG Monogram */}
              <motion.div
                className="relative flex items-center justify-center w-16 h-16 border border-aurum-gold"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: phase === 'logo' || phase === 'scatter' ? 1 : 0,
                  scale: phase === 'logo' || phase === 'scatter' ? 1 : 0.8,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="font-playfair text-3xl font-bold text-aurum-gold leading-none">
                  AG
                </span>
              </motion.div>

              {/* Bottom line */}
              <motion.div
                className="h-px bg-aurum-gold"
                initial={{ width: 0 }}
                animate={{ width: phase === 'lines' ? 0 : 64 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              />
            </motion.div>

            {/* Company name */}
            <motion.span
              className="font-dm text-[10px] tracking-[0.4em] uppercase text-aurum-gold"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'logo' ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              AURUM GLOBAL
            </motion.span>
          </div>

          {/* Sweep bar exit */}
          <motion.div
            className="absolute inset-0 bg-obsidian"
            initial={{ scaleX: 0, originX: 0 }}
            animate={phase === 'scatter' ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
