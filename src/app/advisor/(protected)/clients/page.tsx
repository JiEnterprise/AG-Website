import PageHeader from '@/components/advisor/PageHeader'
import MetricCard from '@/components/advisor/MetricCard'
import ClientRow from '@/components/advisor/ClientRow'
import { allClients, totalAum, totalOutstandingFees } from '@/lib/advisorMetrics'
import { formatCurrency } from '@/lib/formatters'
import { allTimeReturn } from '@/lib/calculations/returns'

export default function ClientsPage() {
  const totalReturn = allClients.reduce((sum, client) => sum + allTimeReturn(client.currentAUM, client.initialDeposit), 0)

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="All clients"
        title="Client Roster"
        subtitle={`2 active managed accounts · ${formatCurrency(totalAum)} combined AUM`}
      />

      <section className="grid gap-3 md:grid-cols-3">
        <MetricCard label="Combined AUM" value={formatCurrency(totalAum)} accent />
        <MetricCard label="Total All-Client Return" value={`+${formatCurrency(totalReturn)}`} valueColor="var(--gain)" />
        <MetricCard label="Fees Due" value={formatCurrency(totalOutstandingFees)} valueColor={totalOutstandingFees > 0 ? 'var(--loss)' : 'var(--gain)'} />
      </section>

      <section className="space-y-3">
        {allClients.map((client) => (
          <ClientRow key={client.id} client={client} />
        ))}
      </section>
    </div>
  )
}
