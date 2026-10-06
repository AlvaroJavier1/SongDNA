import { Router } from "express";
import { validate } from "../middleware/validate.js";
import {
  createConnectionSchema,
  updateConnectionSchema,
} from "../schemas/connection.schema.js";
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
router.post("/", validate(createConnectionSchema), createConnection);
router.patch("/:id", validate(updateConnectionSchema), updateConnection);
router.delete("/:id", deleteConnection);

export default router;
