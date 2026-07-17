import { createServerClient, type SetAllCookies } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseEnv } from "@/lib/supabase/config";

const authPages = new Set(["/login", "/signup"]);
const protectedPrefixes = [
  "/dashboard",
  "/passport",
  "/upload",
  "/goals",
  "/onboarding",
  "/opportunities",
  "/applications",
  "/visa",
  "/interview",
];

function isProtectedPath(pathname: string) {
  return protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function withCopiedCookies(source: NextResponse, destination: NextResponse) {
  source.cookies.getAll().forEach((cookie) => {
    destination.cookies.set(cookie.name, cookie.value, cookie);
  });
  return destination;
}

export async function middleware(request: NextRequest) {
  const env = getSupabaseEnv();

  if (!env) {
    const pathname = request.nextUrl.pathname;
    // If env is missing, only allow public pages — fail closed for protected routes
    if (isProtectedPath(pathname) || pathname === "/onboarding") {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/login";
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: Parameters<SetAllCookies>[0]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const hasCompletedOnboarding = Boolean(user?.user_metadata?.onboarding_completed);
  const wantsProtectedRoute = isProtectedPath(pathname);
  const wantsOnboarding = pathname === "/onboarding";

  if (!user && (wantsProtectedRoute || wantsOnboarding)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    if (pathname !== "/login") {
      redirectUrl.searchParams.set("next", pathname);
    }
    return withCopiedCookies(response, NextResponse.redirect(redirectUrl));
  }

  if (user && authPages.has(pathname)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = hasCompletedOnboarding ? "/dashboard" : "/onboarding";
    redirectUrl.search = "";
    return withCopiedCookies(response, NextResponse.redirect(redirectUrl));
  }

  if (user && wantsOnboarding && hasCompletedOnboarding) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    redirectUrl.search = "";
    return withCopiedCookies(response, NextResponse.redirect(redirectUrl));
  }

  if (user && wantsProtectedRoute && !wantsOnboarding && !hasCompletedOnboarding) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/onboarding";
    redirectUrl.search = "";
    return withCopiedCookies(response, NextResponse.redirect(redirectUrl));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
