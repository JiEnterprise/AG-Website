// Formal Deposit / Withdrawal Ledger
// Auditable record of all client cash movements

export type LedgerEntry = {
  id: string
  clientId: string
  clientName: string
  date: string
  type: 'deposit' | 'withdrawal' | 'fee' | 'fee_waiver'
  amount: number           // positive = inflow, negative = outflow
  method: 'cash_app' | 'wire' | 'ach' | 'zelle' | 'check' | 'internal'
  reference: string
  runningBalance: number
  confirmedBy: string
  notes: string
}

export const ledger: LedgerEntry[] = [
  // SR2501 — Rehan Shaikh
  {
    id: 'LDG-001',
    clientId: 'SR2501',
    clientName: 'Rehan Shaikh',
    date: '2025-07-15',
    type: 'deposit',
    amount: 50.00,
    method: 'cash_app',
    reference: 'CA-SR2501-0715',
    runningBalance: 50.00,
    confirmedBy: 'SC001',
    notes: 'Initial deposit — onboarding. Cash App transfer confirmed.',
  },
  {
    id: 'LDG-002',
    clientId: 'SR2501',
    clientName: 'Rehan Shaikh',
    date: '2025-08-31',
    type: 'fee',
    amount: -0.14,
    method: 'internal',
    reference: 'FEE-SR-2025-08',
    runningBalance: 55.19,
    confirmedBy: 'SC001',
    notes: 'Aug management fee — 0.25% × $55.33 closing AUM = $0.14.',
  },
  {
    id: 'LDG-003',
    clientId: 'SR2501',
    clientName: 'Rehan Shaikh',
    date: '2025-09-30',
    type: 'fee',
    amount: -0.17,
    method: 'internal',
    reference: 'FEE-SR-2025-09',
    runningBalance: 67.75,
    confirmedBy: 'SC001',
    notes: 'Sep management fee — 0.25% × $67.92 closing AUM = $0.17.',
  },
  {
    id: 'LDG-004',
    clientId: 'SR2501',
    clientName: 'Rehan Shaikh',
    date: '2025-10-31',
    type: 'fee',
    amount: -0.18,
    method: 'internal',
    reference: 'FEE-SR-2025-10',
    runningBalance: 71.55,
    confirmedBy: 'SC001',
    notes: 'Oct management fee — 0.25% × $71.73 closing AUM = $0.18.',
  },
  {
    id: 'LDG-005',
    clientId: 'SR2501',
    clientName: 'Rehan Shaikh',
    date: '2025-12-01',
    type: 'fee',
    amount: -0.21,
    method: 'cash_app',
    reference: 'CA-SR2501-FEE-1201',
    runningBalance: 85.78,
    confirmedBy: 'SC001',
    notes: 'Nov management fee ($0.21) + transaction fees ($0.40) = $0.61 total. Paid via Cash App Dec 1.',
  },

  // DL2503 — David Low
  {
    id: 'LDG-006',
    clientId: 'DL2503',
    clientName: 'David Low',
    date: '2025-03-10',
    type: 'deposit',
    amount: 650.00,
    method: 'wire',
    reference: 'WIRE-DL2503-0310',
    runningBalance: 650.00,
    confirmedBy: 'SC001',
    notes: 'Initial deposit — onboarding. Wire transfer confirmed.',
  },
  {
    id: 'LDG-007',
    clientId: 'DL2503',
    clientName: 'David Low',
    date: '2025-04-30',
    type: 'fee',
    amount: -1.72,
    method: 'cash_app',
    reference: 'CA-DL2503-FEE-0430',
    runningBalance: 668.28,
    confirmedBy: 'SC001',
    notes: 'Apr management fee — 0.25% × $688.50 = $1.72. Paid.',
  },
  {
    id: 'LDG-008',
    clientId: 'DL2503',
    clientName: 'David Low',
    date: '2025-05-31',
    type: 'fee',
    amount: -1.80,
    method: 'cash_app',
    reference: 'CA-DL2503-FEE-0531',
    runningBalance: 740.20,
    confirmedBy: 'SC001',
    notes: 'May management fee — 0.25% × $720.00 = $1.80. Paid.',
  },
  {
    id: 'LDG-009',
    clientId: 'DL2503',
    clientName: 'David Low',
    date: '2025-06-30',
    type: 'fee',
    amount: -1.91,
    method: 'cash_app',
    reference: 'CA-DL2503-FEE-0630',
    runningBalance: 764.09,
    confirmedBy: 'SC001',
    notes: 'Jun management fee — 0.25% × $762.00 = $1.91. Paid.',
  },
  {
    id: 'LDG-010',
    clientId: 'DL2503',
    clientName: 'David Low',
    date: '2025-07-31',
    type: 'fee',
    amount: -1.98,
    method: 'cash_app',
    reference: 'CA-DL2503-FEE-0731',
    runningBalance: 793.52,
    confirmedBy: 'SC001',
    notes: 'Jul management fee — 0.25% × $791.50 = $1.98. Paid.',
  },
  {
    id: 'LDG-011',
    clientId: 'DL2503',
    clientName: 'David Low',
    date: '2025-08-31',
    type: 'fee',
    amount: -2.04,
    method: 'cash_app',
    reference: 'CA-DL2503-FEE-0831',
    runningBalance: 813.48,
    confirmedBy: 'SC001',
    notes: 'Aug management fee — 0.25% × $815.00 = $2.04. Paid.',
  },
  {
    id: 'LDG-012',
    clientId: 'DL2503',
    clientName: 'David Low',
    date: '2025-09-30',
    type: 'fee',
    amount: -2.18,
    method: 'cash_app',
    reference: 'CA-DL2503-FEE-0930',
    runningBalance: 849.32,
    confirmedBy: 'SC001',
    notes: 'Sep management fee — 0.25% × $870.50 = $2.18. Paid.',
  },
  {
    id: 'LDG-013',
    clientId: 'DL2503',
    clientName: 'David Low',
    date: '2025-10-31',
    type: 'fee',
    amount: -2.21,
    method: 'cash_app',
    reference: 'CA-DL2503-FEE-1031',
    runningBalance: 870.54,
    confirmedBy: 'SC001',
    notes: 'Oct management fee — 0.25% × $882.00 = $2.21. Paid.',
  },
  {
    id: 'LDG-014',
    clientId: 'DL2503',
    clientName: 'David Low',
    date: '2025-12-05',
    type: 'fee',
    amount: -9.23,
    method: 'cash_app',
    reference: 'CA-DL2503-FEE-NOV',
    runningBalance: 873.52,
    confirmedBy: 'SC001',
    notes: 'Nov management fee — $9.23. OUTSTANDING. Due Dec 5, 2025.',
  },
]

// Summary helpers
export function getLedgerByClient(clientId: string): LedgerEntry[] {
  return ledger.filter((e) => e.clientId === clientId)
}

export function getTotalDeposited(clientId: string): number {
  return getLedgerByClient(clientId)
    .filter((e) => e.type === 'deposit')
    .reduce((sum, e) => sum + e.amount, 0)
}

export function getTotalFeesCollected(clientId: string): number {
  return getLedgerByClient(clientId)
    .filter((e) => e.type === 'fee' && e.amount < 0)
    .filter((e) => !e.notes.includes('OUTSTANDING'))
    .reduce((sum, e) => sum + Math.abs(e.amount), 0)
}
