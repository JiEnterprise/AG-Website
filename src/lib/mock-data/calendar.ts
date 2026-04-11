import type { CalendarEvent } from '@/lib/types'
export const calendarEvents: CalendarEvent[] = [
  { id:'CAL001',date:'2025-12-04',category:'critical',title:'TSLY ex-div decision deadline',body:'Must decide by market close: hold through Dec 5 ex-div or exit. Recommended: hold if entry below $7.20.',relatedSymbol:'TSLY' },
  { id:'CAL002',date:'2025-12-05',category:'dividend',title:'TSLY ex-dividend date',body:'Est. distribution $0.13–$0.15/share. Monitor post-div price action for exit opportunity.',relatedSymbol:'TSLY' },
  { id:'CAL003',date:'2025-12-05',category:'billing',title:'DL2503 fee due — $9.23',body:'David Low November 2025 management fee + transaction fees. Follow up if not received by EOD.',relatedClientId:'DL2503' },
  { id:'CAL004',date:'2025-12-12',category:'dividend',title:'TSLY ex-dividend (weekly)',relatedSymbol:'TSLY' },
  { id:'CAL005',date:'2025-12-17',category:'macro',title:'FOMC meeting day 1',body:'Federal Reserve meeting. Rate decision Dec 18. Expect volatility in rate-sensitive positions.' },
  { id:'CAL006',date:'2025-12-18',category:'macro',title:'FOMC rate decision',body:'Federal Reserve interest rate decision. Monitor impact on dividend ETF pricing and TSLY volatility.' },
  { id:'CAL007',date:'2025-12-19',category:'dividend',title:'TSLY ex-dividend (weekly)',relatedSymbol:'TSLY' },
  { id:'CAL008',date:'2025-12-26',category:'dividend',title:'TSLY ex-dividend (weekly)',relatedSymbol:'TSLY' },
  { id:'CAL009',date:'2025-12-31',category:'reporting',title:'Month-end + Year-end',body:'Generate December MCS for both DL2503 and SR2501. Full year P&L review. Annual performance report.' },
  { id:'CAL010',date:'2026-01-05',category:'billing',title:'December fees due — both clients',body:'DL2503 and SR2501 December management fees due.' },
]
