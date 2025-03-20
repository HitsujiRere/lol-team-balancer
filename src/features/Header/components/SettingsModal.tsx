import { X } from "@phosphor-icons/react";
import { useAtom } from "jotai/react";
import type { Ref } from "react";
import { apikeyAtom } from "~/stores/debug/apikey";
import { debugmodeAtom } from "~/stores/debug/mode";

export const SettingsModal = ({ ref }: { ref: Ref<HTMLDialogElement> }) => {
  const [debugmode, setDebugmode] = useAtom(debugmodeAtom);
  const [apikey, setApikey] = useAtom(apikeyAtom);

  return (
    <dialog className="modal" ref={ref}>
      <div className="modal-box">
        <form method="dialog">
          <button
            type="submit"
            className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
          >
            <X className="h-4 w-4" />
          </button>
        </form>
        <div className="space-y-2">
          <h2 className="font-bold text-xl">設定</h2>
          <label className="flex items-center gap-2">
            <span>デバッグモード</span>
            <input
              type="checkbox"
              className="toggle"
              checked={debugmode}
              onChange={(e) => setDebugmode(e.target.checked)}
            />
          </label>
          <label className="flex items-center gap-2">
            <span>Riot API Key</span>
            <input
              type="password"
              className="input"
              value={apikey}
              onChange={(e) => setApikey(e.target.value)}
            />
          </label>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">close</button>
      </form>
    </dialog>
  );
};
