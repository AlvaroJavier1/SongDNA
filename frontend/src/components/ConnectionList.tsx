import type { Connection, Song } from "../types";
import { ConnectionRow } from "./ConnectionRow";

export interface ConnectionItem {
  connection: Connection;
  song: Song;
}

export function ConnectionList({
  title,
  items,
}: {
  title: string;
  items: ConnectionItem[];
}) {
  return (
    <section className="mt-6">
      <h2 className="font-mono text-xs tracking-widest">{title}</h2>
      {items.length === 0 ? (
        <p className="mt-3 text-ink-soft">Aún sin conexiones</p>
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
