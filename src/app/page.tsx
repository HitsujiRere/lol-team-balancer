import { RoomMessageTextarea } from "@/features/RoomMessageTextarea";
import { RoomTable } from "@/features/RoomTable";
import { TeamTable } from "@/features/TeamTable";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 p-8">
      <div>
        <h1 className="space-x-2">
          <span className="text-2xl">LoLチームバランサー</span>
          <span className="text-xl">v2</span>
        </h1>
      </div>

      <div className="flex justify-stretch gap-8 max-xl:flex-col">
        <div className="flex flex-1 flex-col gap-8">
          <div className="flex-1">
            <RoomMessageTextarea />
          </div>

          <div className="flex-1">
            <RoomTable />
          </div>
        </div>

        <div className="flex-1">
          <TeamTable />
        </div>
      </div>
    </main>
  );
}
