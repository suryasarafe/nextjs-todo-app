import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = getUserFromRequest(req);
    if (!user || user.role !== "LEAD") {
      return NextResponse.json({ error: "Only leads can create tasks" }, { status: 403 });
    }

    const { title, description, assignedToId } = await req.json();

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status: "NOT_STARTED",
        createdById: user.id,
        assignedToId,
      },
    });
    return NextResponse.json({ message: "Task created", task: newTask }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
