import { X } from "@phosphor-icons/react";
import { useAtom } from "jotai/react";
import type { Ref } from "react";
import { debugmodeAtom } from "~/stores/debugmode";

export const SettingsModal = ({ ref }: { ref: Ref<HTMLDialogElement> }) => {
  const [debugmode, setDebugmode] = useAtom(debugmodeAtom);

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
        <h2 className="mb-2 font-bold text-xl">設定</h2>
        <label className="flex items-center gap-2">
          <span>デバッグモード</span>
          <input
            type="checkbox"
            className="toggle"
            checked={debugmode}
            onChange={(e) => setDebugmode(e.target.checked)}
          />
        </label>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">close</button>
      </form>
    </dialog>
  );
};
