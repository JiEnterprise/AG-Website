import { formatCurrency } from '@/lib/formatters'
import StatRow from '@/components/advisor/StatRow'

interface FeeBoxProps {
  openingAum: number
  gains: { label: string; value: number }[]
  dividends: number
  transactionFees: number
  endingAum: number
  managementFee: number
  totalDue: number
}

export default function FeeBox({
  openingAum,
  gains,
  dividends,
  transactionFees,
  endingAum,
  managementFee,
  totalDue,
}: FeeBoxProps) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--bdr-gold)] bg-[var(--gold-dim)] p-4">
      <StatRow label="Opening AUM" value={formatCurrency(openingAum)} />
      {gains.map((line) => (
        <StatRow key={line.label} label={line.label} value={`+${formatCurrency(line.value)}`} valueColor="var(--gain)" />
      ))}
      <StatRow label="Dividends" value={formatCurrency(dividends)} valueColor={dividends > 0 ? 'var(--gain)' : 'var(--t1)'} />
      <StatRow label="Transaction Fees" value={`-${formatCurrency(transactionFees)}`} valueColor="var(--loss)" />
      <StatRow label="Ending AUM" value={formatCurrency(endingAum)} />
      <div className="my-2 h-px bg-[var(--gold-border)]" />
      <StatRow label="Management Fee (1%)" value={formatCurrency(managementFee)} valueColor="var(--loss)" />
      <StatRow label="Total Due" value={formatCurrency(totalDue)} valueColor="var(--gold)" mono={false} />
    </div>
  )
}
