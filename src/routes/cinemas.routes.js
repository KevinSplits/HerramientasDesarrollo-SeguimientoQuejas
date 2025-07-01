import { Router } from "express";
import {
  getCinemas,
  createCinema,
  updateCinema,
  deleteCinema,
} from "../controllers/cinema.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createCinemaSchema, updateCinemaSchema } from "../schemas/cinema.schema.js";

const router = Router();

// Obtener todos los cines (requiere autenticación)
router.get("/", auth, getCinemas);

// Crear un cine (requiere autenticación y validación de datos)
router.post(
  "/",
  auth,
  validateSchema(createCinemaSchema), // Valida los datos enviados en el cuerpo
  createCinema
);

// Actualizar un cine (requiere autenticación y validación de datos)
router.put(
  "/:id",
  auth,
  validateSchema(updateCinemaSchema), // Valida los datos enviados en el cuerpo
  updateCinema
);

// Eliminar un cine (requiere autenticación)
router.delete("/:id", auth, deleteCinema);

export default router;
