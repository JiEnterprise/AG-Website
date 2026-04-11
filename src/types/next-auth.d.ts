import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: 'advisor' | 'founder'
    } & DefaultSession['user']
  }

  interface User {
    role: 'advisor' | 'founder'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: 'advisor' | 'founder'
  }
}
