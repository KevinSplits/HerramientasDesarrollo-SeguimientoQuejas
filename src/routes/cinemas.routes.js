import { Router } from "express";
import {
  getCinemas,
  createCinema,
  updateCinema,
  deleteCinema,
} from "../controllers/cinema.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createCinemaSchema } from "../schemas/cinema.schema.js";

const router = Router();

router.get("/", auth, getCinemas);

// Cualquiera que esté autenticado puede modificar datos de cines
router.post("/", auth, validateSchema(createCinemaSchema), createCinema);

router.put("/:id", auth, updateCinema);

router.delete("/:id", auth, deleteCinema);

export default router;
