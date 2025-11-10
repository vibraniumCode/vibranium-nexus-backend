import { Router } from "express";
import { getTCombustible, getCombustible, postTCombustible } from "@/controllers/CombustibleController";

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

router.get("/", getTCombustible);
router.get("/:idEmpresa", getCombustible);
router.post("/:accion", postTCombustible);

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
// router.put("/:id", updateCombustiblePrice);

export default router;