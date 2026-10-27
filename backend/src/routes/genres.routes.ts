import { Router } from "express";
import {
  getAllGenres,
  getGenreBySlug,
} from "../controllers/genres.controller.js";

const router = Router();

router.get("/", getAllGenres);
router.get("/:slug", getGenreBySlug);

export default router;
