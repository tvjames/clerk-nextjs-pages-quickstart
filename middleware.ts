import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/"]);

export default clerkMiddleware(
  (auth, request) => {
    const authed = auth();

    console.info("[middleware]", request.url, authed);
    if (!isPublicRoute(request)) {
      console.info("[middleware]", "clerkMiddleware", "PROTECTED", request.url);
      auth().protect();
    }

    return NextResponse.next();
  },
  { debug: process.env.NODE_ENV === "development" }
);
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
