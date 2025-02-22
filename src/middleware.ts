import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export async function middleware(req: NextRequest) {
  const token = (await (cookies())).get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(SECRET_KEY);
    const decoded = jwtVerify(token, secret);
    req.headers.set("user", JSON.stringify(decoded));
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error, message: "Invalid token" }, { status: 403 });
  }
}

// Well, some people really like to just mess around, 
// so I limited the register api
export const config = {
  matcher: ["/api/auth/register", "/api/task/:path*", "/api/user/:path*"],
};
