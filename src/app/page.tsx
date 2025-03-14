"use client";

import { LobbyLogInput } from "/features/LobbyLogInput";
import { SummonersTable } from "/features/SummonersTable";

export default function Home() {
  return (
    <div className="m-8">
      <header className="mb-4">
        <h1 className="text-2xl">LoLチームバランサー</h1>
      </header>

      <main className="gap-4 xl:flex">
        <div className="flex-1 space-y-4">
          <LobbyLogInput />

          <div className="mb-2 flex items-center gap-2">
            <button type="button" className="btn">
              チーム分け
            </button>
          </div>

          <SummonersTable />
        </div>

        <div className="flex-1" />
      </main>
    </div>
  );
}
