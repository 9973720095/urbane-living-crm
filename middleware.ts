import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PUBLIC_ROUTES, ROUTES } from "./src/constants/routes";

// Next.js middleware ko 'export default' function ki tarah expect karta hai
export default function middleware(request: NextRequest) {
  const { nextUrl } = request;
  
  const isLoggedIn = false; 
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url));
  }

  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD.HOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/public).*)"],
};