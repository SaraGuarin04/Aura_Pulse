import { Router } from 'express';
import { ChallengesController } from './challenge_controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();
const controller = new ChallengesController();

/**
 * @openapi
 * /challenges:
 *   get:
 *     tags:
 *       - Challenges
 *     summary: "Obtener retos ecológicos"
 *     description: "Retorna la lista de retos ecológicos disponibles para los usuarios del sistema."
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "Listado de retos obtenido correctamente"
 *       401:
 *         description: "No autorizado"
 */
router.get('/', authMiddleware, controller.getChallenges);

/**
 * @openapi
 * /challenges:
 *   post:
 *     tags:
 *       - Challenges
 *     summary: "Crear reto ecológico"
 *     description: "Permite crear un nuevo reto ecológico relacionado con acciones sostenibles y cuidado del medio ambiente."
 *     security:
 *       - bearerAuth: []
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
 *                 example: "Reducir uso de plástico"
 *               description:
 *                 type: string
 *                 example: "Evitar el uso de botellas plásticas durante una semana."
 *               points:
 *                 type: number
 *                 example: 50
 *               difficulty:
 *                 type: string
 *                 example: "medium"
 *     responses:
 *       201:
 *         description: "Reto ecológico creado correctamente"
 *       400:
 *         description: "Datos inválidos"
 *       401:
 *         description: "No autorizado"
 */
router.post('/', authMiddleware, controller.postChallenge);

/**
 * @openapi
 * /challenges/{id}:
 *   put:
 *     tags:
 *       - Challenges
 *     summary: "Actualizar reto ecológico"
 *     description: "Actualiza la información de un reto ecológico existente."
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID del reto ecológico"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Ahorrar energía en casa"
 *               description:
 *                 type: string
 *                 example: "Desconectar dispositivos electrónicos cuando no se usen."
 *               points:
 *                 type: number
 *                 example: 75
 *               difficulty:
 *                 type: string
 *                 example: "hard"
 *     responses:
 *       200:
 *         description: "Reto ecológico actualizado correctamente"
 *       401:
 *         description: "No autorizado"
 *       404:
 *         description: "Reto no encontrado"
 */
router.put('/:id', authMiddleware, controller.updateChallenge);

/**
 * @openapi
 * /challenges/{id}:
 *   delete:
 *     tags:
 *       - Challenges
 *     summary: "Eliminar reto ecológico"
 *     description: "Elimina un reto ecológico del sistema."
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID del reto ecológico"
 *     responses:
 *       200:
 *         description: "Reto ecológico eliminado correctamente"
 *       401:
 *         description: "No autorizado"
 *       404:
 *         description: "Reto no encontrado"
 */
router.delete('/:id', authMiddleware, controller.deleteChallenge);

export default router;
