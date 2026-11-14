import type {
  ArtistDetail,
  ArtistWithCount,
  GenreDetail,
  GenreWithCount,
  Song,
  SongDetail,
} from "./types";

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
export const getSong = (id: number) => request<SongDetail>(`/songs/${id}`);
export const getGenres = () => request<GenreWithCount[]>("/genres");
export const getGenre = (slug: string) =>
  request<GenreDetail>(`/genre/${encodeURIComponent(slug)}`);
export const getArtists = () => request<ArtistWithCount[]>("/artists");
export const getArtist = (id: number) =>
  request<ArtistDetail>(`/artists/${id}`);
