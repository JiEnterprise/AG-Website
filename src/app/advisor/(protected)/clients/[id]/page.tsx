import { notFound } from 'next/navigation'
import PageHeader from '@/components/advisor/PageHeader'
import StatRow from '@/components/advisor/StatRow'
import TradeRow from '@/components/advisor/TradeRow'
import EquityChart from '@/components/advisor/EquityChart'
import { getClientById, getTradesByClient, getStatementsByClient } from '@/lib/advisorMetrics'
import { formatCurrency } from '@/lib/formatters'
import { allTimeReturn, allTimeReturnPct } from '@/lib/calculations/returns'

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = getClientById(params.id)
  if (!client) notFound()

  const trades = getTradesByClient(client.id)
  const statements = getStatementsByClient(client.id)
  const totalReturn = allTimeReturn(client.currentAUM, client.initialDeposit)
  const roi = allTimeReturnPct(client.currentAUM, client.initialDeposit)

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Client account"
        title={`${client.name} · ${client.id}`}
        subtitle={`${client.tier} · ${client.status} · onboarded ${new Date(client.onboarded).toLocaleDateString()}`}
      />

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
          <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Account Info</h2>
          <div className="mt-2">
            <StatRow label="Client ID" value={client.id} />
            <StatRow label="Tier" value={client.tier} mono={false} />
            <StatRow label="Fee Rate" value={`${(client.feeRate * 100).toFixed(2)}%`} />
            <StatRow label="Billing Cycle" value={client.billingCycle} mono={false} />
          </div>
        </article>

        <article className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
          <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Financials</h2>
          <div className="mt-2">
            <StatRow label="Current AUM" value={formatCurrency(client.currentAUM)} />
            <StatRow label="Initial Deposit" value={formatCurrency(client.initialDeposit)} />
            <StatRow label="Total Return" value={formatCurrency(totalReturn)} valueColor="var(--gain)" />
            <StatRow label="ROI" value={`${roi.toFixed(2)}%`} valueColor="var(--gain)" />
          </div>
        </article>

        <article className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
          <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Activity</h2>
          <div className="mt-2">
            <StatRow label="Open Positions" value={String(client.openPositions)} />
            <StatRow label="Cash Balance" value={formatCurrency(client.cashBalance)} />
            <StatRow label="Fee Status" value={client.feeStatus} mono={false} valueColor={client.feeStatus === 'paid' ? 'var(--gain)' : 'var(--loss)'} />
            <StatRow label="Latest Statement" value={statements[0]?.periodLabel ?? 'N/A'} mono={false} />
          </div>
        </article>
      </section>

      <section className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
        <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Equity Curve</h2>
        <div className="mt-3">
          <EquityChart clientId={client.id} />
        </div>
      </section>

      <section className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
        <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Trade History</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.05)] text-left">
                <th className="px-3 pb-2 font-dm text-[9px] uppercase tracking-[0.16em] text-[var(--t3)]">Symbol</th>
                <th className="px-3 pb-2 font-dm text-[9px] uppercase tracking-[0.16em] text-[var(--t3)]">Type</th>
                <th className="px-3 pb-2 font-dm text-[9px] uppercase tracking-[0.16em] text-[var(--t3)]">Description</th>
                <th className="px-3 pb-2 font-dm text-[9px] uppercase tracking-[0.16em] text-[var(--t3)]">Client</th>
                <th className="px-3 pb-2 font-dm text-[9px] uppercase tracking-[0.16em] text-[var(--t3)]">P&L</th>
                <th className="px-3 pb-2 font-dm text-[9px] uppercase tracking-[0.16em] text-[var(--t3)]">Date</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => (
                <TradeRow key={trade.id} trade={trade} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
