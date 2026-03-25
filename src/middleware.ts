import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("anera-session")?.value;
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    try {
      const payload = JSON.parse(
        Buffer.from(session, "base64").toString("utf-8")
      );
      if (payload.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  // Redirect signed-in users away from auth pages
  if (pathname === "/signin" || pathname === "/signup") {
    if (session) {
      try {
        const payload = JSON.parse(
          Buffer.from(session, "base64").toString("utf-8")
        );
        if (payload.role === "admin") {
          return NextResponse.redirect(new URL("/admin", request.url));
        }
        return NextResponse.redirect(new URL("/", request.url));
      } catch {
        // Invalid session, let them through to sign in
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/signin", "/signup"],
};
