import { DotsSix, MicrophoneSlash, X } from "@phosphor-icons/react";
import type { Ref } from "react";

export const InfoModal = ({ ref }: { ref: Ref<HTMLDialogElement> }) => {
  return (
    <dialog className="modal" ref={ref}>
      <div className="modal-box w-9/10 max-w-2xl">
        <form method="dialog">
          <button
            type="submit"
            className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
          >
            <X className="h-4 w-4" />
          </button>
        </form>
        <div className="space-y-2">
          <h2 className="font-bold text-xl">LoLチームバランサー</h2>
          <p>League of Legendsのカスタムゲームのチーム分けを行えます。</p>
          <h3 className="font-bold text-lg">使い方</h3>
          <ol className="list-inside list-decimal space-y-2">
            <li>
              ロビーチャット欄に、カスタムゲームのチャットログを貼り付ける。
            </li>
            <li>
              「ランク検出」ボタンを押し、自動でサモナーのランクを設定する。
            </li>
            <li>
              試合に参加する10人を選び、「チーム分け」ボタンを押し、チーム分けをする。
            </li>
          </ol>
          <h3 className="font-bold text-lg">機能</h3>
          <ul className="list-inside list-disc space-y-2">
            <li>
              聞き専設定
              <MicrophoneSlash className="inline-block" weight="fill" /> :
              「聞き専」がONのサモナーがなるべく偏らないようにチーム分けをします。
            </li>
            <li>サモナー交換機能 : チームのサモナーを交換できます。</li>
          </ul>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">close</button>
      </form>
    </dialog>
  );
};
