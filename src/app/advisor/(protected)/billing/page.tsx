import PageHeader from '@/components/advisor/PageHeader'
import MetricCard from '@/components/advisor/MetricCard'
import FeeBox from '@/components/advisor/FeeBox'
import { allStatements, totalOutstandingFees } from '@/lib/advisorMetrics'
import { formatCurrency } from '@/lib/formatters'

export default function BillingPage() {
  const dl = allStatements.find((statement) => statement.id === 'MCS-DL-2025-11')
  const sr = allStatements.find((statement) => statement.id === 'MCS-SR-2025-11')
  const collected = allStatements
    .filter((statement) => statement.status === 'paid')
    .reduce((sum, statement) => sum + statement.totalDue, 0)

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Fee management"
        title="Fee Collection"
        subtitle="Track, invoice, and collect management fees across all client accounts"
      />

      <section className="grid gap-3 md:grid-cols-3">
        <MetricCard label="Outstanding Fees" value={formatCurrency(totalOutstandingFees)} valueColor="var(--loss)" />
        <MetricCard label="Collected This Month" value={formatCurrency(collected)} valueColor="var(--gain)" />
        <MetricCard label="Annual Run-Rate" value={formatCurrency(212)} accent />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {dl && (
          <article className="space-y-3 rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
            <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">DL2503 November invoice</h2>
            <FeeBox
              openingAum={695.2}
              gains={[
                { label: 'PLUG realized gain', value: 83.6 },
                { label: 'TSLY cycle 1 gain', value: 37.6 },
                { label: 'TSLY cycle 2 gain', value: 47.15 },
              ]}
              dividends={0}
              transactionFees={0.4}
              endingAum={882.75}
              managementFee={8.83}
              totalDue={9.23}
            />
            <p className="font-dm text-[11px] text-[var(--loss)]">Status: Unpaid</p>
            <div className="flex gap-2">
              <button className="rounded-[var(--radius-sm)] bg-[var(--gold)] px-3 py-1.5 font-dm text-[10px] uppercase tracking-[0.12em] text-black">Mark as Paid</button>
              <button className="rounded-[var(--radius-sm)] border border-[var(--bdr)] px-3 py-1.5 font-dm text-[10px] uppercase tracking-[0.12em] text-[var(--t2)]">Send Reminder</button>
            </div>
          </article>
        )}

        {sr && (
          <article className="space-y-3 rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
            <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">SR2501 November invoice</h2>
            <FeeBox
              openingAum={749.12}
              gains={[{ label: 'November realized return', value: 19.41 }]}
              dividends={0}
              transactionFees={0.2}
              endingAum={882.75}
              managementFee={8.83}
              totalDue={9.03}
            />
            <p className="font-dm text-[11px] text-[var(--gain)]">Status: Paid ✓</p>
            <button className="rounded-[var(--radius-sm)] border border-[var(--bdr)] px-3 py-1.5 font-dm text-[10px] uppercase tracking-[0.12em] text-[var(--t2)]">Download Receipt</button>
          </article>
        )}
      </section>

      <section className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
        <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Fee History</h2>
        <table className="mt-2 w-full min-w-[680px]">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.05)]">
              <th className="py-2 text-left font-dm text-[9px] uppercase tracking-[0.14em] text-[var(--t3)]">Period</th>
              <th className="py-2 text-left font-dm text-[9px] uppercase tracking-[0.14em] text-[var(--t3)]">Client</th>
              <th className="py-2 text-left font-dm text-[9px] uppercase tracking-[0.14em] text-[var(--t3)]">Amount</th>
              <th className="py-2 text-left font-dm text-[9px] uppercase tracking-[0.14em] text-[var(--t3)]">Due Date</th>
              <th className="py-2 text-left font-dm text-[9px] uppercase tracking-[0.14em] text-[var(--t3)]">Status</th>
              <th className="py-2 text-left font-dm text-[9px] uppercase tracking-[0.14em] text-[var(--t3)]">Action</th>
            </tr>
          </thead>
          <tbody>
            {allStatements.map((statement) => (
              <tr key={statement.id} className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="py-2 font-mono text-[10px] text-[var(--t2)]">{statement.period}</td>
                <td className="py-2 font-mono text-[10px] text-[var(--t2)]">{statement.clientId}</td>
                <td className="py-2 font-mono text-[10px] text-[var(--t1)]">{formatCurrency(statement.totalDue)}</td>
                <td className="py-2 font-mono text-[10px] text-[var(--t3)]">{new Date(statement.payDate).toLocaleDateString()}</td>
                <td className="py-2">
                  <span className="rounded-full px-2 py-[1px] font-dm text-[8px] uppercase tracking-[0.12em]" style={{ color: statement.status === 'paid' ? 'var(--gain)' : 'var(--loss)', background: statement.status === 'paid' ? 'var(--gain-bg)' : 'var(--loss-bg)' }}>
                    {statement.status}
                  </span>
                </td>
                <td className="py-2 font-dm text-[10px] text-[var(--gold)]">{statement.status === 'paid' ? 'Receipt' : 'Collect'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <p className="rounded-[var(--radius-md)] border border-[var(--bdr)] bg-[var(--bg-card)] p-3 font-mono text-[9px] leading-[1.8] text-[var(--t3)]">
        Management fee: 1% of month-end AUM, collected 5th of following month. Transaction fee: $0.20 per trade side.
        All fees disclosed in monthly client statement. Minimum AUM requirements apply. Aurum Global Inc.
      </p>
    </div>
  )
}
