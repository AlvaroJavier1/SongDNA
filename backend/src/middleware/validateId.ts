import type { Request, Response, NextFunction } from "express";

export function validateIdParam(
  req: Request,
  res: Response,
  next: NextFunction,
  value: string,
) {
  if (!/^\d{1,9}$/.test(value)) {
    return res.status(400).json({ error: "El id debe tener un número entero" });
  }
  next();
}
