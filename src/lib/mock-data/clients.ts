import type { Advisor, Client, AccountSnapshot } from '@/lib/types'

export const advisor: Advisor = {
  id: 'SC001',
  name: 'Saswat C.',
  initials: 'SC',
  role: 'founder',
  firm: 'Aurum Global Inc.',
  email: 'saswat@aurumglobal.com',
  lastLogin: new Date().toISOString(),
}

export const clients: Client[] = [
  {
    id: 'DL2503', name: 'David Low', initials: 'DL', color: '#378ADD',
    onboarded: '2025-10-15', tier: 'T-1', status: 'active', feeRate: 0.01,
    billingCycle: 'monthly', initialDeposit: 650.00, currentAUM: 882.75,
    openPositions: 0, cashBalance: 882.75, feeStatus: 'unpaid', feeDue: 9.23, feeDueDate: '2025-12-05',
  },
  {
    id: 'SR2501', name: 'Rehan Shaikh', initials: 'RS', color: '#7F77DD',
    onboarded: '2025-07-15', tier: 'T-1', status: 'active', feeRate: 0.0025,
    billingCycle: 'monthly', initialDeposit: 50.00, currentAUM: 85.99,
    openPositions: 0, cashBalance: 85.99, feeStatus: 'paid', feeDue: 0,
  },
]

export const accountSnapshots: AccountSnapshot[] = [
  {
    clientId: 'DL2503', asOf: '2025-11-30', aum: 882.75, cashBalance: 882.75, openPositions: [],
    totalRealizedPnl: 232.75, totalDividends: 12.80, allTimeReturn: 232.75, allTimeReturnPct: 35.8,
    monthlyReturns: [
      { month: '2025-10', realizedGain: 51.20, dividends: 12.80, transactionFees: 0, netReturn: 64.00, openingAum: 650.00, closingAum: 695.20 },
      { month: '2025-11', realizedGain: 168.35, dividends: 0, transactionFees: 0.40, netReturn: 168.35, openingAum: 695.20, closingAum: 882.75 },
    ],
  },
  {
    clientId: 'SR2501', asOf: '2025-11-28', aum: 85.99, cashBalance: 85.99, openPositions: [],
    totalRealizedPnl: 35.99, totalDividends: 14.53, allTimeReturn: 35.99, allTimeReturnPct: 71.98,
    monthlyReturns: [
      { month: '2025-08', realizedGain: 0.78, dividends: 2.10, transactionFees: 0, netReturn: 2.88, openingAum: 50.00, closingAum: 55.33 },
      { month: '2025-09', realizedGain: 11.41, dividends: 3.14, transactionFees: 0, netReturn: 14.55, openingAum: 55.33, closingAum: 67.92 },
      { month: '2025-10', realizedGain: 3.52, dividends: 9.29, transactionFees: 0, netReturn: 3.81, openingAum: 67.92, closingAum: 71.73 },
      { month: '2025-11', realizedGain: 14.66, dividends: 0, transactionFees: 0.40, netReturn: 14.26, openingAum: 71.73, closingAum: 85.99 },
    ],
  },
]
