import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { taskId, assignToId } = await req.json();
    if (!taskId || !assignToId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    
    

    const task = await prisma.task.update({
      where: { id: taskId },
      data: { assignedToId: assignToId },
    });

    return NextResponse.json({ message: "Task assigned", task }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
