import { Router } from "express";
import {
  createComplaint,
  deleteComplaint,
  getComplaint,
  getComplaints,
  updateComplaint,
} from "../controllers/complaint.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createComplaintSchema } from "../schemas/complaint.schema.js";

const router = Router();

router.get("/", auth, getComplaints);

router.post("/", auth, validateSchema(createComplaintSchema), createComplaint);

router.get("/:id", auth, getComplaint);

// Ahora cualquiera autenticado puede actualizar la queja
router.put("/:id", auth, updateComplaint);

// Cualquiera autenticado puede eliminar su queja
router.delete("/:id", auth, deleteComplaint);

export default router;
