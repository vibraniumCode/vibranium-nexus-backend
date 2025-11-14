import { Router } from "express";
import { getGeneradorCTickets } from "../controllers/ticketsController";

const router = Router();
router.get("/:idEmpresa", getGeneradorCTickets);

export default router;