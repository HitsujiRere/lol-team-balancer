import { DebugActions } from "/features/DebugActions";
import { LobbyLogInput } from "/features/LobbyLogInput";
import { SummonersTable } from "/features/SummonersTable";

export default function Home() {
  return (
    <div className="m-8">
      <header className="mb-4 flex justify-between">
        <h1 className="text-2xl">LoLチームバランサー</h1>
        <DebugActions />
      </header>

      <main className="flex gap-4 max-xl:flex-col">
        <div className="flex-1 space-y-4">
          <LobbyLogInput />

          <SummonersTable />
        </div>

        <div className="flex-1" />
      </main>
    </div>
  );
}
