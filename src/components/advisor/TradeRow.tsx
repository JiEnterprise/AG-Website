import type { Trade } from '@/lib/types'
import { formatCurrency, formatDateLabel, formatShares } from '@/lib/formatters'

interface TradeRowProps {
  trade: Trade
}

export default function TradeRow({ trade }: TradeRowProps) {
  const typeStyle = {
    BUY: 'tr-buy',
    SELL: 'tr-sell',
    DIV: 'tr-div',
  }[trade.type]

  return (
    <tr className="tr-row">
      <td className="tr-sym">{trade.symbol}</td>
      <td>
        <span className={`tr-type ${typeStyle}`}>
          {trade.type}
        </span>
      </td>
      <td className="tr-desc">
        {formatShares(trade.shares)}sh @ {trade.price.toFixed(2)}
      </td>
      <td className="tr-client" style={{ color: trade.clientId === 'DL2503' ? 'var(--info)' : 'var(--purple)' }}>
        {trade.clientId}
      </td>
      <td className="tr-pnl" style={{ color: trade.gain === null ? 'var(--t3)' : trade.gain >= 0 ? 'var(--gain)' : 'var(--loss)' }}>
        {trade.gain === null ? '—' : formatCurrency(trade.gain)}
      </td>
      <td className="tr-date">{formatDateLabel(trade.date)}</td>
    </tr>
  )
}
