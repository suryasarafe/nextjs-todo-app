import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = getUserFromRequest(req);
    const { taskId, status } = await req.json();

    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task || task.assignedToId !== user!.id) {
      return NextResponse.json({ error: "Unauthorized or task not found" }, { status: 403 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status },
    });

    return NextResponse.json({ message: "Task status updated", task: updatedTask }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
