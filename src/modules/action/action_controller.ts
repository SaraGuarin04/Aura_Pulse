import { Request, Response } from "express";
import { ActionService } from "./action_service";

export class ActionController {
    private _EcoActionService = new ActionService();

    create = async (req: Request, res: Response) => {
    try {
    
        const userIdFromBody = req.body.userId;
        const userPayload = (req as any).user;
    
        const userIdFromToken = userPayload?.id || userPayload?._id || userPayload?.sub;
        
        const userId = userIdFromBody || userIdFromToken;

        if (!userId) {
            // Si después de buscar en todo lado no hay ID, ahí sí lanzamos error
            return res.status(401).json({ error: "ID de usuario no proporcionado o token inválido" });
        }

        // 2. Limpiamos el body para no enviar el userId duplicado al servicio
        const { userId: _, ...actionData } = req.body; 
        
        const result = await this._EcoActionService.registerAction(userId, actionData);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Error al crear la acción" });
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
