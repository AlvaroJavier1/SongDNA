import { Router } from "express";
import {
  createConnection,
  getAllConnections,
  deleteConnection,
} from "../controllers/connections.controller.js";

const router = Router();

router.get("/", getAllConnections);
router.post("/", createConnection);
router.delete("/:id", deleteConnection);

export default router;
