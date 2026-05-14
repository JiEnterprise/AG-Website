// Personal account — Saswat C. (SC001) own Alpaca paper account
// Separate firewall from client accounts

export type PersonalPosition = {
  symbol: string
  shares: number
  entryPrice: number
  currentPrice: number
  entryDate: string
  strategy: string
  assetType: 'equity' | 'etf' | 'crypto'
}

export type PersonalTrade = {
  id: string
  symbol: string
  type: 'BUY' | 'SELL' | 'DIV'
  shares: number
  price: number
  amount: number
  date: string
  gain: number | null
  notes: string
}

export const personalAccount = {
  id: 'SC001',
  name: 'Saswat C. — Personal',
  initialDeposit: 500.00,
  currentAUM: 612.48,
  cashBalance: 226.73,
  openPositions: 2,
  totalRealizedPnl: 112.48,
  totalDividends: 28.66,
  allTimeReturn: 112.48,
  allTimeReturnPct: 22.50,
  alpacaAccount: 'paper',
  lastUpdated: '2025-11-28',
}

export const personalPositions: PersonalPosition[] = [
  {
    symbol: 'TSLY',
    shares: 15,
    entryPrice: 7.32,
    currentPrice: 7.61,
    entryDate: '2025-11-22',
    strategy: 'YieldMax Income Cycle',
    assetType: 'etf',
  },
  {
    symbol: 'NVDY',
    shares: 8,
    entryPrice: 14.85,
    currentPrice: 15.22,
    entryDate: '2025-11-19',
    strategy: 'YieldMax Income Cycle',
    assetType: 'etf',
  },
]

export const personalTrades: PersonalTrade[] = [
  { id: 'PT001', symbol: 'TSLY', type: 'BUY', shares: 20, price: 8.10, amount: -162.00, date: '2025-08-12', gain: null, notes: 'TSLY income cycle — initial position' },
  { id: 'PT002', symbol: 'TSLY', type: 'DIV', shares: 0, price: 0, amount: 4.22, date: '2025-08-07', gain: 4.22, notes: 'TSLY Aug dividend — personal' },
  { id: 'PT003', symbol: 'TSLY', type: 'SELL', shares: 20, price: 8.45, amount: 169.00, date: '2025-08-20', gain: 7.00, notes: 'TSLY cycle closed +$7.00' },
  { id: 'PT004', symbol: 'PLUG', type: 'BUY', shares: 40, price: 2.48, amount: -99.20, date: '2025-09-15', gain: null, notes: 'PLUG mean reversion — RSI 22' },
  { id: 'PT005', symbol: 'TSLY', type: 'DIV', shares: 0, price: 0, amount: 5.81, date: '2025-09-04', gain: 5.81, notes: 'TSLY Sep dividend — personal' },
  { id: 'PT006', symbol: 'PLUG', type: 'SELL', shares: 40, price: 2.92, amount: 116.80, date: '2025-09-24', gain: 17.60, notes: 'PLUG closed +$17.60' },
  { id: 'PT007', symbol: 'TSLY', type: 'BUY', shares: 25, price: 7.20, amount: -180.00, date: '2025-10-10', gain: null, notes: 'TSLY cycle — pre ex-div entry' },
  { id: 'PT008', symbol: 'TSLY', type: 'DIV', shares: 0, price: 0, amount: 9.88, date: '2025-10-02', gain: 9.88, notes: 'TSLY Oct dividend — personal' },
  { id: 'PT009', symbol: 'TSLY', type: 'SELL', shares: 25, price: 7.55, amount: 188.75, date: '2025-10-18', gain: 8.75, notes: 'TSLY cycle closed +$8.75' },
  { id: 'PT010', symbol: 'NVDY', type: 'BUY', shares: 12, price: 15.10, amount: -181.20, date: '2025-11-05', gain: null, notes: 'NVDY income cycle entry' },
  { id: 'PT011', symbol: 'PLUG', type: 'BUY', shares: 35, price: 2.52, amount: -88.20, date: '2025-11-06', gain: null, notes: 'PLUG mean reversion — personal account' },
  { id: 'PT012', symbol: 'PLUG', type: 'SELL', shares: 35, price: 2.82, amount: 98.70, date: '2025-11-11', gain: 10.50, notes: 'PLUG personal closed +$10.50' },
  { id: 'PT013', symbol: 'NVDY', type: 'SELL', shares: 4, price: 15.40, amount: 61.60, date: '2025-11-14', gain: 1.20, notes: 'NVDY partial exit +$1.20' },
  { id: 'PT014', symbol: 'TSLY', type: 'BUY', shares: 15, price: 7.32, amount: -109.80, date: '2025-11-22', gain: null, notes: 'TSLY cycle entry — personal' },
]

export const personalMonthlyReturns = [
  { month: '2025-08', realizedGain: 7.00, dividends: 4.22, netReturn: 11.22, openingAum: 500.00, closingAum: 511.22 },
  { month: '2025-09', realizedGain: 17.60, dividends: 5.81, netReturn: 23.41, openingAum: 511.22, closingAum: 534.63 },
  { month: '2025-10', realizedGain: 8.75, dividends: 9.88, netReturn: 18.63, openingAum: 534.63, closingAum: 553.26 },
  { month: '2025-11', realizedGain: 59.21, dividends: 0, netReturn: 59.21, openingAum: 553.26, closingAum: 612.48 },
]
