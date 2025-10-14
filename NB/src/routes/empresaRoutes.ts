import { Router } from "express";
import { getEmpresas, putEmpresas, deleteEmpresa } from "@/controllers/EmpresasController";

const router = Router();
router.get("/:accion", getEmpresas);
router.put("/:idEstacion/:accion", putEmpresas);
router.delete("/:idEstacion/:accion", deleteEmpresa);

export default router;