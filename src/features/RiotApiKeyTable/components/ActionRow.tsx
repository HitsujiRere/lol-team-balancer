import { Eye, EyeClosed } from "@phosphor-icons/react";
import { ResultAsync } from "neverthrow";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const ActionRow = React.memo(() => {
  const [apiKey, setApiKey] = useState("");
  const [isShown, setIsShown] = useState(false);

  const insertApiKeyHandler = useCallback(() => {
    ResultAsync.fromPromise(
      fetch("/api/admin/riot-api-key/insert", {
        method: "POST",
        body: JSON.stringify({ riotApiKey: apiKey }),
      }),
      (error) => `Failed to fetch: ${(error as Error).message}`,
    )
      .andThen((res) =>
        ResultAsync.fromPromise(res.json(), () => "Failed to parse JSON"),
      )
      .map(() => {
        toast.success("Insert successed!");
        setApiKey("");
      })
      .mapErr((error) => toast.error(error));
  }, [apiKey]);

  return (
    <tr>
      <th />
      <td>
        <label className="join">
          <input
            type={isShown ? "text" : "password"}
            className="input join-item w-100 flex-1 select-all"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <label className="swap swap-rotate join-item btn btn-square focus-within:outline-2">
            <input
              type="checkbox"
              checked={isShown}
              onChange={(e) => setIsShown(e.target.checked)}
            />

            <EyeClosed className="swap-off text-xl" />

            <Eye className="swap-on text-xl" />
          </label>
          <button type="button" className="btn" onClick={insertApiKeyHandler}>
            追加
          </button>
        </label>
      </td>
      <td />
    </tr>
  );
});
