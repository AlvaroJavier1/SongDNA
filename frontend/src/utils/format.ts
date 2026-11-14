import type { Song } from "../types";

export function artistNames(song: Pick<Song, "artists">): string {
  return song.artists.map((a) => a.name).join(", ");
}

export function songMeta(song: Pick<Song, "artists" | "year">): string {
  const names = artistNames(song);
  return song.year ? `${names}, ${song.year}` : names;
}

export function songCount(n: number): string {
  return `${n} ${n === 1 ? "CANCIÓN" : "CANCIONES"}`;
}

export function initialOf(name: string): string {
  const first = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .charAt(0)
    .toUpperCase();
  return /[A-Z]/.test(first) ? first : "#";
}

export function groupByLetter<T extends { name: string }>(
  items: T[],
): [string, T[]][] {
  const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name, "es"));
  const groups = new Map<string, T[]>();

  for (const item of sorted) {
    const letter = initialOf(item.name);
    const group = groups.get(letter);
    if (group) group.push(item);
    else groups.set(letter, [item]);
  }

  return [...groups.entries()].sort(([a], [b]) => {
    if (a === "#") return 1;
    if (b === "#") return -1;
    return a.localeCompare(b);
  });
}
