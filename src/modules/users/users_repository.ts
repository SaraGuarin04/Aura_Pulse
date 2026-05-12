import { getDb } from "../../config/database";
import { ObjectId } from "mongodb"; // Necesitamos esto para buscar por ID

export class UsersRepository {
    private collection(){
        return getDb().collection('users')
    }

    async create(data:any){
        const result = await this.collection().insertOne(data);
        return { _id: result.insertedId, ...data }  
    }

    async findAllUsers(){
        return this.collection().find().toArray();
    }

    async findByEmail(email: string){
        return this.collection().findOne({email});
    }


    async findById(id: string) {
        
        return await this.collection().findOne({ _id: new ObjectId(id) });
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