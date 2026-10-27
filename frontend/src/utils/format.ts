import type { Song } from "../types";

export function artistNames(song: Pick<Song, "artists">): string {
  return song.artists.map((a) => a.name).join(", ");
}

export function songMeta(song: Pick<Song, "artists" | "year">): string {
  const names = artistNames(song);
  return song.year ? `${names}, ${song.year}` : names;
}
