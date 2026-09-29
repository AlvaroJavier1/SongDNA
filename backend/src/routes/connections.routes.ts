import { Router } from "express";
import {
  createConnection,
  getAllConnection,
  deleteConnection,
} from "../controllers/connections.controller.js";

const router = Router();

router.get("/", getAllConnection);
router.post("/", createConnection);
router.delete("/:id", deleteConnection);

export default router;
