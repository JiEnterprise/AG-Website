'use client'

import { useEffect, useRef, useState } from 'react'
import { easeOutQuart } from '@/lib/utils'

interface CountUpProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export default function CountUp({
  end,
  duration = 1800,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}: CountUpProps) {
  // Render final value in initial HTML for SSR/SEO/accessibility, then
  // animate only when the element scrolls into view.
  const [value, setValue] = useState(end)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const frameRef = useRef<number>(0)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]

        // If already visible on first observation, keep final value to avoid
        // a jarring jump from final -> 0 on initial page load.
        if (!initializedRef.current) {
          initializedRef.current = true
          if (entry.isIntersecting) return
        }

        if (entry.isIntersecting && !started) {
          setValue(0)
          setStarted(true)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return

    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutQuart(progress)
      setValue(eased * end)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [started, end, duration])

  const formatted = decimals > 0
    ? value.toFixed(decimals)
    : Math.floor(value).toLocaleString('en-US')

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  )
}
