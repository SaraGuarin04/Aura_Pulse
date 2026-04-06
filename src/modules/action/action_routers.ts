import { Router } from "express";
import { ActionController } from "./action_controller";
import { createActionSchema } from "./action_schema";
import { validate } from "../../middlewares/validate.middleware";

const router = Router();
const _controller = new ActionController();

router.post('/', validate(createActionSchema), _controller.create);

export default router;