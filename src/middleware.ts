import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { errorMassage, errorResponseHandler } from "./lib/util";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export async function middleware(req: NextRequest) {
  try {
    const token = (await (cookies())).get("token")?.value;
    if (!token) {
      throw new Error(errorMassage.unauthorized)
    }

    const secret = new TextEncoder().encode(SECRET_KEY);
    const decoded = await jwtVerify(token, secret);
    req.headers.set("user", JSON.stringify(decoded));

    return NextResponse.next();
  } catch (error) {
    return errorResponseHandler(error);
  }
}

export const config = {
  matcher: [
    "/api/task", 
    "/api/task/:path*", 
    "/api/user",
    "/api/user/:path*", 
    "/api/team", 
    "/api/team/:path*",
  ],
};
