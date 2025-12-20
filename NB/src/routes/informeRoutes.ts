import { Router } from "express";
import { getInforme, getResumen } from "../controllers/informeController";

const router = Router();
router.post("/", getInforme);
router.get("/", getResumen)

export default router;