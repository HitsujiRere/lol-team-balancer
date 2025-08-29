import { BugIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDebugStore } from "@/stores/useDebugStore";

export type DebugButtonProps = {
  /**
   * デバッグするルームチャットのref
   */
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
};

/**
 * ルームチャットテキストエリアのデバッグ用ボタン
 * @returns
 */
export const DebugButtons = ({ textareaRef }: DebugButtonProps) => {
  const debugMode = useDebugStore((state) => state.debugMode);

  // textareaRefで指定されたtextareaにランダムなチャットを設定する
  const setRandomMessageInTextarea = React.useCallback(() => {
    if (textareaRef.current === null) {
      return;
    }

    const newValue = names
      .map((name) => `${name}${Math.floor(Math.random() * 100)} #DEBUG`)
      .map((name) => `${name}がロビーに参加しました。`)
      .join("\n");

    // onChangeイベントを発火させる
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      "value",
    )?.set;
    nativeInputValueSetter?.call(textareaRef.current, newValue);
    textareaRef.current.dispatchEvent(new Event("input", { bubbles: true }));
  }, [textareaRef]);

  return (
    <div>
      <Button
        className={cn({ hidden: !debugMode })}
        onClick={setRandomMessageInTextarea}
        size="sm"
        variant="outline"
      >
        <BugIcon />
        仮チャット設定
      </Button>
    </div>
  );
};

const names = [
  "りんご",
  "バナナ",
  "ぶどう",
  "いちご",
  "みかん",
  "スイカ",
  "パイナップル",
  "さくらんぼ",
  "マンゴー",
  "キウイ",
] as const;
