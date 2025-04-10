import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export type AdminLogoutResponse = {
  success: boolean;
};

export async function POST(
  _request: Request,
): Promise<NextResponse<AdminLogoutResponse>> {
  (await cookies()).delete("token");

  return NextResponse.json({ success: true });
}
