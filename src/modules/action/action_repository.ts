import { getDb } from "../../config/database";
import { Actiondocument } from "./action_model";

export class ActionRepository {
    private collection() {
        return getDb().collection<Actiondocument>('eco_actions');
    }

    async create(data: Actiondocument) {
        const result = await this.collection().insertOne(data);
        return { _id: result.insertedId, ...data };
    }

    async findByUserId(userId: string) {
        return this.collection().find({ userId: new (require('mongodb').ObjectId)(userId) }).toArray();
    }
}