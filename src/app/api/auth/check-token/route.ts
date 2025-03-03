import { getUserFromRequest } from "@/lib/auth";
import limitHandler from "@/lib/limiter";
import { checkAuthorized, createResponse, errorResponseHandler } from "@/lib/util";

export async function GET(req: Request) {
  try {
    await limitHandler(req);
    const user = await getUserFromRequest(req);
    checkAuthorized(user);
    return createResponse(200, {});
  } catch (error) {
    return errorResponseHandler(error);
  }
}