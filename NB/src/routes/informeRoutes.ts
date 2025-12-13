import { Router } from "express";
import { getInforme } from "../controllers/informeController";

const router = Router();
router.get("/", getInforme);

export default router;