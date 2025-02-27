import { getUserFromRequest } from "@/lib/auth";
import limitHandler from "@/lib/limiter";
import { checkAuthorized, errorResponseHandler } from "@/lib/util";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await limitHandler(req);
    const user = await getUserFromRequest(req);
    checkAuthorized(user);
    return NextResponse.json({ status: true }, { status: 200 });
  } catch (error) {
    return errorResponseHandler(error);
  }
}