// ── Advisor ──────────────────────────────────────────────────
export interface Advisor {
  id: string
  name: string
  initials: string
  role: 'founder' | 'pm' | 'analyst' | 'advisor'
  firm: string
  email: string
  phone?: string
  lastLogin: string
}

// ── Client ───────────────────────────────────────────────────
export interface Client {
  id: string
  name: string
  initials: string
  color: string
  onboarded: string
  tier: 'T-1' | 'T-2' | 'T-3'
  status: 'active' | 'inactive' | 'onboarding'
  feeRate: number
  billingCycle: 'monthly'
  initialDeposit: number
  currentAUM: number
  openPositions: number
  cashBalance: number
  feeStatus: 'paid' | 'unpaid' | 'partial'
  feeDue?: number
  feeDueDate?: string
}

// ── Account Snapshot ─────────────────────────────────────────
export interface AccountSnapshot {
  clientId: string
  asOf: string
  aum: number
  cashBalance: number
  openPositions: Position[]
  totalRealizedPnl: number
  totalDividends: number
  allTimeReturn: number
  allTimeReturnPct: number
  monthlyReturns: MonthlyReturn[]
}

export interface MonthlyReturn {
  month: string
  realizedGain: number
  dividends: number
  transactionFees: number
  netReturn: number
  openingAum: number
  closingAum: number
}

// ── Position ─────────────────────────────────────────────────
export interface Position {
  symbol: string
  shares: number
  avgCost: number
  currentPrice: number
  marketValue: number
  unrealizedPnl: number
  unrealizedPnlPct: number
}

// ── Trade ────────────────────────────────────────────────────
export type TradeType = 'BUY' | 'SELL' | 'DIV'

export interface Trade {
  id: string
  clientId: string
  symbol: string
  type: TradeType
  shares: number
  price: number
  amount: number
  date: string
  gain: number | null
  transactionFee: number
  notes?: string
  executedBy: string
  executionVenue: 'alpaca_paper' | 'alpaca_live' | 'manual'
}

// ── Statement ─────────────────────────────────────────────────
export type StatementStatus = 'paid' | 'unpaid' | 'draft'

export interface Statement {
  id: string
  clientId: string
  period: string
  periodLabel: string
  issueDate: string
  payDate: string
  openingAum: number
  closingAum: number
  totalReturn: number
  totalDividends: number
  managementFee: number
  transactionFees: number
  totalDue: number
  status: StatementStatus
  paidDate?: string
  notes: string
  trades: string[]
}

// ── AGQuant Signal ────────────────────────────────────────────
export type SignalType = 'entry' | 'exit' | 'alert' | 'dividend' | 'risk'
export type SignalPriority = 'critical' | 'high' | 'medium' | 'low'
export type SignalStatus = 'pending' | 'executed' | 'dismissed' | 'expired'

export interface Signal {
  id: string
  symbol: string
  type: SignalType
  priority: SignalPriority
  status: SignalStatus
  title: string
  body: string
  strategy: string
  confidence: number
  suggestedAction: string
  suggestedClients: string[]
  suggestedShares?: Record<string, number>
  suggestedPrice?: number
  targetEntry?: [number, number]
  stopLoss?: number
  targetExit?: number
  generatedAt: string
  expiresAt?: string
}

// ── Alert ─────────────────────────────────────────────────────
export type AlertSeverity = 'critical' | 'warning' | 'info' | 'success'

export interface Alert {
  id: string
  severity: AlertSeverity
  title: string
  body: string
  relatedClientId?: string
  relatedSymbol?: string
  timestamp: string
  read: boolean
  actionLabel?: string
  actionRoute?: string
}

// ── Message ───────────────────────────────────────────────────
export interface Message {
  id: string
  clientId: string
  direction: 'outbound' | 'inbound'
  from: string
  body: string
  timestamp: string
  read: boolean
}

// ── Fee ───────────────────────────────────────────────────────
export interface FeeRecord {
  id: string
  clientId: string
  period: string
  managementFee: number
  transactionFees: number
  totalDue: number
  status: 'paid' | 'unpaid'
  dueDate: string
  paidDate?: string
}

// ── Calendar Event ────────────────────────────────────────────
export type EventCategory =
  | 'dividend'
  | 'billing'
  | 'macro'
  | 'client'
  | 'reporting'
  | 'trading'
  | 'critical'

export interface CalendarEvent {
  id: string
  date: string
  title: string
  body?: string
  category: EventCategory
  relatedClientId?: string
  relatedSymbol?: string
}

// ── Order Ticket ──────────────────────────────────────────────
export type OrderSide = 'BUY' | 'SELL'
export type OrderType = 'market' | 'limit' | 'stop_limit'

export interface OrderTicket {
  clientTarget: 'DL2503' | 'SR2501' | 'both'
  symbol: string
  side: OrderSide
  orderType: OrderType
  shares: number
  limitPrice?: number
  stopPrice?: number
  estimatedCost: number
  transactionFee: number
  clientCashRemaining: Record<string, number>
  notes?: string
}

// ── Ticker ────────────────────────────────────────────────────
export interface TickerState {
  symbol: string
  price: number
  change: number
  direction: 'up' | 'down'
}

// ── Research ──────────────────────────────────────────────────
export interface ResearchThesis {
  id: string
  symbol: string
  title: string
  status: 'active' | 'watching' | 'closed'
  strategy: string
  thesis: string
  entryZone?: [number, number]
  targetExit?: number
  stopLoss?: number
  confidence: number
  createdAt: string
  updatedAt: string
}

// ── AGQuant Strategy ──────────────────────────────────────────
export interface AGQuantStrategy {
  id: string
  name: string
  description: string
  status: 'active' | 'paused' | 'backtesting' | 'disabled'
  symbols: string[]
  lastSignalAt?: string
  winRate?: number
  avgGainPerTrade?: number
}

// ── System Status ─────────────────────────────────────────────
export interface SystemStatus {
  agquantEngine: 'online' | 'offline' | 'degraded'
  alpacaApi: 'connected' | 'disconnected' | 'error'
  alpacaMode: 'paper' | 'live'
  circuitBreakers: 'armed' | 'triggered' | 'disabled'
  kellyPositionLimit: number
  logSync: 'realtime' | 'delayed' | 'offline'
}

// ── Performance Attribution ───────────────────────────────────
export interface Attribution {
  symbol: string
  totalGain: number
  percentage: number
  tradeCount: number
  winRate: number
  avgGainPerTrade: number
}

export interface AdvisorPerformance {
  totalAum: number
  totalRealizedReturn: number
  totalDividends: number
  avgClientRoi: number
  bestMonth: { period: string; return: number }
  sharpeRatio: number
  maxDrawdown: number
  attribution: Attribution[]
  monthlyData: { period: string; return: number; aum: number }[]
}
