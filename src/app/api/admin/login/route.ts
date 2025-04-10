import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { AuthToken } from "~/api/auth/verifyAuthToken";

export type AuthLoginResponse = {
  success: boolean;
  error?: string;
};

export async function POST(
  request: Request,
): Promise<NextResponse<AuthLoginResponse>> {
  const body = await request.json();
  const inputPassword = String(body.password);

  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (expectedPassword === undefined) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }

  if (inputPassword !== expectedPassword) {
    return NextResponse.json(
      { success: false, error: "Invalid password" },
      { status: 401 },
    );
  }

  const token = jwt.sign(
    { role: "admin" } satisfies AuthToken,
    process.env.JWT_PRIVATE_KEY ?? "",
    {
      expiresIn: "3600s",
    },
  );

  (await cookies()).set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
    maxAge: 3600,
  });

  return NextResponse.json({ success: true });
}
