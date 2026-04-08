import { RankingRepository } from "./ranking_repository";

export class RankingService {
    private repository = new RankingRepository();

    async getGlobalLeaderboard() {
        const rankings = await this.repository.getTopRankings();
        return rankings.map(item => ({
            userId: item._id,
            totalPoints: item.totalAuraPoints,
            totalActions: item.actionCount
        }));
    }
}