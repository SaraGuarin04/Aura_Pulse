import { getDb } from "../../config/database";
import { Achievement } from "./achievements_model";
import { ObjectId } from "mongodb";

export class AchievementsRepository {
  private collection() {
    return getDb().collection<Achievement>('achievements');
  }

    async getByUser(userId: string) {
    return await this.collection().find({ userId: new ObjectId(userId) }).toArray();
  }

  async findById(id: string) {
    return await this.collection().findOne({ _id: new ObjectId(id) });
  }

  async save(achievement: Achievement) {
    return await this.collection().insertOne(achievement);
  }

  async update(id: string, data: any) {
    return await this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
  }

  async delete(id: string) {
    return await this.collection().deleteOne({ _id: new ObjectId(id) });
  }
}
