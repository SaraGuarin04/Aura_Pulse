import { getDb } from "../../config/database";
import { Actiondocument } from "./action_model";
const { ObjectId } = require('mongodb'); // Para consistencia con tu código

export class ActionRepository {
    private collection() {
        return getDb().collection<Actiondocument>('eco_actions');
    }

    async create(data: Actiondocument) {
        const result = await this.collection().insertOne(data);
        return { _id: result.insertedId, ...data };
    }

    async findAll() {
        return await this.collection().find().toArray();
    }

    async findById(id: string) {
        return await this.collection().findOne({ _id: new ObjectId(id) });
    }

    async findByUserId(userId: string) {
        return this.collection().find({ userId: new ObjectId(userId) }).toArray();
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