import { MicIcon, MicOffIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

export type MuteToggleProps = {
  mute: boolean;
  onChange: (mute: boolean) => void;
};

export const MuteToggle = ({ mute, onChange }: MuteToggleProps) => {
  return (
    <Toggle
      className="group"
      onPressedChange={onChange}
      pressed={mute}
      variant="outline"
    >
      <MicIcon className="transition-all group-data-[state=on]:opacity-0" />
      <MicOffIcon className="absolute transition-all group-data-[state=off]:opacity-0" />
    </Toggle>
  );
};
