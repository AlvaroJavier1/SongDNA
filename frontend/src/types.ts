export type ConnectionType = "SAMPLE" | "INTERPOLATION" | "COVER" | "RERMIX";

export interface Song {
  id: string;
  title: string;
  artist: string;
  year: number | null;
  genre: string | null;
  coverUrl: string | null;
  spotifyId: string | null;
  youtubeId: string | null;
}

export interface Connection {
  id: string;
  type: ConnectionType;
  description: string | null;
  timestampSource: number | null;
  timestampDerivative: number | null;
  sourceSongId: string;
  derivativeSongId: string;
}

export interface SongDetail extends Song {
  samples: (Connection & { sourceSong: Song })[];
  sampledBy: (Connection & { derivativeSong: Song })[];
}
