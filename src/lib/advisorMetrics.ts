import { clients, accountSnapshots } from '@/lib/mock-data/clients'
import { trades } from '@/lib/mock-data/trades'
import { signals } from '@/lib/mock-data/signals'
import { statements } from '@/lib/mock-data/statements'
import { alerts } from '@/lib/mock-data/alerts'
import { messages } from '@/lib/mock-data/messages'
import { buildAttribution } from '@/lib/calculations/attribution'
import type { AdvisorPerformance, Client, Statement, Trade } from '@/lib/types'

export const allClients = clients
export const allTrades = trades
export const allSignals = signals
export const allStatements = statements
export const allAlerts = alerts
export const allMessages = messages
export const snapshots = accountSnapshots

export const totalAum = Number(clients.reduce((sum, c) => sum + c.currentAUM, 0).toFixed(2))
export const totalOutstandingFees = Number(
  clients.reduce((sum, c) => sum + (c.feeStatus === 'unpaid' ? c.feeDue ?? 0 : 0), 0).toFixed(2)
)
export const pendingSignals = signals.filter((signal) => signal.status === 'pending').length
export const unreadAlerts = alerts.filter((alert) => !alert.read).length
export const unreadMessages = messages.filter((message) => message.direction === 'inbound' && !message.read).length

export const novRealized = Number(
  trades
    .filter((trade) => trade.gain !== null && trade.date.startsWith('2025-11'))
    .reduce((sum, trade) => sum + (trade.gain ?? 0), 0)
    .toFixed(2)
)

export const totalRealizedAllTime = Number(
  snapshots.reduce((sum, snapshot) => sum + snapshot.totalRealizedPnl, 0).toFixed(2)
)

export const totalDividends = Number(
  snapshots.reduce((sum, snapshot) => sum + snapshot.totalDividends, 0).toFixed(2)
)

export const avgClientRoi = Number(
  (snapshots.reduce((sum, snapshot) => sum + snapshot.allTimeReturnPct, 0) / snapshots.length).toFixed(2)
)

function bestMonthlyReturnPeriod(): { period: string; return: number } {
  const monthMap = new Map<string, number>()
  for (const snap of snapshots) {
    for (const monthly of snap.monthlyReturns) {
      const current = monthMap.get(monthly.month) ?? 0
      monthMap.set(monthly.month, current + monthly.netReturn)
    }
  }
  const sorted = Array.from(monthMap.entries()).sort((a, b) => b[1] - a[1])
  if (sorted.length === 0) return { period: 'N/A', return: 0 }
  return { period: sorted[0][0], return: Number(sorted[0][1].toFixed(2)) }
}

function monthlyData(): { period: string; return: number; aum: number }[] {
  const map = new Map<string, { return: number; aum: number }>()
  for (const snapshot of snapshots) {
    for (const month of snapshot.monthlyReturns) {
      const existing = map.get(month.month) ?? { return: 0, aum: 0 }
      existing.return += month.netReturn
      existing.aum += month.closingAum
      map.set(month.month, existing)
    }
  }
  return Array.from(map.entries())
    .map(([period, values]) => ({
      period,
      return: Number(values.return.toFixed(2)),
      aum: Number(values.aum.toFixed(2)),
    }))
    .sort((a, b) => a.period.localeCompare(b.period))
}

export const advisorPerformance: AdvisorPerformance = {
  totalAum,
  totalRealizedReturn: totalRealizedAllTime,
  totalDividends,
  avgClientRoi,
  bestMonth: bestMonthlyReturnPeriod(),
  sharpeRatio: 2.84,
  maxDrawdown: 7.2,
  attribution: buildAttribution(trades),
  monthlyData: monthlyData(),
}

export function getClientById(clientId: string): Client | undefined {
  return clients.find((client) => client.id === clientId)
}

export function getStatementsByClient(clientId: string): Statement[] {
  return statements
    .filter((statement) => statement.clientId === clientId)
    .sort((a, b) => b.period.localeCompare(a.period))
}

export function getTradesByClient(clientId: string): Trade[] {
  return trades
    .filter((trade) => trade.clientId === clientId)
    .sort((a, b) => b.date.localeCompare(a.date))
}
