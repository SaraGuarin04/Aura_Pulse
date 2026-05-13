import { Request, Response } from "express";
import { ActionService } from "./action_service";
import { AuthRequest } from "../shared/types/auth-request";
import { ObjectId } from "mongodb";

export class ActionController {
    private _EcoActionService = new ActionService();
    
    create = async (req: AuthRequest, res: Response) => {
        try {

            const userId = req.user?.sub;

            if (!userId) {
                return res.status(401).json({ 
                    error: "ID de usuario (sub) no encontrado en el token",
                    user_data_received: req.user // Esto te mostrará en Swagger si req.user llegó vacío
                });
            }

            const result = await this._EcoActionService.registerAction(userId, req.body);
            
            return res.status(201).json(result);

        } catch (error: any) {
            return res.status(400).json({ error: error.message || "Error al crear la acción" });
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
