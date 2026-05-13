import { Request, Response } from "express";
import { ActionService } from "./action_service";
import { ObjectId } from "mongodb";

export class ActionController {
    private _EcoActionService = new ActionService();
    
    create = async (req: Request, res: Response) => {
    try {
        
        const authUser = (req as any).user;

        const userId = authUser?.sub?.toString() || 
                       authUser?.id?.toString() || 
                       req.body.userId?.toString();

        if (!userId) {
            return res.status(401).json({ 
                error: "No se encontró el ID de usuario",
                token_data: authUser // Esto te dirá en Swagger qué hay dentro del token
            });
        }

        const actionData = {
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            value: req.body.value
        };

        const result = await this._EcoActionService.registerAction(userId, actionData);
        
        res.status(201).json(result);
    } catch (error: any) {
        // Si el ObjectId.isValid(userId) del servicio falla, caerá aquí
        res.status(400).json({ error: error.message || "Error al registrar la acción" });
    }
}
    findAll = async (_req: Request, res: Response) => {
        try {
            const result = await this._EcoActionService.findAll();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener acciones" });
        }
    }

    findOne = async (req: Request, res: Response) => {
        try {
            const result = await this._EcoActionService.findOne(req.params.id as string);
            if (!result) return res.status(404).json({ error: "Acción no encontrada" });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener la acción" });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const result = await this._EcoActionService.updateAction(req.params.id as string, req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar" });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const result = await this._EcoActionService.deleteAction(req.params.id as string);
            res.status(200).json({ message: "Acción eliminada", result });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar" });
        }
    }
}
