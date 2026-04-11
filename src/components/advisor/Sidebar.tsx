'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  Users,
  BarChart2,
  Maximize2,
  Activity,
  Shield,
  Plus,
  FileText,
  CreditCard,
  Calendar,
  Search,
  Bell,
  MessageCircle,
  Cpu,
  Settings,
} from 'lucide-react'
import { useAdvisorStore } from '@/lib/store/advisorStore'
import { formatCurrency } from '@/lib/formatters'

type NavItem = {
  label: string
  href: '/advisor/dashboard' | '/advisor/clients' | '/advisor/performance' | '/advisor/trades' | '/advisor/signals' | '/advisor/risk' | '/advisor/orders' | '/advisor/statements' | '/advisor/billing' | '/advisor/calendar' | '/advisor/research' | '/advisor/alerts' | '/advisor/messages' | '/advisor/agquant' | '/advisor/settings'
  icon: LucideIcon
  badge?: 'clients' | 'signals' | 'billing' | 'alerts' | 'messages' | 'statements'
}

const NAV_GROUPS: { label: string; items: NavItem[] }[] = [
  {
    label: 'Command',
    items: [
      { label: 'Dashboard', href: '/advisor/dashboard', icon: LayoutDashboard },
      { label: 'Client Roster', href: '/advisor/clients', icon: Users, badge: 'clients' },
      { label: 'Performance', href: '/advisor/performance', icon: BarChart2 },
    ],
  },
  {
    label: 'Trading',
    items: [
      { label: 'Trade Log', href: '/advisor/trades', icon: Maximize2 },
      { label: 'AGQuant Signals', href: '/advisor/signals', icon: Activity, badge: 'signals' },
      { label: 'Risk Monitor', href: '/advisor/risk', icon: Shield },
      { label: 'Place Order', href: '/advisor/orders', icon: Plus },
    ],
  },
  {
    label: 'Reporting',
    items: [
      { label: 'Statements', href: '/advisor/statements', icon: FileText, badge: 'statements' },
      { label: 'Fee Collection', href: '/advisor/billing', icon: CreditCard, badge: 'billing' },
      { label: 'Event Calendar', href: '/advisor/calendar', icon: Calendar },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { label: 'Research Desk', href: '/advisor/research', icon: Search },
      { label: 'Alerts', href: '/advisor/alerts', icon: Bell, badge: 'alerts' },
      { label: 'Client Messages', href: '/advisor/messages', icon: MessageCircle, badge: 'messages' },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'AGQuant Engine', href: '/advisor/agquant', icon: Cpu },
      { label: 'Settings', href: '/advisor/settings', icon: Settings },
    ],
  },
]

function Badge({ variant, text }: { variant: 'red' | 'gold' | 'green'; text: string }) {
  return (
    <span className={`si-badge ${variant === 'red' ? 'sb-red' : variant === 'gold' ? 'sb-gold' : 'sb-green'}`}>
      {text}
    </span>
  )
}

export default function Sidebar() {
  const pathname = usePathname()
  const setActiveRoute = useAdvisorStore((state) => state.setActiveRoute)
  const clientCount = useAdvisorStore((state) => state.clientCount)
  const pendingSignals = useAdvisorStore((state) => state.pendingSignals)
  const unreadAlerts = useAdvisorStore((state) => state.unreadAlerts)
  const unreadMessages = useAdvisorStore((state) => state.unreadMessages)

  useEffect(() => {
    if (pathname.startsWith('/advisor/')) {
      setActiveRoute(pathname as Parameters<typeof setActiveRoute>[0])
    }
  }, [pathname, setActiveRoute])

  return (
    <aside
      role="navigation"
      aria-label="Advisor navigation"
      className="side"
    >
      {NAV_GROUPS.map((group) => (
        <div key={group.label} className="sg">
          <p className="sg-lbl">{group.label}</p>
          <div>
            {group.items.map((item) => {
              const active = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`si ${active ? 'on' : ''}`}
                >
                  <Icon size={13} />
                  <span className="truncate">{item.label}</span>
                  {item.badge === 'clients' && <Badge variant="gold" text={String(clientCount)} />}
                  {item.badge === 'signals' && pendingSignals > 0 && <Badge variant="red" text={String(pendingSignals)} />}
                  {item.badge === 'billing' && <Badge variant="red" text={formatCurrency(9.23)} />}
                  {item.badge === 'alerts' && unreadAlerts > 0 && <Badge variant="red" text={String(unreadAlerts)} />}
                  {item.badge === 'messages' && unreadMessages > 0 && <Badge variant="gold" text={String(unreadMessages)} />}
                  {item.badge === 'statements' && <Badge variant="red" text="1 due" />}
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </aside>
  )
}
