import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { createSongSchema, updateSongSchema } from "../schemas/song.schema.js";
import {
  createSong,
  deleteSong,
  getAllSongs,
  getSongById,
  updateSong,
} from "../controllers/songs.controller.js";

const router = Router();

router.get("/", getAllSongs);
router.get("/:id", getSongById);
router.post("/", validate(createSongSchema), createSong);
router.patch("/:id", validate(updateSongSchema), updateSong);
router.delete("/:id", deleteSong);

export default router;
