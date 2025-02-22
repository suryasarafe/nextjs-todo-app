import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export function getUserFromRequest(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];
  try {
    return jwt.verify(token, SECRET_KEY) as { id: string; role: string };
  } catch {
    return null;
  }
}

export async function getUserFromCookie() {
  const token = (await (cookies())).get("token")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, SECRET_KEY) as { id: string; role: string };
  } catch {
    return null;
  }
}
