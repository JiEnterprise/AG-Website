'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return

    // Dot tracks 1:1; ring lerps behind for a spring depth feel
    let tx = -100, ty = -100   // target (mouse)
    let rx = -100, ry = -100   // ring position (lerped)
    let hovered = false
    let clicked = false
    let rafId: number
    let clickTimer: ReturnType<typeof setTimeout>

    const LERP = 0.13

    const move = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY

      // Dot: 1:1 — zero latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`
      }

      // Hover detection
      const target = e.target as HTMLElement
      const isInteractive = !!(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]')
      )

      if (isInteractive !== hovered) {
        hovered = isInteractive
        applyRingState()
      }
    }

    // RAF loop lerps ring toward mouse — creates the "trailing" luxury feel
    const loop = () => {
      rx += (tx - rx) * LERP
      ry += (ty - ry) * LERP
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      }
      rafId = requestAnimationFrame(loop)
    }

    const applyRingState = () => {
      if (!ringRef.current || !dotRef.current) return
      if (clicked) {
        ringRef.current.style.width = '14px'
        ringRef.current.style.height = '14px'
        ringRef.current.style.opacity = '0.4'
        dotRef.current.style.width = '3px'
        dotRef.current.style.height = '3px'
      } else if (hovered) {
        ringRef.current.style.width = '52px'
        ringRef.current.style.height = '52px'
        ringRef.current.style.opacity = '0.5'
        dotRef.current.style.width = '5px'
        dotRef.current.style.height = '5px'
      } else {
        ringRef.current.style.width = '26px'
        ringRef.current.style.height = '26px'
        ringRef.current.style.opacity = '1'
        dotRef.current.style.width = '4px'
        dotRef.current.style.height = '4px'
      }
    }

    const onClick = () => {
      clicked = true
      applyRingState()
      clearTimeout(clickTimer)
      clickTimer = setTimeout(() => {
        clicked = false
        applyRingState()
      }, 160)
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('click', onClick)
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('click', onClick)
      cancelAnimationFrame(rafId)
      clearTimeout(clickTimer)
    }
  }, [])

  return (
    <>
      {/* Ring — position via direct DOM, size via CSS transition */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="hidden md:block"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 26,
          height: 26,
          borderRadius: '50%',
          border: '1.5px solid #C9A84C',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-200px, -200px)',
          transition: 'width 0.18s cubic-bezier(0.22,1,0.36,1), height 0.18s cubic-bezier(0.22,1,0.36,1), opacity 0.18s ease',
          willChange: 'transform',
        }}
      />

      {/* Dot — 1:1, same transform, size transition only */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="hidden md:block"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: '#C9A84C',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-200px, -200px)',
          transition: 'width 0.18s cubic-bezier(0.22,1,0.36,1), height 0.18s cubic-bezier(0.22,1,0.36,1)',
          willChange: 'transform',
        }}
      />
    </>
  )
}
