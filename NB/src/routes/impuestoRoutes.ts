import { Router } from "express";
import { getTImpuestos, postTImpuestos, postImpuestos, deleteTImpuestos, deleteImpuestos, putEmpresas } from "../controllers/ImpuestosController";

const router = Router();
router.get("/", getTImpuestos);

router.post("/:accion", postTImpuestos);
router.post("/tipo/:accion/:idAccion", postImpuestos);

router.delete("/tipo/:id", deleteTImpuestos);
router.delete("/:idEmpresa/:idCombustible/:idImpuesto/:accion/:idAccion", deleteImpuestos);

router.put("/:idEmpresa/:idCombustible/:idImpuesto/:accion/:idAccion", putEmpresas);

export default router;