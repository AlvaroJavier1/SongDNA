import type { ConnectionType, Song } from "../types";

const typeColor: Record<ConnectionType, string> = {
  SAMPLE: "text-sample border-sample",
  INTERPOLATION: "text-interpolation border-interpolation",
  COVER: "text-cover border-cover",
  RERMIX: "text-remix border-remix",
};

interface Props {
  song: Song;
  type: ConnectionType;
  description: string | null;
}

export function ConnectionRow({ song, type, description }: Props) {
  return (
    <li className="flex flex-col gap-2 border-2 border-ink py-4 last:border-b-0">
      <div className="flex items-center gap-4">
        <div className="flex size-16 flex-none items-center justify-center bg-hot">
          <div className="size-9 rounded-full bg-ink" />
        </div>
        <div className="flex-1">
          <p className="text-2xl font-black uppercase leading-none">
            {song.title}
          </p>
          <p className="mt-1 text-sm">
            {song.artist}
            {song.year ? `, ${song.year}` : ""}
          </p>
        </div>
        <span
          className={`border-2 px-2 py-0.5 font-mono text-xs tracking-wider ${typeColor[type]}`}
        >
          {type}
        </span>
      </div>
      {description && <p className="font-mono text-sm">{description}</p>}
    </li>
  );
}
