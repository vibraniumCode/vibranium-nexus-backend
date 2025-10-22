import { Router } from "express";
import { getClientes, putClientes, deleteCliente, postCliente } from "@/controllers/ClientesController";

const router = Router();
router.get("/:accion", getClientes);
router.put("/:id/:accion", putClientes);
router.delete("/:id/:accion", deleteCliente);
router.post("/:accion", postCliente);

export default router;