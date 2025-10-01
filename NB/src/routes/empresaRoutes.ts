import { Router } from "express";
import { getEmpresas, putEmpresas } from "@/controllers/EmpresasController";

const router = Router();
router.get("/:accion", getEmpresas);
router.put("/:idEstacion/:accion", putEmpresas);

export default router;