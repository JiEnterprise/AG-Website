const STATS = [
  { value: '$2.4B+', label: 'Assets Under Management' },
  { value: '47+',    label: 'Live Trading Strategies' },
  { value: '99.97%', label: 'Platform Uptime' },
  { value: '12+',    label: 'Asset Classes' },
]

export default function StatsBar() {
  return (
    <section
      id="solutions"
      className="border-t border-b border-[rgba(255,255,255,0.07)] py-20"
      aria-label="Key metrics"
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 md:divide-x md:divide-[rgba(255,255,255,0.07)]">
          {STATS.map(s => (
            <div key={s.label} className="md:px-10 first:pl-0 last:pr-0">
              <p
                className="font-playfair text-pale-gold leading-none"
                style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}
              >
                {s.value}
              </p>
              <p className="mt-2 font-dm text-[11px] uppercase tracking-[0.15em] text-[#6E6E73]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
