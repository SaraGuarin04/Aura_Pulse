import { ActionRepository } from "./action_repository";
import { Actiondocument } from "./action_model";
import { ObjectId } from "mongodb"; 
// IMPORTANTE: Asegúrate de que la ruta al AchievementsService sea la correcta
import { AchievementsService } from "../achievements/achievements_service"; 

export class ActionService {
    private repository = new ActionRepository();
    private _achievementService = new AchievementsService();

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

        const result = await this.repository.create(newAction);

        try {
            await this._achievementService.checkAndGrant(userId);
        } catch (error) {
   
            console.error("Error al procesar logros automáticos:", error);
        }

        return result;
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

        const result = await this.repository.update(id, data);

        const action = await this.repository.findById(id);
        if (action) {
            await this._achievementService.checkAndGrant(action.userId.toString());
        }

        return result;
    }

    async deleteAction(id: string) {
        if (!ObjectId.isValid(id)) throw new Error("ID de acción inválido para eliminar");
        return await this.repository.delete(id);
    }
}
