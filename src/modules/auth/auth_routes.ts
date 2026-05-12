import { Router } from "express";
import { AuthController } from "./auth_controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const _AuthController = new AuthController();

/**
 * @openapi
 * /api/v2/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: "Registrar usuario ecológico"
 *     description: "Permite crear una cuenta para que los usuarios participen en acciones sostenibles, retos ambientales y logros ecológicos dentro de la plataforma."
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
 *                 example: "Sara Guarin"
 *               email:
 *                 type: string
 *                 example: "sarag@test.com"
 *               password:
 *                 type: string
 *                 example: "12345678"
 *               avatar:
 *                 type: string
 *                 example: "https://api.dicebear.com/9.x/lorelei/svg"
 *     responses:
 *       201:
 *         description: "Usuario registrado correctamente"
 *       400:
 *         description: "Datos inválidos o usuario ya existente"
 */
router.post('/register', _AuthController.register);

/**
 * @openapi
 * /api/v2//auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: "Iniciar sesión"
 *     description: "Autentica al usuario y genera un token JWT para acceder a las funcionalidades del sistema ecológico."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "sarag@test.com"
 *               password:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: "Inicio de sesión exitoso"
 *       401:
 *         description: "Credenciales inválidas"
 */
router.post('/login', _AuthController.login);

/**
 * @openapi
 * /api/v2/auth/profile:
 *   get:
 *     tags:
 *       - Auth
 *     summary: "Obtener perfil ecológico"
 *     description: "Obtiene la información del usuario autenticado, incluyendo su participación en el sistema ecológico."
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "Perfil obtenido correctamente"
 *       401:
 *         description: "Token inválido o no autorizado"
 */
router.get('/profile', authMiddleware, _AuthController.getProfile);

/**
 * @openapi
 * /api/v2/auth/update-password:
 *   put:
 *     tags:
 *       - Auth
 *     summary: "Actualizar contraseña"
 *     description: "Permite al usuario autenticado actualizar la contraseña de acceso a su cuenta."
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: "12345678"
 *               newPassword:
 *                 type: string
 *                 example: "NuevaPassword2025"
 *     responses:
 *       200:
 *         description: "Contraseña actualizada correctamente"
 *       400:
 *         description: "Datos inválidos"
 *       401:
 *         description: "No autorizado"
 */
router.put('/update-password', authMiddleware, _AuthController.updatePassword);

/**
 * @openapi
 * /api/v2/auth/delete-account:
 *   delete:
 *     tags:
 *       - Auth
 *     summary: "Eliminar cuenta"
 *     description: "Elimina permanentemente la cuenta del usuario y toda su participación en el sistema ecológico."
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "Cuenta eliminada correctamente"
 *       401:
 *         description: "No autorizado"
 *       404:
 *         description: "Usuario no encontrado"
 */
router.delete('/delete-account', authMiddleware, _AuthController.deleteAccount);

export default router;