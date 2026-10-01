import type { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { error } from "node:console";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Recurso no encontrado" });
    }
    if (err.code === "P2002") {
      return res
        .status(409)
        .json({ error: "Ya existe un registro con esos datos " });
    }
  }
  res.status(500).json({ error: "Error interno del servidor" });
}
export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ error: "Ruta no encontrada" });
}
