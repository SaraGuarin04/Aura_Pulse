import { Router } from "express";
import { ActionController } from "./action_controller";
import { createActionSchema } from "./action_schema";
import { validate } from "../../middlewares/validate.middleware";

const router = Router();
const _controller = new ActionController();

/**
 * @openapi
 * /api/v2/actions:
 *   post:
 *     tags:
 *       - Actions
 *     summary: "Crear acción ecológica"
 *     description: "Permite registrar una nueva acción ecológica realizada por los usuarios dentro del sistema de sostenibilidad."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Reciclaje de plástico"
 *               description:
 *                 type: string
 *                 example: "Reciclar 10 botellas plásticas en puntos autorizados."
 *               status:
 *                 type: string
 *                 example: "pending"
 *               points:
 *                 type: number
 *                 example: 30
 *     responses:
 *       201:
 *         description: "Acción ecológica creada correctamente"
 *       400:
 *         description: "Datos inválidos"
 */
router.post('/', validate(createActionSchema), _controller.create);

/**
 * @openapi
 * /api/v2/actions:
 *   get:
 *     tags:
 *       - Actions
 *     summary: "Obtener acciones ecológicas"
 *     description: "Retorna una lista con todas las acciones ecológicas registradas en el sistema."
 *     responses:
 *       200:
 *         description: "Listado de acciones obtenido correctamente"
 */
router.get('/', _controller.findAll);

/**
 * @openapi
 * /api/v2/actions/{id}:
 *   get:
 *     tags:
 *       - Actions
 *     summary: "Obtener acción ecológica por ID"
 *     description: "Retorna la información detallada de una acción ecológica específica."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID de la acción ecológica"
 *     responses:
 *       200:
 *         description: "Acción encontrada correctamente"
 *       404:
 *         description: "Acción no encontrada"
 */
router.get('/:id', _controller.findOne);

/**
 * @openapi
 * /api/v2/actions/{id}:
 *   put:
 *     tags:
 *       - Actions
 *     summary: "Actualizar acción ecológica"
 *     description: "Actualiza la información de una acción ecológica existente dentro del sistema."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID de la acción ecológica"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Siembra de árboles"
 *               description:
 *                 type: string
 *                 example: "Sembrar 2 árboles en una zona urbana."
 *               status:
 *                 type: string
 *                 example: "completed"
 *               points:
 *                 type: number
 *                 example: 50
 *     responses:
 *       200:
 *         description: "Acción ecológica actualizada correctamente"
 *       404:
 *         description: "Acción no encontrada"
 */
router.put('/:id', _controller.update);

/**
 * @openapi
 * /api/v2/actions/{id}:
 *   delete:
 *     tags:
 *       - Actions
 *     summary: "Eliminar acción ecológica"
 *     description: "Elimina una acción ecológica registrada en el sistema."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID de la acción ecológica"
 *     responses:
 *       200:
 *         description: "Acción eliminada correctamente"
 *       404:
 *         description: "Acción no encontrada"
 */
router.delete('/:id', _controller.delete);

export default router;