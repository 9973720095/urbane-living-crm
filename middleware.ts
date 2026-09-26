import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PUBLIC_ROUTES, ROUTES } from "./src/constants/routes";

export default function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;

  // API auth routes ko kabhi block mat karo
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const isLoggedIn = false; // TODO: yaha actual JWT cookie check karna hai - abhi ke liye false rakha hai
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url));
  }

  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD.HOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"], // api/* sab exclude
};