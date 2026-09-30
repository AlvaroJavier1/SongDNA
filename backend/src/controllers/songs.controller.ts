import type { Request, Response } from "express";
import { prisma } from "../db.js";
import { error } from "node:console";

export async function getAllSongs(req: Request, res: Response) {
  const songs = await prisma.song.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(songs);
}

export async function getSongById(req: Request, res: Response) {
  const id  = req.params.id as string;
  const song = await prisma.song.findUnique({
    where: { id },
    include: {
      samples: { include: { sourceSong: true } },
      sampledBy: { include: { derivativeSong: true } },
    },
  });
  if (!song) {
    return res.status(404).json({ error: "Cancion no encontrada" });
  }
  res.json(song);
}

export async function createSong(req: Request, res: Response) {
  const { title, artist, year, genre, coverUrl, spotifyId, youtubeId } =
    req.body;

  if (!title || !artist) {
    return res.status(400).json({ error: "title y artist son requeridos" });
  }

  const song = await prisma.song.create({
    data: { title, artist, year, genre, coverUrl, spotifyId, youtubeId },
  });
  res.status(201).json(song);
}

export async function updateSong(req:Request, res: Response) {
  const id = req.params.id as string;
  const { title, artist, year, genre, coverUrl, spotifyId, youtubeId } = req.body;

  try {
    const song = await prisma.song.update({
      where: { id },
      data: { title, artist, year, genre, coverUrl, spotifyId, youtubeId },
    });
    res.json(song);
  } catch (err) {
    res.status(404).json({ error: "Canción no encontrada" });
  }
}

export async function deleteSong(req:Request, res: Response) {
  const id = req.params.id as string;

  try {
    await prisma.song.delete({ where: { id }});
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: "Canción no encontrada" });
  }
}
