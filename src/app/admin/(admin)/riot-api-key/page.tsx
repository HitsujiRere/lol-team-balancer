import { RiotApiKeyTable } from "~/features/RiotApiKeyTable";

export default async function Home() {
  return (
    <div className="m-8">
      <main>
        <h1 className="text-xl">Riot API Key</h1>

        <RiotApiKeyTable />
      </main>
    </div>
  );
}
