import type { Request, Response } from "express";
import { prisma } from "../db.js";
import { error } from "node:console";

export async function createConnection(req: Request, res: Response) {
  const {
    sourceSongId,
    derivativeSongId,
    type,
    description,
    timestampSource,
    timestampDerivative,
  } = req.body;

  if (!sourceSongId || !derivativeSongId || !type) {
    return res.status(400).json({
      error: "sourceSongId, derivativeSongId y type son requeridos",
    });
  }
  if (sourceSongId === derivativeSongId) {
    return res.status(400).json({
      error: "Una canción no puede tener una conexión consigo misma",
    });
  }

  try {
    const connection = await prisma.connection.create({
      data: {
        sourceSongId,
        derivativeSongId,
        type,
        description,
        timestampSource,
        timestampDerivative,
      },
    });
    res.status(201).json(connection);
  } catch (err) {
    res.status(409).json({ error: "Esa conexión ya existe" });
  }
}

export async function getAllConnection(req: Request, res: Response) {
  const connections = await prisma.connection.findMany({
    include: { sourceSong: true, derivativeSong: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(connections);
}

export async function deleteConnection(req: Request, res: Response) {
  const id = req.params.id as string;

  await prisma.connection.delete({ where: { id } });
  res.status(200).send();
}
