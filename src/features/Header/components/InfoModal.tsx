import { X } from "@phosphor-icons/react";
import type { Ref } from "react";

export const InfoModal = ({ ref }: { ref: Ref<HTMLDialogElement> }) => {
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
        <h2 className="mb-2 font-bold text-xl">LoLチームバランサー</h2>
        <p>League of Legendsのカスタムゲームのチーム分けを行えます。</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">close</button>
      </form>
    </dialog>
  );
};
