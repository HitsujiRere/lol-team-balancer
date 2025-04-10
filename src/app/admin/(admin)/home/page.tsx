"use client";

import { ResultAsync, err, ok } from "neverthrow";
import { redirect } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-toastify";
import type { AuthLogoutResponse } from "~/app/api/admin/logout/route";

export default function Home() {
  const testApiHandler = useCallback(() => {
    ResultAsync.fromPromise(
      fetch("/api/admin/test"),
      (error) => `Failed to fetch: ${(error as Error).message}`,
    )
      .andThen((res) =>
        ResultAsync.fromPromise(res.json(), () => "Failed to parse JSON"),
      )
      .map((res) => res as { message?: string; error?: string })
      .andThen((res) => (res.message ? ok(res.message) : err(res.error)))
      .map((message) => toast.success(message))
      .mapErr((error) => toast.error(error));
  }, []);

  const logoutHandler = useCallback(() => {
    ResultAsync.fromPromise(
      fetch("/api/admin/logout", { method: "POST" }),
      (error) => `Failed to fetch: ${(error as Error).message}`,
    )
      .andThen((res) =>
        ResultAsync.fromPromise(res.json(), () => "Failed to parse JSON"),
      )
      .map((res) => res as AuthLogoutResponse)
      .andThen((res) => (res.success ? ok() : err()))
      .map(() => {
        toast.success("Logout successed!");
        redirect("/admin/login");
      })
      .mapErr(() => toast.error(undefined));
  }, []);

  return (
    <div className="m-8">
      <main>
        <p>Hello!</p>

        <button type="button" className="btn" onClick={testApiHandler}>
          管理者APIテストボタン
        </button>

        <button type="button" className="btn" onClick={logoutHandler}>
          ログアウト
        </button>
      </main>
    </div>
  );
}
