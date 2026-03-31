import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

async function verifyAdminCookie(cookieValue: string | undefined): Promise<boolean> {
  if (!cookieValue) return false
  const password = process.env.ADMIN_PASSWORD ?? ''
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'admin_session_v1')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const expected = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return cookieValue === expected
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_session')?.value
    const valid = await verifyAdminCookie(token)
    if (!valid) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
