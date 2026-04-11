import PageHeader from '@/components/advisor/PageHeader'
import OrderTicket from '@/components/advisor/OrderTicket'

export default function OrdersPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Execution"
        title="Place Order"
        subtitle="Execute trades on behalf of managed client accounts via Alpaca API"
      />
      <OrderTicket />
    </div>
  )
}
