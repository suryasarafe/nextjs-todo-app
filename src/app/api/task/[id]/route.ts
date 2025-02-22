import { getUserFromCookie } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { checkAuthorized, checkAuthorizedLead, errorResponseHandler } from "@/lib/util";
import { Task } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getUserFromCookie();
    checkAuthorized(user)
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }
    // dipasang biar ga di marahin builder
    const { data } = await req.json();
    console.log(data)

    const tasks = await prisma.task.findFirst({ where: { id } });
    if (!tasks) {
      return NextResponse.json({ error: "No Task" }, { status: 400 });
    }
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponseHandler(error);
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getUserFromCookie();
    checkAuthorized(user)
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }

    const { status, notes, title, description } = await req.json();

    if (title || description) {
      checkAuthorizedLead(user)
    }

    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 403 });
    }

    const data: Partial<Task> = { status, notes }
    if (title) data.title = title
    if (description) data.description = description

    const updatedTask = await prisma.task.update({
      where: { id },
      data: data,
    });

    return NextResponse.json({ message: "Task status updated", task: updatedTask }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponseHandler(error);
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}