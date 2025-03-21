import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useCallback, useEffect, useState } from "react";
import type { GameNames } from "../types/GameNames";
import { TeamCards } from "./TeamCards";

export const GameCards = (props: { names: GameNames }) => {
  const [names, setNames] = useState<GameNames>(props.names);

  useEffect(() => {
    setNames(props.names);
  }, [props.names]);

  // チーム内の並び替え
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) {
        return;
      }
      const activeName = active.id.toString();
      const overName = over.id.toString();
      const activeTeam = names.blue.includes(activeName) ? "blue" : "red";
      const overTeam = names.blue.includes(overName) ? "blue" : "red";
      if (activeName === overName || activeTeam !== overTeam) {
        return;
      }
      setNames((names) => {
        const activeIndex = names[activeTeam].indexOf(activeName);
        const overIndex = names[overTeam].indexOf(overName);
        return {
          ...names,
          [activeTeam]: arrayMove(names[activeTeam], activeIndex, overIndex),
        };
      });
    },
    [names],
  );

  // 別チームへの移動
  const handledragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;
      if (!over) {
        return;
      }
      const activeName = active.id.toString();
      const overName = over.id.toString();
      const activeTeam = names.blue.includes(activeName) ? "blue" : "red";
      const overTeam = names.blue.includes(overName) ? "blue" : "red";
      if (activeName === overName || activeTeam === overTeam) {
        return;
      }
      setNames((names) => {
        const overIndex = names[overTeam].indexOf(overName);
        return {
          blue: [],
          red: [],
          [activeTeam]: names[activeTeam].filter((name) => name !== activeName),
          [overTeam]: [
            ...names[overTeam].slice(0, overIndex),
            activeName,
            ...names[overTeam].slice(overIndex),
          ],
        };
      });
    },
    [names],
  );

  return (
    <DndContext onDragEnd={handleDragEnd} onDragOver={handledragOver}>
      <div className="flex gap-2">
        <div className="flex-1 rounded border-2 border-blue-300 p-2">
          <TeamCards teamname="A" names={names.blue} />
        </div>

        <div className="flex-1 rounded border-2 border-red-300 p-2">
          <TeamCards teamname="B" names={names.red} />
        </div>
      </div>
    </DndContext>
  );
};
