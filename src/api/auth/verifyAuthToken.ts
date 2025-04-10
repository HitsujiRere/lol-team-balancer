import { type Result, err, ok } from "neverthrow";
import { NextResponse } from "next/server";
import { z } from "zod";
import { UnauthorizedResponse } from "./errorsResponses";
import { safeJwtVerify } from "./safeJwtVerify";

export const AuthTokenSchema = z.object({
  role: z.literal("admin"),
});

export type AuthToken = z.infer<typeof AuthTokenSchema>;

export const verifyAuthToken = (
  token?: string,
): Result<AuthToken, NextResponse<{ error: string }>> => {
  if (token === undefined) {
    return err(UnauthorizedResponse());
  }

  const privateKey = process.env.JWT_PRIVATE_KEY;
  if (privateKey === undefined) {
    return err(NextResponse.json({ error: "Server error" }, { status: 500 }));
  }

  return safeJwtVerify(token, privateKey)
    .map((payload) => AuthTokenSchema.safeParse(payload))
    .andThen((res) => (res.success ? ok(res.data) : err()))
    .mapErr(UnauthorizedResponse);
};
