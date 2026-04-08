import { getDb } from "../../config/database";

export class RankingRepository {
    async getTopRankings() {
        const db = getDb();
        // Esta "pipeline" suma los puntos de la tabla eco_actions automáticamente
        return await db.collection('eco_actions').aggregate([
            {
                $group: {
                    _id: "$userId",
                    totalAuraPoints: { $sum: "$auraPoints" },
                    actionCount: { $sum: 1 }
                }
            },
            { $sort: { totalAuraPoints: -1 } }, // De mayor a menor
            { $limit: 10 } // Solo el Top 10
        ]).toArray();
    }
}