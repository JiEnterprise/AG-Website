import { NextResponse, type NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname === '/advisor/sign-in') {
    return NextResponse.next()
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET ?? 'aurum-dev-secret' })

  if (!token) {
    const signInUrl = new URL('/advisor/sign-in', req.url)
    signInUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(signInUrl)
  }

  if (token.role !== 'advisor' && token.role !== 'founder') {
    return NextResponse.redirect(new URL('/advisor/sign-in', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/advisor/:path*'],
}
