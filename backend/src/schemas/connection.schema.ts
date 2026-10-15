import { z } from "zod";

const connectionTypes = ["SAMPLE", "INTERPOLATION", "COVER", "REMIX"] as const;

export const createConnectionSchema = z.object({
  sourceSongId: z.number().int().positive(),
  derivativeSongId: z.number().int().positive(),
  type: z.enum(connectionTypes),
  description: z.string().trim().optional(),
  story: z.string().trim().optional(),
  sourceUrl: z.string().url("sourceUrl debe ser una URL válida").optional(),
  timestampSource: z.number().int().nonnegative().optional(),
  timestampDerivative: z.number().int().nonnegative().optional(),
});

export const updateConnectionSchema = createConnectionSchema
  .omit({ sourceSongId: true, derivativeSongId: true })
  .partial();
