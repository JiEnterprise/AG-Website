'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { accountSnapshots } from '@/lib/mock-data/clients'
import { formatCurrency } from '@/lib/formatters'

interface EquityChartProps {
  clientId: string
  width?: number
  height?: number
}

type DataPoint = {
  x: number
  y: number
  label: string
}

export default function EquityChart({ clientId, width = 720, height = 220 }: EquityChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  const data = useMemo<DataPoint[]>(() => {
    const snapshot = accountSnapshots.find((entry) => entry.clientId === clientId)
    if (!snapshot) return []
    return snapshot.monthlyReturns.map((month, idx) => ({
      x: idx,
      y: month.closingAum,
      label: month.month,
    }))
  }, [clientId])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || data.length === 0) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = width * 2
    canvas.height = height * 2
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.setTransform(2, 0, 0, 2, 0, 0)

    const padding = { top: 16, right: 18, bottom: 32, left: 20 }
    const chartW = width - padding.left - padding.right
    const chartH = height - padding.top - padding.bottom
    const minY = Math.min(...data.map((p) => p.y)) * 0.95
    const maxY = Math.max(...data.map((p) => p.y)) * 1.05

    const scaleX = (index: number) => padding.left + (index / Math.max(1, data.length - 1)) * chartW
    const scaleY = (value: number) => padding.top + chartH - ((value - minY) / (maxY - minY)) * chartH

    ctx.clearRect(0, 0, width, height)

    ctx.strokeStyle = 'rgba(255,255,255,0.05)'
    ctx.lineWidth = 1
    ctx.setLineDash([2, 4])
    for (let i = 0; i < 4; i += 1) {
      const y = padding.top + (i / 3) * chartH
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()
    }
    ctx.setLineDash([])

    const drawCurve = () => {
      ctx.beginPath()
      ctx.moveTo(scaleX(0), scaleY(data[0].y))
      for (let i = 1; i < data.length; i += 1) {
        const prevX = scaleX(i - 1)
        const prevY = scaleY(data[i - 1].y)
        const currX = scaleX(i)
        const currY = scaleY(data[i].y)
        const cx = (prevX + currX) / 2
        ctx.bezierCurveTo(cx, prevY, cx, currY, currX, currY)
      }
    }

    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH)
    gradient.addColorStop(0, 'rgba(29,158,117,0.22)')
    gradient.addColorStop(1, 'rgba(29,158,117,0.03)')

    drawCurve()
    ctx.lineTo(scaleX(data.length - 1), height - padding.bottom)
    ctx.lineTo(scaleX(0), height - padding.bottom)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    drawCurve()
    ctx.strokeStyle = '#1D9E75'
    ctx.lineWidth = 1.6
    ctx.stroke()

    const lastX = scaleX(data.length - 1)
    const lastY = scaleY(data[data.length - 1].y)
    ctx.beginPath()
    ctx.arc(lastX, lastY, 3, 0, Math.PI * 2)
    ctx.fillStyle = '#C9A84C'
    ctx.fill()

    if (hoverIndex !== null) {
      const clamped = Math.min(Math.max(hoverIndex, 0), data.length - 1)
      const px = scaleX(clamped)
      const py = scaleY(data[clamped].y)
      ctx.beginPath()
      ctx.moveTo(px, padding.top)
      ctx.lineTo(px, height - padding.bottom)
      ctx.strokeStyle = 'rgba(201,168,76,0.45)'
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(px, py, 3.5, 0, Math.PI * 2)
      ctx.fillStyle = '#C9A84C'
      ctx.fill()
    }

    ctx.fillStyle = '#5A5248'
    ctx.font = '9px JetBrains Mono'
    data.forEach((point, idx) => {
      if (idx === 0 || idx === data.length - 1) {
        ctx.fillText(point.label, scaleX(idx) - 14, height - 12)
      }
    })
  }, [clientId, data, width, height, hoverIndex])

  if (data.length === 0) {
    return <p className="font-dm text-[11px] text-[var(--t3)]">No equity data available.</p>
  }

  const tooltipPoint = hoverIndex !== null ? data[Math.min(Math.max(hoverIndex, 0), data.length - 1)] : null

  return (
    <div className="relative w-full">
      <canvas
        ref={canvasRef}
        className="w-full rounded-[var(--radius-md)] border border-[var(--bdr)] bg-[var(--bg-elevated)]"
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect()
          const x = event.clientX - rect.left
          const step = rect.width / Math.max(data.length - 1, 1)
          setHoverIndex(Math.round(x / step))
        }}
        onMouseLeave={() => setHoverIndex(null)}
      />
      {tooltipPoint && (
        <div className="pointer-events-none absolute right-3 top-3 rounded-[var(--radius-sm)] border border-[var(--gold-border)] bg-[var(--bg-card)] px-2 py-1 font-mono text-[9px] text-[var(--t2)]">
          {tooltipPoint.label} · {formatCurrency(tooltipPoint.y)}
        </div>
      )}
    </div>
  )
}
