import { Router } from "express";
import { getImpuestos, postImpuestos, deleteImpuestos, putEmpresas } from "@/controllers/ImpuestosController";
//import { getImpEstacion } from "@/controllers/ImpuestosController";

const router = Router();
router.get("/", getImpuestos);
router.post("/:accion", postImpuestos);
router.delete("/:idEmpresa/:idCombustible/:idImpuesto/:accion", deleteImpuestos);
router.put("/:idEmpresa/:idCombustible/:idImpuesto/:accion", putEmpresas);

export default router;