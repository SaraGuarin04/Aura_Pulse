import { getDb } from "../../config/database";
import { Challenge } from "./challenge_model";
import { ObjectId } from "mongodb";

export class ChallengesRepository {
  private collection() {
    return getDb().collection<Challenge>('challenges');
  }

  async getAll() {
    return await this.collection().find().toArray();
  }

  async findById(id: string) {
    return await this.collection().findOne({ _id: new ObjectId(id) });
  }

  async save(challenge: Challenge) {
    return await this.collection().insertOne(challenge);
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