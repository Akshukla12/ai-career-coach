// middleware.js

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/resume(.*)",
  "/interview(.*)",
  "/ai-cover-letter(.*)",
  "/onboarding(.*)"
]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();

  if (userId || !isProtectedRoute(req)) {
    return NextResponse.next();
  }

  const { redirectToSignIn } = auth();
  return redirectToSignIn();
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Exclude static files
    "/(api|trpc)(.*)"
  ]
};
