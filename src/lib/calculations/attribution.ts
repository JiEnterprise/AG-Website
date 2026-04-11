import type { Attribution, Trade } from '@/lib/types'

export function buildAttribution(trades: Trade[]): Attribution[] {
  const closedTrades = trades.filter((trade) => trade.gain !== null)
  const totalGain = closedTrades.reduce((sum, trade) => sum + (trade.gain ?? 0), 0)

  const grouped = new Map<string, Trade[]>()
  for (const trade of closedTrades) {
    const existing = grouped.get(trade.symbol) ?? []
    existing.push(trade)
    grouped.set(trade.symbol, existing)
  }

  return Array.from(grouped.entries()).map(([symbol, symbolTrades]) => {
    const symbolGain = symbolTrades.reduce((sum, trade) => sum + (trade.gain ?? 0), 0)
    const winners = symbolTrades.filter((trade) => (trade.gain ?? 0) > 0).length
    const tradeCount = symbolTrades.length
    return {
      symbol,
      totalGain: Number(symbolGain.toFixed(2)),
      percentage: totalGain === 0 ? 0 : Number(((symbolGain / totalGain) * 100).toFixed(2)),
      tradeCount,
      winRate: tradeCount === 0 ? 0 : Number(((winners / tradeCount) * 100).toFixed(2)),
      avgGainPerTrade: tradeCount === 0 ? 0 : Number((symbolGain / tradeCount).toFixed(2)),
    }
  })
}
