import { Microphone, MicrophoneSlash } from "@phosphor-icons/react";

export const MuteCheckbox = ({
  isMute,
  onChange,
}: { isMute: boolean; onChange: (isMute: boolean) => void }) => {
  return (
    <label className="swap swap-rotate btn btn-ghost btn-circle focus-within:outline-2">
      <input
        type="checkbox"
        checked={isMute}
        onChange={(e) => onChange(e.target.checked)}
      />
      <Microphone className="swap-off h-4 w-4" />
      <MicrophoneSlash className="swap-on h-4 w-4" weight="fill" />
    </label>
  );
};
