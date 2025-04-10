"use client";

import { ResultAsync, err, ok } from "neverthrow";
import { redirect } from "next/navigation";
import type React from "react";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import type { AdminLoginResponse } from "~/app/api/admin/login/route";

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
        (error) => `Failed to fetch: ${(error as Error).message}`,
      )
        .andThen((res) =>
          ResultAsync.fromPromise(res.json(), () => "Failed to parse JSON"),
        )
        .map((res) => res as AdminLoginResponse)
        .andThen((res) => (res.success ? ok() : err(res.error)))
        .map(() => {
          toast.success("Login successed!");
          redirect("/admin/home");
        })
        .mapErr((error) => toast.error(error));
    },
    [password],
  );

  return (
    <div className="m-8">
      <main>
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
      </main>
    </div>
  );
}
