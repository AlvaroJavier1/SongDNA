import { useEffect, useState } from "react";
import { getSongs } from "../api";
import type { Song } from "../types";

export function SongList({ onSelect }: { onSelect: (id: string) => void }) {
  const [songs, setSongs] = useState<Song[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSongs()
      .then(setSongs)
      .catch((err: Error) => setError(err.message));
  }, []);

  if (error)
    return (
      <p role="alert" className="font-mono">
        No se pudieron cargar las canciones: {error}
      </p>
    );
  if (!songs) return <p className="font-mono">Cargando...</p>;
  if (songs.length === 0) return <p>Todavía no hay canciones registradas</p>;

  return (
    <ul className="border-t-4 border-ink">
      {songs.map((s) => (
        <li key={s.id} className="border-b-2 border-ink">
          <button
            onClick={() => onSelect(s.id)}
            className="flex w-full items-baseline justify-between gap-4 py-4 text-left hover:text-paper focus-visible:outline-4 focus-visible:outline-hot"
          >
            <span className="text-3xl font-black uppercase">{s.title}</span>
            <span>
              {s.artist}
              {s.year ? `, ${s.year}` : ""}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
