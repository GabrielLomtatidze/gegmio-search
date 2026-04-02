import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export function proxy(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value
  const url = req.nextUrl.clone()

  if (token && ["/auth/login", "/auth/registration", "/auth/otp"].includes(url.pathname)) {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  if (!token && ["/page/profile", "/page/dashboard"].includes(url.pathname)) {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"]
}