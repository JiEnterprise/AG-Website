// YieldMax ETF Universe — income strategy command center
// Weekly ex-dividend dates, NAV decay tracking, distribution history

export type YieldMaxETF = {
  symbol: string
  name: string
  underlying: string
  currentPrice: number
  navDecayPct: number       // monthly NAV decay %
  annualYieldPct: number    // distribution yield %
  lastDistribution: number  // per-share amount
  distributionTrend: 'rising' | 'falling' | 'stable'
  nextExDivDate: string
  nextPayDate: string
  exDivDayOfWeek: 'Thursday' | 'Wednesday' | 'Tuesday'
  exDivFrequency: 'weekly' | 'monthly'
  rsi14: number
  fiftyTwoWeekLow: number
  fiftyTwoWeekHigh: number
  inPortfolio: boolean      // currently held in any account
  notes: string
}

export const yieldmaxUniverse: YieldMaxETF[] = [
  {
    symbol: 'TSLY',
    name: 'YieldMax TSLA Option Income Strategy ETF',
    underlying: 'TSLA',
    currentPrice: 7.61,
    navDecayPct: 2.8,
    annualYieldPct: 68.4,
    lastDistribution: 0.44,
    distributionTrend: 'falling',
    nextExDivDate: '2025-12-04',
    nextPayDate: '2025-12-09',
    exDivDayOfWeek: 'Thursday',
    exDivFrequency: 'weekly',
    rsi14: 52,
    fiftyTwoWeekLow: 5.82,
    fiftyTwoWeekHigh: 24.18,
    inPortfolio: true,
    notes: 'Core income holding. High NAV decay offset by weekly distributions. Enter 2-3 days pre-ex-div, exit day-of or day-after. TSLA earnings cause distribution spikes.',
  },
  {
    symbol: 'NVDY',
    name: 'YieldMax NVDA Option Income Strategy ETF',
    underlying: 'NVDA',
    currentPrice: 15.22,
    navDecayPct: 3.1,
    annualYieldPct: 72.6,
    lastDistribution: 0.91,
    distributionTrend: 'rising',
    nextExDivDate: '2025-12-05',
    nextPayDate: '2025-12-10',
    exDivDayOfWeek: 'Thursday',
    exDivFrequency: 'weekly',
    rsi14: 61,
    fiftyTwoWeekLow: 8.33,
    fiftyTwoWeekHigh: 29.74,
    inPortfolio: true,
    notes: 'NVDA AI tailwinds driving higher distributions. Rising trend. Higher NAV decay than TSLY. Good for shorter cycles around earnings.',
  },
  {
    symbol: 'MSFO',
    name: 'YieldMax MSFT Option Income Strategy ETF',
    underlying: 'MSFT',
    currentPrice: 18.44,
    navDecayPct: 1.9,
    annualYieldPct: 48.2,
    lastDistribution: 0.74,
    distributionTrend: 'stable',
    nextExDivDate: '2025-12-11',
    nextPayDate: '2025-12-16',
    exDivDayOfWeek: 'Thursday',
    exDivFrequency: 'weekly',
    rsi14: 48,
    fiftyTwoWeekLow: 14.21,
    fiftyTwoWeekHigh: 26.88,
    inPortfolio: false,
    notes: 'Lower NAV decay than TSLY/NVDY. Stable MSFT underlying means more predictable distributions. Good defensive income position.',
  },
  {
    symbol: 'GOOGY',
    name: 'YieldMax GOOGL Option Income Strategy ETF',
    underlying: 'GOOGL',
    currentPrice: 16.82,
    navDecayPct: 2.2,
    annualYieldPct: 52.8,
    lastDistribution: 0.74,
    distributionTrend: 'stable',
    nextExDivDate: '2025-12-04',
    nextPayDate: '2025-12-09',
    exDivDayOfWeek: 'Thursday',
    exDivFrequency: 'weekly',
    rsi14: 45,
    fiftyTwoWeekLow: 11.90,
    fiftyTwoWeekHigh: 24.55,
    inPortfolio: false,
    notes: 'Moderate yield with reasonable NAV stability. GOOGL AI revenue story supports underlying. Watch earnings in Q4.',
  },
  {
    symbol: 'AMZY',
    name: 'YieldMax AMZN Option Income Strategy ETF',
    underlying: 'AMZN',
    currentPrice: 19.33,
    navDecayPct: 2.5,
    annualYieldPct: 57.1,
    lastDistribution: 0.92,
    distributionTrend: 'rising',
    nextExDivDate: '2025-12-04',
    nextPayDate: '2025-12-09',
    exDivDayOfWeek: 'Thursday',
    exDivFrequency: 'weekly',
    rsi14: 58,
    fiftyTwoWeekLow: 13.77,
    fiftyTwoWeekHigh: 27.42,
    inPortfolio: false,
    notes: 'AWS and Prime still growing. Rising distribution trend. Strong option premium from high IV around AWS earnings surprises.',
  },
  {
    symbol: 'CONY',
    name: 'YieldMax COIN Option Income Strategy ETF',
    underlying: 'COIN',
    currentPrice: 9.14,
    navDecayPct: 5.8,
    annualYieldPct: 118.4,
    lastDistribution: 0.90,
    distributionTrend: 'falling',
    nextExDivDate: '2025-12-04',
    nextPayDate: '2025-12-09',
    exDivDayOfWeek: 'Thursday',
    exDivFrequency: 'weekly',
    rsi14: 44,
    fiftyTwoWeekLow: 6.22,
    fiftyTwoWeekHigh: 31.78,
    inPortfolio: false,
    notes: 'Highest yield but extreme NAV decay. Only viable in crypto bull markets. Short-hold only — enter pre-ex-div, exit immediately. High risk.',
  },
  {
    symbol: 'PLTY',
    name: 'YieldMax PLTR Option Income Strategy ETF',
    underlying: 'PLTR',
    currentPrice: 11.28,
    navDecayPct: 4.2,
    annualYieldPct: 88.6,
    lastDistribution: 0.83,
    distributionTrend: 'rising',
    nextExDivDate: '2025-12-05',
    nextPayDate: '2025-12-10',
    exDivDayOfWeek: 'Thursday',
    exDivFrequency: 'weekly',
    rsi14: 67,
    fiftyTwoWeekLow: 7.44,
    fiftyTwoWeekHigh: 23.11,
    inPortfolio: false,
    notes: 'PLTR government AI contracts driving PLTR higher. Rising distributions. Higher decay rate — watch entry timing carefully.',
  },
  {
    symbol: 'OARK',
    name: 'YieldMax Short ARKK Option Income Strategy ETF',
    underlying: 'ARKK',
    currentPrice: 8.92,
    navDecayPct: 3.4,
    annualYieldPct: 64.2,
    lastDistribution: 0.48,
    distributionTrend: 'stable',
    nextExDivDate: '2025-12-11',
    nextPayDate: '2025-12-16',
    exDivDayOfWeek: 'Thursday',
    exDivFrequency: 'weekly',
    rsi14: 39,
    fiftyTwoWeekLow: 6.11,
    fiftyTwoWeekHigh: 14.82,
    inPortfolio: false,
    notes: 'Short ARK exposure. Good hedge in growth-equity selloffs. Distributions stable but modest. RSI oversold — potential contrarian entry.',
  },
]

// Full 6-week ex-div calendar across all YieldMax holdings
export type DividendEvent = {
  date: string
  symbol: string
  type: 'ex-div' | 'pay'
  estimatedAmount: number
  underlying: string
  alertDaysBefore: number
}

export const dividendCalendar: DividendEvent[] = [
  // Week of Dec 4-5
  { date: '2025-12-04', symbol: 'TSLY', type: 'ex-div', estimatedAmount: 0.44, underlying: 'TSLA', alertDaysBefore: 2 },
  { date: '2025-12-04', symbol: 'GOOGY', type: 'ex-div', estimatedAmount: 0.74, underlying: 'GOOGL', alertDaysBefore: 2 },
  { date: '2025-12-04', symbol: 'AMZY', type: 'ex-div', estimatedAmount: 0.92, underlying: 'AMZN', alertDaysBefore: 2 },
  { date: '2025-12-04', symbol: 'CONY', type: 'ex-div', estimatedAmount: 0.90, underlying: 'COIN', alertDaysBefore: 2 },
  { date: '2025-12-05', symbol: 'NVDY', type: 'ex-div', estimatedAmount: 0.91, underlying: 'NVDA', alertDaysBefore: 2 },
  { date: '2025-12-05', symbol: 'PLTY', type: 'ex-div', estimatedAmount: 0.83, underlying: 'PLTR', alertDaysBefore: 2 },
  // Pay dates
  { date: '2025-12-09', symbol: 'TSLY', type: 'pay', estimatedAmount: 0.44, underlying: 'TSLA', alertDaysBefore: 0 },
  { date: '2025-12-09', symbol: 'GOOGY', type: 'pay', estimatedAmount: 0.74, underlying: 'GOOGL', alertDaysBefore: 0 },
  { date: '2025-12-09', symbol: 'AMZY', type: 'pay', estimatedAmount: 0.92, underlying: 'AMZN', alertDaysBefore: 0 },
  { date: '2025-12-09', symbol: 'CONY', type: 'pay', estimatedAmount: 0.90, underlying: 'COIN', alertDaysBefore: 0 },
  { date: '2025-12-10', symbol: 'NVDY', type: 'pay', estimatedAmount: 0.91, underlying: 'NVDA', alertDaysBefore: 0 },
  { date: '2025-12-10', symbol: 'PLTY', type: 'pay', estimatedAmount: 0.83, underlying: 'PLTR', alertDaysBefore: 0 },
  // Week of Dec 11-12
  { date: '2025-12-11', symbol: 'TSLY', type: 'ex-div', estimatedAmount: 0.41, underlying: 'TSLA', alertDaysBefore: 2 },
  { date: '2025-12-11', symbol: 'MSFO', type: 'ex-div', estimatedAmount: 0.74, underlying: 'MSFT', alertDaysBefore: 2 },
  { date: '2025-12-11', symbol: 'OARK', type: 'ex-div', estimatedAmount: 0.48, underlying: 'ARKK', alertDaysBefore: 2 },
  { date: '2025-12-12', symbol: 'NVDY', type: 'ex-div', estimatedAmount: 0.88, underlying: 'NVDA', alertDaysBefore: 2 },
  { date: '2025-12-12', symbol: 'PLTY', type: 'ex-div', estimatedAmount: 0.81, underlying: 'PLTR', alertDaysBefore: 2 },
  { date: '2025-12-16', symbol: 'TSLY', type: 'pay', estimatedAmount: 0.41, underlying: 'TSLA', alertDaysBefore: 0 },
  { date: '2025-12-16', symbol: 'MSFO', type: 'pay', estimatedAmount: 0.74, underlying: 'MSFT', alertDaysBefore: 0 },
  // Week of Dec 18-19
  { date: '2025-12-18', symbol: 'TSLY', type: 'ex-div', estimatedAmount: 0.43, underlying: 'TSLA', alertDaysBefore: 2 },
  { date: '2025-12-18', symbol: 'GOOGY', type: 'ex-div', estimatedAmount: 0.71, underlying: 'GOOGL', alertDaysBefore: 2 },
  { date: '2025-12-19', symbol: 'NVDY', type: 'ex-div', estimatedAmount: 0.86, underlying: 'NVDA', alertDaysBefore: 2 },
  { date: '2025-12-23', symbol: 'TSLY', type: 'pay', estimatedAmount: 0.43, underlying: 'TSLA', alertDaysBefore: 0 },
]

// AGQuant live state mock (simulates real RSI + condition feed)
export type AGQuantSymbolState = {
  symbol: string
  rsi14: number
  bollingerPosition: 'above_upper' | 'near_upper' | 'mid' | 'near_lower' | 'below_lower'
  lastPrice: number
  entryTriggerLevel: number
  exitTriggerLevel: number
  watchStatus: 'monitoring' | 'approaching_entry' | 'signal_generated' | 'in_position' | 'approaching_exit'
  waitReason: string
  lastSignalTime: string | null
  strategy: string
}

export const agquantLiveState: AGQuantSymbolState[] = [
  {
    symbol: 'TSLY',
    rsi14: 52,
    bollingerPosition: 'mid',
    lastPrice: 7.61,
    entryTriggerLevel: 6.90,
    exitTriggerLevel: 8.20,
    watchStatus: 'monitoring',
    waitReason: 'RSI 52 — neutral zone. Entry requires RSI ≤ 38 or price near lower Bollinger band ($6.90). Monitoring pre-ex-div window.',
    lastSignalTime: '2025-11-25T14:30:00Z',
    strategy: 'YieldMax Income Cycle',
  },
  {
    symbol: 'PLUG',
    rsi14: 34,
    bollingerPosition: 'near_lower',
    lastPrice: 2.84,
    entryTriggerLevel: 2.60,
    exitTriggerLevel: 3.20,
    watchStatus: 'approaching_entry',
    waitReason: 'RSI 34 — approaching oversold. Entry trigger at RSI ≤ 30 or price ≤ $2.60. Mean reversion setup forming. Watch for confirmation candle.',
    lastSignalTime: '2025-11-28T10:15:00Z',
    strategy: 'Mean Reversion RSI',
  },
  {
    symbol: 'NVDY',
    rsi14: 61,
    bollingerPosition: 'near_upper',
    lastPrice: 15.22,
    entryTriggerLevel: 13.80,
    exitTriggerLevel: 16.50,
    watchStatus: 'in_position',
    waitReason: 'Active position. RSI 61 — momentum phase. Exit trigger at $16.50 or RSI ≥ 72. Pre-ex-div Dec 5 — evaluating hold vs. exit.',
    lastSignalTime: '2025-11-19T09:45:00Z',
    strategy: 'YieldMax Income Cycle',
  },
  {
    symbol: 'SPY',
    rsi14: 58,
    bollingerPosition: 'mid',
    lastPrice: 585.42,
    entryTriggerLevel: 560.00,
    exitTriggerLevel: 610.00,
    watchStatus: 'monitoring',
    waitReason: 'Market benchmark. RSI 58 — mild bullish momentum. Not a primary trade target. Monitoring for market regime context.',
    lastSignalTime: null,
    strategy: 'Market Context',
  },
]
