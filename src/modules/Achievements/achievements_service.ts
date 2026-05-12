import { AchievementsRepository } from "./achievements_repository";
import { Achievement } from "./achievements_model";
import { ObjectId } from "mongodb";

export class AchievementsService {
  private repository = new AchievementsRepository();

  async getMyAchievements(userId: string) {
    if (!ObjectId.isValid(userId)) throw new Error("ID de usuario inválido");
    return await this.repository.getByUser(userId);
  }

  async getById(id: string) {
    if (!ObjectId.isValid(id)) throw new Error("ID de logro inválido");
    return await this.repository.findById(id);
  }

  async grantAchievement(data: any) {
    if (!data.userId || !ObjectId.isValid(data.userId)) {
        throw new Error("Se requiere un userId válido para otorgar un logro");
    }

    const achievement: Achievement = {
      ...data,
      userId: new ObjectId(data.userId),
      unlockedAt: new Date()
    };
    return await this.repository.save(achievement);
  }

  async update(id: string, data: any) {
    if (!ObjectId.isValid(id)) throw new Error("ID inválido");
    return await this.repository.update(id, data);
  }

  async delete(id: string) {
    if (!ObjectId.isValid(id)) throw new Error("ID inválido");
    return await this.repository.delete(id);
  }
}