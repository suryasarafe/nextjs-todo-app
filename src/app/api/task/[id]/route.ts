import { getUserFromCookie } from "@/lib/auth";
import limitHandler from "@/lib/limiter";
import prisma from "@/lib/prisma";
import { checkAuthorized, checkAuthorizedLead, createResponse, errorMassage, errorResponseHandler } from "@/lib/util";
import { Task } from "@prisma/client";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await limitHandler(req);
    const user = await getUserFromCookie();
    checkAuthorized(user)
    const { id } = await params;
    if (!id) {
      throw new Error(errorMassage.missingField);
    }

    const tasks = await prisma.task.findFirst({ where: { id } });
    if (!tasks) {
      throw new Error(errorMassage.notFound);
    }
    return createResponse(200, tasks);
  } catch (error) {
    return errorResponseHandler(error);
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await limitHandler(req);
    const user = await getUserFromCookie();
    checkAuthorized(user)
    const { id } = await params;
    if (!id) {
      throw new Error(errorMassage.missingField);
    }

    const { status, notes, title, description } = await req.json();

    if (title || description) {
      checkAuthorizedLead(user)
    }

    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new Error(errorMassage.notFound);
    }

    const data: Partial<Task> = { status, notes }
    if (title) data.title = title
    if (description) data.description = description

    const updatedTask = await prisma.task.update({
      where: { id },
      data: data,
    });
    return createResponse(200, updatedTask, "Task Updated")
  } catch (error) {
    return errorResponseHandler(error);
  }
}