import { Router } from "express";
import { getTImpuestos, postTImpuestos, postImpuestos, deleteImpuestos, putEmpresas } from "@/controllers/ImpuestosController";
//import { getImpEstacion } from "@/controllers/ImpuestosController";

const router = Router();
router.get("/", getTImpuestos);
router.post("/:accion", postTImpuestos);
router.post("/:accion", postImpuestos);
router.delete("/:idEmpresa/:idCombustible/:idImpuesto/:accion", deleteImpuestos);
router.put("/:idEmpresa/:idCombustible/:idImpuesto/:accion", putEmpresas);

export default router;