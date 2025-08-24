import { RoomMessageTextarea } from "@/features/RoomMessageTextarea";
import { RoomTable } from "@/features/RoomTable";
import { TeamTable } from "@/features/TeamTable";
import { Header } from "./_components/Header";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <Header />

      <main className="flex justify-stretch gap-8 max-xl:flex-col">
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
      </main>
    </div>
  );
}
