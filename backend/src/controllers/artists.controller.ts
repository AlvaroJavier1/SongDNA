import type { Request, Response } from "express";
import { prisma } from "../db.js";
import { songInclude } from "../utils/includes.js";

export async function getAllArtists(req: Request, res: Response) {
  const artists = await prisma.artist.findMany({
    where: { songs: { some: {} } },
    orderBy: { name: "asc" },
    include: { _count: { select: { songs: true } } },
  });
  res.json(artists);
}

export async function getArtistById(req: Request, res: Response) {
  const id = Number(req.params.id);

  const artist = await prisma.artist.findUnique({
    where: { id },
    include: {
      songs: { include: songInclude, orderBy: { title: "asc" } },
    },
  });

  if (!artist) {
    return res.status(404).json({ error: "Artista no encontrado" });
  }

  res.json(artist);
}
