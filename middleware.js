// middleware.js

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 🛑 HARDCODED KEYS (not recommended in production)
const clerkConfig = {
  secretKey: "sk_test_hCXaN0HYWdMBQZQ1iY7XF6xHPkg70eeaCvWD9XSeOV",
  publishableKey: "pk_test_YWN0aXZlLWZsYW1pbmdvLTE3LmNsZXJrLmFjY291bnRzLmRldiQ"
  
};

const middleware = clerkMiddleware({
  ...clerkConfig
});

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/resume(.*)",
  "/interview(.*)",
  "/ai-cover-letter(.*)",
  "/onboarding(.*)"
]);

export default middleware(async (auth, req) => {
  const { userId } = await auth();

  if (userId || !isProtectedRoute(req)) {
    return NextResponse.next();
  }

  const { redirectToSignIn } = await auth();
  return redirectToSignIn();
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",  // ignore _next/** and public files
    "/(api|trpc)(.*)"          // match APIs too
  ]
};
