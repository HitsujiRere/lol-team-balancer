import React from "react";
import { Input } from "@/components/ui/input";
import { decodeLevel, encodeLevel } from "@/models/Level";

export type LevelInputProps = Omit<
  React.ComponentProps<"input">,
  "onBlur" | "onChange" | "value"
> & {
  level?: number;
  onLevelChange: (level: number) => void;
};

export const LevelInput = ({
  level,
  onLevelChange,
  ...props
}: LevelInputProps) => {
  const [rawValue, setRawValue] = React.useState(encodeLevel(level));

  React.useEffect(() => {
    setRawValue(encodeLevel(level));
  }, [level]);

  const blurHandler = React.useCallback(() => {
    const nextLevel = decodeLevel(rawValue);

    setRawValue(encodeLevel(nextLevel));

    if (level !== nextLevel) {
      onLevelChange(nextLevel);
    }
  }, [level, onLevelChange, rawValue]);

  const changeHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRawValue(event.target.value);
    },
    [],
  );

  return (
    <Input
      onBlur={blurHandler}
      onChange={changeHandler}
      type="number"
      value={rawValue}
      {...props}
    />
  );
};
