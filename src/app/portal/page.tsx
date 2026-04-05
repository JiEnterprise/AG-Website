'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

type PageId = 'dashboard' | 'portfolio' | 'performance' | 'trades' | 'statements' | 'dividends' | 'intertrans' | 'insights' | 'messages' | 'fees' | 'profile'

// ── User registry ──────────────────────────────────────────
// Add new clients here to grant portal access.
// If a username is not in this map, the portal shows "Ask Your Advisor For Activation".
const PORTAL_USERS: Record<string, { name: string; firstName: string; initials: string; accountId: string; activated: boolean }> = {
  DL2503:  { name: 'David Low',   firstName: 'David',  initials: 'DL', accountId: 'DL2503',  activated: true },
  SaswatC: { name: 'Saswat C.',   firstName: 'Saswat', initials: 'SC', accountId: 'SaswatC', activated: true },
}

const TICKERS = [
  { sym: 'SPY',  price: 585.34, chg:  0.42 },
  { sym: 'BTC',  price: 83241,  chg: -1.18 },
  { sym: 'TSLY', price: 7.61,   chg:  0.92 },
  { sym: 'GOLD', price: 3042,   chg:  0.21 },
]

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function PortalPage() {
  const router = useRouter()
  const [page, setPage] = useState<PageId>('dashboard')
  const [tickers, setTickers] = useState(TICKERS)
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentUser, setCurrentUser] = useState<typeof PORTAL_USERS[string] | null | undefined>(undefined)

  useEffect(() => {
    const username = sessionStorage.getItem('ag_user') ?? ''
    const user = PORTAL_USERS[username] ?? null
    setCurrentUser(user)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setTickers(prev => prev.map(t => {
        const delta = (Math.random() - 0.49) * (t.sym === 'BTC' ? 80 : t.sym === 'GOLD' ? 2 : 0.04)
        return { ...t, price: Math.max(0.01, t.price + delta), chg: t.chg + (Math.random() - 0.5) * 0.05 }
      }))
    }, 3500)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const data = [650, 654, 663, 672, 695, 700, 710, 720, 740, 783, 800, 810, 824, 840, 855, 870, 882.75]
    const w = canvas.offsetWidth || 420
    const h = 148
    canvas.width = w * 2; canvas.height = h * 2
    ctx.scale(2, 2)
    const PAD = { l: 14, r: 14, t: 14, b: 28 }
    const chartW = w - PAD.l - PAD.r
    const chartH = h - PAD.t - PAD.b
    const min = 620, max = 910
    const toX = (i: number) => PAD.l + (i / (data.length - 1)) * chartW
    const toY = (v: number) => PAD.t + chartH - ((v - min) / (max - min)) * chartH

    ctx.clearRect(0, 0, w, h)

    // Grid lines
    const gridVals = [650, 700, 750, 800, 850, 882]
    ctx.setLineDash([2, 4])
    gridVals.forEach(val => {
      const y = toY(val)
      ctx.beginPath()
      ctx.moveTo(PAD.l, y); ctx.lineTo(w - PAD.r, y)
      ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 1; ctx.stroke()
      ctx.fillStyle = '#3A3328'; ctx.font = '8px monospace'
      ctx.fillText(`$${val}`, 0, y + 3)
    })
    ctx.setLineDash([])

    // Gradient fill
    const grad = ctx.createLinearGradient(0, PAD.t, 0, PAD.t + chartH)
    grad.addColorStop(0, 'rgba(29,158,117,0.22)')
    grad.addColorStop(0.6, 'rgba(29,158,117,0.06)')
    grad.addColorStop(1, 'rgba(29,158,117,0)')

    const drawPath = () => {
      ctx.beginPath()
      ctx.moveTo(toX(0), toY(data[0]))
      for (let i = 1; i < data.length; i++) {
        const cpx = (toX(i - 1) + toX(i)) / 2
        ctx.bezierCurveTo(cpx, toY(data[i - 1]), cpx, toY(data[i]), toX(i), toY(data[i]))
      }
    }

    drawPath()
    ctx.lineTo(toX(data.length - 1), h - PAD.b)
    ctx.lineTo(toX(0), h - PAD.b)
    ctx.closePath()
    ctx.fillStyle = grad; ctx.fill()

    // Line
    drawPath()
    const lineGrad = ctx.createLinearGradient(toX(0), 0, toX(data.length - 1), 0)
    lineGrad.addColorStop(0, 'rgba(29,158,117,0.5)')
    lineGrad.addColorStop(1, '#1D9E75')
    ctx.strokeStyle = lineGrad; ctx.lineWidth = 1.8; ctx.stroke()

    // X labels
    ctx.fillStyle = '#3A3328'; ctx.font = '8px monospace'
    ctx.fillText('Oct 15', PAD.l, h - 6)
    ctx.fillText('Nov 30', w - PAD.r - 28, h - 6)

    // End dot glow
    const lx = toX(data.length - 1), ly = toY(data[data.length - 1])
    const glow = ctx.createRadialGradient(lx, ly, 0, lx, ly, 8)
    glow.addColorStop(0, 'rgba(201,168,76,0.35)')
    glow.addColorStop(1, 'transparent')
    ctx.beginPath(); ctx.arc(lx, ly, 8, 0, Math.PI * 2)
    ctx.fillStyle = glow; ctx.fill()
    ctx.beginPath(); ctx.arc(lx, ly, 3, 0, Math.PI * 2)
    ctx.fillStyle = '#C9A84C'; ctx.fill()

    // Value label
    ctx.fillStyle = '#C9A84C'; ctx.font = 'bold 9px monospace'
    ctx.fillText('$882.75', lx - 28, ly - 8)
  }, [page])

  const nav = (id: PageId) => setPage(id)

  const fmtPrice = (t: typeof TICKERS[0]) =>
    t.sym === 'BTC' || t.sym === 'GOLD'
      ? Math.round(t.price).toLocaleString()
      : t.price.toFixed(2)

  const SIDEBAR = [
    { label: 'Overview', items: [
      { id: 'dashboard'   as PageId, text: 'Dashboard',        icon: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z' },
      { id: 'portfolio'   as PageId, text: 'Portfolio',         icon: 'M22 12 18 12 15 21 9 3 6 12 2 12', iconTag: 'polyline' },
      { id: 'performance' as PageId, text: 'Performance',       icon: 'M18 20V10M12 20V4M6 20v-6', iconTag: 'multi-line' },
    ]},
    { label: 'Activity', items: [
      { id: 'trades'     as PageId, text: 'Trade History',     icon: 'M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3' },
      { id: 'statements' as PageId, text: 'Statements',        icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' },
      { id: 'dividends'  as PageId, text: 'Income & Dividends',icon: 'M12 22C12 22 4 18 4 12V5l8-3 8 3v7c0 6-8 10-8 10z' },
      { id: 'intertrans' as PageId, text: 'Inter Trans',       icon: 'M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4' },
    ]},
    { label: 'Insights', items: [
      { id: 'insights'   as PageId, text: 'AG Insights',       icon: 'M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
      { id: 'messages'   as PageId, text: 'Messages',          icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', badge: '2' },
    ]},
    { label: 'Account', items: [
      { id: 'fees'       as PageId, text: 'Fees & Billing',    icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
      { id: 'profile'    as PageId, text: 'My Profile',        icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' },
    ]},
  ]

  // Loading
  if (currentUser === undefined) return null

  // Not activated
  if (!currentUser || !currentUser.activated) {
    return (
      <div style={{ background: '#07070A', color: '#E2DDD4', minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, maxWidth: 460, textAlign: 'center', padding: '0 24px' }}>
          <div style={{ width: 56, height: 56, border: '1.5px solid rgba(201,168,76,0.4)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#C9A84C', letterSpacing: '0.04em', marginBottom: 4 }}>AG</div>
          <div style={{ fontSize: 22, fontWeight: 600, color: '#E8DDD0', letterSpacing: '-0.01em' }}>Portal Not Yet Activated</div>
          <div style={{ fontSize: 14, color: '#5A5040', lineHeight: 1.7 }}>
            Your account hasn&apos;t been assigned a portal yet.<br />
            Please speak with your Aurum Global advisor to get started.
          </div>
          <div style={{ marginTop: 8, padding: '16px 24px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.18)', borderRadius: 12 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A7050', marginBottom: 6 }}>Next Step</div>
            <div style={{ fontSize: 15, color: '#C9A84C', fontWeight: 500 }}>Ask Your Advisor For Activation</div>
          </div>
          <button
            onClick={() => { sessionStorage.removeItem('ag_user'); router.push('/') }}
            style={{ marginTop: 8, fontSize: 11, color: '#4A4030', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.06em' }}
          >
            Return to homepage
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#07070A', color: '#E2DDD4', minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif", display: 'flex', flexDirection: 'column' }}>

      {/* ── Top bar ── */}
      <div style={{ background: 'rgba(10,10,13,0.97)', borderBottom: '1px solid rgba(201,168,76,0.12)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
            <div style={{ width: 28, height: 28, border: '1.5px solid rgba(201,168,76,0.6)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#C9A84C', letterSpacing: '0.02em' }}>AG</div>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase' }}>Aurum Global</span>
            <span style={{ fontSize: 9, color: '#3A3328', letterSpacing: '0.1em' }}>PWM</span>
          </div>
          <div style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', overflow: 'hidden' }}>
            {tickers.map(t => (
              <div key={t.sym} style={{ display: 'flex', gap: 5, alignItems: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 9, fontFamily: 'monospace', color: '#5A5040', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t.sym}</span>
                <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#C8BFA8', fontWeight: 500 }}>{fmtPrice(t)}</span>
                <span style={{ fontSize: 9, fontFamily: 'monospace', padding: '1px 5px', borderRadius: 3, background: t.chg >= 0 ? 'rgba(29,158,117,0.14)' : 'rgba(212,75,58,0.12)', color: t.chg >= 0 ? '#2DB870' : '#D44B3A', fontWeight: 500 }}>
                  {t.chg >= 0 ? '+' : ''}{t.chg.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => nav('messages')}
            style={{ width: 34, height: 34, borderRadius: 9, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', transition: 'border-color 0.2s' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6A5E50" strokeWidth="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <div style={{ position: 'absolute', top: 7, right: 7, width: 6, height: 6, background: '#C9A84C', borderRadius: '50%', boxShadow: '0 0 6px rgba(201,168,76,0.7)' }} />
          </button>
          <div
            onClick={() => nav('profile')}
            style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#5C4620,#C9A84C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#0A0800', cursor: 'pointer', letterSpacing: '0.04em', boxShadow: '0 0 0 2px rgba(201,168,76,0.2)' }}
          >{currentUser.initials}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── Sidebar ── */}
        <div style={{ width: 210, background: '#08080B', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '18px 0 18px', flexShrink: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {SIDEBAR.map(section => (
            <div key={section.label} style={{ marginBottom: 6 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.24em', color: '#342E26', textTransform: 'uppercase', padding: '0 16px', marginBottom: 4, marginTop: 14 }}>{section.label}</div>
              {section.items.map(item => {
                const isActive = page === item.id
                const isHovered = hoveredNav === item.id
                return (
                  <div
                    key={item.id}
                    onClick={() => nav(item.id)}
                    onMouseEnter={() => setHoveredNav(item.id)}
                    onMouseLeave={() => setHoveredNav(null)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '8px 16px', fontSize: 12, cursor: 'pointer',
                      color: isActive ? '#C9A84C' : isHovered ? '#A89060' : '#5A5040',
                      borderLeft: `2px solid ${isActive ? '#C9A84C' : 'transparent'}`,
                      background: isActive ? 'rgba(201,168,76,0.08)' : isHovered ? 'rgba(255,255,255,0.02)' : 'transparent',
                      transition: 'all 0.15s ease',
                      letterSpacing: '0.01em',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ flexShrink: 0 }}>
                      <path d={item.icon} />
                      {item.id === 'portfolio' && <circle cx="12" cy="7" r="4" />}
                    </svg>
                    <span style={{ flex: 1 }}>{item.text}</span>
                    {item.badge && (
                      <span style={{ fontSize: 9, background: 'rgba(201,168,76,0.18)', color: '#C9A84C', padding: '2px 6px', borderRadius: 10, fontWeight: 600 }}>{item.badge}</span>
                    )}
                    {isActive && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#C9A84C', flexShrink: 0 }} />}
                  </div>
                )
              })}
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ padding: '14px 16px 0', borderTop: '1px solid rgba(255,255,255,0.04)', marginTop: 12 }}>
            <div style={{ fontSize: 9, color: '#2E2A22', letterSpacing: '0.1em', marginBottom: 4 }}>ACCOUNT</div>
            <div style={{ fontSize: 10, color: '#4A4030' }}>{currentUser.name} · {currentUser.accountId}</div>
            <div style={{ fontSize: 9, color: '#2E2A22', marginTop: 2 }}>T-1 Billing · Active</div>
          </div>
        </div>

        {/* ── Main content ── */}
        <div style={{ flex: 1, overflowY: 'auto', background: '#07070A' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ padding: '28px 32px', minHeight: '100%' }}
            >

              {/* ── DASHBOARD ── */}
              {page === 'dashboard' && (
                <div>
                  {/* Welcome banner */}
                  <div style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.03) 100%)', border: '1px solid rgba(201,168,76,0.16)', borderRadius: 14, padding: '20px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 600, color: '#E8DDD0', marginBottom: 4, letterSpacing: '-0.01em' }}>{getGreeting()}, {currentUser.firstName}.</div>
                      <div style={{ fontSize: 12, color: '#6A5E50', lineHeight: 1.6 }}>Your portfolio is performing well. November total return: <span style={{ color: '#1D9E75', fontWeight: 500 }}>+$168.35</span> · Account ID: <span style={{ color: '#C9A84C' }}>{currentUser.accountId}</span></div>
                    </div>
                    <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', flexShrink: 0 }}>
                      {[{ label: 'PWM Client', color: '#8A7050' }, { label: 'T-1 Billing', color: '#8A7050' }, { label: '● Active', color: '#1D9E75' }].map(b => (
                        <div key={b.label} style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 20, border: `1px solid rgba(255,255,255,0.08)`, color: b.color, background: 'rgba(255,255,255,0.02)' }}>{b.label}</div>
                      ))}
                    </div>
                  </div>

                  {/* Metric cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 12, marginBottom: 20 }}>
                    <MetricCard label="Total AUM" value="$882.75" valueColor="#C9A84C" badge="+$168.35 Nov" badgeColor="gain" accent />
                    <MetricCard label="Total Return" value="+$232.75" valueColor="#1D9E75" badge="+35.8% ROI" badgeColor="gain" />
                    <MetricCard label="Monthly Income" value="$12.80" valueColor="#C9A84C" sub="TSLY dividend (Oct)" />
                    <MetricCard label="Fees (Dec 5)" value="$9.23" valueColor="#1D9E75" valueSize={20} badge="Paid" badgeColor="gain" />
                  </div>

                  {/* Quick actions */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 10, marginBottom: 22 }}>
                    {[
                      { label: 'Statements', page: 'statements' as PageId, d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' },
                      { label: 'Trade Log',  page: 'trades'     as PageId, d: 'M22 12 18 12 15 21 9 3 6 12 2 12', tag: 'polyline' },
                      { label: 'Message PM', page: 'messages'   as PageId, d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
                      { label: 'AG Insights',page: 'insights'   as PageId, d: 'M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
                    ].map(qa => (
                      <HoverCard key={qa.label} onClick={() => nav(qa.page)} style={{ textAlign: 'center', cursor: 'pointer', padding: '16px 12px' }}>
                        <div style={{ width: 32, height: 32, background: 'rgba(201,168,76,0.1)', borderRadius: 9, margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5"><path d={qa.d} /></svg>
                        </div>
                        <div style={{ fontSize: 10, color: '#6A5E50', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{qa.label}</div>
                      </HoverCard>
                    ))}
                  </div>

                  {/* Chart + Allocation */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 16, marginBottom: 22 }}>
                    <Card>
                      <SectionTitle>Portfolio equity curve</SectionTitle>
                      <div style={{ position: 'relative', marginBottom: 4 }}>
                        <canvas ref={canvasRef} style={{ width: '100%', height: 148 }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                        <span style={{ fontSize: 9, color: '#3A3328', fontFamily: 'monospace' }}>10/15/2025 – 11/30/2025</span>
                        <span style={{ fontSize: 9, color: '#1D9E75', fontFamily: 'monospace' }}>▲ +35.8% realized P&L</span>
                      </div>
                    </Card>
                    <Card>
                      <SectionTitle>Allocation</SectionTitle>
                      {[
                        { name: 'CASH', color: '#C9A84C', pct: '100%', val: '$882.75', w: '100%' },
                        { name: 'TSLY', color: '#1D9E75', pct: '0%',   val: '$0.00',   w: '0%'   },
                        { name: 'PLUG', color: '#378ADD', pct: '0%',   val: '$0.00',   w: '0%'   },
                      ].map(a => (
                        <div key={a.name} style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'center' }}>
                            <span style={{ fontSize: 11, color: a.color, fontFamily: 'monospace', fontWeight: 600 }}>{a.name}</span>
                            <span style={{ fontSize: 11, color: '#6A5E50', fontFamily: 'monospace' }}>{a.pct}</span>
                            <span style={{ fontSize: 11, color: '#C8BFA8', fontFamily: 'monospace' }}>{a.val}</span>
                          </div>
                          <div style={{ height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                            <div style={{ height: 3, borderRadius: 2, width: a.w, background: `linear-gradient(90deg, ${a.color}88, ${a.color})`, transition: 'width 0.8s ease' }} />
                          </div>
                        </div>
                      ))}
                      <div style={{ marginTop: 12, fontSize: 10, color: '#4A4438', lineHeight: 1.6 }}>Fully in cash as of Nov 30.<br />Awaiting next entry signal.</div>
                    </Card>
                  </div>

                  {/* PM note */}
                  <div style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.13)', borderRadius: 14, padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#5C4620,#C9A84C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#0A0800', flexShrink: 0, boxShadow: '0 0 0 2px rgba(201,168,76,0.2)' }}>SC</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#C9A84C', marginBottom: 2 }}>Saswat C. — Portfolio Manager</div>
                      <div style={{ fontSize: 9, color: '#4A4030', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Aurum Global PWM · DL2503</div>
                      <div style={{ fontSize: 12, color: '#8A8070', lineHeight: 1.7 }}>&ldquo;November was a strong month — we captured +$168.35 in realized gains across PLUG and two TSLY cycles. Account is fully in cash, positioned defensively into December. Watching TSLY for a re-entry around $7.00–$7.20 post-ex-dividend. Fee invoice due Dec 5.&rdquo;</div>
                      <button onClick={() => nav('messages')} style={{ fontSize: 10, marginTop: 12, padding: '7px 16px', background: 'transparent', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 20, color: '#C9A84C', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.15s' }}>Send Message →</button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── PORTFOLIO ── */}
              {page === 'portfolio' && (
                <div>
                  <PageHeader greeting="Account DL2503" title="Your Portfolio" sub="Holdings, allocation, and real-time position data" />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 12, marginBottom: 22 }}>
                    <MetricCard label="Total AUM" value="$882.75" valueColor="#C9A84C" sub="As of Nov 30" accent />
                    <MetricCard label="Cash Available" value="$882.75" sub="100% liquidity" />
                    <MetricCard label="Open Positions" value="0" sub="Fully in cash" />
                    <MetricCard label="Initial Deposit" value="$650.00" valueSize={18} sub="Oct 15, 2025" />
                  </div>
                  <SectionTitle>Position history summary</SectionTitle>
                  <Card style={{ marginBottom: 16 }}>
                    <MiniTable rows={[
                      ['TSLY — Tesla Covered Call ETF', 'Closed — all positions exited', '+$149.15', 'green'],
                      ['PLUG — Plug Power Inc.',        'Closed — full position exited', '+$83.60',  'green'],
                      ['TSLY Dividend (Oct 23)',         '80 shares × $0.16',             '+$12.80',  'gold'],
                      ['Total realized P&L',            '',                               '+$232.75', 'green'],
                    ]} />
                  </Card>
                  <SectionTitle>Risk profile</SectionTitle>
                  <Card>
                    {[
                      { label: 'Volatility (portfolio)',  val: 'Low — fully in cash',       pct: 8,  color: '#1D9E75' },
                      { label: 'Concentration risk',      val: 'None — no open positions',  pct: 5,  color: '#1D9E75' },
                      { label: 'Strategy risk (TSLY)',    val: 'Medium — YieldMax decay',   pct: 52, color: '#C9A84C' },
                    ].map(r => (
                      <div key={r.label} style={{ marginBottom: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 6 }}>
                          <span style={{ color: '#6A5E50' }}>{r.label}</span>
                          <span style={{ color: r.color, fontWeight: 500 }}>{r.val}</span>
                        </div>
                        <div style={{ height: 5, background: 'rgba(255,255,255,0.05)', borderRadius: 3 }}>
                          <div style={{ height: 5, borderRadius: 3, width: `${r.pct}%`, background: `linear-gradient(90deg, ${r.color}66, ${r.color})` }} />
                        </div>
                      </div>
                    ))}
                    <div style={{ fontSize: 11, color: '#4A4438', marginTop: 6, lineHeight: 1.6 }}>Risk assessed by AGM system. TSLY is a YieldMax covered-call ETF subject to NAV erosion. Managed with active entry/exit discipline.</div>
                  </Card>
                </div>
              )}

              {/* ── PERFORMANCE ── */}
              {page === 'performance' && (
                <div>
                  <PageHeader greeting="Analytics" title="Performance" sub="Month-by-month returns, strategy attribution" />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 12, marginBottom: 22 }}>
                    <MetricCard label="Oct Return" value="+$51.20" valueColor="#1D9E75" badge="+7.9% vs deposit" badgeColor="gain" accent />
                    <MetricCard label="Nov Return" value="+$168.35" valueColor="#1D9E75" badge="+24.2% MoM" badgeColor="gain" accent />
                    <MetricCard label="Total Return" value="+$232.75" valueColor="#1D9E75" badge="+35.8% all-time" badgeColor="gain" />
                    <MetricCard label="Dividends Earned" value="$12.80" valueColor="#C9A84C" sub="TSLY Oct 23" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Card>
                      <SectionTitle>Monthly P&L breakdown</SectionTitle>
                      <MiniTable rows={[
                        ['Oct TSLY trade',         '', '+$51.20',  'green'],
                        ['Oct TSLY dividend',      '', '+$12.80',  'gold'],
                        ['Nov PLUG trade',         '', '+$83.60',  'green'],
                        ['Nov TSLY trade 1',       '', '+$37.60',  'green'],
                        ['Nov TSLY trade 2',       '', '+$47.15',  'green'],
                        ['Transaction fees',       '', '-$0.40',   'red'],
                        ['Management fees paid',   '', 'TBD',      'muted'],
                        ['Net total',              '', '+$232.75', 'green'],
                      ]} />
                    </Card>
                    <Card>
                      <SectionTitle>Strategy attribution</SectionTitle>
                      {[
                        { name: 'TSLY', color: '#1D9E75', pct: '64%', val: '+$149.15', w: '64%' },
                        { name: 'PLUG', color: '#378ADD', pct: '36%', val: '+$83.60',  w: '36%' },
                        { name: 'DIV',  color: '#C9A84C', pct: '6%',  val: '+$12.80',  w: '5%'  },
                      ].map(a => (
                        <div key={a.name} style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                            <span style={{ fontSize: 11, color: a.color, fontFamily: 'monospace', fontWeight: 600, minWidth: 34 }}>{a.name}</span>
                            <span style={{ fontSize: 11, color: '#6A5E50', fontFamily: 'monospace', minWidth: 28 }}>{a.pct}</span>
                            <span style={{ fontSize: 11, color: a.color, fontFamily: 'monospace', marginLeft: 'auto' }}>{a.val}</span>
                          </div>
                          <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                            <div style={{ height: 4, borderRadius: 2, width: a.w, background: `linear-gradient(90deg, ${a.color}66, ${a.color})` }} />
                          </div>
                        </div>
                      ))}
                      <div style={{ marginTop: 14, fontSize: 10, color: '#4A4438' }}>Dividend income attributed separately. Total gross: +$245.55 before fees.</div>
                    </Card>
                  </div>
                </div>
              )}

              {/* ── TRADE HISTORY ── */}
              {page === 'trades' && (
                <div>
                  <PageHeader greeting="Execution log" title="Trade History" sub="All executed orders, managed by AGM system" />
                  <Card>
                    <div style={{ display: 'grid', gridTemplateColumns: '44px 50px 1fr 80px 80px', gap: 8, padding: '0 0 8px', marginBottom: 4, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      {['Sym', 'Type', 'Details', 'Date', 'P&L'].map(h => (
                        <span key={h} style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3A3328' }}>{h}</span>
                      ))}
                    </div>
                    {[
                      { sym: 'TSLY', type: 'sell', desc: '115 shares @ $7.66',               date: '11/25/2025', gain: '+$47.15',  gainColor: '#1D9E75' },
                      { sym: 'TSLY', type: 'buy',  desc: '115 shares @ $7.25',               date: '11/21/2025', gain: '-$833.75', gainColor: '#5A5040' },
                      { sym: 'TSLY', type: 'sell', desc: '110 shares @ $7.61',               date: '11/19/2025', gain: '+$37.60',  gainColor: '#1D9E75' },
                      { sym: 'TSLY', type: 'buy',  desc: '100 shares @ $7.24 + 10 @ $7.55', date: '11/14/2025', gain: '-$799.50', gainColor: '#5A5040' },
                      { sym: 'PLUG', type: 'sell', desc: '280 shares @ $2.80',               date: '11/10/2025', gain: '+$83.60',  gainColor: '#1D9E75' },
                      { sym: 'PLUG', type: 'buy',  desc: '280 shares @ $2.50',               date: '11/04/2025', gain: '-$700.20', gainColor: '#5A5040' },
                      { sym: 'TSLY', type: 'sell', desc: '80 shares @ $8.69',                date: '10/29/2025', gain: '+$51.20',  gainColor: '#1D9E75' },
                      { sym: 'TSLY', type: 'div',  desc: '80 shares × $0.16 dividend',       date: '10/23/2025', gain: '+$12.80',  gainColor: '#C9A84C' },
                      { sym: 'TSLY', type: 'buy',  desc: '80 shares @ $8.05',                date: '10/17/2025', gain: '-$644.00', gainColor: '#5A5040' },
                    ].map((t, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '44px 50px 1fr 80px 80px', gap: 8, padding: '11px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 600, color: '#C9A84C' }}>{t.sym}</span>
                        <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 4, display: 'inline-block', textTransform: 'uppercase', fontWeight: 600,
                          background: t.type === 'buy' ? 'rgba(29,158,117,0.1)' : t.type === 'sell' ? 'rgba(212,75,58,0.08)' : 'rgba(201,168,76,0.1)',
                          color: t.type === 'buy' ? '#1D9E75' : t.type === 'sell' ? '#D44B3A' : '#C9A84C' }}>{t.type}</span>
                        <span style={{ color: '#7A7060', fontSize: 11 }}>{t.desc}</span>
                        <span style={{ color: '#4A4438', fontSize: 10, fontFamily: 'monospace', textAlign: 'right' }}>{t.date}</span>
                        <span style={{ fontWeight: 600, textAlign: 'right', color: t.gainColor, fontFamily: 'monospace', fontSize: 11 }}>{t.gain}</span>
                      </div>
                    ))}
                  </Card>
                </div>
              )}

              {/* ── STATEMENTS ── */}
              {page === 'statements' && (
                <div>
                  <PageHeader greeting="Official records" title="Monthly Statements" sub="Issued by Aurum Global PWM on the last day of each month" />
                  <Card style={{ marginBottom: 22 }}>
                    {[
                      { name: 'November 2025 — MCS', meta: 'Issued Nov 30, 2025 · AUM $882.75 · Return +$168.35', status: 'Paid', statusColor: '#1D9E75', statusBg: 'rgba(29,158,117,0.1)' },
                      { name: 'October 2025 — MCS',  meta: 'Issued 10/31/2025 · AUM $695.20 · Return +$51.20 + $12.80 div', status: 'Paid', statusColor: '#1D9E75', statusBg: 'rgba(29,158,117,0.1)' },
                    ].map(s => (
                      <div key={s.name} style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', gap: 14 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(29,158,117,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 15 12 18 15 15"/></svg>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ color: '#C8BFA8', fontWeight: 500, fontSize: 13 }}>{s.name}</div>
                          <div style={{ fontSize: 10, color: '#4A4438', marginTop: 2 }}>{s.meta}</div>
                        </div>
                        <span style={{ fontSize: 10, padding: '3px 10px', borderRadius: 20, background: s.statusBg, color: s.statusColor, fontWeight: 600 }}>{s.status}</span>
                        <button style={{ fontSize: 10, color: '#5A5040', cursor: 'pointer', padding: '5px 12px', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, background: 'transparent', letterSpacing: '0.06em' }}>Download PDF</button>
                      </div>
                    ))}
                  </Card>
                  <SectionTitle>November detail</SectionTitle>
                  <FeeBox rows={[
                    ['Opening AUM (Nov 1)',           '$695.20'],
                    ['PLUG realized gain',            '+$83.60',  '#1D9E75'],
                    ['TSLY realized gain (2 trades)', '+$84.75',  '#1D9E75'],
                    ['Dividends',                     '$0.00'],
                    ['Transaction fees',              '-$0.40',   '#D44B3A'],
                    ['Ending AUM (Nov 30)',            '$882.75'],
                    ['Management fee (1%)',           '$8.83',    '#D44B3A'],
                    ['Total due Dec 5',               '$9.23'],
                  ]} />
                </div>
              )}

              {/* ── DIVIDENDS ── */}
              {page === 'dividends' && (
                <div>
                  <PageHeader greeting="Passive income" title="Income & Dividends" sub="Dividend history and projected income from holdings" />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 12, marginBottom: 22 }}>
                    <MetricCard label="Total Dividends" value="$12.80" valueColor="#C9A84C" sub="All-time" accent />
                    <MetricCard label="This Month" value="$0.00" sub="No holdings Nov" />
                    <MetricCard label="Projected (TSLY)" value="~$12–18" valueSize={18} sub="Per 100 shares/week" />
                    <MetricCard label="TSLY Yield" value="~85%" valueSize={18} sub="Annualized (variable)" />
                  </div>
                  <Card style={{ marginBottom: 14 }}>
                    <SectionTitle>Dividend history</SectionTitle>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', fontSize: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 600, color: '#C9A84C' }}>TSLY</span>
                        <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 4, background: 'rgba(201,168,76,0.12)', color: '#C9A84C', fontWeight: 600 }}>DIV</span>
                        <span style={{ color: '#7A7060', fontSize: 11 }}>80 shares · Ex-div 10/23/2025 · $0.16/share</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <span style={{ color: '#4A4438', fontSize: 10, fontFamily: 'monospace' }}>10/23/2025</span>
                        <span style={{ color: '#C9A84C', fontWeight: 600, fontFamily: 'monospace' }}>+$12.80</span>
                      </div>
                    </div>
                  </Card>
                  <Card>
                    <SectionTitle>About TSLY income</SectionTitle>
                    <div style={{ fontSize: 12, color: '#8A8070', lineHeight: 1.75 }}>TSLY (YieldMax TSLA Option Income Strategy ETF) distributes weekly dividends derived from covered call options on Tesla. The distribution rate varies weekly and is NOT guaranteed. NAV erosion is a structural risk — your PM actively manages entry/exit timing around ex-dividend dates to optimize total return vs. NAV decay.</div>
                  </Card>
                </div>
              )}

              {/* ── INTER TRANS ── */}
              {page === 'intertrans' && (
                <div>
                  <PageHeader greeting="Internal transfers" title="Inter Trans" sub="Account transaction log · Updated 12/21/2025 · Saswat C." />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 12, marginBottom: 22 }}>
                    <MetricCard label="Total Gain / Loss" value="+$232.75" valueColor="#1D9E75" badge="+35.8%" badgeColor="gain" accent />
                    <MetricCard label="Current Value" value="$882.75" valueColor="#C9A84C" sub="As of Nov 30" />
                    <MetricCard label="TSLY Realized" value="+$149.15" valueColor="#1D9E75" sub="All positions closed" />
                    <MetricCard label="PLUG Realized" value="+$83.60" valueColor="#1D9E75" sub="All positions closed" />
                  </div>
                  <SectionTitle>Transaction log</SectionTitle>
                  <Card style={{ marginBottom: 20 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '100px 68px 1fr 90px', gap: 0, padding: '0 0 8px', marginBottom: 4, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      {['Date', 'Type', 'Description', 'Amount'].map(h => (
                        <span key={h} style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3A3328', textAlign: h === 'Amount' ? 'right' : 'left' }}>{h}</span>
                      ))}
                    </div>
                    {[
                      { date: '10/15/2025', typ: 'DEP',    desc: 'Initial deposit',                         amount: '650.00',  isIn: true  },
                      { date: '10/17/2025', typ: 'WIT (B)', desc: 'TSLY buy — 80 shares @ $8.05',            amount: '644.00',  isIn: false },
                      { date: '10/23/2025', typ: 'DIV',    desc: 'TSLY dividend · $0.1652/share',           amount: '13.22',   isIn: true  },
                      { date: '10/29/2025', typ: 'DEP (S)', desc: 'TSLY sell — 80 shares @ $8.69',           amount: '695.20',  isIn: true  },
                      { date: '10/29/2025', typ: 'WIT (B)', desc: 'Reinvested — internal reallocation',      amount: '700.20',  isIn: false },
                      { date: '11/10/2025', typ: 'DEP (S)', desc: 'PLUG sell — 280 shares @ $2.80',          amount: '783.80',  isIn: true  },
                      { date: '11/14/2025', typ: 'WIT (B)', desc: 'TSLY buy — 100 shares @ $7.24',           amount: '724.00',  isIn: false },
                      { date: '11/18/2025', typ: 'WIT (B)', desc: 'TSLY buy — 10 shares @ $7.55',            amount: '75.50',   isIn: false },
                      { date: '11/19/2025', typ: 'DEP (S)', desc: 'TSLY sell — 110 shares @ $7.61',          amount: '837.10',  isIn: true  },
                      { date: '11/21/2025', typ: 'WIT (S)', desc: 'TSLY buy — 115 shares @ $7.25',           amount: '833.75',  isIn: false },
                      { date: '11/25/2025', typ: 'DEP (B)', desc: 'TSLY sell — 115 shares @ $7.66',          amount: '880.90',  isIn: true  },
                      { date: '11/30/2025', typ: 'BAL',    desc: 'Month-end balance',                       amount: '882.75',  isIn: null  },
                      { date: '12/01/2025', typ: 'DEP',    desc: 'Tfr SUTTON BANK · due 12/05/2025',        amount: '882.75',  isIn: true  },
                    ].map((t, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 68px 1fr 90px', gap: 0, padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center' }}>
                        <span style={{ fontSize: 10, color: '#4A4438', fontFamily: 'monospace' }}>{t.date}</span>
                        <span style={{ fontSize: 8, padding: '2px 6px', borderRadius: 4, display: 'inline-block', width: 'fit-content', fontWeight: 600, letterSpacing: '0.04em',
                          background: t.isIn === true ? 'rgba(29,158,117,0.1)' : t.isIn === false ? 'rgba(212,75,58,0.08)' : 'rgba(255,255,255,0.05)',
                          color: t.isIn === true ? '#1D9E75' : t.isIn === false ? '#D44B3A' : '#6A5E50' }}>
                          {t.typ}
                        </span>
                        <span style={{ color: '#7A7060', fontSize: 11, paddingLeft: 8 }}>{t.desc}</span>
                        <span style={{ fontFamily: 'monospace', fontWeight: 600, textAlign: 'right', fontSize: 11,
                          color: t.isIn === true ? '#1D9E75' : t.isIn === false ? '#D44B3A' : '#C8BFA8' }}>
                          {t.isIn === true ? '+' : t.isIn === false ? '−' : ''}{t.amount}
                        </span>
                      </div>
                    ))}
                  </Card>

                  <SectionTitle>Position summary</SectionTitle>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Card>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
                        <span style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: '#C9A84C', letterSpacing: '0.1em' }}>TSLY</span>
                        <span style={{ fontSize: 12, color: '#1D9E75', fontFamily: 'monospace', fontWeight: 600 }}>+$149.15</span>
                      </div>
                      {[
                        { date: '10/17', shares: '+80',  price: '$8.05', cost: '$644.00', note: 'BUY' },
                        { date: '10/23', shares: '—',    price: '$0.165',cost: '$13.20',  note: 'DIV' },
                        { date: '10/29', shares: '-80',  price: '$8.69', cost: '$695.20', note: 'SELL' },
                        { date: '11/14', shares: '+100', price: '$7.24', cost: '$724.00', note: 'BUY' },
                        { date: '11/18', shares: '+10',  price: '$7.55', cost: '$75.50',  note: 'BUY' },
                        { date: '11/19', shares: '-110', price: '$7.61', cost: '$837.10', note: 'SELL' },
                        { date: '11/21', shares: '+115', price: '$7.25', cost: '$833.75', note: 'BUY' },
                        { date: '11/25', shares: '-115', price: '$7.66', cost: '$880.90', note: 'SELL' },
                      ].map((r, i) => {
                        const isBuy = r.note === 'BUY', isSell = r.note === 'SELL'
                        return (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 11 }}>
                            <span style={{ color: '#4A4438', fontFamily: 'monospace', minWidth: 32 }}>{r.date}</span>
                            <span style={{ fontSize: 8, padding: '1px 5px', borderRadius: 3, fontWeight: 600,
                              background: isBuy ? 'rgba(29,158,117,0.1)' : isSell ? 'rgba(212,75,58,0.08)' : 'rgba(201,168,76,0.1)',
                              color: isBuy ? '#1D9E75' : isSell ? '#D44B3A' : '#C9A84C' }}>{r.note}</span>
                            <span style={{ color: '#8A8070', minWidth: 28, textAlign: 'right', fontFamily: 'monospace' }}>{r.shares}</span>
                            <span style={{ color: '#5A5040', minWidth: 40, textAlign: 'right', fontFamily: 'monospace' }}>@ {r.price}</span>
                            <span style={{ color: '#C8BFA8', marginLeft: 'auto', fontFamily: 'monospace' }}>{r.cost}</span>
                          </div>
                        )
                      })}
                      <div style={{ marginTop: 10, fontSize: 10, color: '#4A4438' }}>0 shares remaining · Fully closed</div>
                    </Card>
                    <Card>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
                        <span style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: '#378ADD', letterSpacing: '0.1em' }}>PLUG</span>
                        <span style={{ fontSize: 12, color: '#1D9E75', fontFamily: 'monospace', fontWeight: 600 }}>+$83.60</span>
                      </div>
                      {[
                        { date: '11/04', shares: '+280', price: '$2.50', cost: '$700.20', note: 'BUY' },
                        { date: '11/10', shares: '-280', price: '$2.80', cost: '$783.80', note: 'SELL' },
                      ].map((r, i) => {
                        const isBuy = r.note === 'BUY'
                        return (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 11 }}>
                            <span style={{ color: '#4A4438', fontFamily: 'monospace', minWidth: 32 }}>{r.date}</span>
                            <span style={{ fontSize: 8, padding: '1px 5px', borderRadius: 3, fontWeight: 600,
                              background: isBuy ? 'rgba(29,158,117,0.1)' : 'rgba(212,75,58,0.08)',
                              color: isBuy ? '#1D9E75' : '#D44B3A' }}>{r.note}</span>
                            <span style={{ color: '#8A8070', minWidth: 28, textAlign: 'right', fontFamily: 'monospace' }}>{r.shares}</span>
                            <span style={{ color: '#5A5040', minWidth: 40, textAlign: 'right', fontFamily: 'monospace' }}>@ {r.price}</span>
                            <span style={{ color: '#C8BFA8', marginLeft: 'auto', fontFamily: 'monospace' }}>{r.cost}</span>
                          </div>
                        )
                      })}
                      <div style={{ marginTop: 10, fontSize: 10, color: '#4A4438' }}>0 shares remaining · Fully closed</div>
                    </Card>
                  </div>
                </div>
              )}

              {/* ── INSIGHTS ── */}
              {page === 'insights' && (
                <div>
                  <PageHeader greeting="AG Insights" title="Market Intelligence" sub="Curated research from Aurum Global's intelligence desk" />
                  {[
                    { tag: 'Income Strategy', tagC: 'rgba(138,55,221,0.12)', tagFg: '#8A37DD', title: 'YieldMax ETFs: Navigating NAV decay in the current rate environment',              meta: 'AG Insights · Saswat C. · Nov 28, 2025' },
                    { tag: 'Equity',          tagC: 'rgba(29,158,117,0.12)', tagFg: '#1D9E75', title: 'PLUG Power deep dive: Hydrogen fuel cells and the green energy thesis',                meta: 'AG Insights · Nov 15, 2025' },
                    { tag: 'Macro',           tagC: 'rgba(55,138,221,0.12)', tagFg: '#378ADD', title: 'Fed December meeting preview: Rate path implications for dividend-focused portfolios',  meta: 'AG Insights · Dec 01, 2025' },
                    { tag: 'Options',         tagC: 'rgba(201,168,76,0.12)', tagFg: '#C9A84C', title: 'Covered call strategy performance review: TSLY, MSFO, NVDY comparison Q4 2025',      meta: 'AG Insights · Nov 30, 2025' },
                    { tag: 'Macro',           tagC: 'rgba(55,138,221,0.12)', tagFg: '#378ADD', title: 'Small cap recovery signal: Mean reversion setup in beaten-down clean energy names',    meta: 'AG Insights · Dec 02, 2025' },
                  ].map((ins, i) => (
                    <HoverCard key={i} style={{ marginBottom: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: 20, display: 'inline-block', marginBottom: 8, background: ins.tagC, color: ins.tagFg, fontWeight: 600 }}>{ins.tag}</span>
                        <div style={{ fontSize: 13, color: '#C8BFA8', fontWeight: 500, lineHeight: 1.45, marginBottom: 6 }}>{ins.title}</div>
                        <div style={{ fontSize: 10, color: '#4A4438', fontFamily: 'monospace' }}>{ins.meta}</div>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3A3328" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </HoverCard>
                  ))}
                </div>
              )}

              {/* ── MESSAGES ── */}
              {page === 'messages' && (
                <div>
                  <PageHeader greeting="Secure channel" title="Messages" sub="Direct line to your portfolio manager" />
                  <Card style={{ marginBottom: 14 }}>
                    {[
                      { time: '11/30/2025 · 11:42 AM', text: 'Hi David — November statement is ready. Total return +$168.35 across PLUG and two TSLY cycles. Fee of $9.23 due by 12/05/2025. Let me know if you have any questions about the trades.', unread: true },
                      { time: '11/25/2025 · 02:18 PM', text: 'Closed the second TSLY position today — 115 shares sold at $7.66 for +$47.15. Account is now fully in cash. Watching for next entry signal around $7.00.', unread: true },
                      { time: '11/10/2025 · 09:55 AM', text: 'PLUG closed — 280 shares @ $2.80, up from $2.50. Net gain +$83.60. Back in cash, now reloading TSLY on weakness.', unread: false },
                    ].map((m, i) => (
                      <div key={i} style={{ display: 'flex', gap: 12, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', background: m.unread ? 'rgba(201,168,76,0.02)' : 'transparent' }}>
                        <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#5C4620,#C9A84C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#0A0800', flexShrink: 0 }}>SC</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span style={{ fontSize: 12, fontWeight: 600, color: '#C9A84C' }}>Saswat C.</span>
                              {m.unread && <span style={{ fontSize: 8, padding: '1px 6px', borderRadius: 10, background: 'rgba(201,168,76,0.15)', color: '#C9A84C', fontWeight: 700 }}>NEW</span>}
                            </div>
                            <span style={{ fontSize: 10, color: '#4A4438', fontFamily: 'monospace', flexShrink: 0 }}>{m.time}</span>
                          </div>
                          <div style={{ fontSize: 12, color: '#8A8070', lineHeight: 1.65 }}>{m.text}</div>
                        </div>
                      </div>
                    ))}
                  </Card>
                  <Card>
                    <div style={{ fontSize: 10, color: '#4A4438', marginBottom: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>New Message</div>
                    <textarea
                      style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, resize: 'none', color: '#C8BFA8', fontSize: 12, outline: 'none', height: 80, lineHeight: 1.65, padding: '10px 12px', boxSizing: 'border-box' }}
                      placeholder="Write a message to your portfolio manager..."
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                      <button style={{ padding: '9px 20px', background: '#C9A84C', border: 'none', borderRadius: 20, color: '#0A0800', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', cursor: 'pointer', textTransform: 'uppercase' }}>Send Message</button>
                    </div>
                  </Card>
                </div>
              )}

              {/* ── FEES ── */}
              {page === 'fees' && (
                <div>
                  <PageHeader greeting="Billing" title="Fees & Billing" sub="Transparent fee structure — 1% monthly management fee on AUM" />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 12, marginBottom: 22 }}>
                    <MetricCard label="Dec 5 Fee" value="$9.23" valueColor="#1D9E75" badge="Paid" badgeColor="gain" accent />
                    <MetricCard label="Fees Paid (Oct)" value="~$6.95" valueSize={18} badge="Paid" badgeColor="gain" />
                    <MetricCard label="Fee Rate" value="1.0%" valueColor="#C9A84C" sub="Monthly of AUM" />
                  </div>
                  <SectionTitle>December invoice</SectionTitle>
                  <FeeBox rows={[
                    ['Management fee (1% × $882.75 AUM)', '$8.83'],
                    ['Transaction fees (PLUG × 2 trades)', '$0.40'],
                    ['Due date',                           '12/05/2025'],
                    ['Total due',                          '$9.23'],
                  ]} />
                  <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
                    <button style={{ padding: '10px 22px', background: '#C9A84C', border: 'none', borderRadius: 20, color: '#0A0800', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', cursor: 'pointer', textTransform: 'uppercase' }}>Pay Now — $9.23</button>
                    <button style={{ padding: '10px 20px', background: 'transparent', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 20, color: '#C9A84C', fontSize: 11, letterSpacing: '0.08em', cursor: 'pointer' }}>Download Invoice</button>
                  </div>
                  <div style={{ marginTop: 22, fontSize: 11, color: '#4A4438', lineHeight: 1.8, background: 'rgba(255,255,255,0.02)', borderRadius: 10, padding: '14px 16px', border: '1px solid rgba(255,255,255,0.04)' }}>Fees are collected monthly on the 5th of each following month. The management fee is 1% of AUM at month-end. Transaction fees are charged per trade executed by the AGM system ($0.20 per side). All fees are disclosed in your monthly statement.</div>
                </div>
              )}

              {/* ── PROFILE ── */}
              {page === 'profile' && (
                <div>
                  <PageHeader greeting="Account settings" title="My Profile" sub="Your account details and investor classification" />
                  <Card style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#5C4620,#C9A84C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 700, color: '#0A0800', flexShrink: 0, boxShadow: '0 0 0 3px rgba(201,168,76,0.2)' }}>DL</div>
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 600, color: '#E8DDD0', letterSpacing: '-0.01em' }}>David Low</div>
                        <div style={{ fontSize: 11, color: '#5A5040', marginTop: 3, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Private Wealth Client · DL2503</div>
                      </div>
                    </div>
                    <MiniTable rows={[
                      ['Client ID',         'DL2503',               '',      ''],
                      ['Account type',      'Individual — PWM',     '',      ''],
                      ['Billing tier',      'T-1 (Active)',          'gold',  ''],
                      ['Onboarded',         '10/15/2025',           '',      ''],
                      ['Portfolio Manager', 'Saswat C.',             'gold',  ''],
                      ['Management fee',    '1% monthly',           '',      ''],
                      ['Initial deposit',   '$650.00 · 10/15/2025','',      ''],
                      ['Current AUM',       '$882.75',              'green', ''],
                      ['Total return',      '+$232.75 (+35.8%)',    'green', ''],
                    ]} />
                  </Card>
                  <Card>
                    <SectionTitle>Security & access</SectionTitle>
                    <MiniTable rows={[
                      ['Two-factor auth',  'Enabled',              'green', ''],
                      ['Session timeout',  '30 minutes',           '',      ''],
                      ['Last login',       '12/21/2025 · 9:04 AM','',      ''],
                    ]} />
                    <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                      <button style={{ padding: '10px 18px', background: 'transparent', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 8, color: '#C9A84C', fontSize: 11, cursor: 'pointer' }}>Change Password</button>
                      <button style={{ padding: '10px 18px', background: 'transparent', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 8, color: '#C9A84C', fontSize: 11, cursor: 'pointer' }}>Download All Statements</button>
                    </div>
                    <div style={{ marginTop: 20, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <button
                        onClick={() => router.push('/')}
                        style={{ padding: '10px 24px', background: 'rgba(212,75,58,0.08)', border: '1px solid rgba(212,75,58,0.3)', borderRadius: 20, color: '#D44B3A', fontSize: 11, cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}
                      >
                        Log Out
                      </button>
                    </div>
                  </Card>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function HoverCard({ children, style, onClick }: { children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#111115',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.22)' : 'rgba(255,255,255,0.05)'}`,
        borderRadius: 12,
        padding: 20,
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.35)' : '0 0 0 rgba(0,0,0,0)',
        transition: 'all 0.2s ease',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: '#111115', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, padding: 20, ...style }}>
      {children}
    </div>
  )
}

function PageHeader({ greeting, title, sub }: { greeting: string; title: string; sub: string }) {
  return (
    <div style={{ marginBottom: 26 }}>
      <div style={{ fontSize: 10, color: '#4A4030', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>{greeting}</div>
      <div style={{ fontSize: 24, fontWeight: 600, color: '#E8DDD0', letterSpacing: '-0.02em', lineHeight: 1 }}>{title}</div>
      <div style={{ fontSize: 12, color: '#5A5040', marginTop: 6 }}>{sub}</div>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 9, letterSpacing: '0.22em', color: '#4A4030', textTransform: 'uppercase', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
      {children}
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.04)' }} />
    </div>
  )
}

function MetricCard({ label, value, valueColor, valueSize, sub, badge, badgeColor, accent }: {
  label: string; value: string; valueColor?: string; valueSize?: number
  sub?: string; badge?: string; badgeColor?: 'gain' | 'loss' | 'gold'; accent?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const badgeBg = { gain: 'rgba(29,158,117,0.12)', loss: 'rgba(212,75,58,0.1)', gold: 'rgba(201,168,76,0.12)' }
  const badgeFg = { gain: '#1D9E75', loss: '#D44B3A', gold: '#C9A84C' }
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#111115',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.25)' : accent ? 'rgba(201,168,76,0.18)' : 'rgba(255,255,255,0.05)'}`,
        borderRadius: 12, padding: '18px 18px 16px',
        transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
        transition: 'all 0.18s ease',
        boxShadow: hovered ? '0 6px 20px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div style={{ fontSize: 9, letterSpacing: '0.16em', color: '#4A4030', textTransform: 'uppercase', marginBottom: 10 }}>{label}</div>
      <div style={{ fontSize: valueSize ?? 24, fontWeight: 600, color: valueColor ?? '#E8DDD0', letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</div>
      {badge && badgeColor && (
        <div style={{ marginTop: 8 }}>
          <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 20, background: badgeBg[badgeColor], color: badgeFg[badgeColor], fontWeight: 600 }}>{badge}</span>
        </div>
      )}
      {sub && !badge && <div style={{ fontSize: 10, color: '#4A4438', marginTop: 8 }}>{sub}</div>}
    </div>
  )
}

function MiniTable({ rows }: { rows: string[][] }) {
  const colorMap: Record<string, string> = { green: '#1D9E75', gold: '#C9A84C', red: '#D44B3A', muted: '#5A5040' }
  return (
    <table style={{ width: '100%', fontSize: 11, borderCollapse: 'collapse' }}>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <td style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#6A5E50', width: '45%' }}>{row[0]}</td>
            {row[1] !== '' && <td style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#6A5E50' }}>{row[1]}</td>}
            <td style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', textAlign: 'right', color: colorMap[row[2]] ?? '#C8BFA8', fontFamily: 'monospace', fontWeight: colorMap[row[2]] ? 500 : 400 }}>
              {row[row.length - 2] || row[row.length - 1]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function FeeBox({ rows }: { rows: string[][] }) {
  return (
    <div style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.12)', borderRadius: 12, padding: '4px 18px' }}>
      {rows.map((row, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: i === rows.length - 1 ? '14px 0 10px' : '10px 0', borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', fontSize: i === rows.length - 1 ? 14 : 12, fontWeight: i === rows.length - 1 ? 600 : 400, color: i === rows.length - 1 ? '#C9A84C' : '#8A8070' }}>
          <span>{row[0]}</span>
          <span style={{ fontFamily: 'monospace', color: row[2] ?? (i === rows.length - 1 ? '#C9A84C' : '#C8BFA8') }}>{row[1]}</span>
        </div>
      ))}
    </div>
  )
}
