import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function proxy(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  console.log("MASUK PROXY")
  console.log("TOKEN:", token)

  const { pathname } = req.nextUrl

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    if (token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}