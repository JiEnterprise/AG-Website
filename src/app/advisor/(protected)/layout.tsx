import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import CommandNav from '@/components/advisor/CommandNav'
import { authOptions } from '@/lib/auth'

export default async function ProtectedAdvisorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user || (session.user.role !== 'advisor' && session.user.role !== 'founder')) {
    redirect('/advisor/sign-in')
  }

  return (
    <div className="ag-shell">
      <a href="#main-content" className="ag-skip">Skip to main content</a>
      <CommandNav />
      <main id="main-content" role="main" className="ag-main">
        {children}
      </main>
    </div>
  )
}
