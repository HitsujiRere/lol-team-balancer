import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyAuthToken } from "~/api/auth/verifyAuthToken";

export async function GET(_request: Request): Promise<NextResponse> {
  const token = (await cookies()).get("token")?.value;

  const decoded = verifyAuthToken(token);
  if (decoded.isErr()) {
    return decoded.error;
  }

  const auth = decoded._unsafeUnwrap();

  if (auth.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ message: "Hello Admin 👋" });
}
