import { getUserFromCookie } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { checkAuthorized, errorResponseHandler } from "@/lib/util";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = getUserFromCookie();
    checkAuthorized(user)

    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
      }
    });
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponseHandler(error);
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}