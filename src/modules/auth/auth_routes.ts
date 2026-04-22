import { Router } from "express";
import { AuthController } from "./auth_controller";


const router = Router();
const _AuthController = new AuthController();

router.post('/register',_AuthController.register);
router.post('/login',_AuthController.login);

export default router;
