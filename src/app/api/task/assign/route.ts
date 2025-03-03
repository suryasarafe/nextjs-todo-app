import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";
import { checkAuthorized, checkAuthorizedLead, createResponse, errorMassage, errorResponseHandler } from "@/lib/util";
import limitHandler from "@/lib/limiter";

export async function POST(req: Request) {
  try {
    await limitHandler(req);
    const user = await getUserFromCookie();
    checkAuthorized(user);

    const { taskId, assignToId } = await req.json();
    if (!taskId || !assignToId) {
      throw new Error(errorMassage.missingField);
    }

    if (assignToId != user!.id) {
      checkAuthorizedLead(user);
    }

    const task = await prisma.task.update({
      where: { id: taskId },
      data: { assignedToId: assignToId },
    });

    return createResponse(200, task, "Task Assigned");
  } catch (error) {
    return errorResponseHandler(error);
  }
}
