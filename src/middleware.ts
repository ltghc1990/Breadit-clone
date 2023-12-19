import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// this function runs on the edge, it'll happen before it goes to the server
export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }
}

// the function will run when it matches these paths
export const config = {
  matcher: ["/r/:path*/submit", "r/create"],
};
