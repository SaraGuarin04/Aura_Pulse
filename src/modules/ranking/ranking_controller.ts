import { Request, Response } from "express";
import { RankingService } from "./ranking_service";

const rankingService = new RankingService();

export const getRanking = async (_req: Request, res: Response) => {
    try {
        const leaderboard = await rankingService.getGlobalLeaderboard();
        res.status(200).json({
            success: true,
            data: leaderboard
        });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el ranking" });
    }
};