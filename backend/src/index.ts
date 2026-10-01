import "dotenv/config";
import express from "express";
import songRouter from "./routes/songs.routes.js";
import connectionRouter from "./routes/connections.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/songs", songRouter);
app.use("/connections", connectionRouter);

app.get("/", (req, res) => {
  res.json({ message: "SongDNA API Funcionando" });
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
