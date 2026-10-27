import type { Request, Response } from "express";
import { prisma } from "../db.js";
import { songInclude } from "../utils/includes.js";

export async function getAllGenres(req: Request, res: Response) {
  const genres = await prisma.genre.findMany({
    where: { songs: { some: {} } },
    orderBy: { name: "asc" },
    include: { _count: { select: { songs: true } } },
  });
  res.json(genres);
}

export async function getGenreBySlug(req: Request, res: Response) {
  const slug = req.params.slug as string;

  const genre = await prisma.genre.findUnique({
    where: { slug },
    include: {
      songs: { include: songInclude, orderBy: { title: "asc" } },
    },
  });

  if (!genre) {
    return res.status(404).json({ error: "Género no encontrado" });
  }
  res.json(genre);
}
