import { getUserFromCookie } from "@/lib/auth";
import limitHandler from "@/lib/limiter";
import prisma from "@/lib/prisma";
import { checkAuthorized, createResponse, errorResponseHandler } from "@/lib/util";

export async function GET(req: Request) {
  try {
    await limitHandler(req);
    const user = await getUserFromCookie();
    checkAuthorized(user);

    const users = await prisma.user.findMany({
      select: { id: true, username: true, role: true }
    });

    return createResponse(200, users);
  } catch (error) {
    return errorResponseHandler(error);
  }
}