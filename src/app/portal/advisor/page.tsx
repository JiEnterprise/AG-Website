'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

type AdvisorPage = 'command' | 'clients' | 'portfolio' | 'analytics' | 'calendar' | 'messages' | 'revenue' | 'access' | 'profile'

const TICKERS = [
  { sym: 'SPY',  price: 585.34, chg:  0.42 },
  { sym: 'BTC',  price: 83241,  chg: -1.18 },
  { sym: 'TSLY', price: 7.61,   chg:  0.92 },
  { sym: 'GOLD', price: 3042,   chg:  0.21 },
  { sym: 'QQQ',  price: 492.18, chg:  0.67 },
]

const SECTORS = [
  { name: 'Technology',  chg:  1.24 },
  { name: 'Healthcare',  chg:  0.38 },
  { name: 'Financials',  chg: -0.52 },
  { name: 'Energy',      chg:  0.81 },
  { name: 'Real Estate', chg: -1.14 },
  { name: 'Utilities',   chg:  0.22 },
]

const ECON = [
  { label: 'Fed Funds Rate', value: '5.25%' },
  { label: 'US CPI (Mar)',   value: '3.1%'  },
  { label: 'US 10Y Yield',   value: '4.38%' },
  { label: 'VIX',            value: '18.42' },
]

const CLIENTS = [
  { id: 'DL2503', name: 'David Low',   initials: 'DL', aum: 882750, returnPct: 35.8, returnAmt: 232750, status: 'active',  tier: 'PWM', lastActive: '2 hrs ago', messages: 2, health: 92, risk: 'Mod-Aggressive', nextMeeting: 'Apr 7',  inception: 'Oct 2025' },
  { id: 'JT9841', name: 'James Tan',   initials: 'JT', aum: 0,      returnPct: 0,    returnAmt: 0,      status: 'pending', tier: 'PWM', lastActive: 'Never',     messages: 0, health: 45, risk: 'TBD',            nextMeeting: 'Apr 12', inception: 'Mar 2026' },
  { id: 'MK2241', name: 'Michelle Ko', initials: 'MK', aum: 0,      returnPct: 0,    returnAmt: 0,      status: 'pending', tier: 'PWM', lastActive: 'Never',     messages: 0, health: 38, risk: 'TBD',            nextMeeting: 'Apr 15', inception: 'Mar 2026' },
]

const ALERTS = [
  { sev: 'info',    client: 'DL2503', name: 'David Low',   text: 'TSLY ex-dividend approaching',    detail: 'Ex-date: Apr 10 · Est. $12.40 yield',        time: '1 hr ago'   },
  { sev: 'warning', client: 'DL2503', name: 'David Low',   text: 'Crypto allocation above target',  detail: '+3.2% over strategic weight — review needed', time: '3 hrs ago'  },
  { sev: 'action',  client: 'JT9841', name: 'James Tan',   text: 'KYC documents pending',           detail: 'Required before portfolio activation',        time: '2 days ago' },
  { sev: 'action',  client: 'MK2241', name: 'Michelle Ko', text: 'Risk assessment not completed',   detail: 'Send questionnaire to client',                time: '5 days ago' },
]

const TASKS_DATA = [
  { id: 1, text: 'Q2 outlook call — David Low',         due: 'Today, 3:00 PM', priority: 'high',   done: false },
  { id: 2, text: 'Send onboarding packet — James Tan',  due: 'Apr 6',          priority: 'high',   done: false },
  { id: 3, text: 'Tax optimization review — DL2503',    due: 'Apr 15',         priority: 'medium', done: false },
  { id: 4, text: 'Michelle Ko risk assessment follow-up',due: 'Apr 15',         priority: 'medium', done: false },
  { id: 5, text: 'Monthly fee collection — Apr 2026',   due: 'Completed',      priority: 'low',    done: true  },
]

const MEETINGS = [
  { client: 'David Low',   id: 'DL2503', initials: 'DL', date: 'Apr 7',  time: '2:00 PM',  type: 'Quarterly Review', active: true  },
  { client: 'James Tan',   id: 'JT9841', initials: 'JT', date: 'Apr 12', time: '10:00 AM', type: 'Onboarding',       active: false },
  { client: 'Michelle Ko', id: 'MK2241', initials: 'MK', date: 'Apr 15', time: '3:30 PM',  type: 'Onboarding',       active: false },
]

const ALLOCATION = [
  { asset: 'US Equities',  pct: 45, color: '#C9A84C', value: 397238 },
  { asset: 'Fixed Income', pct: 20, color: '#1D9E75', value: 176550 },
  { asset: 'Alternatives', pct: 18, color: '#4A7AB5', value: 158895 },
  { asset: 'Crypto',       pct: 12, color: '#8A5CF7', value: 105930 },
  { asset: 'Cash',         pct:  5, color: '#4A4030', value:  44138 },
]

const HOLDINGS = [
  { ticker: 'SPY',  name: 'SPDR S&P 500 ETF',        weight: 26.6, value: 234862, retPct: 18.2  },
  { ticker: 'BND',  name: 'Vanguard Total Bond Mkt',  weight: 12.5, value: 110344, retPct:  4.2  },
  { ticker: 'TSLY', name: 'YieldMax TSLA Option ETF', weight: 10.0, value:  88275, retPct:  7.6  },
  { ticker: 'GOLD', name: 'SPDR Gold Shares',         weight: 10.0, value:  88275, retPct: 12.8  },
  { ticker: 'BTC',  name: 'Bitcoin (Direct)',          weight:  8.7, value:  76799, retPct: 42.1  },
]

const RISK_METRICS = [
  { label: 'Sharpe Ratio', value: '1.84',  pos: true  },
  { label: 'Beta (vs SPY)', value: '1.12', pos: true  },
  { label: 'Annlzd Vol',   value: '14.2%', pos: true  },
  { label: 'Max Drawdown', value: '-8.4%', pos: false },
  { label: 'Alpha',        value: '+6.3%', pos: true  },
  { label: 'Sortino',      value: '2.41',  pos: true  },
]

const MESSAGES = [
  { from: 'David Low', id: 'DL2503', initials: 'DL', time: 'Today, 9:30 AM', preview: 'Hi Saswat, could you take a look at the Q1 performance and advise on whether we should rebalance the crypto position before Q2? Also curious about the TSLY April distribution estimate.', unread: true  },
  { from: 'David Low', id: 'DL2503', initials: 'DL', time: 'Mar 28, 2026',   preview: 'Just checking in on the TSLY dividend reinvestment strategy we discussed last week — any updates on timing?', unread: false },
]

const AUM_DATA = [420, 510, 590, 650, 680, 710, 740, 770, 800, 835, 860, 882.75]
const AUM_MONTHS = ['May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr']

const ACCESS_USERS = [
  { name: 'Saswat C.',   id: 'SaswatC', initials: 'SC', role: 'Advisor',    last: 'Now',       active: true,  bg: 'linear-gradient(135deg,#1A3A6C,#4A7AB5)', fg: '#E8F0FE' },
  { name: 'David Low',   id: 'DL2503',  initials: 'DL', role: 'PWM Client', last: '2 hrs ago', active: true,  bg: 'linear-gradient(135deg,#5C4620,#C9A84C)', fg: '#0A0800' },
  { name: 'James Tan',   id: 'JT9841',  initials: 'JT', role: 'PWM Client', last: 'Never',     active: false, bg: 'rgba(40,36,30,0.9)',                       fg: '#4A4030' },
  { name: 'Michelle Ko', id: 'MK2241',  initials: 'MK', role: 'PWM Client', last: 'Never',     active: false, bg: 'rgba(40,36,30,0.9)',                       fg: '#4A4030' },
]

function fmtAUM(v: number) {
  if (!v) return '—'
  return v >= 1_000_000 ? `$${(v/1_000_000).toFixed(2)}M` : `$${(v/1000).toFixed(2)}K`
}
function getGreeting() {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
}
function getDate() {
  return new Date().toLocaleDateString('en-US',{ weekday:'long', month:'long', day:'numeric', year:'numeric' })
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background:'rgba(13,13,16,0.8)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:12, padding:'16px 20px', ...style }}>{children}</div>
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize:9, letterSpacing:'0.22em', color:'#4A4030', textTransform:'uppercase', marginBottom:14 }}>{children}</div>
}

function KPICard({ label, value, sub, color='#C9A84C', badge, badgeGain }: { label:string; value:string; sub?:string; color?:string; badge?:string; badgeGain?:boolean }) {
  return (
    <Card style={{ display:'flex', flexDirection:'column', gap:6 }}>
      <div style={{ fontSize:9, letterSpacing:'0.2em', color:'#4A4030', textTransform:'uppercase' }}>{label}</div>
      <div style={{ fontSize:26, fontWeight:700, color, letterSpacing:'-0.02em', lineHeight:1 }}>{value}</div>
      {badge && (
        <div style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:9, padding:'3px 8px', borderRadius:20, background: badgeGain ? 'rgba(29,158,117,0.14)' : 'rgba(201,168,76,0.1)', color: badgeGain ? '#2DB870' : '#C9A84C', width:'fit-content' }}>{badge}</div>
      )}
      {sub && <div style={{ fontSize:10, color:'#3A3328', lineHeight:1.5 }}>{sub}</div>}
    </Card>
  )
}

function HealthScore({ score }: { score: number }) {
  const color = score >= 80 ? '#1D9E75' : score >= 55 ? '#C9A84C' : '#D44B3A'
  return (
    <div style={{ display:'flex', alignItems:'center', gap:5 }}>
      <div style={{ width:28, height:28, borderRadius:'50%', border:`2px solid ${color}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:8, fontWeight:700, color }}>{score}</div>
    </div>
  )
}

const SIDEBAR_GROUPS = [
  { label:'Firm', items:[
    { id:'command'  as AdvisorPage, text:'Command Center',   icon:'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z', badge:'' },
  ]},
  { label:'Clients', items:[
    { id:'clients'  as AdvisorPage, text:'All Clients',      icon:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0', badge:String(CLIENTS.length) },
    { id:'messages' as AdvisorPage, text:'Messages',         icon:'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', badge:'2' },
  ]},
  { label:'Portfolios', items:[
    { id:'portfolio' as AdvisorPage, text:'Portfolio Monitor', icon:'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', badge:'' },
  ]},
  { label:'Business', items:[
    { id:'analytics' as AdvisorPage, text:'Analytics',        icon:'M18 20V10M12 20V4M6 20v-6', badge:'' },
    { id:'revenue'   as AdvisorPage, text:'Revenue & Fees',   icon:'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', badge:'' },
  ]},
  { label:'Workflow', items:[
    { id:'calendar'  as AdvisorPage, text:'Tasks & Calendar', icon:'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01', badge:'4' },
  ]},
  { label:'Admin', items:[
    { id:'access'    as AdvisorPage, text:'Portal Access',    icon:'M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3', badge:'' },
    { id:'profile'   as AdvisorPage, text:'My Profile',       icon:'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z', badge:'' },
  ]},
]

export default function AdvisorPortalPage() {
  const router = useRouter()
  const [page, setPage]           = useState<AdvisorPage>('command')
  const [tickers, setTickers]     = useState(TICKERS)
  const [hoveredNav, setHoveredNav] = useState<string|null>(null)
  const [tasks, setTasks]         = useState(TASKS_DATA)
  const [ready, setReady]         = useState(false)
  const analyticsRef              = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const u = sessionStorage.getItem('ag_user') ?? ''
    if (u !== 'SaswatC') { router.push(u ? '/portal' : '/sign-in'); return }
    setReady(true)
  }, [router])

  useEffect(() => {
    const id = setInterval(() => {
      setTickers(prev => prev.map(t => {
        const d = (Math.random()-0.49)*(t.sym==='BTC'?80:t.sym==='GOLD'?2:0.06)
        return { ...t, price: Math.max(0.01, t.price+d), chg: t.chg+(Math.random()-0.5)*0.06 }
      }))
    }, 3200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (page !== 'analytics') return
    const canvas = analyticsRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const data = AUM_DATA
    const w = canvas.offsetWidth || 560; const h = 160
    canvas.width = w*2; canvas.height = h*2; ctx.scale(2,2)
    const PAD = { l:36, r:14, t:14, b:28 }
    const cW = w-PAD.l-PAD.r; const cH = h-PAD.t-PAD.b
    const min = 380; const max = 920
    const toX = (i:number) => PAD.l+(i/(data.length-1))*cW
    const toY = (v:number) => PAD.t+cH-((v-min)/(max-min))*cH
    ctx.clearRect(0,0,w,h)
    // Grid
    ctx.setLineDash([2,4])
    ;[400,500,600,700,800,882].forEach(v => {
      const y = toY(v)
      ctx.beginPath(); ctx.moveTo(PAD.l,y); ctx.lineTo(w-PAD.r,y)
      ctx.strokeStyle='rgba(255,255,255,0.04)'; ctx.lineWidth=1; ctx.stroke()
      ctx.fillStyle='#3A3328'; ctx.font='7px monospace'
      ctx.fillText(`$${v}K`,0,y+3)
    })
    ctx.setLineDash([])
    // Gradient fill
    const grad = ctx.createLinearGradient(0,PAD.t,0,PAD.t+cH)
    grad.addColorStop(0,'rgba(201,168,76,0.18)')
    grad.addColorStop(0.7,'rgba(201,168,76,0.04)')
    grad.addColorStop(1,'rgba(201,168,76,0)')
    const drawPath = () => {
      ctx.beginPath(); ctx.moveTo(toX(0),toY(data[0]))
      for (let i=1;i<data.length;i++) {
        const cpx=(toX(i-1)+toX(i))/2
        ctx.bezierCurveTo(cpx,toY(data[i-1]),cpx,toY(data[i]),toX(i),toY(data[i]))
      }
    }
    drawPath()
    ctx.lineTo(toX(data.length-1),h-PAD.b); ctx.lineTo(toX(0),h-PAD.b)
    ctx.closePath(); ctx.fillStyle=grad; ctx.fill()
    drawPath()
    const lg = ctx.createLinearGradient(toX(0),0,toX(data.length-1),0)
    lg.addColorStop(0,'rgba(201,168,76,0.5)'); lg.addColorStop(1,'#C9A84C')
    ctx.strokeStyle=lg; ctx.lineWidth=1.8; ctx.stroke()
    // X labels
    ctx.fillStyle='#3A3328'; ctx.font='7px monospace'
    AUM_MONTHS.forEach((m,i) => {
      const x = PAD.l+(i/(AUM_MONTHS.length-1))*cW
      ctx.fillText(m, x-6, h-6)
    })
    // End dot
    const lx=toX(data.length-1); const ly=toY(data[data.length-1])
    const glow=ctx.createRadialGradient(lx,ly,0,lx,ly,8)
    glow.addColorStop(0,'rgba(201,168,76,0.4)'); glow.addColorStop(1,'transparent')
    ctx.beginPath(); ctx.arc(lx,ly,8,0,Math.PI*2); ctx.fillStyle=glow; ctx.fill()
    ctx.beginPath(); ctx.arc(lx,ly,3,0,Math.PI*2); ctx.fillStyle='#C9A84C'; ctx.fill()
  }, [page])

  if (!ready) return null

  const fmtPrice = (t: typeof TICKERS[0]) =>
    t.sym==='BTC'||t.sym==='GOLD' ? Math.round(t.price).toLocaleString() : t.price.toFixed(2)

  const totalAUM      = CLIENTS.reduce((s,c)=>s+c.aum,0)
  const activeClients = CLIENTS.filter(c=>c.status==='active').length
  const pendingCount  = CLIENTS.filter(c=>c.status==='pending').length
  const openTasks     = tasks.filter(t=>!t.done).length
  const sevColor = (s:string) => s==='info' ? '#4A7AB5' : s==='warning' ? '#C9A84C' : '#D44B3A'
  const sevBg    = (s:string) => s==='info' ? 'rgba(74,122,181,0.1)' : s==='warning' ? 'rgba(201,168,76,0.1)' : 'rgba(212,75,58,0.1)'

  return (
    <div style={{ background:'#07070A', color:'#E2DDD4', minHeight:'100vh', fontFamily:"'Inter',system-ui,sans-serif", display:'flex', flexDirection:'column' }}>

      {/* ── Topbar ── */}
      <div style={{ background:'rgba(8,8,11,0.98)', borderBottom:'1px solid rgba(201,168,76,0.1)', padding:'0 24px', height:56, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:50, backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:20 }}>
          <div style={{ display:'flex', alignItems:'center', gap:9, flexShrink:0 }}>
            <div style={{ width:28, height:28, border:'1.5px solid rgba(201,168,76,0.6)', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'#C9A84C' }}>AG</div>
            <span style={{ fontSize:11, fontWeight:600, letterSpacing:'0.2em', color:'#C9A84C', textTransform:'uppercase' }}>Aurum Global</span>
            <span style={{ fontSize:8, background:'rgba(201,168,76,0.14)', color:'#C9A84C', padding:'2px 8px', borderRadius:4, letterSpacing:'0.14em', fontWeight:700, textTransform:'uppercase', border:'1px solid rgba(201,168,76,0.3)' }}>ADVISOR CONSOLE</span>
          </div>
          <div style={{ width:1, height:20, background:'rgba(255,255,255,0.07)' }} />
          {/* Live pulse */}
          <div style={{ display:'flex', alignItems:'center', gap:5 }}>
            <div style={{ width:5, height:5, borderRadius:'50%', background:'#1D9E75', boxShadow:'0 0 6px #1D9E75', animation:'pulse 2s infinite' }} />
            <span style={{ fontSize:8, color:'#3A6A50', letterSpacing:'0.1em', textTransform:'uppercase' }}>Live Markets</span>
          </div>
          <div style={{ display:'flex', gap:12, alignItems:'center' }}>
            {tickers.map(t => (
              <div key={t.sym} style={{ display:'flex', gap:4, alignItems:'center', flexShrink:0 }}>
                <span style={{ fontSize:8, fontFamily:'monospace', color:'#4A4030', letterSpacing:'0.1em' }}>{t.sym}</span>
                <span style={{ fontSize:10, fontFamily:'monospace', color:'#C8BFA8', fontWeight:500 }}>{fmtPrice(t)}</span>
                <span style={{ fontSize:8, fontFamily:'monospace', padding:'1px 4px', borderRadius:3, background:t.chg>=0?'rgba(29,158,117,0.14)':'rgba(212,75,58,0.12)', color:t.chg>=0?'#2DB870':'#D44B3A', fontWeight:500 }}>
                  {t.chg>=0?'+':''}{t.chg.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ fontSize:9, color:'#3A3328', fontFamily:'monospace' }}>{getDate()}</div>
          <button onClick={()=>setPage('messages')} style={{ width:32, height:32, borderRadius:8, border:'1px solid rgba(255,255,255,0.07)', background:'rgba(255,255,255,0.02)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', position:'relative' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6A5E50" strokeWidth="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <div style={{ position:'absolute', top:6, right:6, width:6, height:6, background:'#C9A84C', borderRadius:'50%', boxShadow:'0 0 6px rgba(201,168,76,0.7)' }} />
          </button>
          <button onClick={()=>setPage('calendar')} style={{ width:32, height:32, borderRadius:8, border:'1px solid rgba(255,255,255,0.07)', background:'rgba(255,255,255,0.02)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', position:'relative' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6A5E50" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            {openTasks > 0 && <div style={{ position:'absolute', top:6, right:6, width:6, height:6, background:'#D44B3A', borderRadius:'50%' }} />}
          </button>
          <div onClick={()=>setPage('profile')} style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,#1A3A6C,#4A7AB5)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:'#E8F0FE', cursor:'pointer', boxShadow:'0 0 0 2px rgba(201,168,76,0.35)' }}>SC</div>
        </div>
      </div>

      <div style={{ display:'flex', flex:1, overflow:'hidden' }}>

        {/* ── Sidebar ── */}
        <div style={{ width:216, background:'#08080B', borderRight:'1px solid rgba(255,255,255,0.04)', padding:'16px 0', flexShrink:0, overflowY:'auto', display:'flex', flexDirection:'column' }}>
          {SIDEBAR_GROUPS.map(g => (
            <div key={g.label} style={{ marginBottom:2 }}>
              <div style={{ fontSize:8, letterSpacing:'0.26em', color:'#2A2620', textTransform:'uppercase', padding:'0 16px', marginBottom:2, marginTop:14 }}>{g.label}</div>
              {g.items.map(item => {
                const isActive  = page === item.id
                const isHovered = hoveredNav === item.id
                return (
                  <div key={item.id} onClick={()=>setPage(item.id)} onMouseEnter={()=>setHoveredNav(item.id)} onMouseLeave={()=>setHoveredNav(null)}
                    style={{ display:'flex', alignItems:'center', gap:9, padding:'7px 16px', fontSize:12, cursor:'pointer', color:isActive?'#C9A84C':isHovered?'#8A7A60':'#4A4438', borderLeft:`2px solid ${isActive?'#C9A84C':'transparent'}`, background:isActive?'rgba(201,168,76,0.07)':isHovered?'rgba(255,255,255,0.02)':'transparent', transition:'all 0.12s ease' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ flexShrink:0 }}>
                      <path d={item.icon}/>
                    </svg>
                    <span style={{ flex:1, letterSpacing:'0.01em' }}>{item.text}</span>
                    {item.badge && <span style={{ fontSize:8, background:'rgba(201,168,76,0.18)', color:'#C9A84C', padding:'1px 5px', borderRadius:8, fontWeight:700 }}>{item.badge}</span>}
                    {isActive && <div style={{ width:3, height:3, borderRadius:'50%', background:'#C9A84C' }} />}
                  </div>
                )
              })}
            </div>
          ))}
          <div style={{ flex:1 }} />
          <div style={{ padding:'12px 16px 0', borderTop:'1px solid rgba(255,255,255,0.04)', marginTop:12 }}>
            <div style={{ fontSize:8, color:'#2A2218', letterSpacing:'0.12em', marginBottom:3 }}>SIGNED IN AS</div>
            <div style={{ fontSize:10, color:'#4A4030', fontWeight:500 }}>Saswat C.</div>
            <div style={{ fontSize:8, color:'#C9A84C', marginTop:2, letterSpacing:'0.04em' }}>Chairman & CEO · Advisor</div>
          </div>
        </div>

        {/* ── Main ── */}
        <div style={{ flex:1, overflowY:'auto', background:'#07070A' }}>
          <AnimatePresence mode="wait">
            <motion.div key={page} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-4 }} transition={{ duration:0.18, ease:[0.22,1,0.36,1] }} style={{ padding:'26px 30px', minHeight:'100%' }}>

              {/* ══════════════ COMMAND CENTER ══════════════ */}
              {page==='command' && (
                <div>
                  {/* Morning Brief */}
                  <div style={{ background:'linear-gradient(135deg,rgba(201,168,76,0.08) 0%,rgba(201,168,76,0.02) 100%)', border:'1px solid rgba(201,168,76,0.16)', borderRadius:14, padding:'18px 24px', marginBottom:20, display:'flex', alignItems:'center', justifyContent:'space-between', gap:16 }}>
                    <div>
                      <div style={{ fontSize:8, letterSpacing:'0.22em', color:'#5A4A30', textTransform:'uppercase', marginBottom:5 }}>Advisor Console · Morning Brief</div>
                      <div style={{ fontSize:20, fontWeight:600, color:'#E8DDD0', letterSpacing:'-0.01em', marginBottom:4 }}>{getGreeting()}, Saswat.</div>
                      <div style={{ fontSize:12, color:'#6A5E50', lineHeight:1.6 }}>
                        <span style={{ color:'#C9A84C' }}>2 unread messages</span> · <span style={{ color:'#D44B3A' }}>{openTasks} open tasks</span> · <span style={{ color:'#8A7050' }}>{pendingCount} clients pending activation</span>
                      </div>
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6 }}>
                      <div style={{ display:'flex', gap:6 }}>
                        {[{l:'Advisor',c:'#C9A84C'},{l:'Full Access',c:'#8A7050'},{l:'● Active',c:'#1D9E75'}].map(b=>(
                          <div key={b.l} style={{ fontSize:8, letterSpacing:'0.1em', textTransform:'uppercase', padding:'3px 9px', borderRadius:20, border:'1px solid rgba(255,255,255,0.07)', color:b.c, background:'rgba(255,255,255,0.02)' }}>{b.l}</div>
                        ))}
                      </div>
                      {/* Market regime indicator */}
                      <div style={{ display:'flex', alignItems:'center', gap:6, padding:'4px 10px', borderRadius:8, background:'rgba(29,158,117,0.08)', border:'1px solid rgba(29,158,117,0.2)' }}>
                        <div style={{ width:5, height:5, borderRadius:'50%', background:'#1D9E75' }} />
                        <span style={{ fontSize:8, color:'#1D9E75', letterSpacing:'0.1em', textTransform:'uppercase', fontWeight:600 }}>Bull Market Regime</span>
                      </div>
                    </div>
                  </div>

                  {/* KPI row */}
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(4,minmax(0,1fr))', gap:10, marginBottom:18 }}>
                    <KPICard label="Total AUM"           value={fmtAUM(totalAUM)} badge="+$232K realized gains" badgeGain color="#C9A84C" />
                    <KPICard label="Active Clients"      value={String(activeClients)} badge="Fully activated" badgeGain color="#1D9E75" />
                    <KPICard label="Open Tasks"          value={String(openTasks)} badge={`${pendingCount} high priority`} color="#D44B3A" />
                    <KPICard label="Revenue (Apr)"       value="$9.23" badge="DL2503 · Collected" badgeGain color="#1D9E75" />
                  </div>

                  {/* Three column layout */}
                  <div style={{ display:'grid', gridTemplateColumns:'1.7fr 0.65fr 0.65fr', gap:12, marginBottom:18 }}>

                    {/* Client watchlist */}
                    <Card>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                        <SectionTitle>Client Watchlist</SectionTitle>
                        <button onClick={()=>setPage('clients')} style={{ fontSize:8, color:'#C9A84C', background:'none', border:'none', cursor:'pointer', letterSpacing:'0.12em', textTransform:'uppercase' }}>View All →</button>
                      </div>
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 72px 62px 52px 62px', gap:8, paddingBottom:8, borderBottom:'1px solid rgba(255,255,255,0.04)', marginBottom:4 }}>
                        {['Client','AUM','Return','Health','Status'].map(h=>(
                          <div key={h} style={{ fontSize:7, letterSpacing:'0.16em', color:'#2E2820', textTransform:'uppercase' }}>{h}</div>
                        ))}
                      </div>
                      {CLIENTS.map(c=>(
                        <div key={c.id} style={{ display:'grid', gridTemplateColumns:'1fr 72px 62px 52px 62px', gap:8, padding:'9px 0', borderBottom:'1px solid rgba(255,255,255,0.03)', alignItems:'center' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                            <div style={{ width:26, height:26, borderRadius:'50%', background:c.status==='active'?'linear-gradient(135deg,#5C4620,#C9A84C)':'rgba(40,36,30,0.9)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:8, fontWeight:700, color:c.status==='active'?'#0A0800':'#4A4030', flexShrink:0 }}>{c.initials}</div>
                            <div>
                              <div style={{ fontSize:12, color:'#C8BEA8', fontWeight:500 }}>{c.name}</div>
                              <div style={{ fontSize:8, color:'#3A3328', fontFamily:'monospace' }}>{c.id} · {c.risk}</div>
                            </div>
                          </div>
                          <div style={{ fontSize:11, color:c.aum>0?'#C9A84C':'#2E2820', fontFamily:'monospace', fontWeight:600 }}>{fmtAUM(c.aum)}</div>
                          <div style={{ fontSize:11, color:c.returnPct>0?'#1D9E75':'#2E2820', fontFamily:'monospace' }}>{c.returnPct>0?`+${c.returnPct}%`:'—'}</div>
                          <HealthScore score={c.health} />
                          <span style={{ fontSize:8, padding:'2px 7px', borderRadius:20, background:c.status==='active'?'rgba(29,158,117,0.14)':'rgba(138,112,80,0.12)', color:c.status==='active'?'#2DB870':'#8A7050', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', width:'fit-content' }}>
                            {c.status==='active'?'● Live':'○ Pending'}
                          </span>
                        </div>
                      ))}
                    </Card>

                    {/* Alerts */}
                    <Card>
                      <SectionTitle>Portfolio Alerts</SectionTitle>
                      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                        {ALERTS.map((a,i)=>(
                          <div key={i} style={{ padding:'9px 10px', borderRadius:8, background:sevBg(a.sev), borderLeft:`2px solid ${sevColor(a.sev)}` }}>
                            <div style={{ fontSize:10, color:'#C8BEA8', fontWeight:500, marginBottom:2, lineHeight:1.4 }}>{a.text}</div>
                            <div style={{ fontSize:8, color:'#5A5040', lineHeight:1.4 }}>{a.name} · {a.detail}</div>
                            <div style={{ fontSize:7, color:'#3A3328', marginTop:4, fontFamily:'monospace' }}>{a.time}</div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Today's agenda */}
                    <Card>
                      <SectionTitle>Today&apos;s Agenda</SectionTitle>
                      <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:14 }}>
                        {MEETINGS.slice(0,2).map((m,i)=>(
                          <div key={i} style={{ padding:'8px 10px', borderRadius:8, background:m.active?'rgba(201,168,76,0.07)':'rgba(255,255,255,0.02)', border:`1px solid ${m.active?'rgba(201,168,76,0.2)':'rgba(255,255,255,0.04)'}` }}>
                            <div style={{ fontSize:8, color:m.active?'#C9A84C':'#4A4030', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:3 }}>{m.date} · {m.time}</div>
                            <div style={{ fontSize:11, color:'#C8BEA8', fontWeight:500 }}>{m.client}</div>
                            <div style={{ fontSize:8, color:'#4A4030', marginTop:2 }}>{m.type}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ borderTop:'1px solid rgba(255,255,255,0.04)', paddingTop:12 }}>
                        <div style={{ fontSize:8, color:'#3A3328', letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:8 }}>Pending Tasks</div>
                        {tasks.filter(t=>!t.done).slice(0,3).map(t=>(
                          <div key={t.id} style={{ display:'flex', alignItems:'flex-start', gap:6, marginBottom:7 }}>
                            <div style={{ width:5, height:5, borderRadius:'50%', marginTop:4, flexShrink:0, background:t.priority==='high'?'#D44B3A':t.priority==='medium'?'#C9A84C':'#4A4030' }} />
                            <div>
                              <div style={{ fontSize:10, color:'#8A7A68', lineHeight:1.4 }}>{t.text}</div>
                              <div style={{ fontSize:7, color:'#3A3328', fontFamily:'monospace', marginTop:1 }}>{t.due}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Market overview */}
                  <div style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr 0.8fr', gap:12 }}>
                    {/* Indices */}
                    <Card>
                      <SectionTitle>Live Indices</SectionTitle>
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                        {tickers.map(t=>(
                          <div key={t.sym} style={{ padding:'10px 12px', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.04)', borderRadius:8 }}>
                            <div style={{ fontSize:7, letterSpacing:'0.18em', color:'#3A3328', textTransform:'uppercase', marginBottom:4 }}>{t.sym}</div>
                            <div style={{ fontSize:14, fontWeight:600, color:'#C8BEA8', fontFamily:'monospace' }}>{fmtPrice(t)}</div>
                            <div style={{ fontSize:9, marginTop:3, color:t.chg>=0?'#1D9E75':'#D44B3A', fontFamily:'monospace' }}>{t.chg>=0?'+':''}{t.chg.toFixed(2)}%</div>
                          </div>
                        ))}
                      </div>
                    </Card>
                    {/* Sectors */}
                    <Card>
                      <SectionTitle>Sector Performance</SectionTitle>
                      <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                        {SECTORS.map(s=>(
                          <div key={s.name} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'4px 0', borderBottom:'1px solid rgba(255,255,255,0.03)' }}>
                            <span style={{ fontSize:11, color:'#8A7A68' }}>{s.name}</span>
                            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                              <div style={{ width:50, height:3, borderRadius:2, background:'rgba(255,255,255,0.04)', overflow:'hidden' }}>
                                <div style={{ height:'100%', width:`${Math.abs(s.chg)/1.5*100}%`, background:s.chg>=0?'#1D9E75':'#D44B3A', borderRadius:2 }} />
                              </div>
                              <span style={{ fontSize:10, fontFamily:'monospace', color:s.chg>=0?'#1D9E75':'#D44B3A', minWidth:40, textAlign:'right' }}>{s.chg>=0?'+':''}{s.chg.toFixed(2)}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                    {/* Econ indicators */}
                    <Card>
                      <SectionTitle>Economic Indicators</SectionTitle>
                      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                        {ECON.map(e=>(
                          <div key={e.label} style={{ padding:'10px 12px', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.04)', borderRadius:8 }}>
                            <div style={{ fontSize:7, color:'#3A3328', letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:4 }}>{e.label}</div>
                            <div style={{ fontSize:16, fontWeight:600, color:'#C8BEA8', fontFamily:'monospace' }}>{e.value}</div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* ══════════════ ALL CLIENTS ══════════════ */}
              {page==='clients' && (
                <div>
                  <div style={{ marginBottom:22 }}>
                    <div style={{ fontSize:8, letterSpacing:'0.22em', color:'#4A4030', textTransform:'uppercase', marginBottom:5 }}>Client Management</div>
                    <div style={{ fontSize:22, fontWeight:600, color:'#E8DDD0', letterSpacing:'-0.01em' }}>All Clients</div>
                    <div style={{ fontSize:12, color:'#4A4030', marginTop:4 }}>{CLIENTS.length} total · {activeClients} active · {pendingCount} pending</div>
                  </div>
                  <Card style={{ padding:0, overflow:'hidden' }}>
                    <div style={{ display:'grid', gridTemplateColumns:'1.4fr 90px 80px 80px 70px 90px 80px 70px', gap:10, padding:'11px 20px', borderBottom:'1px solid rgba(255,255,255,0.06)', background:'rgba(255,255,255,0.02)' }}>
                      {['Client','Account','AUM','Return','Health','Risk','Next Mtg','Status'].map(h=>(
                        <div key={h} style={{ fontSize:7, letterSpacing:'0.18em', color:'#3A3328', textTransform:'uppercase' }}>{h}</div>
                      ))}
                    </div>
                    {CLIENTS.map((c,i)=>(
                      <div key={c.id} style={{ display:'grid', gridTemplateColumns:'1.4fr 90px 80px 80px 70px 90px 80px 70px', gap:10, padding:'13px 20px', borderBottom:i<CLIENTS.length-1?'1px solid rgba(255,255,255,0.03)':'none', alignItems:'center' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div style={{ width:32, height:32, borderRadius:'50%', background:c.status==='active'?'linear-gradient(135deg,#5C4620,#C9A84C)':'rgba(40,36,30,0.9)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:c.status==='active'?'#0A0800':'#4A4030', flexShrink:0 }}>{c.initials}</div>
                          <div>
                            <div style={{ fontSize:13, color:'#C8BEA8', fontWeight:500 }}>{c.name}</div>
                            <div style={{ fontSize:8, color:'#4A4030' }}>PWM · Since {c.inception}</div>
                          </div>
                        </div>
                        <div style={{ fontSize:10, color:'#5A5040', fontFamily:'monospace' }}>{c.id}</div>
                        <div style={{ fontSize:12, color:c.aum>0?'#C9A84C':'#3A3328', fontFamily:'monospace', fontWeight:c.aum>0?600:400 }}>{fmtAUM(c.aum)}</div>
                        <div style={{ fontSize:11, color:c.returnPct>0?'#1D9E75':'#3A3328', fontFamily:'monospace' }}>{c.returnPct>0?`+${c.returnPct}%`:'—'}</div>
                        <HealthScore score={c.health} />
                        <div style={{ fontSize:9, color:'#5A5040' }}>{c.risk}</div>
                        <div style={{ fontSize:9, color:'#4A4030', fontFamily:'monospace' }}>{c.nextMeeting}</div>
                        <span style={{ fontSize:8, padding:'3px 8px', borderRadius:20, background:c.status==='active'?'rgba(29,158,117,0.14)':'rgba(138,112,80,0.12)', color:c.status==='active'?'#2DB870':'#8A7050', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', width:'fit-content' }}>
                          {c.status==='active'?'● Active':'○ Pending'}
                        </span>
                      </div>
                    ))}
                  </Card>
                </div>
              )}

              {/* ══════════════ PORTFOLIO MONITOR ══════════════ */}
              {page==='portfolio' && (
                <div>
                  <div style={{ marginBottom:22 }}>
                    <div style={{ fontSize:8, letterSpacing:'0.22em', color:'#4A4030', textTransform:'uppercase', marginBottom:5 }}>Portfolio Operations</div>
                    <div style={{ fontSize:22, fontWeight:600, color:'#E8DDD0', letterSpacing:'-0.01em' }}>Portfolio Monitor</div>
                    <div style={{ fontSize:12, color:'#4A4030', marginTop:4 }}>Viewing: DL2503 — David Low · AUM {fmtAUM(totalAUM)}</div>
                  </div>

                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:12, marginBottom:12 }}>
                    {/* Allocation */}
                    <Card>
                      <SectionTitle>Asset Allocation</SectionTitle>
                      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                        {ALLOCATION.map(a=>(
                          <div key={a.asset}>
                            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                                <div style={{ width:8, height:8, borderRadius:'50%', background:a.color }} />
                                <span style={{ fontSize:11, color:'#C8BEA8' }}>{a.asset}</span>
                              </div>
                              <div style={{ display:'flex', gap:12 }}>
                                <span style={{ fontSize:10, color:'#5A5040', fontFamily:'monospace' }}>{fmtAUM(a.value)}</span>
                                <span style={{ fontSize:11, color:a.color, fontFamily:'monospace', fontWeight:600, minWidth:32, textAlign:'right' }}>{a.pct}%</span>
                              </div>
                            </div>
                            <div style={{ height:4, background:'rgba(255,255,255,0.04)', borderRadius:2, overflow:'hidden' }}>
                              <div style={{ height:'100%', width:`${a.pct}%`, background:a.color, borderRadius:2, opacity:0.8 }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Holdings */}
                    <Card>
                      <SectionTitle>Top Holdings — DL2503</SectionTitle>
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 60px 90px 70px', gap:8, paddingBottom:8, borderBottom:'1px solid rgba(255,255,255,0.04)', marginBottom:4 }}>
                        {['Position','Weight','Value','Return'].map(h=>(
                          <div key={h} style={{ fontSize:7, letterSpacing:'0.16em', color:'#2E2820', textTransform:'uppercase' }}>{h}</div>
                        ))}
                      </div>
                      {HOLDINGS.map((h,i)=>(
                        <div key={h.ticker} style={{ display:'grid', gridTemplateColumns:'1fr 60px 90px 70px', gap:8, padding:'9px 0', borderBottom:i<HOLDINGS.length-1?'1px solid rgba(255,255,255,0.03)':'none', alignItems:'center' }}>
                          <div>
                            <div style={{ fontSize:12, color:'#C8BEA8', fontWeight:500 }}>{h.ticker} <span style={{ fontSize:8, color:'#4A4030', fontWeight:400 }}>— {h.name}</span></div>
                          </div>
                          <div style={{ fontSize:11, color:'#C9A84C', fontFamily:'monospace' }}>{h.weight}%</div>
                          <div style={{ fontSize:11, color:'#8A7A68', fontFamily:'monospace' }}>${h.value.toLocaleString()}</div>
                          <div style={{ fontSize:11, color:'#1D9E75', fontFamily:'monospace' }}>+{h.retPct}%</div>
                        </div>
                      ))}
                    </Card>
                  </div>

                  {/* Risk metrics */}
                  <Card>
                    <SectionTitle>Risk Metrics — DL2503</SectionTitle>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(6,minmax(0,1fr))', gap:10 }}>
                      {RISK_METRICS.map(r=>(
                        <div key={r.label} style={{ padding:'12px 14px', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.04)', borderRadius:8, textAlign:'center' }}>
                          <div style={{ fontSize:7, color:'#3A3328', letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:6 }}>{r.label}</div>
                          <div style={{ fontSize:18, fontWeight:700, color:r.pos?'#1D9E75':'#D44B3A', fontFamily:'monospace' }}>{r.value}</div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {/* ══════════════ ANALYTICS ══════════════ */}
              {page==='analytics' && (
                <div>
                  <div style={{ marginBottom:22 }}>
                    <div style={{ fontSize:8, letterSpacing:'0.22em', color:'#4A4030', textTransform:'uppercase', marginBottom:5 }}>Business Intelligence</div>
                    <div style={{ fontSize:22, fontWeight:600, color:'#E8DDD0', letterSpacing:'-0.01em' }}>Analytics</div>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(4,minmax(0,1fr))', gap:10, marginBottom:18 }}>
                    <KPICard label="AUM Growth (6M)"   value="+110%" badge="+$462.75K" badgeGain />
                    <KPICard label="Fees YTD"          value="$9.23" badge="Projected $110.76/yr" badgeGain />
                    <KPICard label="Avg Client Return" value="+35.8%" badge="vs 18.2% benchmark" badgeGain color="#1D9E75" />
                    <KPICard label="Retention Rate"    value="100%" badge="0 churned clients" badgeGain color="#1D9E75" />
                  </div>
                  <Card style={{ marginBottom:12 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                      <SectionTitle>AUM Growth — May 2025 to Apr 2026</SectionTitle>
                      <div style={{ display:'flex', gap:12 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                          <div style={{ width:8, height:2, background:'#C9A84C', borderRadius:1 }} />
                          <span style={{ fontSize:8, color:'#4A4030' }}>Total AUM</span>
                        </div>
                      </div>
                    </div>
                    <canvas ref={analyticsRef} style={{ width:'100%', height:160 }} />
                  </Card>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                    <Card>
                      <SectionTitle>Performance Attribution — DL2503</SectionTitle>
                      {[
                        { label:'US Equities contribution', value:'+18.4%', pct:51 },
                        { label:'Crypto contribution',      value:'+9.2%',  pct:26 },
                        { label:'Fixed Income contribution', value:'+4.1%', pct:11 },
                        { label:'Gold contribution',         value:'+4.1%', pct:11 },
                      ].map(r=>(
                        <div key={r.label} style={{ marginBottom:10 }}>
                          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                            <span style={{ fontSize:11, color:'#8A7A68' }}>{r.label}</span>
                            <span style={{ fontSize:11, color:'#1D9E75', fontFamily:'monospace', fontWeight:600 }}>{r.value}</span>
                          </div>
                          <div style={{ height:3, background:'rgba(255,255,255,0.04)', borderRadius:2 }}>
                            <div style={{ height:'100%', width:`${r.pct}%`, background:'linear-gradient(90deg,rgba(201,168,76,0.5),#C9A84C)', borderRadius:2 }} />
                          </div>
                        </div>
                      ))}
                    </Card>
                    <Card>
                      <SectionTitle>Benchmark Comparison</SectionTitle>
                      {[
                        { label:'DL2503 Portfolio',  value:'+35.8%', color:'#C9A84C' },
                        { label:'S&P 500 (SPY)',      value:'+18.2%', color:'#4A7AB5' },
                        { label:'60/40 Benchmark',    value:'+10.4%', color:'#4A4030' },
                        { label:'AG Target Return',   value:'+25.0%', color:'#1D9E75' },
                      ].map(b=>(
                        <div key={b.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'9px 0', borderBottom:'1px solid rgba(255,255,255,0.03)' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                            <div style={{ width:8, height:8, borderRadius:'50%', background:b.color, opacity:0.8 }} />
                            <span style={{ fontSize:11, color:'#8A7A68' }}>{b.label}</span>
                          </div>
                          <span style={{ fontSize:14, fontWeight:700, color:b.color, fontFamily:'monospace' }}>{b.value}</span>
                        </div>
                      ))}
                    </Card>
                  </div>
                </div>
              )}

              {/* ══════════════ TASKS & CALENDAR ══════════════ */}
              {page==='calendar' && (
                <div>
                  <div style={{ marginBottom:22 }}>
                    <div style={{ fontSize:8, letterSpacing:'0.22em', color:'#4A4030', textTransform:'uppercase', marginBottom:5 }}>Workflow</div>
                    <div style={{ fontSize:22, fontWeight:600, color:'#E8DDD0', letterSpacing:'-0.01em' }}>Tasks & Calendar</div>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                    {/* Tasks */}
                    <div>
                      <Card style={{ marginBottom:12 }}>
                        <SectionTitle>Open Tasks ({openTasks})</SectionTitle>
                        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                          {tasks.map(t=>(
                            <div key={t.id} style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'10px 12px', borderRadius:8, background:t.done?'rgba(255,255,255,0.01)':'rgba(255,255,255,0.03)', border:`1px solid ${t.done?'rgba(255,255,255,0.03)':t.priority==='high'?'rgba(212,75,58,0.18)':t.priority==='medium'?'rgba(201,168,76,0.12)':'rgba(255,255,255,0.05)'}`, opacity:t.done?0.45:1 }}>
                              <div
                                onClick={()=>setTasks(prev=>prev.map(x=>x.id===t.id?{...x,done:!x.done}:x))}
                                style={{ width:16, height:16, borderRadius:4, border:`1.5px solid ${t.done?'#1D9E75':'rgba(255,255,255,0.15)'}`, background:t.done?'rgba(29,158,117,0.2)':'transparent', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0, marginTop:1 }}
                              >
                                {t.done && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                              </div>
                              <div style={{ flex:1 }}>
                                <div style={{ fontSize:12, color:t.done?'#4A4030':'#C8BEA8', textDecoration:t.done?'line-through':'none', lineHeight:1.4 }}>{t.text}</div>
                                <div style={{ fontSize:8, marginTop:3, fontFamily:'monospace', color:t.due==='Today, 3:00 PM'?'#D44B3A':t.done?'#3A3328':'#4A4030' }}>{t.due}</div>
                              </div>
                              <div style={{ width:6, height:6, borderRadius:'50%', background:t.priority==='high'?'#D44B3A':t.priority==='medium'?'#C9A84C':'#3A3328', flexShrink:0, marginTop:4 }} />
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>

                    {/* Upcoming meetings */}
                    <Card>
                      <SectionTitle>Upcoming Meetings</SectionTitle>
                      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                        {MEETINGS.map((m,i)=>(
                          <div key={i} style={{ display:'flex', gap:12, padding:'12px 14px', borderRadius:10, background:m.active?'rgba(201,168,76,0.07)':'rgba(255,255,255,0.02)', border:`1px solid ${m.active?'rgba(201,168,76,0.2)':'rgba(255,255,255,0.05)'}` }}>
                            <div style={{ width:38, height:38, borderRadius:8, background:m.active?'rgba(201,168,76,0.14)':'rgba(255,255,255,0.04)', border:`1px solid ${m.active?'rgba(201,168,76,0.3)':'rgba(255,255,255,0.06)'}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                              <div style={{ fontSize:7, color:m.active?'#C9A84C':'#4A4030', letterSpacing:'0.08em', textTransform:'uppercase' }}>{m.date.split(' ')[0]}</div>
                              <div style={{ fontSize:14, fontWeight:700, color:m.active?'#C9A84C':'#5A5040' }}>{m.date.split(' ')[1]}</div>
                            </div>
                            <div style={{ flex:1 }}>
                              <div style={{ fontSize:13, color:'#C8BEA8', fontWeight:500, marginBottom:2 }}>{m.client}</div>
                              <div style={{ fontSize:10, color:'#6A5E50', marginBottom:3 }}>{m.type}</div>
                              <div style={{ fontSize:9, color:m.active?'#C9A84C':'#4A4030', fontFamily:'monospace' }}>{m.time} · {m.id}</div>
                            </div>
                            {m.active && <div style={{ width:8, height:8, borderRadius:'50%', background:'#C9A84C', flexShrink:0, marginTop:4, boxShadow:'0 0 8px rgba(201,168,76,0.5)' }} />}
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* ══════════════ MESSAGES ══════════════ */}
              {page==='messages' && (
                <div>
                  <div style={{ marginBottom:22 }}>
                    <div style={{ fontSize:8, letterSpacing:'0.22em', color:'#4A4030', textTransform:'uppercase', marginBottom:5 }}>Client Communications</div>
                    <div style={{ fontSize:22, fontWeight:600, color:'#E8DDD0', letterSpacing:'-0.01em' }}>Messages</div>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {MESSAGES.map((m,i)=>(
                      <Card key={i} style={{ display:'flex', gap:14, alignItems:'flex-start', cursor:'pointer', borderColor:m.unread?'rgba(201,168,76,0.22)':'rgba(255,255,255,0.06)', background:m.unread?'rgba(201,168,76,0.04)':'rgba(13,13,16,0.8)' }}>
                        <div style={{ width:40, height:40, borderRadius:'50%', background:'linear-gradient(135deg,#5C4620,#C9A84C)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'#0A0800', flexShrink:0 }}>{m.initials}</div>
                        <div style={{ flex:1 }}>
                          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                            <div style={{ fontSize:13, fontWeight:600, color:'#C8BEA8' }}>{m.from} <span style={{ fontSize:8, color:'#4A4030', fontFamily:'monospace', marginLeft:6 }}>{m.id}</span></div>
                            <div style={{ fontSize:8, color:'#3A3328', fontFamily:'monospace' }}>{m.time}</div>
                          </div>
                          <div style={{ fontSize:12, color:'#6A5E50', lineHeight:1.7 }}>{m.preview}</div>
                        </div>
                        {m.unread && <div style={{ width:8, height:8, borderRadius:'50%', background:'#C9A84C', flexShrink:0, marginTop:5, boxShadow:'0 0 8px rgba(201,168,76,0.6)' }} />}
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* ══════════════ REVENUE ══════════════ */}
              {page==='revenue' && (
                <div>
                  <div style={{ marginBottom:22 }}>
                    <div style={{ fontSize:8, letterSpacing:'0.22em', color:'#4A4030', textTransform:'uppercase', marginBottom:5 }}>Business</div>
                    <div style={{ fontSize:22, fontWeight:600, color:'#E8DDD0', letterSpacing:'-0.01em' }}>Revenue & Fees</div>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3,minmax(0,1fr))', gap:10, marginBottom:18 }}>
                    <KPICard label="Collected (Apr)" value="$9.23"   badge="On schedule" badgeGain color="#1D9E75" />
                    <KPICard label="Projected (Ann)" value="$110.76" sub="Based on 1 active client" color="#C9A84C" />
                    <KPICard label="Pipeline (2 clients)" value="$221.52" sub="Pending activation" color="#8A7050" />
                  </div>
                  <Card style={{ padding:0, overflow:'hidden' }}>
                    <div style={{ display:'grid', gridTemplateColumns:'1.4fr 90px 80px 80px 80px 80px', gap:10, padding:'11px 20px', borderBottom:'1px solid rgba(255,255,255,0.06)', background:'rgba(255,255,255,0.02)' }}>
                      {['Client','Account','Tier','AUM','Monthly Fee','Status'].map(h=>(
                        <div key={h} style={{ fontSize:7, letterSpacing:'0.18em', color:'#3A3328', textTransform:'uppercase' }}>{h}</div>
                      ))}
                    </div>
                    {CLIENTS.map((c,i)=>(
                      <div key={c.id} style={{ display:'grid', gridTemplateColumns:'1.4fr 90px 80px 80px 80px 80px', gap:10, padding:'13px 20px', borderBottom:i<CLIENTS.length-1?'1px solid rgba(255,255,255,0.03)':'none', alignItems:'center' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div style={{ width:28, height:28, borderRadius:'50%', background:c.status==='active'?'linear-gradient(135deg,#5C4620,#C9A84C)':'rgba(40,36,30,0.9)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:8, fontWeight:700, color:c.status==='active'?'#0A0800':'#4A4030', flexShrink:0 }}>{c.initials}</div>
                          <div style={{ fontSize:13, color:'#C8BEA8', fontWeight:500 }}>{c.name}</div>
                        </div>
                        <div style={{ fontSize:10, color:'#5A5040', fontFamily:'monospace' }}>{c.id}</div>
                        <div style={{ fontSize:10, color:'#5A5040' }}>{c.tier}</div>
                        <div style={{ fontSize:11, color:c.aum>0?'#C9A84C':'#3A3328', fontFamily:'monospace' }}>{fmtAUM(c.aum)}</div>
                        <div style={{ fontSize:13, color:c.status==='active'?'#1D9E75':'#3A3328', fontFamily:'monospace', fontWeight:600 }}>{c.status==='active'?'$9.23':'—'}</div>
                        <span style={{ fontSize:8, padding:'3px 8px', borderRadius:20, background:c.status==='active'?'rgba(29,158,117,0.14)':'rgba(138,112,80,0.12)', color:c.status==='active'?'#2DB870':'#8A7050', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', width:'fit-content' }}>
                          {c.status==='active'?'Paid':'Pending'}
                        </span>
                      </div>
                    ))}
                  </Card>
                </div>
              )}

              {/* ══════════════ PORTAL ACCESS ══════════════ */}
              {page==='access' && (
                <div>
                  <div style={{ marginBottom:22 }}>
                    <div style={{ fontSize:8, letterSpacing:'0.22em', color:'#4A4030', textTransform:'uppercase', marginBottom:5 }}>Administration</div>
                    <div style={{ fontSize:22, fontWeight:600, color:'#E8DDD0', letterSpacing:'-0.01em' }}>Portal Access</div>
                    <div style={{ fontSize:12, color:'#4A4030', marginTop:4 }}>Manage portal activation and user access levels.</div>
                  </div>
                  <Card style={{ padding:0, overflow:'hidden', marginBottom:12 }}>
                    <div style={{ display:'grid', gridTemplateColumns:'1.4fr 100px 110px 110px 80px', gap:12, padding:'11px 20px', borderBottom:'1px solid rgba(255,255,255,0.06)', background:'rgba(255,255,255,0.02)' }}>
                      {['User','Account ID','Role','Last Login','Status'].map(h=>(
                        <div key={h} style={{ fontSize:7, letterSpacing:'0.18em', color:'#3A3328', textTransform:'uppercase' }}>{h}</div>
                      ))}
                    </div>
                    {ACCESS_USERS.map((u,i)=>(
                      <div key={u.id} style={{ display:'grid', gridTemplateColumns:'1.4fr 100px 110px 110px 80px', gap:12, padding:'13px 20px', borderBottom:i<ACCESS_USERS.length-1?'1px solid rgba(255,255,255,0.03)':'none', alignItems:'center' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div style={{ width:30, height:30, borderRadius:'50%', background:u.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:700, color:u.fg, flexShrink:0 }}>{u.initials}</div>
                          <div style={{ fontSize:13, color:'#C8BEA8', fontWeight:500 }}>{u.name}</div>
                        </div>
                        <div style={{ fontSize:10, color:'#5A5040', fontFamily:'monospace' }}>{u.id}</div>
                        <div style={{ fontSize:10, color:u.role==='Advisor'?'#C9A84C':'#6A5E50' }}>{u.role}</div>
                        <div style={{ fontSize:9, color:'#3A3328', fontFamily:'monospace' }}>{u.last}</div>
                        <span style={{ fontSize:8, padding:'3px 8px', borderRadius:20, background:u.active?'rgba(29,158,117,0.14)':'rgba(138,112,80,0.12)', color:u.active?'#2DB870':'#8A7050', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', width:'fit-content' }}>
                          {u.active?'● Active':'○ Pending'}
                        </span>
                      </div>
                    ))}
                  </Card>
                  <div style={{ padding:'12px 16px', background:'rgba(201,168,76,0.04)', border:'1px solid rgba(201,168,76,0.1)', borderRadius:10 }}>
                    <div style={{ fontSize:10, color:'#6A5E50', lineHeight:1.8 }}>
                      <span style={{ color:'#C9A84C', fontWeight:600 }}>To activate a new client:</span> Add their credentials to the sign-in system and add them to the <span style={{ fontFamily:'monospace', color:'#8A7A68' }}>PORTAL_USERS</span> registry with <span style={{ fontFamily:'monospace', color:'#8A7A68' }}>activated: true</span>.
                    </div>
                  </div>
                </div>
              )}

              {/* ══════════════ PROFILE ══════════════ */}
              {page==='profile' && (
                <div>
                  <div style={{ marginBottom:22 }}>
                    <div style={{ fontSize:8, letterSpacing:'0.22em', color:'#4A4030', textTransform:'uppercase', marginBottom:5 }}>Account</div>
                    <div style={{ fontSize:22, fontWeight:600, color:'#E8DDD0', letterSpacing:'-0.01em' }}>My Profile</div>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'280px 1fr', gap:16 }}>
                    <Card style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16, padding:'28px 20px', textAlign:'center' }}>
                      <div style={{ width:72, height:72, borderRadius:'50%', background:'linear-gradient(135deg,#1A3A6C,#4A7AB5)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, fontWeight:700, color:'#E8F0FE', boxShadow:'0 0 0 3px rgba(201,168,76,0.4)' }}>SC</div>
                      <div>
                        <div style={{ fontSize:18, fontWeight:600, color:'#E8DDD0' }}>Saswat C.</div>
                        <div style={{ fontSize:10, color:'#C9A84C', marginTop:3, letterSpacing:'0.06em' }}>Chairman & Chief Executive Officer</div>
                        <div style={{ fontSize:8, color:'#4A4030', marginTop:5, fontFamily:'monospace' }}>SaswatC · Advisor Console</div>
                      </div>
                      <div style={{ width:'100%', borderTop:'1px solid rgba(255,255,255,0.05)', paddingTop:16 }}>
                        {[['Firm','Aurum Global Inc.'],['Access','Advisor — Full'],['Console','Advisor Portal v2'],['Status','Active']].map(([k,v])=>(
                          <div key={k} style={{ display:'flex', justifyContent:'space-between', fontSize:11, marginBottom:9 }}>
                            <span style={{ color:'#4A4030' }}>{k}</span>
                            <span style={{ color:'#8A7A68' }}>{v}</span>
                          </div>
                        ))}
                      </div>
                      <button onClick={()=>{sessionStorage.removeItem('ag_user');router.push('/')}} style={{ width:'100%', padding:'10px', background:'rgba(212,75,58,0.08)', border:'1px solid rgba(212,75,58,0.28)', borderRadius:20, color:'#D44B3A', fontSize:10, fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', cursor:'pointer' }}>
                        Log Out
                      </button>
                    </Card>
                    <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                      <Card>
                        <SectionTitle>Firm Summary</SectionTitle>
                        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10 }}>
                          {[
                            { label:'Total Clients',     value:String(CLIENTS.length) },
                            { label:'Active Portfolios', value:String(activeClients)  },
                            { label:'Total AUM',         value:fmtAUM(totalAUM)        },
                            { label:'Unread Messages',   value:'2'                     },
                            { label:'Open Tasks',        value:String(openTasks)       },
                            { label:'Pending Clients',   value:String(pendingCount)    },
                          ].map(s=>(
                            <div key={s.label} style={{ padding:'12px 14px', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.04)', borderRadius:8 }}>
                              <div style={{ fontSize:7, letterSpacing:'0.16em', color:'#3A3328', textTransform:'uppercase', marginBottom:5 }}>{s.label}</div>
                              <div style={{ fontSize:20, fontWeight:700, color:'#C9A84C' }}>{s.value}</div>
                            </div>
                          ))}
                        </div>
                      </Card>
                      <Card>
                        <SectionTitle>Quick Navigation</SectionTitle>
                        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
                          {([['command','Command Center'],['clients','All Clients'],['portfolio','Portfolio Monitor'],['analytics','Analytics'],['calendar','Tasks & Calendar'],['revenue','Revenue & Fees']] as [AdvisorPage,string][]).map(([id,label])=>(
                            <button key={id} onClick={()=>setPage(id)} style={{ padding:'10px 12px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:8, color:'#8A7A68', fontSize:10, cursor:'pointer', textAlign:'left', transition:'all 0.15s' }}>
                              {label}
                            </button>
                          ))}
                        </div>
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
