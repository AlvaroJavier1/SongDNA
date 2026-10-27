export type ConnectionType = "SAMPLE" | "INTERPOLATION" | "COVER" | "RERMIX";

export interface Artist {
  id: number;
  name: string;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}
export interface Song {
  id: number;
  title: string;
  year: number | null;
  coverUrl: string | null;
  spotifyId: string | null;
  youtubeId: string | null;
  artists: Artist[];
  genre: Genre | null;
}

export interface Connection {
  id: number;
  type: ConnectionType;
  description: string | null;
  story: string | null;
  sourceUrl: string | null;
  timestampSource: number | null;
  timestampDerivative: number | null;
  sourceSongId: string;
  derivativeSongId: string;
}

export interface SongDetail extends Song {
  samples: (Connection & { sourceSong: Song })[];
  sampledBy: (Connection & { derivativeSong: Song })[];
}
