import { Router } from "express";
import { getRanking } from "./ranking_controller";

const router = Router();
router.get("/", getRanking);

export default router;
