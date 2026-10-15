import { Router } from "express";
import {
  createSong,
  deleteSong,
  getAllSongs,
  getSongById,
  updateSong,
} from "../controllers/songs.controller.js";
import { validate } from "../middleware/validate.js";
import { validateIdParam } from "../middleware/validateId.js";
import { createSongSchema, updateSongSchema } from "../schemas/song.schema.js";

const router = Router();

router.param("id", validateIdParam);

router.get("/", getAllSongs);
router.get("/:id", getSongById);
router.post("/", validate(createSongSchema), createSong);
router.patch("/:id", validate(updateSongSchema), updateSong);
router.delete("/:id", deleteSong);

export default router;
