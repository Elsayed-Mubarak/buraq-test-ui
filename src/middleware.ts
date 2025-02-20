// import createMiddleware from "next-intl/middleware";

// export default createMiddleware({
//   // A list of all locales that are supported
//   locales: ["en", "ar"],

//   // Used when no locale matches
//   defaultLocale: "en",
// });

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ["/", "/(ar|en)/:path*"],
// };
import createIntlMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

const intlMiddleware = createIntlMiddleware({
  locales: ["en", "ar"], 
  defaultLocale: "en", 
});

export function middleware(req:any) {
  const { pathname } = req.nextUrl; 

  if (pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("jwt"); 

    if (!token) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
    
    return NextResponse.next();
  }

  
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/",
    "/(en|ar)/:path*", 
    "/dashboard/:path*", 
  ],
};
