export type ComplianceStatus = 'complete' | 'pending' | 'overdue' | 'na'

export type ComplianceItem = {
  id: string
  clientId: string
  category: 'onboarding' | 'ongoing' | 'annual' | 'regulatory'
  label: string
  status: ComplianceStatus
  completedDate?: string
  dueDate?: string
  notes?: string
}

export const complianceItems: ComplianceItem[] = [
  // DL2503 — David Low
  { id: 'CMP-DL-001', clientId: 'DL2503', category: 'onboarding', label: 'Identity Verified (Gov ID)', status: 'complete', completedDate: '2025-10-15' },
  { id: 'CMP-DL-002', clientId: 'DL2503', category: 'onboarding', label: 'Investment Management Agreement Signed', status: 'complete', completedDate: '2025-10-15' },
  { id: 'CMP-DL-003', clientId: 'DL2503', category: 'onboarding', label: 'Risk Tolerance Questionnaire', status: 'complete', completedDate: '2025-10-15' },
  { id: 'CMP-DL-004', clientId: 'DL2503', category: 'onboarding', label: 'Initial Deposit Received & Confirmed', status: 'complete', completedDate: '2025-10-15' },
  { id: 'CMP-DL-005', clientId: 'DL2503', category: 'onboarding', label: 'Accreditation / Suitability Assessment', status: 'complete', completedDate: '2025-10-15' },
  { id: 'CMP-DL-006', clientId: 'DL2503', category: 'ongoing', label: 'Monthly Statement Delivered', status: 'complete', completedDate: '2025-11-05', notes: 'Oct statement sent via email' },
  { id: 'CMP-DL-007', clientId: 'DL2503', category: 'ongoing', label: 'November Statement Delivered', status: 'pending', dueDate: '2025-12-05' },
  { id: 'CMP-DL-008', clientId: 'DL2503', category: 'ongoing', label: 'November Fee Collected', status: 'overdue', dueDate: '2025-12-05', notes: '$9.23 outstanding' },
  { id: 'CMP-DL-009', clientId: 'DL2503', category: 'annual', label: 'Annual Performance Review', status: 'pending', dueDate: '2026-01-15' },
  { id: 'CMP-DL-010', clientId: 'DL2503', category: 'annual', label: 'Year-End Tax Package', status: 'pending', dueDate: '2026-01-31' },
  { id: 'CMP-DL-011', clientId: 'DL2503', category: 'regulatory', label: 'AML / KYC Annual Refresh', status: 'pending', dueDate: '2026-10-15' },
  { id: 'CMP-DL-012', clientId: 'DL2503', category: 'regulatory', label: 'IMA Annual Acknowledgment', status: 'pending', dueDate: '2026-10-15' },

  // SR2501 — Rehan Shaikh
  { id: 'CMP-SR-001', clientId: 'SR2501', category: 'onboarding', label: 'Identity Verified (Gov ID)', status: 'complete', completedDate: '2025-07-15' },
  { id: 'CMP-SR-002', clientId: 'SR2501', category: 'onboarding', label: 'Investment Management Agreement Signed', status: 'complete', completedDate: '2025-07-15' },
  { id: 'CMP-SR-003', clientId: 'SR2501', category: 'onboarding', label: 'Risk Tolerance Questionnaire', status: 'complete', completedDate: '2025-07-15' },
  { id: 'CMP-SR-004', clientId: 'SR2501', category: 'onboarding', label: 'Initial Deposit Received & Confirmed', status: 'complete', completedDate: '2025-07-20', notes: '$50 via Cash App' },
  { id: 'CMP-SR-005', clientId: 'SR2501', category: 'onboarding', label: 'Accreditation / Suitability Assessment', status: 'complete', completedDate: '2025-07-15' },
  { id: 'CMP-SR-006', clientId: 'SR2501', category: 'ongoing', label: 'Monthly Statements Delivered (Aug–Nov)', status: 'complete', completedDate: '2025-12-01' },
  { id: 'CMP-SR-007', clientId: 'SR2501', category: 'ongoing', label: 'November Fee Collected', status: 'complete', completedDate: '2025-12-03', notes: '$9.03 received' },
  { id: 'CMP-SR-008', clientId: 'SR2501', category: 'annual', label: 'Annual Performance Review', status: 'pending', dueDate: '2026-01-15' },
  { id: 'CMP-SR-009', clientId: 'SR2501', category: 'annual', label: 'Year-End Tax Package', status: 'pending', dueDate: '2026-01-31' },
  { id: 'CMP-SR-010', clientId: 'SR2501', category: 'regulatory', label: 'AML / KYC Annual Refresh', status: 'pending', dueDate: '2026-07-15' },
  { id: 'CMP-SR-011', clientId: 'SR2501', category: 'regulatory', label: 'IMA Annual Acknowledgment', status: 'pending', dueDate: '2026-07-15' },
]

export function getClientCompliance(clientId: string): ComplianceItem[] {
  return complianceItems.filter((item) => item.clientId === clientId)
}

export function getComplianceScore(clientId: string): { complete: number; total: number; overdue: number } {
  const items = getClientCompliance(clientId).filter((i) => i.status !== 'na')
  const complete = items.filter((i) => i.status === 'complete').length
  const overdue = items.filter((i) => i.status === 'overdue').length
  return { complete, total: items.length, overdue }
}
