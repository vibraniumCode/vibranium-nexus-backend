import { Router } from "express";
import { getEmpresas, putEmpresas, deleteEmpresa, postEmpresa, detailsEmpresa } from "../controllers/EmpresasController";

const router = Router();
router.get("/:accion", getEmpresas);
router.get("/details/:idEstacion", detailsEmpresa);
router.put("/:idEstacion/:accion", putEmpresas);
router.delete("/:idEstacion/:accion", deleteEmpresa);
router.post("/:accion", postEmpresa);

export default router;