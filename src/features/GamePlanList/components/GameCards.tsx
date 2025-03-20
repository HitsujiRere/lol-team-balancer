import { useEffect, useState } from "react";
import type { GameNames } from "../types/GameNames";
import { TeamCards } from "./TeamCards";

export const GameCards = (props: { names: GameNames }) => {
  const [names, setNames] = useState<GameNames>(props.names);

  useEffect(() => {
    setNames(props.names);
  }, [props.names]);

  return (
    <div className="flex gap-4">
      <div className="flex-1 rounded border-2 border-blue-300 p-2">
        <TeamCards teamname="A" names={names.blue} />
      </div>

      <div className="flex-1 rounded border-2 border-red-300 p-2">
        <TeamCards teamname="B" names={names.red} />
      </div>
    </div>
  );
};
