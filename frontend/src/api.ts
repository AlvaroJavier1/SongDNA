import type { Song, SongDetail } from "./types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? `Error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const getSongs = () => request<Song[]>("/songs");
export const getSong = (id: string) => request<SongDetail>(`/songs/${id}`);
