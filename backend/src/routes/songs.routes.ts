import { Router } from "express";
import {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
} from "../controllers/songs.controller.js";

const router = Router();

router.get("/", getAllSongs);
router.get("/:id", getSongById);
router.post("/", createSong);
router.patch("/:id", updateSong);
router.delete("/:id", deleteSong);

export default router;
