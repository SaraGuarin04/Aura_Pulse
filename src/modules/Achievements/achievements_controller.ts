import { Request, Response } from 'express';
import { AchievementsService } from './achievements_service';

export class AchievementsController {
  private _service = new AchievementsService();

  getMine = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.sub; 

      if (!userId) {
        return res.status(401).json({ error: "No se encontró el ID del usuario en el token" });
      }

      const data = await this._service.getMyAchievements(userId);
      res.status(200).json(data);
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Error al obtener logros" });
    }
  }

  getOne = async (req: Request, res: Response) => {
    try {
      const data = await this._service.getById(req.params.id as string);
      if (!data) return res.status(404).json({ error: "Logro no encontrado" });
      res.status(200).json(data);
    } catch (e) {
      res.status(500).json({ error: "Error al obtener el logro" });
    }
  }

  create = async (req: Request, res: Response) => {
    try {
      const data = await this._service.grantAchievement(req.body);
      res.status(201).json(data);
    } catch (e: any) {
      res.status(400).json({ error: e.message || "Error al crear logro" });
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const data = await this._service.update(req.params.id as string, req.body);
      res.status(200).json(data);
    } catch (e) {
      res.status(500).json({ error: "Error al actualizar" });
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const data = await this._service.delete(req.params.id as string);
      res.status(200).json({ message: "Logro eliminado", data });
    } catch (e) {
      res.status(500).json({ error: "Error al eliminar" });
    }
  }
}