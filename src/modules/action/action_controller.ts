import { Request, Response } from "express";
import { ActionService } from "./action_service";

export class ActionController {
    private _EcoActionService = new ActionService();

    create = async (req: Request, res: Response) => {
        const userId = req.body.userId; 
        const result = await this._EcoActionService.registerAction(userId, req.body);
        res.status(201).json(result);
    }
}
