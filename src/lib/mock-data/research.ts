import type { ResearchThesis, AGQuantStrategy, SystemStatus } from '@/lib/types'
export const researchTheses: ResearchThesis[] = [
  { id:'R001',symbol:'TSLY',title:'TSLY Dividend Capture — Dec cycle',status:'active',strategy:'dividend_capture',thesis:'Weekly ex-dividend entry/exit cycle on TSLY (YieldMax TSLA covered call ETF). Entry zone $7.00–$7.20 pre-ex-div. Hold through distribution. Exit on post-div recovery at $7.60+. Historical win rate: 100% (6 cycles). Risk: NAV erosion if held long-term, TSLA volatility affecting option premium.',entryZone:[7.00,7.20],targetExit:7.80,stopLoss:6.50,confidence:85,createdAt:'2025-10-01',updatedAt:'2025-12-01' },
  { id:'R002',symbol:'PLUG',title:'PLUG Mean Reversion — Contrarian',status:'watching',strategy:'mean_reversion',thesis:'RSI(14) at 28.4 — historically oversold for PLUG. 52W low $2.10, current $2.84. Contrarian buy on oversold RSI with tight stop. Hydrogen fuel cell sector showing early signs of institutional accumulation. Risk: structural sector weakness, dilution risk from capital raises.',entryZone:[2.70,2.90],targetExit:3.15,stopLoss:2.60,confidence:64,createdAt:'2025-11-20',updatedAt:'2025-12-01' },
  { id:'R003',symbol:'MSFO',title:'MSFO vs TSLY — YieldMax comparison',status:'watching',strategy:'income_optimization',thesis:'Comparing YieldMax covered call ETF yields: MSFO (MSFT-based) vs TSLY (TSLA-based). MSFO offers lower yield but more stable NAV due to MSFT lower volatility. TSLY higher yield but faster NAV decay. Evaluating portfolio rotation opportunity for lower-risk income generation.',confidence:55,createdAt:'2025-11-28',updatedAt:'2025-11-28' },
]
export const agquantStrategies: AGQuantStrategy[] = [
  { id:'STRAT001',name:'Dividend Capture',description:'TSLY weekly ex-dividend entry/exit cycle — systematic positioning',status:'active',symbols:['TSLY','MSFO','NVDY'],lastSignalAt:new Date().toISOString(),winRate:100,avgGainPerTrade:45.32 },
  { id:'STRAT002',name:'Mean Reversion',description:'RSI oversold bounce on beaten-down names with catalyst',status:'active',symbols:['PLUG','FCEL','BE'],lastSignalAt:new Date(Date.now()-5400000).toISOString(),winRate:100,avgGainPerTrade:45.90 },
  { id:'STRAT003',name:'Momentum Scalping',description:'Short-term momentum on high-vol names — AGQuant paper only',status:'paused',symbols:['NVDA','TSLA','AMD'] },
  { id:'STRAT004',name:'Options Income',description:'YieldMax ETF portfolio yield optimization across covered call ETFs',status:'active',symbols:['TSLY','MSFO','NVDY','GOOGY','AMZY'] },
]
export const systemStatus: SystemStatus = {
  agquantEngine:'online', alpacaApi:'connected', alpacaMode:'paper',
  circuitBreakers:'armed', kellyPositionLimit:28, logSync:'realtime',
}
