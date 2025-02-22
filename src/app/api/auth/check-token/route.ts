import { getUserFromCookie, getUserFromRequest } from "@/lib/auth";
import { checkAuthorized, errorResponseHandler } from "@/lib/util";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const user = await getUserFromRequest(req);
    checkAuthorized(user);

    return NextResponse.json({ status: true }, { status: 200 });
  } catch (error) {
    return errorResponseHandler(error);
  }
}