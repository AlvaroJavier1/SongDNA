import { useEffect, useState } from "react";
import { getSong } from "../api";
import type { Connection, Song, SongDetail as SongsDetailData } from "../types";
import { ConnectionRow } from "./ConnectionRow";
import { artistNames } from "../utils/format";

interface Item {
  connection: Connection;
  song: Song;
}

function ConnectionList({ title, items }: { title: string; items: Item[] }) {
  return (
    <section className="mt-6">
      <h2 className="font-mono text-xs tracking-widest">{title}</h2>
      {items.length === 0 ? (
        <p className="mt-3 text-ink-soft">Aún sin conexiones.</p>
      ) : (
        <ul className="mt-2">
          {items.map(({ connection, song }) => (
            <ConnectionRow
              key={connection.id}
              song={song}
              connection={connection}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export function SongDetail({ id, onBack }: { id: number; onBack: () => void }) {
  const [song, setSong] = useState<SongsDetailData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getSong(id)
      .then((data) => active && setSong(data))
      .catch((err: Error) => active && setError(err.message));
    return () => {
      active = false;
    };
  }, [id]);

  if (error)
    return (
      <p role="alert" className="font-mono">
        No se pudo cargar la canción: {error}
      </p>
    );
  if (!song) return <p className="font-mono">Cargando...</p>;

  const meta = [song.year, song.genre?.name.toUpperCase()]
    .filter(Boolean)
    .join(" / ");

  return (
    <article>
      <button
        onClick={onBack}
        className="font-mono text-sm tracking-wider underline focus-visible:outline-4 focus-visible:outline-hot"
      >
        VOLVER A LA LISTA
      </button>
      <h1 className="mt-5 text-6xl font-black uppercase leading-[0.92] tracking-tight">
        {song.title}
      </h1>
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <p className="text-2xl">{artistNames(song)}</p>
        <p className="font-mono text-sm text-hot">{meta}</p>
      </div>
      <div className="my-6 h-0.5 bg-ink" />

      <ConnectionList
        title="SAMPLEA A"
        items={song.samples.map((c) => ({
          connection: c,
          song: c.sourceSong,
        }))}
      />
      <ConnectionList
        title="SAMPLEADA POR"
        items={song.sampledBy.map((c) => ({
          connection: c,
          song: c.derivativeSong,
        }))}
      />
    </article>
  );
}
