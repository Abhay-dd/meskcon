import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth((req: NextRequest & { auth: unknown }) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = req.nextUrl.pathname === "/admin/login";
  const session = (req as { auth?: { user?: unknown } }).auth;

  if (isAdminRoute && !isLoginRoute && !session) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (isLoginRoute && session) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
