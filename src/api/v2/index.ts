import { Router } from "express";
import UserRouter from "../../modules/users/users_routes";
import AuthRouter from "../../modules/auth/auth_routes";
import ActionRouter from "../../modules/action/action_routers";
import challengeRoutes from '../../modules/challenge/challenge_routes';
import achievementRoutes from '../../modules/Achievements/achievements_routes';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/users', UserRouter);
router.use('/actions', ActionRouter);
router.use('/challenges', challengeRoutes);
router.use('/achievements', achievementRoutes);

export default router;
