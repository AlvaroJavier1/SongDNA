import { Router } from "express";
import {
  createConnection,
  getAllConnections,
  getConnectionById,
  updateConnection,
  deleteConnection,
} from "../controllers/connections.controller.js";

const router = Router();

router.get("/", getAllConnections);
router.get("/:id", getConnectionById);
router.post("/", createConnection);
router.patch("/:id", updateConnection);
router.delete("/:id", deleteConnection);

export default router;
