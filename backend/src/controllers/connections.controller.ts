import type { Request, Response } from "express";
import { prisma } from "../db.js";

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
}

export async function getAllConnections(req: Request, res: Response) {
  const connections = await prisma.connection.findMany({
    include: { sourceSong: true, derivativeSong: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(connections);
}

export async function deleteConnection(req: Request, res: Response) {
  const id = req.params.id as string;

  await prisma.connection.delete({ where: { id } });
  res.status(204).send();
}

export async function getConnectionById(req: Request, res: Response) {
  const id = req.params.id as string;

  const connection = await prisma.connection.findUnique({
    where: { id },
    include: { sourceSong: true, derivativeSong: true },
  });

  if (!connection) {
    return res.status(404).json({ error: "Conexión no encontrada" });
  }

  res.json(connection);
}

export async function updateConnection(req: Request, res: Response) {
  const id = req.params.id as string;
  const { type, description, timestampSource, timestampDerivative } = req.body;
  const connection = await prisma.connection.update({
    where: { id },
    data: { type, description, timestampSource, timestampDerivative },
  });
  res.json(connection);
}
