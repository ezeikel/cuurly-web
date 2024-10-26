import { NextRequest, NextResponse } from "next/server";
import { AUTHENTICATED_PATHS } from "./constants";

export default function middleware(req: NextRequest) {
  // object added to req from next-auth wrapper this function
  const { pathname } = req.nextUrl;

  // https://stackoverflow.com/a/76749457/2491630
  const session = !!(
    req.cookies.get("authjs.session-token") ||
    // in production it seems to get prefixed with __Secure-
    req.cookies.get("__Secure-authjs.session-token")
  );

  // skip middleware for API routes, images, static files, and specific assets
  if (
    pathname.startsWith("/images") ||
    pathname.startsWith("/_next/static") ||
    pathname.startsWith("/_next/image") ||
    pathname === "/favicon.ico" ||
    pathname === "/monitoring"
  ) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    // redirect authenticated users away from landing page
    if (session) {
      return NextResponse.redirect(new URL("/feed", req.url));
    }

    return NextResponse.next();
  }

  if (AUTHENTICATED_PATHS.includes(pathname)) {
    // users must sign in to access pages that require authentication
    if (!session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}
