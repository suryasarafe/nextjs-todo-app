import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { errorResponseHandler } from "./lib/util";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export async function middleware(req: NextRequest) {
  const token = (await (cookies())).get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(SECRET_KEY);
    const decoded = await jwtVerify(token, secret);
    req.headers.set("user", JSON.stringify(decoded));
    return NextResponse.next();
  } catch (error) {
    errorResponseHandler(error);
  }
}

export const config = {
  matcher: ["/api/user", "/api/task", "/api/team", "/api/task/:path*", "/api/user/:path*", "/api/team/:path*"],
};
