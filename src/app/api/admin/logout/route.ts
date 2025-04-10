import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export type AuthLogoutResponse = {
  success: boolean;
};

export async function POST(
  _request: Request,
): Promise<NextResponse<AuthLogoutResponse>> {
  (await cookies()).delete("token");

  return NextResponse.json({ success: true });
}
