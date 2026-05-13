import { Router } from "express";
import { ActionController } from "./action_controller";
import { createActionSchema } from "./action_schema";
import { validate } from "../../middlewares/validate.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const _controller = new ActionController();

/**
 * @openapi
 * /action:
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
 *               - userId
 *               - title
 *               - category
 *               - value
 *             properties:
 *               userId:
 *                   type: string
 *                   example: "65f1a2b3c4d5e6f7a8b9c0d1"
 *               title:
 *                    type: string
 *                    example: "Reciclaje de botellas PET"
 *               category:
 *                     type: string
 *                     enum: ['Reciclaje', 'Transporte', 'Energia', 'Agua', 'Otro']
 *                     example: "Reciclaje"
 *               description:
 *                     type: string
 *                     example: "Se reciclaron 5 botellas de plástico en el punto limpio."
 *               value:
 *                     type: number
 *                     example: 5
 *               auraPoints:
 *                     type: number
 *                     example: 50
 *     responses:
 *       201:
 *         description: "Acción ecológica creada correctamente"
 *       400:
 *         description: "Datos inválidos"
 */
router.post('/', authMiddleware, validate(createActionSchema), _controller.create);

/**
 * @openapi
 * /action:
 *   get:
 *     tags:
 *       - Actions
 *     summary: "Obtener acciones ecológicas"
 *     description: "Retorna una lista con todas las acciones ecológicas registradas en el sistema."
 *     responses:
 *       200:
 *         description: "Listado de acciones obtenido correctamente"
 */
router.get('/', authMiddleware, _controller.findAll);

/**
 * @openapi
 * /action/{id}:
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
router.get('/:id', authMiddleware, _controller.findOne);

/**
 * @openapi
 * /action/{id}:
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
router.put('/:id', authMiddleware, _controller.update);

/**
 * @openapi
 * /action/{id}:
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
router.delete('/:id', authMiddleware, _controller.delete);

export default router;
