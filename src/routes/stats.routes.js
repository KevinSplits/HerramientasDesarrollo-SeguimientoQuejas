import { Router } from "express";
import { getStats } from "../controllers/stats.controller.js";
import { auth } from "../middlewares/auth.middleware.js"; // ✅ esto es lo correcto

const router = Router();

router.get("/stats", auth, getStats); // ✅ protegido con autenticación

export default router;