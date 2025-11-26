import { Router } from "express";
import { postGeneradorCTickets, postDetalleImpuestoTickets } from "../controllers/ticketsController";

const router = Router();
router.post("/:idEmpresa", postGeneradorCTickets);
router.post("/impuestos/:idEmpresa", postDetalleImpuestoTickets);
export default router;