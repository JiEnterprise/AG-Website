'use client'

export interface TickerItem {
  symbol: string
  price: number
  change: number
  changePercent: number
}

export const INITIAL_TICKERS: TickerItem[] = [
  { symbol: 'SPY', price: 585.34, change: 7.21, changePercent: 1.24 },
  { symbol: 'QQQ', price: 503.18, change: 4.87, changePercent: 0.98 },
  { symbol: 'BTC', price: 97842.50, change: 1243.20, changePercent: 1.29 },
  { symbol: 'ETH', price: 3542.80, change: -45.60, changePercent: -1.27 },
  { symbol: 'GOLD', price: 2634.50, change: 12.30, changePercent: 0.47 },
  { symbol: 'VIX', price: 14.82, change: -0.43, changePercent: -2.82 },
  { symbol: 'SOL', price: 189.42, change: 8.73, changePercent: 4.83 },
  { symbol: 'DXY', price: 104.23, change: -0.31, changePercent: -0.30 },
  { symbol: 'TSLA', price: 412.67, change: 9.45, changePercent: 2.34 },
  { symbol: 'GS', price: 587.90, change: 3.21, changePercent: 0.55 },
]

export function simulateTicker(tickers: TickerItem[]): TickerItem[] {
  return tickers.map(ticker => {
    const volatility = ticker.symbol === 'VIX' ? 0.005 : 0.001
    const delta = (Math.random() - 0.48) * ticker.price * volatility
    const newPrice = Math.max(0.01, ticker.price + delta)
    const change = newPrice - (ticker.price - ticker.change)
    const basePrice = ticker.price - ticker.change
    const changePercent = (change / basePrice) * 100
    return { ...ticker, price: newPrice, change, changePercent }
  })
}

export const CRYPTO_PRICES = [
  { symbol: 'BTC', name: 'Bitcoin', price: 97842.50, change24h: 1.29 },
  { symbol: 'ETH', name: 'Ethereum', price: 3542.80, change24h: -1.27 },
  { symbol: 'SOL', name: 'Solana', price: 189.42, change24h: 4.83 },
  { symbol: 'BNB', name: 'BNB', price: 712.34, change24h: 0.92 },
]

export function generateCandlestickData(bars = 60) {
  let price = 580
  return Array.from({ length: bars }, (_, i) => {
    const open = price
    const change = (Math.random() - 0.46) * 8
    const close = open + change
    const high = Math.max(open, close) + Math.random() * 4
    const low = Math.min(open, close) - Math.random() * 4
    price = close
    return { i, open, close, high, low, volume: Math.random() * 1000 + 200 }
  })
}

export function generateEquityCurve(points = 200) {
  let value = 100000
  const data = [{ x: 0, y: value }]
  for (let i = 1; i <= points; i++) {
    const drift = 0.0008
    const vol = 0.018
    const shock = (Math.random() - 0.5) * 2 * vol
    value = value * Math.exp(drift + shock)
    data.push({ x: i, y: value })
  }
  return data
}

export const INSIGHTS_FEED = [
  {
    id: 1,
    category: 'MACRO',
    headline: 'Federal Reserve Signals Pause in Rate Cycle Amid Cooling Inflation Data',
    summary: 'Core PCE falls to 2.4% as Fed officials debate the timing of future easing. Markets price in two cuts by year-end.',
    timestamp: '2h ago',
    author: 'AG Research Team',
  },
  {
    id: 2,
    category: 'EQUITY',
    headline: 'Tech Earnings Season Exceeds Expectations — AI Infrastructure Spend Accelerates',
    summary: 'Mega-cap tech companies report 18% average EPS growth, driven by enterprise AI adoption and cloud expansion.',
    timestamp: '4h ago',
    author: 'Quantitative Strategy',
  },
  {
    id: 3,
    category: 'CRYPTO',
    headline: 'Bitcoin ETF Inflows Reach $3.2B Monthly Record as Institutional Adoption Deepens',
    summary: 'Spot Bitcoin ETFs attract record institutional flows as pension funds begin small allocations to digital assets.',
    timestamp: '6h ago',
    author: 'Digital Assets Desk',
  },
  {
    id: 4,
    category: 'OPTIONS',
    headline: 'Unusual Options Activity Detected in Defense Sector — Vol Premiums Elevated',
    summary: 'Block trades in LMT and RTX signal institutional positioning ahead of Q2 defense budget announcements.',
    timestamp: '8h ago',
    author: 'Options Flow Analytics',
  },
  {
    id: 5,
    category: 'MACRO',
    headline: 'Global M2 Money Supply Expansion Points to Risk Asset Tailwinds Through 2025',
    summary: 'Coordinated monetary easing across G7 economies creates favorable liquidity conditions for equities and crypto.',
    timestamp: '12h ago',
    author: 'Global Macro Strategy',
  },
]
