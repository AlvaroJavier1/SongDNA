import "dotenv/config";
import express from "express";
import cors from "cors";
import { prisma } from "./db.js";
import songRouter from "./routes/songs.routes.js";
import connectionRouter from "./routes/connections.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/songs", songRouter);
app.use("/connections", connectionRouter);

app.get("/", (req, res) => {
  res.json({ message: "SongDNA API Funcionando" });
});

app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", database: "connected" });
  } catch (err) {
    res.status(503).json({ status: "error", database: "disconnected" });
  }
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
