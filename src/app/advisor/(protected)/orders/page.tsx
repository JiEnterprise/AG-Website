import OrderTicket from '@/components/advisor/OrderTicket'

export default function OrdersPage() {
  return (
    <div className="ag-page">
      <header className="ag-ph" style={{ marginBottom: 20 }}>
        <p className="ag-ph-ey">Execution</p>
        <h1 className="ag-ph-h">Place Order</h1>
        <p className="ag-ph-s">Execute trades on behalf of managed client accounts via Alpaca API</p>
      </header>
      <OrderTicket />
    </div>
  )
}
