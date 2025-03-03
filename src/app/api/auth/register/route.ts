import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import limitHandler from "@/lib/limiter";
import { createResponse, errorMassage, errorResponseHandler } from "@/lib/util";

export async function POST(req: Request) {
  try {
    await limitHandler(req);
    const { username, password, role } = await req.json();

    if (!username || !password || !role) {
      throw new Error(errorMassage.missingField);
    }

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      throw new Error(errorMassage.usernameExist);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { username, password: hashedPassword, role },
    });
    return createResponse(201, {id: newUser.id, username: newUser.username, role: newUser.role}, "Register Success")
  } catch (error) {
    return errorResponseHandler(error);
  }
}
