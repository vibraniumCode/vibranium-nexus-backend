import { Router } from "express";
import { getGeneradorCTickets } from "../controllers/ticketsController";

const router = Router();
router.get("/", getGeneradorCTickets);

export default router;