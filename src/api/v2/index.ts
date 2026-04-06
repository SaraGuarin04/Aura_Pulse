import { Router } from "express";
import UserRouter from "../../modules/users/users_routes";
import AuthRouter from "../../modules/auth/auth_routes";
import ActionRouter from "../../modules/action/action_routers";

const router = Router();


router.use('/auth', AuthRouter);
router.use('/users', UserRouter);
router.use('/action', ActionRouter);

export default router;
