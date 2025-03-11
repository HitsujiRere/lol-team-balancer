"use client";

import { LobbyLogInput } from "/features/LobbyLogInput";
import { Chat } from "@phosphor-icons/react";

export default function Home() {
  return (
    <div className="m-8">
      <header className="mb-4">
        <h1 className="text-2xl">LoLチームバランサー</h1>
      </header>

      <main className="flex">
        <div className="flex-1">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Chat />
              <span>ロビーチャット欄</span>
            </div>
            <LobbyLogInput />
          </div>
        </div>

        <div className="flex-1" />
      </main>
    </div>
  );
}
