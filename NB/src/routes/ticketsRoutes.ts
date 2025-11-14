import { Router } from "express";
import { postGeneradorCTickets } from "../controllers/ticketsController";

const router = Router();
router.post("/:idEmpresa", postGeneradorCTickets);

export default router;