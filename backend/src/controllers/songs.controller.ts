import type { Request, Response } from "express";
import { prisma } from "../db.js";
import { songInclude } from "../utils/includes.js";
import { slugify } from "../utils/slug.js";

const connectArtists = (names: string[]) =>
  names.map((name) => ({ where: { name }, create: { name } }));

const connectGenre = (name: string) => {
  const slug = slugify(name);
  return { connectOrCreate: { where: { slug }, create: { name, slug } } };
};

export async function getAllSongs(req: Request, res: Response) {
  const songs = await prisma.song.findMany({
    include: songInclude,
    orderBy: { createdAt: "desc" },
  });
  res.json(songs);
}

export async function getSongById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const song = await prisma.song.findUnique({
    where: { id },
    include: {
      ...songInclude,
      samples: { include: { sourceSong: { include: songInclude } } },
      sampledBy: { include: { derivativeSong: { include: songInclude } } },
    },
  });
  if (!song) {
    return res.status(404).json({ error: "Cancion no encontrada" });
  }
  res.json(song);
}

export async function createSong(req: Request, res: Response) {
  const { title, artists, year, genre, coverUrl, spotifyId, youtubeId } =
    req.body;

  const song = await prisma.song.create({
    data: {
      title,
      year,
      coverUrl,
      spotifyId,
      youtubeId,
      artists: { connectOrCreate: connectArtists(artists) },
      ...(genre && { genre: connectGenre(genre) }),
    },
    include: songInclude,
  });
  res.status(201).json(song);
}

export async function updateSong(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { title, artists, year, genre, coverUrl, spotifyId, youtubeId } =
    req.body;

  const song = await prisma.$transaction(async (tx) => {
    if (artists) {
      await tx.song.update({ where: { id }, data: { artists: { set: [] } } });
    }

    return tx.song.update({
      where: { id },
      data: {
        title,
        year,
        coverUrl,
        spotifyId,
        youtubeId,
        ...(artists && {
          artists: { connectOrCreate: connectArtists(artists) },
        }),
        ...(genre && { genre: connectGenre(genre) }),
      },
      include: songInclude,
    });
  });
  res.json(song);
}

export async function deleteSong(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.song.delete({ where: { id } });
  res.status(204).send();
}
