import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";
import { checkAuthorized, checkAuthorizedLead, errorResponseHandler } from "@/lib/util";

export async function GET() {
  try {
    const user = await getUserFromCookie();
    checkAuthorized(user);

    const tasks = await prisma.task.findMany({
      include: {
        assignedTo: {
          select: { username: true },
        },
      },
    });
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    return errorResponseHandler(error);
  }
}

export async function POST(req: Request) {
  try {
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
    return NextResponse.json({ message: "Task created", task: newTask }, { status: 201 });
  } catch (error) {
    return errorResponseHandler(error);
  }
}


