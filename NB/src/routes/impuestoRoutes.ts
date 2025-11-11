import { Router } from "express";
import { getTImpuestos, postTImpuestos, postImpuestos, deleteImpuestos, putEmpresas } from "../controllers/ImpuestosController";

const router = Router();
router.get("/", getTImpuestos);
router.post("/:accion", postTImpuestos);
router.post("/tipo/:accion/:idAccion", postImpuestos);
router.delete("/:idEmpresa/:idCombustible/:idImpuesto/:accion/:idAccion", deleteImpuestos);
router.put("/:idEmpresa/:idCombustible/:idImpuesto/:accion/:idAccion", putEmpresas);

export default router;