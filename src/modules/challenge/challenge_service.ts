import { ChallengesRepository } from "./challenge_repository";
import { Challenge } from "./challenge_model";
import { ObjectId } from "mongodb"; 

export class ChallengesService {
  private repository = new ChallengesRepository();

  async listAllChallenges() {
    return await this.repository.getAll();
  }

  async getChallengeById(id: string) {
    if (!ObjectId.isValid(id)) throw new Error("ID de reto inválido");
    return await this.repository.findById(id);
  }

  async createNewChallenge(data: any) {
    const newChallenge: Challenge = {
      ...data,
      pointsReward: Number(data.pointsReward) || 0,
      createdAt: new Date()
    };
    return await this.repository.save(newChallenge);
  }

  async updateChallenge(id: string, data: any) {
    if (!ObjectId.isValid(id)) throw new Error("ID de reto inválido para actualizar");
    
    if (data.pointsReward) {
        data.pointsReward = Number(data.pointsReward);
    }
    
    return await this.repository.update(id, data);
  }

  async deleteChallenge(id: string) {
    if (!ObjectId.isValid(id)) throw new Error("ID de reto inválido para eliminar");
    return await this.repository.delete(id);
  }
}