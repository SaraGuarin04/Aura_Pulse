import { ActionRepository } from "./action_repository";
import { Actiondocument } from "./action_model";

export class ActionService {
    private repository = new ActionRepository();

    async registerAction(userId: string, data: any) {
        // 10 puntos por cada unidad de 'value'
        const points = data.value * 10;

        const newAction:  Actiondocument = {
            ...data,
            userId: new (require('mongodb').ObjectId)(userId),
            auraPoints: points,
            createdAt: new Date()
        };

        return this.repository.create(newAction);
    }
}