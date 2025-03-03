import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import limitHandler from "@/lib/limiter";
import { createResponse, errorMassage, errorResponseHandler } from "@/lib/util";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export async function POST(req: Request) {
  try {
    await limitHandler(req);
    const { username, password } = await req.json();

    if (!username || !password) {
      throw new Error(errorMassage.missingField);
    }

    const user = await prisma.user.findUnique({
      select: { username: true, id: true, role: true, password: true },
      where: { username, }
    });
    if (!user) {
      throw new Error(errorMassage.unauthorized);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error(errorMassage.unauthorized);
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return createResponse(200, { id: user.id, username: user.username, role: user.role, token });
  } catch (error) {
    return errorResponseHandler(error);
  }
}
