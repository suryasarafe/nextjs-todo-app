import { JWTExpired, JWTInvalid } from "jose/errors";
import { NextResponse } from "next/server";

export function checkAuthorized(user: any): any {
  if (!user) {
    throw new Error("Unauthorized");
  }

  return true;
}

export function checkAuthorizedLead(user: { id: string; role?: string; } | null): any {
  if (!user || user.role !== "LEAD") {
    throw new Error("User not lead");
  }

  return true;
}

export function errorResponseHandler(error: any) {
  if (error instanceof JWTExpired) {
    return NextResponse.json({ error: error.name }, { status: 401 });
  } else if (error instanceof JWTInvalid) {
    return NextResponse.json({ error: error.name }, { status: 401 });
  } else if (error instanceof Error) {
    switch (error.message) {
      case "Unauthorized":
      case "User not lead":
        return NextResponse.json({ error: error.message }, { status: 401 });
      case "Too many requests":
        return NextResponse.json({ error: error.message }, { status: 429 });

      default:
        return NextResponse.json({ error }, { status: 500 });

    }
  }

  return NextResponse.json({ error }, { status: 500 });
}