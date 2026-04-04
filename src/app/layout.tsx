import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, JetBrains_Mono, Lora } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aurum Global Inc. — Institutional Intelligence. Uncompromising Precision.',
  description:
    'Aurum Global is a multi-asset, institutional-grade financial technology and wealth management firm. Serving HNWIs, family offices, and institutional clients with bespoke portfolio management, algorithmic trading, and AI-powered market intelligence.',
  keywords: [
    'institutional wealth management',
    'algorithmic trading',
    'family office',
    'private wealth management',
    'quantitative strategies',
    'asset management',
    'fintech',
    'Aurum Global',
  ],
  openGraph: {
    title: 'Aurum Global Inc. — Institutional Intelligence',
    description: 'Multi-asset intelligence. Institutional-grade execution. AI-powered insight.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aurum Global Inc.',
    description: 'Institutional Intelligence. Uncompromising Precision.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${lora.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
