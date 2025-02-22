import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = new TextEncoder().encode(SECRET_KEY);
    const decoded = jwtVerify(token, secret);
    req.headers.set("user", JSON.stringify(decoded));
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }
}

// Well, some people really like to just mess around, 
// so I limited the register api
export const config = {
  matcher: ["/api/auth/register", "/api/task/:path*"],
};
