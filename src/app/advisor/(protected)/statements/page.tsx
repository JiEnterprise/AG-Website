import PageHeader from '@/components/advisor/PageHeader'
import FeeBox from '@/components/advisor/FeeBox'
import AlertCard from '@/components/advisor/AlertCard'
import { allStatements } from '@/lib/advisorMetrics'
import { allAlerts } from '@/lib/advisorMetrics'
import { formatCurrency } from '@/lib/formatters'

export default function StatementsPage() {
  const dlStatements = allStatements.filter((statement) => statement.clientId === 'DL2503')
  const srStatements = allStatements.filter((statement) => statement.clientId === 'SR2501')
  const unpaidAlert = allAlerts.find((alert) => alert.severity === 'critical')
  const dlNov = allStatements.find((statement) => statement.id === 'MCS-DL-2025-11')

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Reporting"
        title="Monthly Statements"
        subtitle="Generate, review, and send MCS to clients · AGM system"
      />

      {unpaidAlert && <AlertCard alert={unpaidAlert} />}

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
          <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">David Low — DL2503 statements</h2>
          <div className="mt-2 space-y-2">
            {dlStatements.map((statement) => (
              <div key={statement.id} className="flex items-center justify-between rounded-[var(--radius-sm)] border border-[rgba(255,255,255,0.04)] bg-[var(--bg-elevated)] p-2.5">
                <div>
                  <p className="font-mono text-[10px] text-[var(--gold)]">{statement.periodLabel}</p>
                  <p className="font-dm text-[10px] text-[var(--t3)]">Return {formatCurrency(statement.totalReturn)} · AUM {formatCurrency(statement.closingAum)}</p>
                </div>
                <div className="text-right">
                  <p className="font-dm text-[9px]" style={{ color: statement.status === 'unpaid' ? 'var(--loss)' : 'var(--gain)' }}>
                    {statement.status === 'unpaid' ? `Fee Due ${formatCurrency(statement.totalDue)}` : 'Paid'}
                  </p>
                  <button className="mt-1 rounded-[var(--radius-sm)] border border-[var(--bdr)] px-2 py-1 font-dm text-[9px] text-[var(--t2)]">
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
          <h2 className="font-dm text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">Rehan Shaikh — SR2501 statements</h2>
          <div className="mt-2 space-y-2">
            {srStatements.map((statement) => (
              <div key={statement.id} className="flex items-center justify-between rounded-[var(--radius-sm)] border border-[rgba(255,255,255,0.04)] bg-[var(--bg-elevated)] p-2.5">
                <div>
                  <p className="font-mono text-[10px] text-[var(--gold)]">{statement.periodLabel}</p>
                  <p className="font-dm text-[10px] text-[var(--t3)]">Return {formatCurrency(statement.totalReturn)} · AUM {formatCurrency(statement.closingAum)}</p>
                </div>
                <div className="text-right">
                  <p className="font-dm text-[9px]" style={{ color: statement.status === 'unpaid' ? 'var(--loss)' : 'var(--gain)' }}>
                    {statement.status === 'unpaid' ? `Fee Due ${formatCurrency(statement.totalDue)}` : 'Paid'}
                  </p>
                  <button className="mt-1 rounded-[var(--radius-sm)] border border-[var(--bdr)] px-2 py-1 font-dm text-[9px] text-[var(--t2)]">
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      {dlNov && (
        <section className="space-y-3 rounded-[var(--radius-lg)] border border-[var(--bdr)] bg-[var(--bg-card)] p-4">
          <h2 className="font-dm text-[12px] uppercase tracking-[0.2em] text-[var(--gold)]">
            November 2025 — invoice detail
          </h2>
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
          <div className="flex flex-wrap gap-2">
            <button className="rounded-[var(--radius-sm)] bg-[var(--gold)] px-3 py-1.5 font-dm text-[10px] uppercase tracking-[0.12em] text-black">Mark as Paid</button>
            <button className="rounded-[var(--radius-sm)] border border-[var(--bdr)] px-3 py-1.5 font-dm text-[10px] uppercase tracking-[0.12em] text-[var(--t2)]">Send to Client</button>
            <button className="rounded-[var(--radius-sm)] border border-[var(--bdr)] px-3 py-1.5 font-dm text-[10px] uppercase tracking-[0.12em] text-[var(--t2)]">Download Invoice</button>
          </div>
          <article className="rounded-[var(--radius-md)] border border-[var(--bdr)] bg-[var(--bg-elevated)] p-3">
            <p className="font-dm text-[10px] uppercase tracking-[0.16em] text-[var(--t3)]">PM Notes</p>
            <p className="mt-1 font-lora text-[13px] leading-[1.8] text-[var(--t2)]">{dlNov.notes}</p>
          </article>
        </section>
      )}
    </div>
  )
}
