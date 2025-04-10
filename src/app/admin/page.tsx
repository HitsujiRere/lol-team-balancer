"use client";

import { ResultAsync, err, ok } from "neverthrow";
import type React from "react";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [password, setPassword] = useState("tonarino-totoro");

  const loginHandler = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      ResultAsync.fromPromise(
        fetch("/api/admin/login", {
          method: "POST",
          body: JSON.stringify({ password }),
        }),
        (error) => new Error(`Failed to fetch: ${(error as Error).message}`),
      )
        .andThen((res) =>
          ResultAsync.fromPromise(res.json(), () => "Failed to parse JSON"),
        )
        .map((res) => res as { success: boolean; error?: string })
        .andThen((res) => (res.success ? ok() : err(res.error)))
        .map(() => toast.success("Login successed!"))
        .mapErr((err) => toast.error(err?.toString()));
    },
    [password],
  );

  const testApiHandler = useCallback(() => {
    ResultAsync.fromPromise(
      fetch("/api/admin/test"),
      (error) => new Error(`Failed to fetch: ${(error as Error).message}`),
    )
      .andThen((res) =>
        ResultAsync.fromPromise(res.json(), () => "Failed to parse JSON"),
      )
      .map((res) => res as { message?: string; error?: string })
      .andThen((res) => (res.message ? ok(res.message) : err(res.error)))
      .map((message) => toast.success(message))
      .mapErr((err) => toast.error(err?.toString()));
  }, []);

  return (
    <div className="m-8">
      <main className="flex flex-col gap-4">
        <h1 className="text-2xl">Admin</h1>

        <form className="join" onSubmit={loginHandler}>
          <input
            type="password"
            className="input join-item"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn join-item">
            ログイン
          </button>
        </form>

        <button type="button" className="btn" onClick={testApiHandler}>
          管理者APIテストボタン
        </button>
      </main>
    </div>
  );
}
