'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface RiskBarProps {
  label: string
  fill: number
  variant: 'gain' | 'warn' | 'loss'
  statusText: string
}

export default function RiskBar({ label, fill, variant, statusText }: RiskBarProps) {
  const reduceMotion = useReducedMotion()
  const color = {
    gain: 'var(--gain)',
    warn: 'var(--warn)',
    loss: 'var(--loss)',
  }[variant]

  return (
    <div className="rb">
      <div className="rb-lbl">
        <span>{label}</span>
        <span style={{ color }}>
          {statusText}
        </span>
      </div>
      <div className="rb-track">
        <motion.div
          initial={reduceMotion ? false : { width: 0 }}
          animate={{ width: `${fill}%` }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.45, ease: 'easeOut' }}
          className="rb-fill"
          style={{ background: color }}
        />
      </div>
    </div>
  )
}
