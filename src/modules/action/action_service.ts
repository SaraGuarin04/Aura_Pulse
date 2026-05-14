import { ActionRepository } from "./action_repository";
import { Actiondocument } from "./action_model";
import { ObjectId } from "mongodb"; 

export class ActionService {

    private repository = new ActionRepository();

    async registerAction(userId: string, data: any) {

        if (!ObjectId.isValid(userId)) {
            throw new Error("El ID de usuario proporcionado no es válido para MongoDB");
        }

        const points = (data.value || 0) * 10; 

        const newAction: Actiondocument = {
            title: data.title,
            category: data.category,
            description: data.description,
            value: data.value,
            userId: new ObjectId(userId), 
            auraPoints: points,
            createdAT: new Date()
        };

        return await this.repository.create(newAction);
    }

    async findAll() {
         return await this.repository.findAll();
    }

    async findOne(id: string) {

        if (!ObjectId.isValid(id)) throw new Error("ID de acción inválido");
        return await this.repository.findById(id);
    }

    async updateAction(id: string, data: any) {

        if (!ObjectId.isValid(id)) throw new Error("ID de acción inválido para actualizar");
        if (data.value !== undefined) {
            data.auraPoints = data.value * 10;
        }
        return await this.repository.update(id, data);
    }

    async deleteAction(id: string) {

        if (!ObjectId.isValid(id)) throw new Error("ID de acción inválido para eliminar");
        return await this.repository.delete(id);
    }
}
