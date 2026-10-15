import { z } from "zod";

export const createSongSchema = z.object({
  title: z.string().trim().min(1, "title es requerido"),
  artists: z
    .array(
      z.string().trim().min(1, "El nombre del artista no puede estar vacaío"),
    )
    .min(1, "Se necesita al menos un artista"),
  genre: z.string().trim().min(1).optional(),
  year: z.number().int().optional(),
  coverUrl: z.string().url("coverUrl debe ser una URL válida").optional(),
  spotifyId: z.string().optional(),
  youtubeId: z.string().optional(),
});

export const updateSongSchema = createSongSchema.partial();
