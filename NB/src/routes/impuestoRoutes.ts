import { Router } from "express";
import { getImpuestos } from "@/controllers/ImpuestosController";
import { getImpEstacion } from "@/controllers/ImpuestosController";

const router = Router();
router.get("/", getImpuestos);
router.get("/:accion/:id", getImpEstacion);

export default router;