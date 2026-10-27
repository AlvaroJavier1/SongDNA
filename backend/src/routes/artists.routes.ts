import { Router } from "express";
import {
  getAllArtists,
  getArtistById,
} from "../controllers/artists.controller.js";
import { validateIdParam } from "../middleware/validateId.js";

const router = Router();

router.param("id", validateIdParam);

router.get("/", getAllArtists);
router.get("/:id", getArtistById);

export default router;
