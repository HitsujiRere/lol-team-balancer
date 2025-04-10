import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { forbiddenResponse } from "~/api/auth/errorsResponses";
import { verifyAuthToken } from "~/api/auth/verifyAuthToken";

export type AuthTestResponse = {
  message?: string;
  error?: string;
};

export async function GET(
  _request: Request,
): Promise<NextResponse<AuthTestResponse>> {
  const token = (await cookies()).get("token")?.value;
  const decoded = verifyAuthToken(token);
  if (decoded.isErr()) {
    return decoded.error;
  }
  const auth = decoded._unsafeUnwrap();
  if (auth.role !== "admin") {
    return forbiddenResponse();
  }

  return NextResponse.json({ message: "Hello Admin 👋" });
}
