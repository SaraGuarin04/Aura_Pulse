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
    if (!ObjectId.isValid(id)) {
        throw new Error("ID de logro inválido");
    }
    return await this.repository.findById(id);
  }

  async grantAchievement(data: { userId: string, name: string, description: string, icon: string }) {
    // 1. Validar que el userId sea correcto
    if (!data.userId || !ObjectId.isValid(data.userId)) {
      throw new Error("Se requiere un userId válido para otorgar un logro");
    }

    const existingAchievements = await this.repository.getByUser(data.userId);
    const alreadyHasIt = existingAchievements.find(a => a.name === data.name);

    if (alreadyHasIt) {
      throw new Error(`El usuario ya posee el logro: ${data.name}`);
    }

    const newAchievement: Achievement = {
      name: data.name,
      description: data.description,
      icon: data.icon,
      userId: new ObjectId(data.userId),
      unlockedAt: new Date()
    };

    return await this.repository.save(newAchievement);
  }

  async update(id: string, data: any) {
    if (!ObjectId.isValid(id)) {
        throw new Error("ID de logro inválido para actualizar");
    }
  
    if (data.userId) {
        data.userId = new ObjectId(data.userId);
    }

    return await this.repository.update(id, data);
  }

  async delete(id: string) {
    if (!ObjectId.isValid(id)) {
        throw new Error("ID de logro inválido para eliminar");
    }
    return await this.repository.delete(id);
  }
}
