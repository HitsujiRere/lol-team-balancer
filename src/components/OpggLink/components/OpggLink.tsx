import { Link as LinkIcon } from "@phosphor-icons/react";
import Link from "next/link";
import type { Summoner } from "~/types/Summoner";
import { toOpggAddress } from "../utils/toOpggAddress";

export const OpggLink = ({ summoner }: { summoner: Summoner }) => {
  const address = toOpggAddress(summoner);

  if (address === undefined) {
    return undefined;
  }

  return (
    <Link href={address} target="_blank" rel="noreferrer">
      <button type="button" className="btn btn-circle btn-ghost">
        <LinkIcon className="h-4 w-4" />
      </button>
    </Link>
  );
};
