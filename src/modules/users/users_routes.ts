import { Router } from "express";
import { UsersController } from "./users_controllers";
import { createUserSchema } from "./users_schema";
import { validate } from "../../middlewares/validate.middleware";
import { isAdmin } from "../../middlewares/role.middlewares";
import { authMiddleware } from "../../middlewares/auth.middlewares";

const router = Router();
const _UsersController = new UsersController();

/**
 * @openapi
 * /users/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: "Registrar usuario"
 *     description: "Crea un nuevo usuario dentro del sistema ecológico para participar en retos, acciones sostenibles y logros ambientales."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sara Guarín"
 *               email:
 *                 type: string
 *                 example: "sara@test.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               avatar:
 *                 type: string
 *                 example: "https://api.dicebear.com/9.x/lorelei/svg"
 *               points:
 *                 type: number
 *                 example: 120
 *     responses:
 *       201:
 *         description: "Usuario registrado correctamente"
 *       400:
 *         description: "Datos inválidos o usuario ya existente"
 */
router.post('/register', validate(createUserSchema), _UsersController.register);

/**
 * @openapi
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: "Obtener usuarios"
 *     description: "Retorna la lista de usuarios registrados en el sistema ecológico."
 *     responses:
 *       200:
 *         description: "Usuarios obtenidos correctamente"
 */
router.get('/', authMiddleware, isAdmin, _UsersController.findAllUsers);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: "Obtener usuario por ID"
 *     description: "Retorna la información de un usuario específico."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID del usuario"
 *     responses:
 *       200:
 *         description: "Usuario encontrado correctamente"
 *       404:
 *         description: "Usuario no encontrado"
 */
router.get('/:id', authMiddleware, isAdmin, _UsersController.findOneUser);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: "Actualizar usuario"
 *     description: "Actualiza la información de un usuario dentro del sistema ecológico."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID del usuario"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sara Camila"
 *               email:
 *                 type: string
 *                 example: "sara@email.com"
 *               avatar:
 *                 type: string
 *                 example: "https://api.dicebear.com/9.x/lorelei/svg"
 *               points:
 *                 type: number
 *                 example: 250
 *     responses:
 *       200:
 *         description: "Usuario actualizado correctamente"
 *       404:
 *         description: "Usuario no encontrado"
 */
router.put('/:id', authMiddleware, _UsersController.updateUser);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: "Eliminar usuario"
 *     description: "Elimina un usuario del sistema ecológico."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID del usuario"
 *     responses:
 *       200:
 *         description: "Usuario eliminado correctamente"
 *       404:
 *         description: "Usuario no encontrado"
 */
router.delete('/:id', authMiddleware, isAdmin, _UsersController.deleteUser);

export default router;
