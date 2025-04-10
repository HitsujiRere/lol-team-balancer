import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { forbiddenResponse } from "~/api/auth/errorsResponses";
import { verifyAuthToken } from "~/api/auth/verifyAuthToken";
import { db } from "~/db";
import type { riotApiKey } from "~/db/schema";

export type GetAllRiotApiKeyResponse = {
  result?: (typeof riotApiKey.$inferSelect)[];
  error?: string;
};

export async function GET(
  _request: Request,
): Promise<NextResponse<GetAllRiotApiKeyResponse>> {
  const token = (await cookies()).get("token")?.value;
  const decoded = verifyAuthToken(token);
  if (decoded.isErr()) {
    return decoded.error;
  }
  const auth = decoded._unsafeUnwrap();
  if (auth.role !== "admin") {
    return forbiddenResponse();
  }

  const result = await db.query.riotApiKey.findMany();

  return NextResponse.json({ result });
}
