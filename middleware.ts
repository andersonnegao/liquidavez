import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import type { Database } from "@/types/supabase";
import { locales } from "@/src/i18n/config";

const PROTECTED_PATHS = ["/account", "/checkout"] as const;


function getLocalePrefix(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const potentialLocale = segments[0];
  if (locales.includes(potentialLocale as (typeof locales)[number])) {
    return {
      prefix: `/${potentialLocale}`,
      pathWithoutLocale: `/${segments.slice(1).join("/")}` || "/",
    };
  }

  return { prefix: "", pathWithoutLocale: pathname || "/" };
}

function isProtectedPath(pathname: string) {
  return PROTECTED_PATHS.some(
    (protectedPath) =>
      pathname === protectedPath || pathname.startsWith(`${protectedPath}/`)
  );
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { prefix, pathWithoutLocale } = getLocalePrefix(req.nextUrl.pathname);

  if (!isProtectedPath(pathWithoutLocale) || session) {
    return res;
  }

  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = `${prefix}/login`.replace("//", "/");

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    "/account/:path*",
    "/checkout/:path*",
    "/en/account/:path*",
    "/en/checkout/:path*",
    "/pt/account/:path*",
    "/pt/checkout/:path*",
  ],
};
