import PageHeader from '@/components/advisor/PageHeader'
import MessageThread from '@/components/advisor/MessageThread'
import { messages } from '@/lib/mock-data/messages'

export default function MessagesPage() {
  const dlThread = messages.filter((message) => message.clientId === 'DL2503')
  const srThread = messages.filter((message) => message.clientId === 'SR2501')

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Secure messaging"
        title="Client Messages"
        subtitle="Direct communication channel with your managed clients"
      />

      <section className="grid gap-4 xl:grid-cols-2">
        <MessageThread
          clientId="DL2503"
          clientName="David Low"
          initials="DL"
          color="#378ADD"
          seedMessages={dlThread}
        />
        <MessageThread
          clientId="SR2501"
          clientName="Rehan Shaikh"
          initials="RS"
          color="#7F77DD"
          seedMessages={srThread}
        />
      </section>
    </div>
  )
}
