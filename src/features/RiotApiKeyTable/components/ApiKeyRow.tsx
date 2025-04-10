import { Eye, EyeClosed } from "@phosphor-icons/react";
import React, { useState } from "react";
import type { riotApiKey } from "~/db/schema";

type TableRowProps = { apiKey: typeof riotApiKey.$inferSelect };

export const ApiKeyRow = React.memo(({ apiKey }: TableRowProps) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <tr>
      <th>{apiKey.id}</th>
      <td>
        <label className="join">
          <input
            type={isShown ? "text" : "password"}
            className="input join-item w-100 flex-1 select-all"
            readOnly
            value={apiKey.apiKey}
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
        </label>
      </td>
      <td>{apiKey.createdAt?.toString()}</td>
    </tr>
  );
});
