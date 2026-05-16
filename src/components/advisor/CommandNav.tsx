'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Users, TrendingUp, Zap, Shield, BarChart2,
  Bell, ChevronDown, Activity, FileText, CreditCard, Search,
  MessageCircle, Cpu, Settings, Calendar, BookOpen, DollarSign,
  LogOut, User, ScrollText, CheckSquare, Mail, UserPlus,
} from 'lucide-react'
import { useAdvisorStore } from '@/lib/store/advisorStore'

const PRIMARY = [
  { label: 'Dashboard',   href: '/advisor/dashboard',   icon: LayoutDashboard },
  { label: 'Clients',     href: '/advisor/clients',     icon: Users },
  { label: 'Trade',       href: '/advisor/orders',      icon: TrendingUp },
  { label: 'Signals',     href: '/advisor/signals',     icon: Zap },
  { label: 'Risk',        href: '/advisor/risk',        icon: Shield },
  { label: 'Performance', href: '/advisor/performance', icon: BarChart2 },
]

const MORE = [
  { label: 'Trade Log',     href: '/advisor/trades',      icon: Activity },
  { label: 'Live P&L',      href: '/advisor/pnl',         icon: TrendingUp },
  { label: 'YieldMax',      href: '/advisor/yieldmax',    icon: DollarSign },
  { label: 'Statements',    href: '/advisor/statements',  icon: FileText },
  { label: 'Fee Collection',href: '/advisor/billing',     icon: CreditCard },
  { label: 'Ledger',        href: '/advisor/ledger',      icon: BookOpen },
  { label: 'Research',      href: '/advisor/research',    icon: Search },
  { label: 'Messages',      href: '/advisor/messages',    icon: MessageCircle },
  { label: 'Calendar',      href: '/advisor/calendar',    icon: Calendar },
  { label: 'Compliance',    href: '/advisor/compliance',  icon: CheckSquare },
  { label: 'Audit Log',     href: '/advisor/audit',       icon: ScrollText },
  { label: 'Onboard Client',href: '/advisor/clients/onboard', icon: UserPlus },
  { label: 'AGQuant Engine',href: '/advisor/agquant',     icon: Cpu },
  { label: 'Settings',      href: '/advisor/settings',    icon: Settings },
  { label: 'My Account',    href: '/advisor/personal',    icon: User },
]

// Mini live ticker data
const TICKERS = [
  { sym: 'NVDA', price: '875.20', delta: '+2.14%', up: true },
  { sym: 'TSLY', price: '14.35',  delta: '+0.42%', up: true },
  { sym: 'SPY',  price: '520.40', delta: '-0.18%', up: false },
  { sym: 'AAPL', price: '196.40', delta: '+0.61%', up: true },
  { sym: 'MSFT', price: '415.80', delta: '-0.09%', up: false },
  { sym: 'BTC',  price: '67,420', delta: '+1.88%', up: true },
]

export default function CommandNav() {
  const pathname  = usePathname()
  const [moreOpen, setMoreOpen] = useState(false)
  const [tickIdx,  setTickIdx]  = useState(0)
  const moreRef = useRef<HTMLDivElement>(null)

  const unreadAlerts   = useAdvisorStore((s) => s.unreadAlerts)
  const unreadMessages = useAdvisorStore((s) => s.unreadMessages)
  const pendingSignals = useAdvisorStore((s) => s.pendingSignals)

  // Rotate ticker
  useEffect(() => {
    const t = setInterval(() => setTickIdx((i) => (i + 1) % TICKERS.length), 2800)
    return () => clearInterval(t)
  }, [])

  // Close more menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')
  const moreActive = MORE.some((m) => isActive(m.href))
  const tick = TICKERS[tickIdx]

  return (
    <nav className="ag-nav" aria-label="Advisor navigation">
      <div className="ag-nav-inner">

        {/* ── Brand ─── */}
        <Link href="/advisor/dashboard" className="ag-brand" aria-label="AG Command home">
          <span className="ag-brand-mark">AG</span>
          <span className="ag-brand-name">COMMAND</span>
        </Link>

        {/* ── Divider ─── */}
        <div className="ag-nav-sep" />

        {/* ── Primary tabs ─── */}
        <div className="ag-tabs" role="list">
          {PRIMARY.map((item) => {
            const active = isActive(item.href)
            const Icon   = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                role="listitem"
                className={`ag-tab${active ? ' ag-tab-on' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={12} strokeWidth={active ? 2 : 1.5} />
                <span>{item.label}</span>
                {item.label === 'Signals' && pendingSignals > 0 && (
                  <span className="ag-tab-dot ag-dot-warn" />
                )}
              </Link>
            )
          })}

          {/* More dropdown */}
          <div className="ag-more-wrap" ref={moreRef}>
            <button
              className={`ag-tab${moreActive ? ' ag-tab-on' : ''}`}
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
            >
              <span>More</span>
              <ChevronDown size={10} strokeWidth={1.5} style={{ transform: moreOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }} />
            </button>
            {moreOpen && (
              <div className="ag-more-menu" role="menu">
                {MORE.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      className={`ag-more-item${isActive(item.href) ? ' ag-more-item-on' : ''}`}
                      onClick={() => setMoreOpen(false)}
                    >
                      <Icon size={12} strokeWidth={1.5} />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── Spacer ─── */}
        <div style={{ flex: 1 }} />

        {/* ── Live ticker chip ─── */}
        <div className="ag-tick-chip">
          <span className="ag-tick-sym">{tick.sym}</span>
          <span className="ag-tick-price">{tick.price}</span>
          <span className={`ag-tick-delta ${tick.up ? 'ag-up' : 'ag-dn'}`}>{tick.delta}</span>
        </div>

        <div className="ag-nav-sep" />

        {/* ── Alerts ─── */}
        <Link href="/advisor/alerts" className="ag-icon-btn" aria-label={`Alerts${unreadAlerts > 0 ? ` (${unreadAlerts} unread)` : ''}`}>
          <Bell size={13} strokeWidth={1.5} />
          {unreadAlerts > 0 && <span className="ag-badge-dot" />}
        </Link>

        {/* ── Messages ─── */}
        <Link href="/advisor/messages" className="ag-icon-btn" aria-label={`Messages${unreadMessages > 0 ? ` (${unreadMessages} unread)` : ''}`}>
          <MessageCircle size={13} strokeWidth={1.5} />
          {unreadMessages > 0 && <span className="ag-badge-dot" />}
        </Link>

        <div className="ag-nav-sep" />

        {/* ── User chip ─── */}
        <div className="ag-user">
          <div className="ag-user-av">SC</div>
          <div className="ag-user-text">
            <div className="ag-user-name">Saswat C.</div>
            <div className="ag-user-role">Founder · PM</div>
          </div>
        </div>
      </div>
    </nav>
  )
}
