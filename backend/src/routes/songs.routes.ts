import { Router } from "express";
import {
  getAllSongs,
  getSongById,
  createSong,
} from "../controllers/songs.controller.js";

const router = Router();

router.get("/", getAllSongs);
router.get("/:id", getSongById);
router.post("/", createSong);

export default router;
