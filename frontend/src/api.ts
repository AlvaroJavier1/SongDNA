import type {
  ArtistDetail,
  ArtistWithCount,
  GenreDetail,
  GenreWithCount,
  Song,
  SongDetail,
} from "./types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(path: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`);
  } catch {
    throw new ApiError(0, "No se pudo conectar con el servidor");
  }

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
