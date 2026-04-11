import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

type PortalRole = 'advisor' | 'founder'

interface AuthUser {
  id: string
  name: string
  email: string
  role: PortalRole
}

const AUTH_USERS: Record<string, AuthUser & { password: string }> = {
  SaswatC: {
    id: 'SC001',
    name: 'Saswat C.',
    email: 'saswat@aurumglobal.com',
    role: 'founder',
    password: 'Saswat',
  },
  AdvisorPM: {
    id: 'AGPM001',
    name: 'Advisor PM',
    email: 'advisor@aurumglobal.com',
    role: 'advisor',
    password: 'Aurum123',
  },
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? 'aurum-dev-secret',
  session: {
    strategy: 'jwt',
    maxAge: 60 * 30,
    updateAge: 60 * 5,
  },
  pages: {
    signIn: '/advisor/sign-in',
  },
  providers: [
    CredentialsProvider({
      name: 'Advisor Portal',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null
        const user = AUTH_USERS[credentials.username]
        if (!user || credentials.password !== user.password) return null
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as AuthUser).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? ''
        session.user.role = (token.role as PortalRole | undefined) ?? 'advisor'
      }
      return session
    },
  },
}
