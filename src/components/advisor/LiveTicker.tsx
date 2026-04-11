'use client'

import type { TickerState } from '@/lib/types'
import { formatPercent } from '@/lib/formatters'

interface LiveTickerProps {
  tickers: TickerState[]
}

function formatTickerPrice(ticker: TickerState): string {
  if (ticker.symbol === 'BTC') {
    return ticker.price.toLocaleString('en-US', { maximumFractionDigits: 0 })
  }
  if (ticker.symbol === 'VIX') {
    return ticker.price.toFixed(1)
  }
  return ticker.price.toFixed(2)
}

export default function LiveTicker({ tickers }: LiveTickerProps) {
  return (
    <div className="top-ticker" aria-live="polite" aria-label="Live market ticker">
      {tickers.map((ticker) => {
        const positive = ticker.direction === 'up'
        return (
          <div key={ticker.symbol} className="tick">
            <span className="ts">{ticker.symbol}</span>
            <span className="tp">{formatTickerPrice(ticker)}</span>
            <span className={positive ? 'tu' : 'td'}>
              {ticker.change >= 0 ? '+' : ''}
              {formatPercent(ticker.change)}
            </span>
          </div>
        )
      })}
    </div>
  )
}
