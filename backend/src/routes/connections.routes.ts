import { Router } from "express";
import {
  createConnection,
  getAllConnections,
  getConnectionById,
  updateConnection,
  deleteConnection,
} from "../controllers/connections.controller.js";
import { validate } from "../middleware/validate.js";
import { validateIdParam } from "../middleware/validateId.js";
import {
  createConnectionSchema,
  updateConnectionSchema,
} from "../schemas/connection.schema.js";

const router = Router();

router.param("id", validateIdParam);

router.get("/", getAllConnections);
router.get("/:id", getConnectionById);
router.post("/", validate(createConnectionSchema), createConnection);
router.patch("/:id", validate(updateConnectionSchema), updateConnection);
router.delete("/:id", deleteConnection);

export default router;
