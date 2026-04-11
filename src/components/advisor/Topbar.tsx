'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Bell } from 'lucide-react'
import LiveTicker from '@/components/advisor/LiveTicker'
import { useAdvisorStore } from '@/lib/store/advisorStore'

export default function Topbar() {
  const tickers = useAdvisorStore((state) => state.tickers)
  const unreadAlerts = useAdvisorStore((state) => state.unreadAlerts)
  const tickTicker = useAdvisorStore((state) => state.tickTicker)

  useEffect(() => {
    const interval = setInterval(() => {
      tickTicker()
    }, 3000)
    return () => clearInterval(interval)
  }, [tickTicker])

  return (
    <header className="top" role="banner">
      <div className="logo">
        <div className="logo-box">AG</div>
        <div className="logo-name">Aurum Global</div>
      </div>
      <div className="role-badge">Advisor Portal · Internal</div>

      <LiveTicker tickers={tickers} />

      <div className="top-right">
        <Link href="/advisor/alerts" aria-label="Open alerts" className="alert-btn">
          <Bell size={13} color="#6A5E50" strokeWidth={1.5} />
          {unreadAlerts > 0 && <span className="adot" />}
        </Link>

        <div className="user-chip">
          <div className="user-av">SC</div>
          <div>
            <div className="user-name">Saswat C.</div>
            <div className="user-role">Portfolio Manager</div>
          </div>
        </div>
      </div>
    </header>
  )
}
