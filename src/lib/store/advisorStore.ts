'use client'

import { create } from 'zustand'
import { alerts } from '@/lib/mock-data/alerts'
import { signals } from '@/lib/mock-data/signals'
import { messages } from '@/lib/mock-data/messages'
import { clients } from '@/lib/mock-data/clients'
import type { TickerState } from '@/lib/types'

const seed = {
  SPY: 585.42,
  TSLY: 7.61,
  PLUG: 2.84,
  BTC: 83200,
  VIX: 18.4,
}

const deltas = {
  SPY: 0.04,
  TSLY: 0.03,
  PLUG: 0.02,
  BTC: 55,
  VIX: 0.08,
}

type RouteId =
  | '/advisor/dashboard'
  | '/advisor/clients'
  | '/advisor/performance'
  | '/advisor/trades'
  | '/advisor/signals'
  | '/advisor/risk'
  | '/advisor/orders'
  | '/advisor/statements'
  | '/advisor/billing'
  | '/advisor/calendar'
  | '/advisor/research'
  | '/advisor/alerts'
  | '/advisor/messages'
  | '/advisor/agquant'
  | '/advisor/settings'

interface AdvisorState {
  activeRoute: RouteId
  tickers: TickerState[]
  unreadAlerts: number
  pendingSignals: number
  unreadMessages: number
  clientCount: number
  setActiveRoute: (route: RouteId) => void
  tickTicker: () => void
  markAlertsRead: () => void
}

function buildInitialTickers(): TickerState[] {
  return Object.entries(seed).map(([symbol, price]) => ({
    symbol,
    price,
    change: 0,
    direction: 'up' as const,
  }))
}

export const useAdvisorStore = create<AdvisorState>((set, get) => ({
  activeRoute: '/advisor/dashboard',
  tickers: buildInitialTickers(),
  unreadAlerts: alerts.filter((a) => !a.read).length,
  pendingSignals: signals.filter((s) => s.status === 'pending').length,
  unreadMessages: messages.filter((m) => m.direction === 'inbound' && !m.read).length,
  clientCount: clients.length,
  setActiveRoute: (route) => set({ activeRoute: route }),
  tickTicker: () => {
    const nextTickers = get().tickers.map((ticker) => {
      const key = ticker.symbol as keyof typeof seed
      const maxDelta = deltas[key]
      const delta = (Math.random() * 2 - 1) * maxDelta
      const nextPrice = Math.max(0.01, ticker.price + delta)
      const start = seed[key]
      const changePct = ((nextPrice - start) / start) * 100
      return {
        symbol: ticker.symbol,
        price: Number(nextPrice.toFixed(2)),
        change: Number(changePct.toFixed(2)),
        direction: (changePct >= 0 ? 'up' : 'down') as 'up' | 'down',
      }
    })
    set({ tickers: nextTickers })
  },
  markAlertsRead: () => set({ unreadAlerts: 0 }),
}))
