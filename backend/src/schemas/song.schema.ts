import { z } from "zod";

export const createSongSchema = z.object({
  title: z.string().min(1, "title es requerido"),
  artist: z.string().min(1, "artist es requerido"),
  year: z.number().int().optional(),
  genre: z.string().optional(),
  coverUrl: z.string().url("coverUrl debe ser una URL válida").optional(),
  spotifyId: z.string().optional(),
  youtubeId: z.string().optional(),
});

export const updateSongSchema = createSongSchema.partial();
