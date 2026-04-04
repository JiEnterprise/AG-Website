'use client'

import { useEffect, useRef, useState } from 'react'

type PageId = 'dashboard' | 'portfolio' | 'performance' | 'trades' | 'statements' | 'dividends' | 'intertrans' | 'insights' | 'messages' | 'fees' | 'profile'

const TICKERS = [
  { sym: 'SPY',  price: 585.34, chg:  0.42 },
  { sym: 'BTC',  price: 83241,  chg: -1.18 },
  { sym: 'TSLY', price: 7.61,   chg:  0.92 },
  { sym: 'GOLD', price: 3042,   chg:  0.21 },
]

export default function PortalPage() {
  const [page, setPage] = useState<PageId>('dashboard')
  const [tickers, setTickers] = useState(TICKERS)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Ticker simulation
  useEffect(() => {
    const id = setInterval(() => {
      setTickers(prev => prev.map(t => {
        const delta = (Math.random() - 0.49) * (t.sym === 'BTC' ? 80 : t.sym === 'GOLD' ? 2 : 0.04)
        return { ...t, price: Math.max(0.01, t.price + delta), chg: t.chg + (Math.random() - 0.5) * 0.05 }
      }))
    }, 3500)
    return () => clearInterval(id)
  }, [])

  // Equity curve chart
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const smoothed = [650, 654, 663, 672, 695, 700, 710, 720, 740, 783, 800, 810, 824, 840, 855, 870, 882.75]
    const w = canvas.offsetWidth || 400
    const h = 130
    canvas.width = w * 2; canvas.height = h * 2
    ctx.scale(2, 2)
    const min = 600, max = 900
    const xStep = (w - 40) / (smoothed.length - 1)
    const toY = (v: number) => h - 16 - ((v - min) / (max - min)) * (h - 32)
    ctx.clearRect(0, 0, w, h)
    const drawLine = () => {
      ctx.beginPath()
      ctx.moveTo(20, toY(smoothed[0]))
      for (let i = 1; i < smoothed.length; i++) {
        const x = 20 + i * xStep, px = 20 + (i - 1) * xStep, cpx = (px + x) / 2
        ctx.bezierCurveTo(cpx, toY(smoothed[i-1]), cpx, toY(smoothed[i]), x, toY(smoothed[i]))
      }
    }
    const lastX = 20 + (smoothed.length - 1) * xStep
    drawLine()
    ctx.lineTo(lastX, h - 6); ctx.lineTo(20, h - 6); ctx.closePath()
    ctx.fillStyle = 'rgba(29,158,117,0.08)'; ctx.fill()
    drawLine()
    ctx.strokeStyle = '#1D9E75'; ctx.lineWidth = 1.5; ctx.stroke()
    ctx.fillStyle = '#C9A84C'
    ctx.beginPath(); ctx.arc(lastX, toY(smoothed[smoothed.length - 1]), 3, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = '#4A4438'; ctx.font = '10px monospace'
    ctx.fillText('$650', 20, h - 2)
    ctx.fillText('$882.75', lastX - 44, h - 2)
  }, [page])

  const nav = (id: PageId) => setPage(id)

  const fmtPrice = (t: typeof TICKERS[0]) =>
    t.sym === 'BTC' || t.sym === 'GOLD'
      ? Math.round(t.price).toLocaleString()
      : t.price.toFixed(2)

  return (
    <div style={{ background: '#09090C', borderRadius: 16, overflow: 'hidden', color: '#E2DDD4', minHeight: '100vh', border: '1px solid rgba(255,255,255,0.07)', fontFamily: 'system-ui, sans-serif' }}>

      {/* ── Top bar ── */}
      <div style={{ background: '#0D0D10', borderBottom: '1px solid rgba(184,146,42,0.14)', padding: '0 28px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.18em', color: '#C9A84C', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, border: '1.5px solid #C9A84C', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>AG</div>
            Aurum Global
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {tickers.map(t => (
              <div key={t.sym} style={{ fontSize: 10, fontFamily: 'monospace', display: 'flex', gap: 5, alignItems: 'center' }}>
                <span style={{ color: '#8A8070', letterSpacing: '0.08em' }}>{t.sym}</span>
                <span style={{ color: '#C8BFA8' }}>{fmtPrice(t)}</span>
                <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 3, background: t.chg >= 0 ? 'rgba(29,158,117,0.15)' : 'rgba(212,75,58,0.12)', color: t.chg >= 0 ? '#2D8C5E' : '#D44B3A' }}>
                  {t.chg >= 0 ? '+' : ''}{t.chg.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => nav('messages')} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(184,146,42,0.2)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6A5E50" strokeWidth="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <div style={{ position: 'absolute', top: 6, right: 6, width: 6, height: 6, background: '#C9A84C', borderRadius: '50%' }} />
          </button>
          <div onClick={() => nav('profile')} style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#8B6E2E,#C9A84C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 500, color: '#0A0900', cursor: 'pointer' }}>DL</div>
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 58px)' }}>

        {/* ── Sidebar ── */}
        <div style={{ width: 200, background: '#0A0A0D', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '20px 0', flexShrink: 0 }}>
          {[
            { label: 'Overview', items: [
              { id: 'dashboard' as PageId, icon: <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>, text: 'Dashboard' },
              { id: 'portfolio' as PageId, icon: <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, text: 'Portfolio' },
              { id: 'performance' as PageId, icon: <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>, text: 'Performance' },
            ]},
            { label: 'Activity', items: [
              { id: 'trades' as PageId, icon: <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>, text: 'Trade History' },
              { id: 'statements' as PageId, icon: <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, text: 'Statements' },
              { id: 'dividends' as PageId, icon: <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>, text: 'Income & Dividends' },
              { id: 'intertrans' as PageId, icon: <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/></svg>, text: 'Inter Trans' },
            ]},
            { label: 'Insights', items: [
              { id: 'insights' as PageId, icon: <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>, text: 'AG Insights' },
              { id: 'messages' as PageId, icon: <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, text: 'Messages', badge: '2' },
            ]},
            { label: 'Account', items: [
              { id: 'fees' as PageId, icon: <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, text: 'Fees & Billing' },
              { id: 'profile' as PageId, icon: <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, text: 'My Profile' },
            ]},
          ].map(section => (
            <div key={section.label} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.22em', color: '#4A4438', textTransform: 'uppercase', padding: '0 18px', marginBottom: 8 }}>{section.label}</div>
              {section.items.map(item => (
                <div key={item.id} onClick={() => nav(item.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 18px', fontSize: 12, color: page === item.id ? '#C9A84C' : '#6A6050', cursor: 'pointer', borderLeft: `2px solid ${page === item.id ? '#C9A84C' : 'transparent'}`, background: page === item.id ? 'rgba(184,146,42,0.08)' : 'transparent', transition: 'all 0.15s' }}>
                  <span style={{ width: 14, height: 14, flexShrink: 0 }}>{item.icon}</span>
                  {item.text}
                  {item.badge && <span style={{ marginLeft: 'auto', fontSize: 9, background: 'rgba(201,168,76,0.15)', color: '#C9A84C', padding: '2px 6px', borderRadius: 10 }}>{item.badge}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ── Main content ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>

          {/* DASHBOARD */}
          {page === 'dashboard' && (
            <div>
              <div style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 12, padding: '18px 22px', marginBottom: 22, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: '#E8DDD0', marginBottom: 3 }}>Good morning, David.</div>
                  <div style={{ fontSize: 12, color: '#6A5E50' }}>Your portfolio is performing well. November total return: +$168.35. Account ID: DL2503</div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['PWM Client','T-1 Billing','Active'].map(b => <div key={b} style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 4, border: '1px solid rgba(201,168,76,0.2)', color: '#8A7050' }}>{b}</div>)}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 12, marginBottom: 20 }}>
                <MetricCard label="Total AUM" value="$882.75" valueColor="#C9A84C" badge="+$168.35 Nov" badgeColor="gain" accent />
                <MetricCard label="Total Return (All-time)" value="+$232.75" valueColor="#1D9E75" badge="+35.8% ROI" badgeColor="gain" />
                <MetricCard label="Monthly Income" value="$12.80" valueColor="#C9A84C" sub="TSLY dividend (Oct)" />
                <MetricCard label="Fees (Dec 5)" value="$9.23" valueColor="#1D9E75" valueSize={20} badge="Paid" badgeColor="gain" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 10, marginBottom: 20 }}>
                {[
                  { label: 'Statements', page: 'statements' as PageId, icon: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>, icon2: <polyline points="14 2 14 8 20 8"/> },
                  { label: 'Trade Log',   page: 'trades'     as PageId, icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/> },
                  { label: 'Message PM', page: 'messages'    as PageId, icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/> },
                  { label: 'AG Insights',page: 'insights'    as PageId, icon: <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/> },
                ].map(qa => (
                  <div key={qa.label} onClick={() => nav(qa.page)} style={{ background: '#111115', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, padding: '14px 12px', textAlign: 'center', cursor: 'pointer' }}>
                    <div style={{ width: 28, height: 28, background: 'rgba(201,168,76,0.1)', borderRadius: 7, margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">{qa.icon}{qa.icon2}</svg>
                    </div>
                    <div style={{ fontSize: 10, color: '#6A5E50', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{qa.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <Card>
                  <SectionTitle>Portfolio equity curve</SectionTitle>
                  <div style={{ height: 140, position: 'relative', marginBottom: 12 }}>
                    <canvas ref={canvasRef} style={{ width: '100%', height: 130 }} />
                  </div>
                  <div style={{ fontSize: 10, color: '#4A4438', fontFamily: 'monospace' }}>10/15/2025 – 11/30/2025 · Realized P&L</div>
                </Card>
                <Card>
                  <SectionTitle>Allocation</SectionTitle>
                  {[
                    { name: 'CASH', color: '#C9A84C', pct: '100%', val: '$882.75', w: '100%' },
                    { name: 'TSLY', color: '#1D9E75', pct: '0%',   val: '$0.00',   w: '0%'   },
                    { name: 'PLUG', color: '#378ADD', pct: '0%',   val: '$0.00',   w: '0%'   },
                  ].map(a => (
                    <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ fontSize: 11, color: a.color, minWidth: 32 }}>{a.name}</div>
                      <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                        <div style={{ height: 4, borderRadius: 2, width: a.w, background: a.color }} />
                      </div>
                      <div style={{ fontSize: 11, color: '#6A5E50', minWidth: 34, textAlign: 'right', fontFamily: 'monospace' }}>{a.pct}</div>
                      <div style={{ fontSize: 11, color: '#C8BFA8', minWidth: 52, textAlign: 'right', fontFamily: 'monospace' }}>{a.val}</div>
                    </div>
                  ))}
                  <div style={{ marginTop: 12, fontSize: 10, color: '#4A4438' }}>Portfolio fully in cash as of Nov 30. Awaiting next entry signal.</div>
                </Card>
              </div>

              <div style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.14)', borderRadius: 12, padding: 18, display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 20 }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#6B4E1A,#C9A84C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 500, color: '#0A0900', flexShrink: 0 }}>SC</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#C9A84C', marginBottom: 2 }}>Saswat C. — Portfolio Manager</div>
                  <div style={{ fontSize: 10, color: '#5A5040', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Aurum Global PWM · DL2503</div>
                  <div style={{ fontSize: 12, color: '#9A9080', lineHeight: 1.65 }}>&ldquo;November was a strong month — we captured +$168.35 in realized gains across PLUG and two TSLY cycles. Account is fully in cash, positioned defensively into December. Watching TSLY for a re-entry around $7.00–$7.20 post-ex-dividend. Fee invoice due Dec 5.&rdquo;</div>
                  <button onClick={() => nav('messages')} style={{ fontSize: 10, marginTop: 12, padding: '7px 14px', background: 'transparent', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 6, color: '#C9A84C', cursor: 'pointer', letterSpacing: '0.08em' }}>Send Message →</button>
                </div>
              </div>
            </div>
          )}

          {/* PORTFOLIO */}
          {page === 'portfolio' && (
            <div>
              <PageHeader greeting="Account DL2503" title="Your Portfolio" sub="Holdings, allocation, and real-time position data" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 12, marginBottom: 20 }}>
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
                  { label: 'Volatility (portfolio)',  val: 'Low — fully in cash',        pct: 8,  color: '#1D9E75' },
                  { label: 'Concentration risk',      val: 'None — no open positions',   pct: 5,  color: '#1D9E75' },
                  { label: 'Strategy risk (TSLY)',    val: 'Medium — YieldMax decay',    pct: 52, color: '#C9A84C' },
                ].map(r => (
                  <div key={r.label} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#6A5E50', marginBottom: 5 }}>
                      <span>{r.label}</span><span style={{ color: r.color }}>{r.val}</span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, position: 'relative' }}>
                      <div style={{ height: 6, borderRadius: 3, width: `${r.pct}%`, background: r.color, position: 'absolute', left: 0, top: 0 }} />
                    </div>
                  </div>
                ))}
                <div style={{ fontSize: 11, color: '#4A4438', marginTop: 10 }}>Risk assessed by AGM system. TSLY is a YieldMax covered-call ETF subject to NAV erosion. Managed with active entry/exit discipline.</div>
              </Card>
            </div>
          )}

          {/* PERFORMANCE */}
          {page === 'performance' && (
            <div>
              <PageHeader greeting="Analytics" title="Performance" sub="Month-by-month returns, strategy attribution" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 12, marginBottom: 20 }}>
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
                    <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ fontSize: 11, color: a.color, minWidth: 32 }}>{a.name}</div>
                      <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                        <div style={{ height: 4, borderRadius: 2, width: a.w, background: a.color }} />
                      </div>
                      <div style={{ fontSize: 11, color: '#6A5E50', minWidth: 34, textAlign: 'right', fontFamily: 'monospace' }}>{a.pct}</div>
                      <div style={{ fontSize: 11, color: a.color, minWidth: 60, textAlign: 'right', fontFamily: 'monospace' }}>{a.val}</div>
                    </div>
                  ))}
                  <div style={{ marginTop: 14, fontSize: 10, color: '#4A4438' }}>Dividend income attributed separately. Total gross: +$245.55 before fees.</div>
                </Card>
              </div>
            </div>
          )}

          {/* TRADE HISTORY */}
          {page === 'trades' && (
            <div>
              <PageHeader greeting="Execution log" title="Trade History" sub="All executed orders, managed by AGM system" />
              <Card>
                {[
                  { sym: 'TSLY', type: 'sell', desc: '115 shares @ $7.66',              date: '11/25/2025', gain: '+$47.15',  gainColor: '#1D9E75' },
                  { sym: 'TSLY', type: 'buy',  desc: '115 shares @ $7.25',              date: '11/21/2025', gain: '-$833.75', gainColor: '#6A5E50' },
                  { sym: 'TSLY', type: 'sell', desc: '110 shares @ $7.61',              date: '11/19/2025', gain: '+$37.60',  gainColor: '#1D9E75' },
                  { sym: 'TSLY', type: 'buy',  desc: '100 shares @ $7.24 + 10 @ $7.55',date: '11/14/2025', gain: '-$799.50', gainColor: '#6A5E50' },
                  { sym: 'PLUG', type: 'sell', desc: '280 shares @ $2.80',              date: '11/10/2025', gain: '+$83.60',  gainColor: '#1D9E75' },
                  { sym: 'PLUG', type: 'buy',  desc: '280 shares @ $2.50',              date: '11/04/2025', gain: '-$700.20', gainColor: '#6A5E50' },
                  { sym: 'TSLY', type: 'sell', desc: '80 shares @ $8.69',               date: '10/29/2025', gain: '+$51.20',  gainColor: '#1D9E75' },
                  { sym: 'TSLY', type: 'div',  desc: '80 shares × $0.16 dividend',      date: '10/23/2025', gain: '+$12.80',  gainColor: '#C9A84C' },
                  { sym: 'TSLY', type: 'buy',  desc: '80 shares @ $8.05',               date: '10/17/2025', gain: '-$644.00', gainColor: '#6A5E50' },
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 12 }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 500, color: '#C9A84C', letterSpacing: '0.08em', minWidth: 40 }}>{t.sym}</span>
                    <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 4, marginRight: 8, background: t.type === 'buy' ? 'rgba(29,158,117,0.1)' : t.type === 'sell' ? 'rgba(212,75,58,0.08)' : 'rgba(201,168,76,0.1)', color: t.type === 'buy' ? '#1D9E75' : t.type === 'sell' ? '#D44B3A' : '#C9A84C' }}>{t.type.toUpperCase()}</span>
                    <span style={{ color: '#8A8070', flex: 1, padding: '0 10px' }}>{t.desc}</span>
                    <span style={{ color: '#4A4438', fontSize: 10, minWidth: 44, textAlign: 'right', fontFamily: 'monospace' }}>{t.date}</span>
                    <span style={{ fontWeight: 500, minWidth: 70, textAlign: 'right', color: t.gainColor }}>{t.gain}</span>
                  </div>
                ))}
              </Card>
            </div>
          )}

          {/* STATEMENTS */}
          {page === 'statements' && (
            <div>
              <PageHeader greeting="Official records" title="Monthly Statements" sub="Issued by Aurum Global PWM on the last day of each month" />
              <Card style={{ marginBottom: 20 }}>
                {[
                  { name: 'November 2025 — MCS', meta: 'Issued Nov 30, 2025 · AUM $882.75 · Return +$168.35', status: 'Paid', statusColor: '#1D9E75', statusBg: 'rgba(29,158,117,0.1)', iconColor: '#1D9E75' },
                  { name: 'October 2025 — MCS',  meta: 'Issued 10/31/2025 · AUM $695.20 · Return +$51.20 + $12.80 div',   status: 'Paid',     statusColor: '#1D9E75', statusBg: 'rgba(29,158,117,0.1)', iconColor: '#1D9E75' },
                ].map(s => (
                  <div key={s.name} style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 12, gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={s.iconColor} strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#C8BFA8', fontWeight: 500 }}>{s.name}</div>
                      <div style={{ fontSize: 10, color: '#4A4438', marginTop: 2 }}>{s.meta}</div>
                    </div>
                    <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, background: s.statusBg, color: s.statusColor }}>{s.status}</span>
                    <span style={{ fontSize: 10, color: '#5A5040', cursor: 'pointer', padding: '4px 10px', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6 }}>Download PDF</span>
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

          {/* DIVIDENDS */}
          {page === 'dividends' && (
            <div>
              <PageHeader greeting="Passive income" title="Income & Dividends" sub="Dividend history and projected income from holdings" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 12, marginBottom: 20 }}>
                <MetricCard label="Total Dividends" value="$12.80" valueColor="#C9A84C" sub="All-time" accent />
                <MetricCard label="This Month" value="$0.00" sub="No holdings Nov" />
                <MetricCard label="Projected (if TSLY)" value="~$12–18" valueSize={18} sub="Per 100 shares/week" />
                <MetricCard label="Yield (TSLY)" value="~85%" valueSize={18} sub="Annualized (variable)" />
              </div>
              <Card style={{ marginBottom: 14 }}>
                <SectionTitle>Dividend history</SectionTitle>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 0', fontSize: 12 }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 500, color: '#C9A84C', minWidth: 40 }}>TSLY</span>
                  <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 4, background: 'rgba(201,168,76,0.1)', color: '#C9A84C', marginRight: 8 }}>DIV</span>
                  <span style={{ color: '#8A8070', flex: 1, padding: '0 10px' }}>80 shares · Ex-div 10/23/2025 · $0.16/share</span>
                  <span style={{ color: '#4A4438', fontSize: 10, fontFamily: 'monospace', minWidth: 60, textAlign: 'right' }}>10/23/2025</span>
                  <span style={{ color: '#C9A84C', fontWeight: 500, minWidth: 70, textAlign: 'right' }}>+$12.80</span>
                </div>
              </Card>
              <Card>
                <SectionTitle>About TSLY income</SectionTitle>
                <div style={{ fontSize: 12, color: '#8A8070', lineHeight: 1.7 }}>TSLY (YieldMax TSLA Option Income Strategy ETF) distributes weekly dividends derived from covered call options on Tesla. The distribution rate varies weekly and is NOT guaranteed. NAV erosion is a structural risk — your PM actively manages entry/exit timing around ex-dividend dates to optimize total return vs. NAV decay.</div>
              </Card>
            </div>
          )}

          {/* INTER TRANS */}
          {page === 'intertrans' && (
            <div>
              <PageHeader greeting="Internal transfers" title="Inter Trans" sub="Account transaction log · Updated 12/21/2025 · Saswat C." />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 12, marginBottom: 20 }}>
                <MetricCard label="Total Gain / Loss" value="+$232.75" valueColor="#1D9E75" badge="+35.8%" badgeColor="gain" accent />
                <MetricCard label="Current Value" value="$882.75" valueColor="#C9A84C" sub="As of Nov 30" />
                <MetricCard label="TSLY Realized Gain" value="+$149.15" valueColor="#1D9E75" sub="All positions closed" />
                <MetricCard label="PLUG Realized Gain" value="+$83.60" valueColor="#1D9E75" sub="All positions closed" />
              </div>

              <SectionTitle>Transaction log</SectionTitle>
              <Card style={{ marginBottom: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '110px 80px 1fr', gap: 0, marginBottom: 8 }}>
                  <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4A4438' }}>Date</span>
                  <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4A4438' }}>Type</span>
                  <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4A4438', textAlign: 'right' }}>Amount</span>
                </div>
                {[
                  { date: '10/15/2025', typ: 'Dep',      desc: 'Initial deposit',                         amount: '650.00',  isIn: true  },
                  { date: '10/17/2025', typ: 'Wit (B)',   desc: 'TSLY buy — 80 shares @ $8.05',            amount: '644.00',  isIn: false },
                  { date: '10/23/2025', typ: 'Div',       desc: 'TSLY dividend · $0.1652/share',           amount: '13.22',   isIn: true  },
                  { date: '10/29/2025', typ: 'Dep (S)',   desc: 'TSLY sell — 80 shares @ $8.69',           amount: '695.20',  isIn: true  },
                  { date: '10/29/2025', typ: 'Wit (B)',   desc: 'Reinvested — internal reallocation',      amount: '700.20',  isIn: false },
                  { date: '11/10/2025', typ: 'Dep (S)',   desc: 'PLUG sell — 280 shares @ $2.80',          amount: '783.80',  isIn: true  },
                  { date: '11/14/2025', typ: 'Wit (B)',   desc: 'TSLY buy — 100 shares @ $7.24',           amount: '724.00',  isIn: false },
                  { date: '11/18/2025', typ: 'Wit (B)',   desc: 'TSLY buy — 10 shares @ $7.55',            amount: '75.50',   isIn: false },
                  { date: '11/19/2025', typ: 'Dep (S)',   desc: 'TSLY sell — 110 shares @ $7.61',          amount: '837.10',  isIn: true  },
                  { date: '11/21/2025', typ: 'Wit (S)',   desc: 'TSLY buy — 115 shares @ $7.25',           amount: '833.75',  isIn: false },
                  { date: '11/25/2025', typ: 'Dep (B)',   desc: 'TSLY sell — 115 shares @ $7.66',          amount: '880.90',  isIn: true  },
                  { date: '11/30/2025', typ: 'Wit',       desc: 'Month-end balance',                       amount: '882.75',  isIn: null  },
                  { date: '12/01/2025', typ: 'Dep',       desc: 'Tfr SUTTON BANK · due 12/05/2025',        amount: '882.75',  isIn: true  },
                ].map((t, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px 80px 1fr', gap: 0, padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 12, alignItems: 'center' }}>
                    <span style={{ fontSize: 10, color: '#4A4438', fontFamily: 'monospace' }}>{t.date}</span>
                    <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 4, display: 'inline-block', width: 'fit-content',
                      background: t.isIn === true ? 'rgba(29,158,117,0.1)' : t.isIn === false ? 'rgba(212,75,58,0.08)' : 'rgba(255,255,255,0.05)',
                      color: t.isIn === true ? '#1D9E75' : t.isIn === false ? '#D44B3A' : '#6A5E50' }}>
                      {t.typ}
                    </span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#8A8070', fontSize: 11 }}>{t.desc}</span>
                      <span style={{ fontFamily: 'monospace', fontWeight: 500,
                        color: t.isIn === true ? '#1D9E75' : t.isIn === false ? '#D44B3A' : '#C8BFA8' }}>
                        {t.isIn === true ? '+' : t.isIn === false ? '-' : ''}{t.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </Card>

              <SectionTitle>Position summary</SectionTitle>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Card>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.1em' }}>TSLY</span>
                    <span style={{ fontSize: 11, color: '#1D9E75', fontFamily: 'monospace', fontWeight: 500 }}>Gain: +$149.15</span>
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
                    const isBuy = r.note === 'BUY', isSell = r.note === 'SELL', isDiv = r.note === 'DIV'
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 11 }}>
                        <span style={{ color: '#4A4438', fontFamily: 'monospace', minWidth: 36 }}>{r.date}</span>
                        <span style={{ fontSize: 8, padding: '1px 5px', borderRadius: 3, background: isBuy ? 'rgba(29,158,117,0.1)' : isSell ? 'rgba(212,75,58,0.08)' : 'rgba(201,168,76,0.1)', color: isBuy ? '#1D9E75' : isSell ? '#D44B3A' : '#C9A84C' }}>{r.note}</span>
                        <span style={{ color: '#8A8070', minWidth: 28, textAlign: 'right', fontFamily: 'monospace' }}>{r.shares}</span>
                        <span style={{ color: '#6A5E50', minWidth: 36, textAlign: 'right', fontFamily: 'monospace' }}>@ {r.price}</span>
                        <span style={{ color: '#C8BFA8', marginLeft: 'auto', fontFamily: 'monospace' }}>{r.cost}</span>
                      </div>
                    )
                  })}
                  <div style={{ marginTop: 10, fontSize: 10, color: '#4A4438' }}>0 shares remaining · Fully closed</div>
                </Card>
                <Card>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 600, color: '#378ADD', letterSpacing: '0.1em' }}>PLUG</span>
                    <span style={{ fontSize: 11, color: '#1D9E75', fontFamily: 'monospace', fontWeight: 500 }}>Gain: +$83.60</span>
                  </div>
                  {[
                    { date: '11/04', shares: '+280', price: '$2.50', cost: '$700.20', note: 'BUY' },
                    { date: '11/10', shares: '-280', price: '$2.80', cost: '$783.80', note: 'SELL' },
                  ].map((r, i) => {
                    const isBuy = r.note === 'BUY'
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 11 }}>
                        <span style={{ color: '#4A4438', fontFamily: 'monospace', minWidth: 36 }}>{r.date}</span>
                        <span style={{ fontSize: 8, padding: '1px 5px', borderRadius: 3, background: isBuy ? 'rgba(29,158,117,0.1)' : 'rgba(212,75,58,0.08)', color: isBuy ? '#1D9E75' : '#D44B3A' }}>{r.note}</span>
                        <span style={{ color: '#8A8070', minWidth: 28, textAlign: 'right', fontFamily: 'monospace' }}>{r.shares}</span>
                        <span style={{ color: '#6A5E50', minWidth: 36, textAlign: 'right', fontFamily: 'monospace' }}>@ {r.price}</span>
                        <span style={{ color: '#C8BFA8', marginLeft: 'auto', fontFamily: 'monospace' }}>{r.cost}</span>
                      </div>
                    )
                  })}
                  <div style={{ marginTop: 10, fontSize: 10, color: '#4A4438' }}>0 shares remaining · Fully closed</div>
                </Card>
              </div>
            </div>
          )}

          {/* INSIGHTS */}
          {page === 'insights' && (
            <div>
              <PageHeader greeting="AG Insights" title="Market Intelligence" sub="Curated research from Aurum Global's intelligence desk" />
              {[
                { tag: 'Income Strategy', tagClass: 'rgba(138,55,221,0.1)', tagColor: '#8A37DD', title: 'YieldMax ETFs: Navigating NAV decay in the current rate environment',             meta: 'AG Insights · Saswat C. · Nov 28, 2025' },
                { tag: 'Equity',          tagClass: 'rgba(29,158,117,0.1)',  tagColor: '#1D9E75', title: 'PLUG Power deep dive: Hydrogen fuel cells and the green energy thesis',               meta: 'AG Insights · Nov 15, 2025' },
                { tag: 'Macro',           tagClass: 'rgba(55,138,221,0.1)',  tagColor: '#378ADD', title: 'Fed December meeting preview: Rate path implications for dividend-focused portfolios', meta: 'AG Insights · Dec 01, 2025' },
                { tag: 'Options',         tagClass: 'rgba(201,168,76,0.1)',  tagColor: '#C9A84C', title: 'Covered call strategy performance review: TSLY, MSFO, NVDY comparison Q4 2025',     meta: 'AG Insights · Nov 30, 2025' },
                { tag: 'Macro',           tagClass: 'rgba(55,138,221,0.1)',  tagColor: '#378ADD', title: 'Small cap recovery signal: Mean reversion setup in beaten-down clean energy names',   meta: 'AG Insights · Dec 02, 2025' },
              ].map((ins, i) => (
                <div key={i} style={{ background: '#111115', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, padding: 16, marginBottom: 10, cursor: 'pointer' }}>
                  <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '2px 7px', borderRadius: 3, display: 'inline-block', marginBottom: 8, background: ins.tagClass, color: ins.tagColor }}>{ins.tag}</span>
                  <div style={{ fontSize: 13, color: '#C8BFA8', fontWeight: 500, lineHeight: 1.4, marginBottom: 6 }}>{ins.title}</div>
                  <div style={{ fontSize: 10, color: '#4A4438', fontFamily: 'monospace' }}>{ins.meta}</div>
                </div>
              ))}
            </div>
          )}

          {/* MESSAGES */}
          {page === 'messages' && (
            <div>
              <PageHeader greeting="Secure channel" title="Messages" sub="Direct line to your portfolio manager" />
              <Card style={{ marginBottom: 14 }}>
                {[
                  { time: '11/30/2025 · 11:42', text: 'Hi David — November statement is ready. Total return +$168.35 across PLUG and two TSLY cycles. Fee of $9.23 due by 12/05/2025. Let me know if you have any questions about the trades.', unread: true },
                  { time: '11/25/2025 · 14:18', text: 'Closed the second TSLY position today — 115 shares sold at $7.66 for +$47.15. Account is now fully in cash. Watching for next entry signal around $7.00.', unread: true },
                  { time: '11/10/2025 · 09:55', text: 'PLUG closed — 280 shares @ $2.80, up from $2.50. Net gain +$83.60. Back in cash, now reloading TSLY on weakness.', unread: false },
                ].map((m, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#6B4E1A,#C9A84C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 500, color: '#0A0900', flexShrink: 0 }}>SC</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 500, color: '#C9A84C' }}>Saswat C.</span>
                        <span style={{ fontSize: 10, color: '#4A4438', fontFamily: 'monospace' }}>{m.time}</span>
                      </div>
                      <div style={{ fontSize: 12, color: '#8A8070', lineHeight: 1.55 }}>{m.text}</div>
                    </div>
                    {m.unread && <div style={{ width: 6, height: 6, background: '#C9A84C', borderRadius: '50%', marginTop: 6, flexShrink: 0 }} />}
                  </div>
                ))}
              </Card>
              <Card>
                <textarea style={{ width: '100%', background: 'transparent', border: 'none', resize: 'none', color: '#C8BFA8', fontSize: 12, outline: 'none', height: 70, lineHeight: 1.6 }} placeholder="Write a message to your portfolio manager..." />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                  <button style={{ padding: '8px 16px', background: '#C9A84C', border: 'none', borderRadius: 8, color: '#0A0900', fontSize: 10, fontWeight: 500, letterSpacing: '0.1em', cursor: 'pointer', textTransform: 'uppercase' }}>Send Message</button>
                </div>
              </Card>
            </div>
          )}

          {/* FEES */}
          {page === 'fees' && (
            <div>
              <PageHeader greeting="Billing" title="Fees & Billing" sub="Transparent fee structure — 1% monthly management fee on AUM" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 12, marginBottom: 20 }}>
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
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <button style={{ padding: '10px 18px', background: '#C9A84C', border: 'none', borderRadius: 8, color: '#0A0900', fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', cursor: 'pointer', textTransform: 'uppercase' }}>Pay Now — $9.23</button>
                <button style={{ padding: '10px 18px', background: 'transparent', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 8, color: '#C9A84C', fontSize: 11, letterSpacing: '0.08em', cursor: 'pointer' }}>Download Invoice</button>
              </div>
              <div style={{ marginTop: 20, fontSize: 11, color: '#4A4438', lineHeight: 1.7 }}>Fees are collected monthly on the 5th of each following month. The management fee is 1% of AUM at month-end. Transaction fees are charged per trade executed by the AGM system ($0.20 per side). All fees are disclosed in your monthly statement.</div>
            </div>
          )}

          {/* PROFILE */}
          {page === 'profile' && (
            <div>
              <PageHeader greeting="Account settings" title="My Profile" sub="Your account details and investor classification" />
              <Card style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#8B6E2E,#C9A84C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 500, color: '#0A0900', flexShrink: 0 }}>DL</div>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 500, color: '#E8DDD0' }}>David Low</div>
                    <div style={{ fontSize: 11, color: '#5A5040', marginTop: 2, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Private Wealth Client · DL2503</div>
                  </div>
                </div>
                <MiniTable rows={[
                  ['Client ID',         'DL2503',            '',       ''],
                  ['Account type',      'Individual — PWM',  '',       ''],
                  ['Billing tier',      'T-1 (Active)',       'gold',   ''],
                  ['Onboarded',         '10/15/2025',        '',       ''],
                  ['Portfolio Manager', 'Saswat C.',          'gold',   ''],
                  ['Management fee',    '1% monthly',        '',       ''],
                  ['Initial deposit',   '$650.00 · 10/15/2025', '',    ''],
                  ['Current AUM',       '$882.75',           'green',  ''],
                  ['Total return',      '+$232.75 (+35.8%)', 'green',  ''],
                ]} />
              </Card>
              <Card>
                <SectionTitle>Security & access</SectionTitle>
                <MiniTable rows={[
                  ['Two-factor auth',  'Enabled',          'green', ''],
                  ['Session timeout',  '30 minutes',       '',      ''],
                  ['Last login',       '12/21/2025 · 9:04 AM', '',   ''],
                ]} />
                <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                  <button style={{ padding: '10px 18px', background: 'transparent', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 8, color: '#C9A84C', fontSize: 11, cursor: 'pointer' }}>Change Password</button>
                  <button style={{ padding: '10px 18px', background: 'transparent', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 8, color: '#C9A84C', fontSize: 11, cursor: 'pointer' }}>Download All Statements</button>
                </div>
              </Card>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

// ── Sub-components ──────────────────────────────────────────────────────────

function PageHeader({ greeting, title, sub }: { greeting: string; title: string; sub: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 11, color: '#5A5040', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>{greeting}</div>
      <div style={{ fontSize: 22, fontWeight: 500, color: '#E8DDD0', letterSpacing: '-0.02em' }}>{title}</div>
      <div style={{ fontSize: 13, color: '#6A5E50', marginTop: 4 }}>{sub}</div>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, letterSpacing: '0.18em', color: '#5A5040', textTransform: 'uppercase', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
      {children}
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.05)' }} />
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

function MetricCard({ label, value, valueColor, valueSize, sub, badge, badgeColor, accent }: {
  label: string; value: string; valueColor?: string; valueSize?: number
  sub?: string; badge?: string; badgeColor?: 'gain' | 'loss' | 'gold'; accent?: boolean
}) {
  const badgeBg = { gain: 'rgba(29,158,117,0.12)', loss: 'rgba(212,75,58,0.1)', gold: 'rgba(201,168,76,0.12)' }
  const badgeFg = { gain: '#1D9E75', loss: '#D44B3A', gold: '#C9A84C' }
  return (
    <div style={{ background: '#111115', border: `1px solid ${accent ? 'rgba(201,168,76,0.22)' : 'rgba(255,255,255,0.05)'}`, borderRadius: 12, padding: '18px 18px 16px' }}>
      <div style={{ fontSize: 10, letterSpacing: '0.14em', color: '#5A5040', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: valueSize ?? 24, fontWeight: 500, color: valueColor ?? '#E8DDD0', letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</div>
      {badge && badgeColor && <div style={{ fontSize: 10, color: '#4A4438', marginTop: 6 }}><span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: badgeBg[badgeColor], color: badgeFg[badgeColor] }}>{badge}</span></div>}
      {sub && !badge && <div style={{ fontSize: 10, color: '#4A4438', marginTop: 6 }}>{sub}</div>}
    </div>
  )
}

function MiniTable({ rows }: { rows: string[][] }) {
  const colorMap: Record<string, string> = { green: '#1D9E75', gold: '#C9A84C', red: '#D44B3A', muted: '#6A5E50' }
  return (
    <table style={{ width: '100%', fontSize: 11, borderCollapse: 'collapse' }}>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <td style={{ padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#8A8070' }}>{row[0]}</td>
            {row[1] !== '' && <td style={{ padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#8A8070' }}>{row[1]}</td>}
            <td style={{ padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', textAlign: 'right', color: colorMap[row[2]] ?? '#C8BFA8', fontFamily: 'monospace' }}>{row[row.length - 2] || row[row.length - 1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function FeeBox({ rows }: { rows: string[][] }) {
  return (
    <div style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.14)', borderRadius: 10, padding: 16 }}>
      {rows.map((row, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: i === rows.length - 1 ? 13 : 12, padding: i === rows.length - 1 ? '10px 0 5px' : '5px 0', color: i === rows.length - 1 ? '#C9A84C' : '#8A8070', borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', fontWeight: i === rows.length - 1 ? 500 : 400 }}>
          <span>{row[0]}</span>
          <span style={{ fontFamily: 'monospace', color: row[2] ?? (i === rows.length - 1 ? '#C9A84C' : '#C8BFA8') }}>{row[1]}</span>
        </div>
      ))}
    </div>
  )
}
