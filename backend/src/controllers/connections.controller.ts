import type { Request, Response } from "express";
import { prisma } from "../db.js";
import { songInclude } from "../utils/includes.js";

const connectionInclude = {
  sourceSong: { include: songInclude },
  derivativeSong: { include: songInclude },
} as const;

export async function createConnection(req: Request, res: Response) {
  const {
    sourceSongId,
    derivativeSongId,
    type,
    description,
    story,
    sourceUrl,
    timestampSource,
    timestampDerivative,
  } = req.body;

  if (sourceSongId === derivativeSongId) {
    return res.status(400).json({
      error: "Una canción no puede tener una conexión consigo misma",
    });
  }

  const connection = await prisma.connection.create({
    data: {
      sourceSongId,
      derivativeSongId,
      type,
      description,
      story,
      sourceUrl,
      timestampSource,
      timestampDerivative,
    },
    include: connectionInclude,
  });
  res.status(201).json(connection);
}

export async function getAllConnections(req: Request, res: Response) {
  const connections = await prisma.connection.findMany({
    include: connectionInclude,
    orderBy: { createdAt: "desc" },
  });
  res.json(connections);
}

export async function deleteConnection(req: Request, res: Response) {
  const id = Number(req.params.id);

  await prisma.connection.delete({ where: { id } });
  res.status(204).send();
}

export async function getConnectionById(req: Request, res: Response) {
  const id = Number(req.params.id);

  const connection = await prisma.connection.findUnique({
    where: { id },
    include: connectionInclude,
  });

  if (!connection) {
    return res.status(404).json({ error: "Conexión no encontrada" });
  }

  res.json(connection);
}

export async function updateConnection(req: Request, res: Response) {
  const id = Number(req.params.id);
  const {
    type,
    description,
    story,
    sourceUrl,
    timestampSource,
    timestampDerivative,
  } = req.body;
  const connection = await prisma.connection.update({
    where: { id },
    data: {
      type,
      description,
      story,
      sourceUrl,
      timestampSource,
      timestampDerivative,
    },
    include: connectionInclude,
  });
  res.json(connection);
}
