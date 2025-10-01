import { Router } from "express";
import { getCombustible, updateCombustiblePrice } from "@/controllers/CombustibleController";

const router = Router();

/**
 * @openapi
 * /combustible:
 *   get:
 *     summary: Obtener lista de combustibles
 *     tags:
 *       - Combustibles
 *     responses:
 *       200:
 *         description: Lista de combustibles
 */
router.get("/", getCombustible);

/**
 * @openapi
 * /combustible/{id}:
 *   put:
 *     summary: Actualizar el precio de un combustible
 *     tags:
 *       - Combustibles
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del combustible
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *                 example: 150.5
 *     responses:
 *       200:
 *         description: Precio actualizado correctamente
 */
router.put("/:id", updateCombustiblePrice);

export default router;