import { Link } from "react-router";
import type { Song } from "../types";
import { songMeta } from "../utils/format";

interface Props {
  songs: Song[];
  showGenre?: boolean;
}

export function SongRows({ songs, showGenre = false }: Props) {
  if (songs.length === 0)
    return <p className="text-ink-soft">Todavía no hay canciones.</p>;
  return (
    <ul className="border-t-2 border-ink">
      {songs.map((s) => (
        <li key={s.id} className="border-b-2 border-ink">
          <Link
            to={`/canciones/${s.id}`}
            className="block py-4 hover:text-paper focus-visible:outline-4 focus-visible:outline-hot"
          >
            <span className="block text-3xl font-black uppercase leading-none">
              {s.title}
            </span>
            <span className="mt-2 block font-mono text-xs">
              {songMeta(s)}
              {showGenre && s.genre && (
                <span className="ml-2.5 border-2 border-current px-1.5 py-0.5 tracking-widest">
                  {s.genre.name.toUpperCase()}
                </span>
              )}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
