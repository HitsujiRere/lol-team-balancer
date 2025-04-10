import { sql } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { forbiddenResponse } from "~/api/auth/errorsResponses";
import { verifyAuthToken } from "~/api/auth/verifyAuthToken";
import { db } from "~/db";
import { riotApiKey } from "~/db/schema";

export type InsertRiotApiKeyResponse = {
  error?: string;
};

export async function POST(
  request: Request,
): Promise<NextResponse<InsertRiotApiKeyResponse>> {
  const token = (await cookies()).get("token")?.value;
  const decoded = verifyAuthToken(token);
  if (decoded.isErr()) {
    return decoded.error;
  }
  const auth = decoded._unsafeUnwrap();
  if (auth.role !== "admin") {
    return forbiddenResponse();
  }

  const body = await request.json();
  const newRiotApiKey = String(body.riotApiKey);

  await db
    .insert(riotApiKey)
    .values({ apiKey: newRiotApiKey, updatedAt: sql`now()` });

  return NextResponse.json({});
}
