import { Router } from "express";
import { getInforme } from "../controllers/informeController";

const router = Router();
router.post("/", getInforme);

export default router;