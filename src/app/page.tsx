"use client";

import { Chat } from "@phosphor-icons/react";
import { LobbyLogInput } from "/features/LobbyLogInput";
import { SummonersTable } from "/features/SummonersTable";

export default function Home() {
  return (
    <div className="m-8">
      <header className="mb-4">
        <h1 className="text-2xl">LoLチームバランサー</h1>
      </header>

      <main className="flex">
        <div className="flex-1 space-y-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Chat />
              <span>ロビーチャット欄</span>
            </div>
            <LobbyLogInput />
          </div>

          <div>
            <SummonersTable />
          </div>
        </div>

        <div className="flex-1" />
      </main>
    </div>
  );
}
