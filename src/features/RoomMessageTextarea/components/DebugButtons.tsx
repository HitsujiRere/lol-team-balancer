import { BugIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDebugStore } from "@/stores/useDebugStore";

export type DebugButtonProps = {
  ref: React.RefObject<HTMLTextAreaElement | null>;
};

export const DebugButtons = ({ ref }: DebugButtonProps) => {
  const debugMode = useDebugStore((state) => state.debugMode);

  const clickHandler = React.useCallback(() => {
    if (ref.current === null) return;

    const value = names
      .map((name) => `${name}${Math.floor(Math.random() * 100)} #DEBUG`)
      .map((name) => `${name}がロビーに参加しました。`)
      .join("\n");

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      "value",
    )?.set;
    nativeInputValueSetter?.call(ref.current, value);
    ref.current.dispatchEvent(new Event("input", { bubbles: true }));
  }, [ref]);

  return (
    <div>
      <Button
        className={cn({ hidden: !debugMode })}
        onClick={clickHandler}
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
