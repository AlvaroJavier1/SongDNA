import type { Connection, ConnectionType, Song } from "../types";
import { songMeta } from "../utils/format";

const typeColor: Record<ConnectionType, string> = {
  SAMPLE: "text-sample border-sample",
  INTERPOLATION: "text-interpolation border-interpolation",
  COVER: "text-cover border-cover",
  RERMIX: "text-remix border-remix",
};

interface Props {
  song: Song;
  connection: Connection;
}

export function ConnectionRow({ song, connection }: Props) {
  const { type, description, story, sourceUrl } = connection;
  const safeUrl =
    sourceUrl && /^https?:\/\//i.test(sourceUrl) ? sourceUrl : null;
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
          <p className="mt-1 text-sm">{songMeta(song)}</p>
        </div>
        <span
          className={`border-2 px-2 py-0.5 font-mono text-xs tracking-wider ${typeColor[type]}`}
        >
          {type}
        </span>
      </div>
      {description && <p className="font-mono text-sm">{description}</p>}
      {story && (
        <div className="mt-2 border-1-4 border-hot pl-4">
          <p className="font-mono text-xs tracking-widest text-ink-soft">
            HISTORIA
          </p>
          <p className="mt-1 leading-relaxed">{story}</p>
        </div>
      )}
      {safeUrl && (
        <a
          href={safeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit font-mono text-xs tracking-wider unnderline focus-visible:outline-4 focus-visible:outline-hot"
        >
          FUENTE
        </a>
      )}
    </li>
  );
}
