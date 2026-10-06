import { z } from "zod";

export const createConnectionSchema = z.object({
  sourceSongId: z.string().min(1, "sourceSongId es requerido"),
  derivativeSongId: z.string().min(1, "derivativeSongId es requerido"),
  type: z.enum(["SAMPLE", "INTERPOLATION", "COVER", "REMIX"]),
  description: z.string().optional(),
  timestampSource: z.number().int().optional(),
  timestampDerivative: z.number().int().optional(),
});

export const updateConnectionSchema = z.object({
  type: z.enum(["SAMPLE", "INTERPOLATION", "COVER", "REMIX"]).optional(),
  description: z.string().optional(),
  timestampSource: z.number().int().optional(),
  timestampDerivative: z.number().int().optional(),
});
