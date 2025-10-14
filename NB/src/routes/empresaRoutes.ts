import { Router } from "express";
import { getEmpresas, putEmpresas, deleteEmpresa, postEmpresa } from "@/controllers/EmpresasController";

const router = Router();
router.get("/:accion", getEmpresas);
router.put("/:idEstacion/:accion", putEmpresas);
router.delete("/:idEstacion/:accion", deleteEmpresa);
router.post("/:accion", postEmpresa);

export default router;