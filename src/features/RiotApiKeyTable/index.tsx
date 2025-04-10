"use client";

import useSWR from "swr";
import type { GetAllRiotApiKeyResponse } from "~/app/api/admin/riot-api-key/all/route";
import { ActionRow } from "./components/ActionRow";
import { ApiKeyRow } from "./components/ApiKeyRow";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => res as GetAllRiotApiKeyResponse);

export const RiotApiKeyTable = () => {
  const { data, error, isLoading } = useSWR(
    "/api/admin/riot-api-key/all",
    fetcher,
  );

  if (error) {
    return <div>failed to load</div>;
  }
  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>API Key</th>
          <th>作成日</th>
        </tr>
      </thead>

      <tbody>
        <ActionRow />

        {(data?.result ?? []).map((apiKey) => (
          <ApiKeyRow key={apiKey.id} apiKey={apiKey} />
        ))}
      </tbody>
    </table>
  );
};
