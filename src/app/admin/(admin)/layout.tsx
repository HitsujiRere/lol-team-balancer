import { err, ok } from "neverthrow";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type React from "react";
import { verifyAuthToken } from "~/api/auth/verifyAuthToken";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("token")?.value;
  const decoded = verifyAuthToken(token).andThen((auth) =>
    auth.role === "admin" ? ok(auth) : err(),
  );
  if (decoded.isErr()) {
    return redirect("/admin/login");
  }

  return children;
}
