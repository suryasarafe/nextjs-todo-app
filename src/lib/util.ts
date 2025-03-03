import { JWTExpired, JWTInvalid } from "jose/errors";
import { NextResponse } from "next/server";
import { BaseResponse } from "./interfaces";

export function checkAuthorized(user: any): any {
  if (!user) {
    throw new Error(errorMassage.unauthorized);
  }

  return true;
}

export function checkAuthorizedLead(user: { id: string; role?: string; } | null): any {
  if (!user || user.role !== "LEAD") {
    throw new Error(errorMassage.userNotLead);
  }

  return true;
}

export const errorMassage = {
  missingField: "Missing Required field",
  unecpextedJson: "Unexpected end of JSON input",
  unauthorized: "Unauthorized",
  userNotLead: "User not Lead",
  tooManyRequest: "Too many requests",
  usernameExist: "Username already used",
  nameExist: "Name already used",
  notFound: "Not Found",
}

export function errorResponseHandler(error: any) {
  const response = { status: false, error: '' }
  if (error instanceof JWTExpired) {
    response.error = error.name;
    return NextResponse.json(response, { status: 401 });
  } else if (error instanceof JWTInvalid) {
    response.error = error.name;
    return NextResponse.json(response, { status: 401 });
  } else if (error instanceof Error) {
    switch (error.message) {
      case errorMassage.missingField:
      case errorMassage.unecpextedJson:
        response.error = errorMassage.missingField;
        return NextResponse.json(response, { status: 400 });
      case errorMassage.usernameExist:
      case errorMassage.nameExist:
      case errorMassage.notFound:
        response.error = error.message;
        return NextResponse.json(response, { status: 400 });
      case errorMassage.unauthorized:
      case errorMassage.userNotLead:
        response.error = error.message;
        return NextResponse.json(response, { status: 401 });
      case errorMassage.tooManyRequest:
        response.error = error.message;
        return NextResponse.json(response, { status: 429 });
      default:
        response.error = error.name;
        return NextResponse.json(response, { status: 500 });

    }
  }

  return NextResponse.json({ error }, { status: 500 });
}

export function createResponse<T>(status: number, data: T, message?: string) {
  const response: BaseResponse<typeof data> = { status: true, data, message };
  return NextResponse.json(response, { status });
}


