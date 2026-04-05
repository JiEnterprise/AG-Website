'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

type AdvisorPage = 'command' | 'clients' | 'messages' | 'revenue' | 'access' | 'profile'

const TICKERS = [
  { sym: 'SPY',  price: 585.34, chg:  0.42 },
  { sym: 'BTC',  price: 83241,  chg: -1.18 },
  { sym: 'TSLY', price: 7.61,   chg:  0.92 },
  { sym: 'GOLD', price: 3042,   chg:  0.21 },
]

const CLIENTS = [
  { id: 'DL2503',  name: 'David Low',    initials: 'DL', aum: 882750, returnPct: 35.8,  returnAmt: 232750, status: 'active',  tier: 'PWM', lastActive: '2 hrs ago', messages: 2 },
  { id: 'JT9841',  name: 'James Tan',    initials: 'JT', aum: 0,      returnPct: 0,     returnAmt: 0,      status: 'pending', tier: 'PWM', lastActive: 'Never',     messages: 0 },
  { id: 'MK2241',  name: 'Michelle Ko',  initials: 'MK', aum: 0,      returnPct: 0,     returnAmt: 0,      status: 'pending', tier: 'PWM', lastActive: 'Never',     messages: 0 },
]

const ACTIVITY = [
  { time: 'Today, 9:41 AM',     text: 'David Low signed in to portal',             color: '#C9A84C' },
  { time: 'Today, 8:20 AM',     text: 'Monthly fee collected — DL2503 · $9.23',    color: '#1D9E75' },
  { time: 'Yesterday, 4:15 PM', text: 'New message from David Low',                 color: '#C9A84C' },
  { time: 'Mar 31, 2026',       text: 'Portfolio rebalanced — DL2503',              color: '#1D9E75' },
  { time: 'Mar 28, 2026',       text: 'James Tan onboarding initiated',             color: '#8A7050' },
]

const MESSAGES = [
  { from: 'David Low', id: 'DL2503', initials: 'DL', time: 'Today, 9:30 AM',   preview: 'Hi Saswat, could you take a look at the Q1 performance and advise on rebalancing the TSLY position going into Q2?', unread: true },
  { from: 'David Low', id: 'DL2503', initials: 'DL', time: 'Mar 28, 2026',     preview: 'Just checking in on the TSLY dividend reinvestment strategy we discussed last week. Any updates?', unread: false },
]

const ACCESS_USERS = [
  { name: 'Saswat C.',   id: 'SaswatC', initials: 'SC', role: 'Advisor',    last: 'Now',       active: true,  avatarStyle: { background: 'linear-gradient(135deg,#1A3A6C,#4A7AB5)', color: '#E8F0FE' } },
  { name: 'David Low',   id: 'DL2503',  initials: 'DL', role: 'PWM Client', last: '2 hrs ago', active: true,  avatarStyle: { background: 'linear-gradient(135deg,#5C4620,#C9A84C)', color: '#0A0800' } },
  { name: 'James Tan',   id: 'JT9841',  initials: 'JT', role: 'PWM Client', last: 'Never',     active: false, avatarStyle: { background: 'rgba(40,36,30,0.9)', color: '#4A4030' } },
  { name: 'Michelle Ko', id: 'MK2241',  initials: 'MK', role: 'PWM Client', last: 'Never',     active: false, avatarStyle: { background: 'rgba(40,36,30,0.9)', color: '#4A4030' } },
]

function fmtAUM(v: number) {
  if (v === 0) return '—'
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`
  return `$${(v / 1000).toFixed(2)}K`
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: 'rgba(17,17,20,0.7)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '16px 20px', ...style }}>
      {children}
    </div>
  )
}

function MetricCard({ label, value, sub, color = '#C9A84C', badge, badgeColor }: {
  label: string; value: string; sub?: string; color?: string; badge?: string; badgeColor?: 'gain' | 'loss' | 'neutral'
}) {
  const bc = badgeColor === 'gain'
    ? { bg: 'rgba(29,158,117,0.14)', text: '#2DB870' }
    : badgeColor === 'loss'
      ? { bg: 'rgba(212,75,58,0.12)', text: '#D44B3A' }
      : { bg: 'rgba(201,168,76,0.1)', text: '#C9A84C' }
  return (
    <Card>
      <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4A4030', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color, letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</div>
      {badge && <div style={{ display: 'inline-block', marginTop: 8, fontSize: 9, letterSpacing: '0.1em', padding: '3px 8px', borderRadius: 20, background: bc.bg, color: bc.text }}>{badge}</div>}
      {sub && <div style={{ marginTop: 6, fontSize: 10, color: '#4A4030' }}>{sub}</div>}
    </Card>
  )
}

const SIDEBAR = [
  { label: 'Firm', items: [
    { id: 'command'  as AdvisorPage, text: 'Command Center', icon: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z', badge: '' },
  ]},
  { label: 'Clients', items: [
    { id: 'clients'  as AdvisorPage, text: 'All Clients',    icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75', badge: String(CLIENTS.length) },
    { id: 'messages' as AdvisorPage, text: 'Messages',       icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', badge: '2' },
  ]},
  { label: 'Business', items: [
    { id: 'revenue'  as AdvisorPage, text: 'Revenue & Fees', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', badge: '' },
  ]},
  { label: 'Admin', items: [
    { id: 'access'   as AdvisorPage, text: 'Portal Access',  icon: 'M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3', badge: '' },
    { id: 'profile'  as AdvisorPage, text: 'My Profile',     icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z', badge: '' },
  ]},
]

export default function AdvisorPortalPage() {
  const router = useRouter()
  const [page, setPage] = useState<AdvisorPage>('command')
  const [tickers, setTickers] = useState(TICKERS)
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const username = sessionStorage.getItem('ag_user') ?? ''
    if (username !== 'SaswatC') {
      router.push(username ? '/portal' : '/sign-in')
      return
    }
    setReady(true)
  }, [router])

  useEffect(() => {
    const id = setInterval(() => {
      setTickers(prev => prev.map(t => {
        const delta = (Math.random() - 0.49) * (t.sym === 'BTC' ? 80 : t.sym === 'GOLD' ? 2 : 0.04)
        return { ...t, price: Math.max(0.01, t.price + delta), chg: t.chg + (Math.random() - 0.5) * 0.05 }
      }))
    }, 3500)
    return () => clearInterval(id)
  }, [])

  if (!ready) return null

  const fmtPrice = (t: typeof TICKERS[0]) =>
    t.sym === 'BTC' || t.sym === 'GOLD' ? Math.round(t.price).toLocaleString() : t.price.toFixed(2)

  const totalAUM      = CLIENTS.reduce((s, c) => s + c.aum, 0)
  const activeClients = CLIENTS.filter(c => c.status === 'active').length
  const pendingCount  = CLIENTS.filter(c => c.status === 'pending').length

  return (
    <div style={{ background: '#07070A', color: '#E2DDD4', minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif", display: 'flex', flexDirection: 'column' }}>

      {/* ── Top bar ── */}
      <div style={{ background: 'rgba(10,10,13,0.97)', borderBottom: '1px solid rgba(201,168,76,0.12)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
            <div style={{ width: 28, height: 28, border: '1.5px solid rgba(201,168,76,0.6)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#C9A84C' }}>AG</div>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase' }}>Aurum Global</span>
            <span style={{ fontSize: 9, background: 'rgba(201,168,76,0.12)', color: '#C9A84C', padding: '2px 8px', borderRadius: 4, letterSpacing: '0.14em', fontWeight: 700, textTransform: 'uppercase', border: '1px solid rgba(201,168,76,0.28)' }}>ADVISOR</span>
          </div>
          <div style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.07)' }} />
          {/* Live tickers */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            {tickers.map(t => (
              <div key={t.sym} style={{ display: 'flex', gap: 5, alignItems: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 9, fontFamily: 'monospace', color: '#5A5040', letterSpacing: '0.1em' }}>{t.sym}</span>
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
            onClick={() => setPage('messages')}
            style={{ width: 34, height: 34, borderRadius: 9, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6A5E50" strokeWidth="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            <div style={{ position: 'absolute', top: 7, right: 7, width: 6, height: 6, background: '#C9A84C', borderRadius: '50%', boxShadow: '0 0 6px rgba(201,168,76,0.7)' }} />
          </button>
          <div
            onClick={() => setPage('profile')}
            style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#1A3A6C,#4A7AB5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#E8F0FE', cursor: 'pointer', letterSpacing: '0.04em', boxShadow: '0 0 0 2px rgba(201,168,76,0.3)' }}
          >SC</div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── Sidebar ── */}
        <div style={{ width: 210, background: '#08080B', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '18px 0', flexShrink: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {SIDEBAR.map(section => (
            <div key={section.label} style={{ marginBottom: 6 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.24em', color: '#342E26', textTransform: 'uppercase', padding: '0 16px', marginBottom: 4, marginTop: 14 }}>{section.label}</div>
              {section.items.map(item => {
                const isActive  = page === item.id
                const isHovered = hoveredNav === item.id
                return (
                  <div
                    key={item.id}
                    onClick={() => setPage(item.id)}
                    onMouseEnter={() => setHoveredNav(item.id)}
                    onMouseLeave={() => setHoveredNav(null)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', fontSize: 12, cursor: 'pointer', color: isActive ? '#C9A84C' : isHovered ? '#A89060' : '#5A5040', borderLeft: `2px solid ${isActive ? '#C9A84C' : 'transparent'}`, background: isActive ? 'rgba(201,168,76,0.08)' : isHovered ? 'rgba(255,255,255,0.02)' : 'transparent', transition: 'all 0.15s ease' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ flexShrink: 0 }}>
                      <path d={item.icon} />
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
            <div style={{ fontSize: 9, color: '#2E2A22', letterSpacing: '0.1em', marginBottom: 4 }}>SIGNED IN AS</div>
            <div style={{ fontSize: 10, color: '#4A4030' }}>Saswat C. · SaswatC</div>
            <div style={{ fontSize: 9, color: '#C9A84C', marginTop: 2, letterSpacing: '0.04em' }}>Chairman & CEO · Advisor</div>
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

              {/* ───────── COMMAND CENTER ───────── */}
              {page === 'command' && (
                <div>
                  {/* Header */}
                  <div style={{ background: 'linear-gradient(135deg,rgba(201,168,76,0.07),rgba(201,168,76,0.02))', border: '1px solid rgba(201,168,76,0.14)', borderRadius: 14, padding: '20px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 600, color: '#E8DDD0', marginBottom: 4, letterSpacing: '-0.01em' }}>{getGreeting()}, Saswat.</div>
                      <div style={{ fontSize: 12, color: '#6A5E50', lineHeight: 1.6 }}>
                        You have <span style={{ color: '#C9A84C' }}>2 unread messages</span> and <span style={{ color: '#8A7050' }}>{pendingCount} clients</span> pending portal activation.
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', flexShrink: 0 }}>
                      {[{ label: 'Advisor Access', color: '#C9A84C' }, { label: 'Full Permissions', color: '#8A7050' }, { label: '● Active', color: '#1D9E75' }].map(b => (
                        <div key={b.label} style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)', color: b.color, background: 'rgba(255,255,255,0.02)' }}>{b.label}</div>
                      ))}
                    </div>
                  </div>

                  {/* Firm metrics */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 12, marginBottom: 22 }}>
                    <MetricCard label="Total AUM"            value={fmtAUM(totalAUM)}       color="#C9A84C" badge="Under Management"  badgeColor="neutral" />
                    <MetricCard label="Active Clients"       value={String(activeClients)}  color="#1D9E75" badge="Fully Activated"   badgeColor="gain" />
                    <MetricCard label="Pending Activation"   value={String(pendingCount)}   color="#8A7050" badge="Awaiting Setup"    badgeColor="neutral" />
                    <MetricCard label="Fees Collected (Apr)" value="$9.23"                  color="#1D9E75" badge="DL2503 · Paid"     badgeColor="gain" />
                  </div>

                  {/* Client roster + Activity feed */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16, marginBottom: 22 }}>

                    {/* Client roster */}
                    <Card>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: '#C8BEA8', letterSpacing: '0.04em' }}>Client Roster</div>
                        <button onClick={() => setPage('clients')} style={{ fontSize: 9, color: '#C9A84C', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase' }}>View All →</button>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 70px 84px', gap: 8, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.04)', marginBottom: 4 }}>
                        {['Client', 'AUM', 'Return', 'Status'].map(h => (
                          <div key={h} style={{ fontSize: 8, letterSpacing: '0.16em', color: '#3A3328', textTransform: 'uppercase' }}>{h}</div>
                        ))}
                      </div>
                      {CLIENTS.map(c => (
                        <div key={c.id} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 70px 84px', gap: 8, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.03)', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 26, height: 26, borderRadius: '50%', background: c.status === 'active' ? 'linear-gradient(135deg,#5C4620,#C9A84C)' : 'rgba(40,36,30,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: c.status === 'active' ? '#0A0800' : '#4A4030', flexShrink: 0 }}>{c.initials}</div>
                            <div>
                              <div style={{ fontSize: 12, color: '#C8BEA8' }}>{c.name}</div>
                              <div style={{ fontSize: 9, color: '#3A3328', fontFamily: 'monospace' }}>{c.id}</div>
                            </div>
                          </div>
                          <div style={{ fontSize: 12, color: c.aum > 0 ? '#C9A84C' : '#3A3328', fontFamily: 'monospace' }}>{fmtAUM(c.aum)}</div>
                          <div style={{ fontSize: 11, color: c.returnPct > 0 ? '#1D9E75' : '#3A3328', fontFamily: 'monospace' }}>{c.returnPct > 0 ? `+${c.returnPct}%` : '—'}</div>
                          <span style={{ fontSize: 9, padding: '3px 8px', borderRadius: 20, background: c.status === 'active' ? 'rgba(29,158,117,0.14)' : 'rgba(138,112,80,0.12)', color: c.status === 'active' ? '#2DB870' : '#8A7050', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', width: 'fit-content' }}>
                            {c.status === 'active' ? '● Active' : '○ Pending'}
                          </span>
                        </div>
                      ))}
                    </Card>

                    {/* Activity feed */}
                    <Card>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#C8BEA8', letterSpacing: '0.04em', marginBottom: 16 }}>Activity Feed</div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {ACTIVITY.map((a, i) => (
                          <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: i < ACTIVITY.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none', alignItems: 'flex-start' }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: a.color, marginTop: 5, flexShrink: 0, boxShadow: `0 0 6px ${a.color}55` }} />
                            <div>
                              <div style={{ fontSize: 11, color: '#8A7A68', lineHeight: 1.5 }}>{a.text}</div>
                              <div style={{ fontSize: 9, color: '#3A3328', marginTop: 2, fontFamily: 'monospace' }}>{a.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Live market overview */}
                  <Card>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#C8BEA8', letterSpacing: '0.04em', marginBottom: 14 }}>Live Market Overview</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 12 }}>
                      {tickers.map(t => (
                        <div key={t.sym} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 8, padding: '12px 14px' }}>
                          <div style={{ fontSize: 9, letterSpacing: '0.18em', color: '#4A4030', textTransform: 'uppercase', marginBottom: 6 }}>{t.sym}</div>
                          <div style={{ fontSize: 16, fontWeight: 600, color: '#C8BEA8', fontFamily: 'monospace' }}>{fmtPrice(t)}</div>
                          <div style={{ fontSize: 10, marginTop: 4, color: t.chg >= 0 ? '#1D9E75' : '#D44B3A', fontFamily: 'monospace' }}>{t.chg >= 0 ? '+' : ''}{t.chg.toFixed(2)}%</div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {/* ───────── ALL CLIENTS ───────── */}
              {page === 'clients' && (
                <div>
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 9, letterSpacing: '0.24em', color: '#4A4030', textTransform: 'uppercase', marginBottom: 6 }}>Client Management</div>
                    <div style={{ fontSize: 22, fontWeight: 600, color: '#E8DDD0', letterSpacing: '-0.01em' }}>All Clients</div>
                    <div style={{ fontSize: 12, color: '#4A4030', marginTop: 4 }}>{CLIENTS.length} total · {activeClients} active · {pendingCount} pending activation</div>
                  </div>
                  <Card style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 100px 90px 90px 110px 90px', gap: 12, padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                      {['Client', 'Account', 'AUM', 'Return', 'Last Active', 'Status'].map(h => (
                        <div key={h} style={{ fontSize: 8, letterSpacing: '0.18em', color: '#3A3328', textTransform: 'uppercase' }}>{h}</div>
                      ))}
                    </div>
                    {CLIENTS.map((c, i) => (
                      <div key={c.id} style={{ display: 'grid', gridTemplateColumns: '1.4fr 100px 90px 90px 110px 90px', gap: 12, padding: '14px 20px', borderBottom: i < CLIENTS.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: '50%', background: c.status === 'active' ? 'linear-gradient(135deg,#5C4620,#C9A84C)' : 'rgba(40,36,30,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: c.status === 'active' ? '#0A0800' : '#4A4030', flexShrink: 0 }}>{c.initials}</div>
                          <div>
                            <div style={{ fontSize: 13, color: '#C8BEA8', fontWeight: 500 }}>{c.name}</div>
                            <div style={{ fontSize: 9, color: '#4A4030' }}>{c.tier} Client</div>
                          </div>
                        </div>
                        <div style={{ fontSize: 11, color: '#5A5040', fontFamily: 'monospace' }}>{c.id}</div>
                        <div style={{ fontSize: 12, color: c.aum > 0 ? '#C9A84C' : '#3A3328', fontFamily: 'monospace', fontWeight: c.aum > 0 ? 600 : 400 }}>{fmtAUM(c.aum)}</div>
                        <div style={{ fontSize: 11, color: c.returnPct > 0 ? '#1D9E75' : '#3A3328', fontFamily: 'monospace' }}>{c.returnPct > 0 ? `+${c.returnPct}%` : '—'}</div>
                        <div style={{ fontSize: 10, color: '#4A4030', fontFamily: 'monospace' }}>{c.lastActive}</div>
                        <span style={{ fontSize: 9, padding: '3px 8px', borderRadius: 20, background: c.status === 'active' ? 'rgba(29,158,117,0.14)' : 'rgba(138,112,80,0.12)', color: c.status === 'active' ? '#2DB870' : '#8A7050', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', width: 'fit-content' }}>
                          {c.status === 'active' ? '● Active' : '○ Pending'}
                        </span>
                      </div>
                    ))}
                  </Card>
                </div>
              )}

              {/* ───────── MESSAGES ───────── */}
              {page === 'messages' && (
                <div>
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 9, letterSpacing: '0.24em', color: '#4A4030', textTransform: 'uppercase', marginBottom: 6 }}>Client Communications</div>
                    <div style={{ fontSize: 22, fontWeight: 600, color: '#E8DDD0', letterSpacing: '-0.01em' }}>Messages</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {MESSAGES.map((m, i) => (
                      <Card key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', cursor: 'pointer', borderColor: m.unread ? 'rgba(201,168,76,0.22)' : 'rgba(255,255,255,0.06)', background: m.unread ? 'rgba(201,168,76,0.04)' : 'rgba(17,17,20,0.7)' }}>
                        <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#5C4620,#C9A84C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#0A0800', flexShrink: 0 }}>{m.initials}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: '#C8BEA8' }}>{m.from} <span style={{ fontSize: 9, color: '#4A4030', fontFamily: 'monospace', marginLeft: 6 }}>{m.id}</span></div>
                            <div style={{ fontSize: 9, color: '#3A3328', fontFamily: 'monospace' }}>{m.time}</div>
                          </div>
                          <div style={{ fontSize: 12, color: '#6A5E50', lineHeight: 1.7 }}>{m.preview}</div>
                        </div>
                        {m.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#C9A84C', flexShrink: 0, marginTop: 5, boxShadow: '0 0 8px rgba(201,168,76,0.6)' }} />}
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* ───────── REVENUE & FEES ───────── */}
              {page === 'revenue' && (
                <div>
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 9, letterSpacing: '0.24em', color: '#4A4030', textTransform: 'uppercase', marginBottom: 6 }}>Business Intelligence</div>
                    <div style={{ fontSize: 22, fontWeight: 600, color: '#E8DDD0', letterSpacing: '-0.01em' }}>Revenue & Fees</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 12, marginBottom: 22 }}>
                    <MetricCard label="Fees Collected (Apr)" value="$9.23"   color="#1D9E75" badge="On Time"              badgeColor="gain" />
                    <MetricCard label="Projected Annual"      value="$110.76" color="#C9A84C" sub="Based on current rate" />
                    <MetricCard label="Pending (2 clients)"   value="$0.00"   color="#8A7050" sub="Pending portal activation" />
                  </div>
                  <Card style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 90px 90px 90px 90px', gap: 12, padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                      {['Client', 'Account', 'Tier', 'Monthly Fee', 'Status'].map(h => (
                        <div key={h} style={{ fontSize: 8, letterSpacing: '0.18em', color: '#3A3328', textTransform: 'uppercase' }}>{h}</div>
                      ))}
                    </div>
                    {CLIENTS.map((c, i) => (
                      <div key={c.id} style={{ display: 'grid', gridTemplateColumns: '1.4fr 90px 90px 90px 90px', gap: 12, padding: '14px 20px', borderBottom: i < CLIENTS.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 28, height: 28, borderRadius: '50%', background: c.status === 'active' ? 'linear-gradient(135deg,#5C4620,#C9A84C)' : 'rgba(40,36,30,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: c.status === 'active' ? '#0A0800' : '#4A4030', flexShrink: 0 }}>{c.initials}</div>
                          <div style={{ fontSize: 13, color: '#C8BEA8' }}>{c.name}</div>
                        </div>
                        <div style={{ fontSize: 11, color: '#5A5040', fontFamily: 'monospace' }}>{c.id}</div>
                        <div style={{ fontSize: 11, color: '#5A5040' }}>{c.tier}</div>
                        <div style={{ fontSize: 13, color: c.status === 'active' ? '#C9A84C' : '#3A3328', fontFamily: 'monospace', fontWeight: 600 }}>{c.status === 'active' ? '$9.23' : '—'}</div>
                        <span style={{ fontSize: 9, padding: '3px 8px', borderRadius: 20, background: c.status === 'active' ? 'rgba(29,158,117,0.14)' : 'rgba(138,112,80,0.12)', color: c.status === 'active' ? '#2DB870' : '#8A7050', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', width: 'fit-content' }}>
                          {c.status === 'active' ? 'Paid' : 'Pending'}
                        </span>
                      </div>
                    ))}
                  </Card>
                </div>
              )}

              {/* ───────── PORTAL ACCESS ───────── */}
              {page === 'access' && (
                <div>
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 9, letterSpacing: '0.24em', color: '#4A4030', textTransform: 'uppercase', marginBottom: 6 }}>Administration</div>
                    <div style={{ fontSize: 22, fontWeight: 600, color: '#E8DDD0', letterSpacing: '-0.01em' }}>Portal Access</div>
                    <div style={{ fontSize: 12, color: '#4A4030', marginTop: 4 }}>Manage client portal activation and access levels. To activate a new client, add their credentials to the system.</div>
                  </div>
                  <Card style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 100px 110px 110px 80px', gap: 12, padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                      {['User', 'Account ID', 'Role', 'Last Login', 'Status'].map(h => (
                        <div key={h} style={{ fontSize: 8, letterSpacing: '0.18em', color: '#3A3328', textTransform: 'uppercase' }}>{h}</div>
                      ))}
                    </div>
                    {ACCESS_USERS.map((u, i) => (
                      <div key={u.id} style={{ display: 'grid', gridTemplateColumns: '1.4fr 100px 110px 110px 80px', gap: 12, padding: '14px 20px', borderBottom: i < ACCESS_USERS.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 30, height: 30, borderRadius: '50%', ...u.avatarStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, flexShrink: 0 }}>{u.initials}</div>
                          <div style={{ fontSize: 13, color: '#C8BEA8', fontWeight: 500 }}>{u.name}</div>
                        </div>
                        <div style={{ fontSize: 11, color: '#5A5040', fontFamily: 'monospace' }}>{u.id}</div>
                        <div style={{ fontSize: 11, color: u.role === 'Advisor' ? '#C9A84C' : '#6A5E50' }}>{u.role}</div>
                        <div style={{ fontSize: 10, color: '#3A3328', fontFamily: 'monospace' }}>{u.last}</div>
                        <span style={{ fontSize: 9, padding: '3px 8px', borderRadius: 20, background: u.active ? 'rgba(29,158,117,0.14)' : 'rgba(138,112,80,0.12)', color: u.active ? '#2DB870' : '#8A7050', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', width: 'fit-content' }}>
                          {u.active ? '● Active' : '○ Pending'}
                        </span>
                      </div>
                    ))}
                  </Card>
                  <div style={{ marginTop: 14, padding: '12px 16px', background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.12)', borderRadius: 10 }}>
                    <div style={{ fontSize: 10, color: '#6A5E50', lineHeight: 1.7 }}>
                      <span style={{ color: '#C9A84C', fontWeight: 600 }}>To activate a new client:</span> Add their username and password to the sign-in credentials and set <span style={{ fontFamily: 'monospace', color: '#8A7A68' }}>activated: true</span> in the portal user registry.
                    </div>
                  </div>
                </div>
              )}

              {/* ───────── PROFILE ───────── */}
              {page === 'profile' && (
                <div>
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 9, letterSpacing: '0.24em', color: '#4A4030', textTransform: 'uppercase', marginBottom: 6 }}>Account</div>
                    <div style={{ fontSize: 22, fontWeight: 600, color: '#E8DDD0', letterSpacing: '-0.01em' }}>My Profile</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 16 }}>
                    <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '28px 20px', textAlign: 'center' }}>
                      <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'linear-gradient(135deg,#1A3A6C,#4A7AB5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: '#E8F0FE', boxShadow: '0 0 0 3px rgba(201,168,76,0.35)' }}>SC</div>
                      <div>
                        <div style={{ fontSize: 17, fontWeight: 600, color: '#E8DDD0' }}>Saswat C.</div>
                        <div style={{ fontSize: 10, color: '#C9A84C', marginTop: 3, letterSpacing: '0.06em' }}>Chairman & Chief Executive Officer</div>
                        <div style={{ fontSize: 9, color: '#4A4030', marginTop: 5, fontFamily: 'monospace' }}>SaswatC · Advisor Console</div>
                      </div>
                      <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16 }}>
                        {[['Firm', 'Aurum Global Inc.'], ['Access Level', 'Advisor — Full'], ['Portal Version', 'Advisor Console'], ['Status', 'Active']].map(([k, v]) => (
                          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 8 }}>
                            <span style={{ color: '#4A4030' }}>{k}</span>
                            <span style={{ color: '#8A7A68' }}>{v}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <Card>
                        <div style={{ fontSize: 10, color: '#4A4030', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>Firm Overview</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                          {[
                            { label: 'Total Clients',     value: String(CLIENTS.length) },
                            { label: 'Active Portfolios', value: String(activeClients) },
                            { label: 'Total AUM',         value: fmtAUM(totalAUM) },
                            { label: 'Unread Messages',   value: '2' },
                          ].map(s => (
                            <div key={s.label} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 8, padding: '12px 14px' }}>
                              <div style={{ fontSize: 8, letterSpacing: '0.16em', color: '#3A3328', textTransform: 'uppercase', marginBottom: 6 }}>{s.label}</div>
                              <div style={{ fontSize: 18, fontWeight: 700, color: '#C9A84C' }}>{s.value}</div>
                            </div>
                          ))}
                        </div>
                      </Card>
                      <Card>
                        <button
                          onClick={() => { sessionStorage.removeItem('ag_user'); router.push('/') }}
                          style={{ width: '100%', padding: '11px', background: 'rgba(212,75,58,0.08)', border: '1px solid rgba(212,75,58,0.3)', borderRadius: 20, color: '#D44B3A', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' }}
                        >
                          Log Out
                        </button>
                      </Card>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
