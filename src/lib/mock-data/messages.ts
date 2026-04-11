import type { Message } from '@/lib/types'
export const messages: Message[] = [
  { id:'M001',clientId:'DL2503',direction:'outbound',from:'SC001',body:"Hi David — November statement is ready. Total return +$168.35 across PLUG and two TSLY cycles. Fee of $9.23 due by Dec 5. Let me know if you have any questions about the trades.",timestamp:'2025-11-30T11:42:00Z',read:true },
  { id:'M002',clientId:'DL2503',direction:'inbound',from:'DL2503',body:"Hi Saswat, thanks for the November update. Great month! I'll arrange the fee payment by Dec 5.",timestamp:'2025-11-30T14:15:00Z',read:true },
  { id:'M003',clientId:'DL2503',direction:'outbound',from:'SC001',body:"Closed the second TSLY position today — 115 shares sold at $7.66 for +$47.15. Account is now fully in cash. Watching for next entry signal around $7.00.",timestamp:'2025-11-25T14:18:00Z',read:true },
  { id:'M004',clientId:'SR2501',direction:'outbound',from:'SC001',body:"Rehan — November closed well. TSLY and PLUG both performed. Watching for December re-entry on TSLY around $7.00. Statement on its way.",timestamp:'2025-11-30T12:00:00Z',read:true },
  { id:'M005',clientId:'SR2501',direction:'inbound',from:'SR2501',body:"Any new positions planned for December? I'm interested in the TSLY opportunity you mentioned. What are the expected returns?",timestamp:'2025-12-01T09:30:00Z',read:false },
]
