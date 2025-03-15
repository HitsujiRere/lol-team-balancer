"use client";

import { Gear, Info } from "@phosphor-icons/react";
import { useAtomValue } from "jotai/react";
import { createRef } from "react";
import { debugmodeAtom } from "~/stores/debugmode";
import { DebugActions } from "./components/DebugActions";
import { InfoModal } from "./components/InfoModal";
import { SettingsModal } from "./components/SettingsModal";

export const Header = () => {
  const debugmode = useAtomValue(debugmodeAtom);
  const infoRef = createRef<HTMLDialogElement>();
  const settingsRef = createRef<HTMLDialogElement>();

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl">LoLチームバランサー</h1>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn btn-circle btn-ghost"
            onClick={() => infoRef.current?.showModal()}
          >
            <Info className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="btn btn-circle btn-ghost"
            onClick={() => settingsRef.current?.showModal()}
          >
            <Gear className="h-4 w-4" />
          </button>

          {debugmode && <DebugActions />}
        </div>
      </div>

      <InfoModal ref={infoRef} />
      <SettingsModal ref={settingsRef} />
    </>
  );
};
