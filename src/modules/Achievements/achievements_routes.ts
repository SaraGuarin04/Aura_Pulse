import { Router } from 'express';
import { AchievementsController } from './achievements_controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();
const controller = new AchievementsController();

/**
 * @openapi
 * /achievements:
 *   post:
 *     tags:
 *       - Achievements
 *     summary: "Crear logro ecológico"
 *     description: "Permite crear un nuevo logro relacionado con acciones sostenibles y cuidado ambiental."
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - userId
 *             properties:
 *                name:
 *                   type: string
 *                   example: "Héroe del Agua"
 *                description:
 *                   type: string
 *                   example: "Has ahorrado más de 100 litros de agua este mes."
 *                icon:
 *                   type: string
 *                   example: "💧"
 *                 userId:
 *                   type: string
 *                   example: "65f1a2b3c4d5e6f7a8b9c0d1"
 *     responses:
 *       201:
 *         description: "Logro ecológico creado correctamente"
 *       400:
 *         description: "Datos inválidos"
 *       401:
 *         description: "No autorizado"
 */
router.post('/', authMiddleware, controller.create);

/**
 * @openapi
 * /achievements/my:
 *   get:
 *     tags:
 *       - Achievements
 *     summary: "Obtener mis logros ecológicos"
 *     description: "Retorna los logros obtenidos por el usuario autenticado dentro del sistema ecológico."
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "Logros obtenidos correctamente"
 *       401:
 *         description: "No autorizado"
 */
router.get('/my', authMiddleware, controller.getMine);

/**
 * @openapi
 * /achievements/{id}:
 *   get:
 *     tags:
 *       - Achievements
 *     summary: "Obtener logro ecológico por ID"
 *     description: "Retorna la información de un logro ecológico específico."
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID del logro ecológico"
 *     responses:
 *       200:
 *         description: "Logro encontrado correctamente"
 *       401:
 *         description: "No autorizado"
 *       404:
 *         description: "Logro no encontrado"
 */
router.get('/:id', authMiddleware, controller.getOne);

/**
 * @openapi
 * /achievements/{id}:
 *   put:
 *     tags:
 *       - Achievements
 *     summary: "Actualizar logro ecológico"
 *     description: "Actualiza la información de un logro ecológico existente."
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID del logro ecológico"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Protector ambiental"
 *               description:
 *                 type: string
 *                 example: "Completar 20 acciones sostenibles."
 *               points:
 *                 type: number
 *                 example: 150
 *               badge:
 *                 type: string
 *                 example: "♻️"
 *     responses:
 *       200:
 *         description: "Logro ecológico actualizado correctamente"
 *       401:
 *         description: "No autorizado"
 *       404:
 *         description: "Logro no encontrado"
 */
router.put('/:id', authMiddleware, controller.update);

/**
 * @openapi
 * /achievements/{id}:
 *   delete:
 *     tags:
 *       - Achievements
 *     summary: "Eliminar logro ecológico"
 *     description: "Elimina un logro ecológico del sistema."
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID del logro ecológico"
 *     responses:
 *       200:
 *         description: "Logro ecológico eliminado correctamente"
 *       401:
 *         description: "No autorizado"
 *       404:
 *         description: "Logro no encontrado"
 */
router.delete('/:id', authMiddleware, controller.delete);

export default router;
