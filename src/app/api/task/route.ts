import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";
import { checkAuthorized, checkAuthorizedLead, createResponse, errorResponseHandler } from "@/lib/util";
import limitHandler from "@/lib/limiter";

export async function GET(req: Request) {
  try {
    await limitHandler(req);
    const user = await getUserFromCookie();
    checkAuthorized(user);

    const tasks = await prisma.task.findMany({
      include: {
        assignedTo: {
          select: { username: true },
        },
      },
    });

    return createResponse(200, tasks);
  } catch (error) {
    return errorResponseHandler(error);
  }
}

export async function POST(req: Request) {
  try {
    await limitHandler(req);
    const user = await getUserFromCookie();
    checkAuthorizedLead(user);

    const { title, description, assignedToId } = await req.json();

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status: "NOT_STARTED",
        createdById: user!.id,
        assignedToId,
      },
    });

    return createResponse(201, newTask, "Task Created");
  } catch (error) {
    return errorResponseHandler(error);
  }
}


