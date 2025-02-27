import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";
import { checkAuthorized, checkAuthorizedLead, errorResponseHandler } from "@/lib/util";
import limitHandler from "@/lib/limiter";

export async function POST(req: Request) {
  try {
    await limitHandler(req);
    const user = await getUserFromCookie();
    checkAuthorized(user)

    const { taskId, assignToId } = await req.json();
    if (!taskId || !assignToId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (assignToId != user!.id) {
      checkAuthorizedLead(user);
    }

    const task = await prisma.task.update({
      where: { id: taskId },
      data: { assignedToId: assignToId },
    });

    return NextResponse.json({ message: "Task assigned", task }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponseHandler(error);
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}
