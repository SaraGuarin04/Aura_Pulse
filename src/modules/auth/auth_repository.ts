import { getDb } from "../../config/database";
import { User } from "../users/users_model";
import { ObjectId } from "mongodb";

export class AuthRepository {
    private collection() {
        return getDb().collection<User>('users')
    }

    async findEmail(email: string): Promise<User | null> {
        return this.collection().findOne({ email })
    }

    async findById(id: string): Promise<User | null> {
        return this.collection().findOne({ _id: new ObjectId(id) })
    }

    async create(user: User): Promise<User> {
        const result = await this.collection().insertOne(user)
        return { _id: result.insertedId, ...user }
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