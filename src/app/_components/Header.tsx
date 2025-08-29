"use client";

import { BugIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useDebugStore } from "@/stores/useDebugStore";

/**
 * ページ共通ヘッダー
 */
export const Header = () => {
  const debugMode = useDebugStore((state) => state.debugMode);
  const toggleDebugMode = useDebugStore((state) => state.toggleMode);

  return (
    <header className="flex justify-between">
      <h1 className="space-x-2">
        <span className="text-2xl">LoLチームバランサー</span>
        <span className="text-xl">v2</span>
      </h1>

      <div>
        <Toggle
          onPressedChange={toggleDebugMode}
          pressed={debugMode}
          variant="outline"
        >
          <BugIcon />
          Debug
        </Toggle>
      </div>
    </header>
  );
};
