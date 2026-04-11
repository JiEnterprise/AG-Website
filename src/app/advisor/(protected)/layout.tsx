import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Topbar from '@/components/advisor/Topbar'
import Sidebar from '@/components/advisor/Sidebar'
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
    <div className="advisor-shell">
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>
      <div className="shell">
        <Topbar />
        <div className="body">
          <Sidebar />
          <main id="main-content" role="main" className="main">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
