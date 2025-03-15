import { GamePlanList } from "/features/GamePlanList";
import { Header } from "/features/Header";
import { LobbyLogInput } from "/features/LobbyLogInput";
import { SummonersTable } from "/features/SummonersTable";

export default function Home() {
  return (
    <div className="m-8">
      <header className="mb-4">
        <Header />
      </header>

      <main className="flex gap-4 max-xl:flex-col">
        <div className="flex-1 space-y-4">
          <LobbyLogInput />

          <SummonersTable />
        </div>

        <div className="flex-1">
          <GamePlanList />
        </div>
      </main>
    </div>
  );
}
