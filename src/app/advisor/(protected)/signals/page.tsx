import PageHeader from '@/components/advisor/PageHeader'
import SignalCard from '@/components/advisor/SignalCard'
import { allSignals } from '@/lib/advisorMetrics'

export default function SignalsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="AGQuant Engine"
        title="Live Signals"
        subtitle="Signals pending your review — AI-generated, human-approved execution"
      />

      <section className="space-y-3">
        {allSignals.map((signal) => (
          <SignalCard key={signal.id} signal={signal} />
        ))}
      </section>
    </div>
  )
}
