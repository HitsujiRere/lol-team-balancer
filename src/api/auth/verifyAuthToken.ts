import { type Result, err, ok } from "neverthrow";
import { NextResponse } from "next/server";
import { z } from "zod";
import { safeJwtVerify } from "./safeJwtVerify";

export const AuthTokenSchema = z.object({
  role: z.literal("admin"),
});

export type AuthToken = z.infer<typeof AuthTokenSchema>;

export const verifyAuthToken = (
  token?: string,
): Result<AuthToken, NextResponse> => {
  if (token === undefined) {
    return err(NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  }

  const privateKey = process.env.JWT_PRIVATE_KEY;
  if (privateKey === undefined) {
    return err(
      NextResponse.json(
        { success: false, error: "Server error" },
        { status: 500 },
      ),
    );
  }

  return safeJwtVerify(token, privateKey)
    .mapErr(() =>
      NextResponse.json({ error: "Invalid or expired token" }, { status: 401 }),
    )
    .map((payload) => AuthTokenSchema.safeParse(payload))
    .andThen((res) =>
      res.success
        ? ok(res.data)
        : err(
            NextResponse.json(
              { error: "Invalid or expired token" },
              { status: 401 },
            ),
          ),
    );
};
