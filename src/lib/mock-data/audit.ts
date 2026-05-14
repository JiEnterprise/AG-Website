export type AuditCategory =
  | 'trade'
  | 'statement'
  | 'fee'
  | 'client'
  | 'message'
  | 'order'
  | 'system'
  | 'compliance'

export type AuditEntry = {
  id: string
  timestamp: string
  action: string
  category: AuditCategory
  actor: string
  clientId?: string
  detail: string
  before?: string
  after?: string
}

export const auditLog: AuditEntry[] = [
  { id: 'AUD-001', timestamp: '2025-07-15T10:22:00Z', action: 'Client Onboarded', category: 'client', actor: 'Saswat C.', clientId: 'SR2501', detail: 'New client Rehan Shaikh onboarded. IMA signed. Risk profile: Moderate. Initial deposit $50 via Cash App.' },
  { id: 'AUD-002', timestamp: '2025-07-20T14:05:00Z', action: 'Deposit Received', category: 'fee', actor: 'Saswat C.', clientId: 'SR2501', detail: 'Initial deposit of $50.00 received via Cash App. Ref: CA-07201', before: 'Balance: $0.00', after: 'Balance: $50.00' },
  { id: 'AUD-003', timestamp: '2025-08-14T09:30:00Z', action: 'Trade Executed', category: 'trade', actor: 'AGQuant Engine', clientId: 'SR2501', detail: 'BUY 5 TSLY @ $8.42. Strategy: AGQuant Income Cycle. Alpaca paper order #ORD-SR-001.' },
  { id: 'AUD-004', timestamp: '2025-08-22T11:15:00Z', action: 'Dividend Received', category: 'trade', actor: 'Alpaca', clientId: 'SR2501', detail: 'TSLY dividend received: $2.10. Distributed to cash balance.' },
  { id: 'AUD-005', timestamp: '2025-09-01T08:00:00Z', action: 'Statement Generated', category: 'statement', actor: 'Saswat C.', clientId: 'SR2501', detail: 'August 2025 monthly statement generated. Period: Aug 1–31 2025. Net return: +$2.88.' },
  { id: 'AUD-006', timestamp: '2025-09-05T09:12:00Z', action: 'Statement Delivered', category: 'statement', actor: 'Saswat C.', clientId: 'SR2501', detail: 'August statement emailed to client. Template: monthly-statement.' },
  { id: 'AUD-007', timestamp: '2025-09-05T09:14:00Z', action: 'Fee Invoice Sent', category: 'fee', actor: 'Saswat C.', clientId: 'SR2501', detail: 'August fee invoice sent. Amount: $0.55. Method: Cash App.' },
  { id: 'AUD-008', timestamp: '2025-09-07T16:30:00Z', action: 'Fee Collected', category: 'fee', actor: 'Saswat C.', clientId: 'SR2501', detail: 'August fee of $0.55 received. Marked paid.', before: 'Status: outstanding', after: 'Status: paid' },
  { id: 'AUD-009', timestamp: '2025-10-01T08:00:00Z', action: 'Statement Generated', category: 'statement', actor: 'Saswat C.', clientId: 'SR2501', detail: 'September 2025 monthly statement generated. Net return: +$14.55.' },
  { id: 'AUD-010', timestamp: '2025-10-15T10:22:00Z', action: 'Client Onboarded', category: 'client', actor: 'Saswat C.', clientId: 'DL2503', detail: 'New client David Low onboarded. IMA signed. Risk profile: Moderate-Aggressive. Initial deposit $650 via Cash App.' },
  { id: 'AUD-011', timestamp: '2025-10-15T14:05:00Z', action: 'Deposit Received', category: 'fee', actor: 'Saswat C.', clientId: 'DL2503', detail: 'Initial deposit of $650.00 received via Cash App. Ref: CA-10151.', before: 'Balance: $0.00', after: 'Balance: $650.00' },
  { id: 'AUD-012', timestamp: '2025-10-18T09:45:00Z', action: 'Trade Executed', category: 'trade', actor: 'AGQuant Engine', clientId: 'DL2503', detail: 'BUY 200 PLUG @ $3.28. Strategy: AGQuant PLUG position entry. Alpaca order #ORD-DL-001.' },
  { id: 'AUD-013', timestamp: '2025-10-22T11:00:00Z', action: 'Trade Executed', category: 'trade', actor: 'AGQuant Engine', clientId: 'DL2503', detail: 'BUY 50 TSLY @ $8.18. Strategy: AGQuant Income Cycle 1. Alpaca order #ORD-DL-002.' },
  { id: 'AUD-014', timestamp: '2025-10-29T14:20:00Z', action: 'Dividend Received', category: 'trade', actor: 'Alpaca', clientId: 'DL2503', detail: 'TSLY dividend received: $12.80. Distributed to cash balance.' },
  { id: 'AUD-015', timestamp: '2025-11-01T08:00:00Z', action: 'Statement Generated', category: 'statement', actor: 'Saswat C.', clientId: 'DL2503', detail: 'October 2025 monthly statement generated. Net return: +$64.00.' },
  { id: 'AUD-016', timestamp: '2025-11-01T08:05:00Z', action: 'Statement Generated', category: 'statement', actor: 'Saswat C.', clientId: 'SR2501', detail: 'October 2025 monthly statement generated. Net return: +$3.81.' },
  { id: 'AUD-017', timestamp: '2025-11-05T09:00:00Z', action: 'Statement Delivered', category: 'statement', actor: 'Saswat C.', clientId: 'DL2503', detail: 'October statement emailed to David Low.' },
  { id: 'AUD-018', timestamp: '2025-11-05T09:05:00Z', action: 'Statement Delivered', category: 'statement', actor: 'Saswat C.', clientId: 'SR2501', detail: 'October statement emailed to Rehan Shaikh.' },
  { id: 'AUD-019', timestamp: '2025-11-05T09:10:00Z', action: 'Fee Invoice Sent', category: 'fee', actor: 'Saswat C.', clientId: 'DL2503', detail: 'October fee invoice sent. Amount: $6.95. Due: Nov 5.' },
  { id: 'AUD-020', timestamp: '2025-11-05T09:12:00Z', action: 'Fee Invoice Sent', category: 'fee', actor: 'Saswat C.', clientId: 'SR2501', detail: 'October fee invoice sent. Amount: $0.72. Due: Nov 5.' },
  { id: 'AUD-021', timestamp: '2025-11-08T15:44:00Z', action: 'Fee Collected', category: 'fee', actor: 'Saswat C.', clientId: 'DL2503', detail: 'October fee of $6.95 received. Marked paid.', before: 'Status: outstanding', after: 'Status: paid' },
  { id: 'AUD-022', timestamp: '2025-11-09T11:20:00Z', action: 'Fee Collected', category: 'fee', actor: 'Saswat C.', clientId: 'SR2501', detail: 'October fee of $0.72 received. Marked paid.', before: 'Status: outstanding', after: 'Status: paid' },
  { id: 'AUD-023', timestamp: '2025-11-12T09:30:00Z', action: 'Trade Executed', category: 'trade', actor: 'AGQuant Engine', clientId: 'DL2503', detail: 'SELL 200 PLUG @ $3.70. Strategy: PLUG target hit +12.8%. Alpaca order #ORD-DL-003.' },
  { id: 'AUD-024', timestamp: '2025-11-19T10:00:00Z', action: 'Trade Executed', category: 'trade', actor: 'AGQuant Engine', clientId: 'DL2503', detail: 'SELL 50 TSLY @ $7.94. Strategy: TSLY Income Cycle 1 complete. Alpaca order #ORD-DL-004.' },
  { id: 'AUD-025', timestamp: '2025-11-26T11:15:00Z', action: 'Trade Executed', category: 'trade', actor: 'AGQuant Engine', clientId: 'DL2503', detail: 'BUY 60 TSLY @ $7.71. Strategy: AGQuant Income Cycle 2. Alpaca order #ORD-DL-005.' },
  { id: 'AUD-026', timestamp: '2025-12-01T08:00:00Z', action: 'Statement Generated', category: 'statement', actor: 'Saswat C.', clientId: 'DL2503', detail: 'November 2025 monthly statement generated. Net return: +$168.35.' },
  { id: 'AUD-027', timestamp: '2025-12-01T08:05:00Z', action: 'Statement Generated', category: 'statement', actor: 'Saswat C.', clientId: 'SR2501', detail: 'November 2025 monthly statement generated. Net return: +$14.26.' },
  { id: 'AUD-028', timestamp: '2025-12-03T09:00:00Z', action: 'Fee Collected', category: 'fee', actor: 'Saswat C.', clientId: 'SR2501', detail: 'November fee of $9.03 received via Cash App. Marked paid.', before: 'Status: outstanding', after: 'Status: paid' },
  { id: 'AUD-029', timestamp: '2025-12-05T00:00:00Z', action: 'Fee Invoice Generated', category: 'fee', actor: 'System', clientId: 'DL2503', detail: 'Auto-generated November fee invoice. Amount: $9.23. Due: Dec 5, 2025. OUTSTANDING.' },
  { id: 'AUD-030', timestamp: '2025-12-05T09:10:00Z', action: 'Reminder Sent', category: 'message', actor: 'Saswat C.', clientId: 'DL2503', detail: 'Fee reminder sent to David Low for outstanding $9.23. Method: SMS.' },
  { id: 'AUD-031', timestamp: '2025-12-10T14:30:00Z', action: 'Live Mode Activated', category: 'system', actor: 'Saswat C.', detail: 'AGQuant engine switched from paper trading to live trading mode. Confirmation provided.' },
  { id: 'AUD-032', timestamp: '2025-12-11T09:00:00Z', action: 'Order Submitted', category: 'order', actor: 'Saswat C.', clientId: 'DL2503', detail: 'Manual order submitted: BUY 25 NVDY @ market. Alpaca live order #LIVE-DL-001.' },
]
