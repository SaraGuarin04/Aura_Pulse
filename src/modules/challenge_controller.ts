import { Request, Response } from 'express';
import { ChallengesService } from './challenge_service';
import { string } from 'zod';

export class ChallengesController {
  private _service = new ChallengesService();

  getChallenges = async (_req: Request, res: Response) => {
    try {
      const data = await this._service.listAllChallenges();
      res.status(200).json(data);
    } catch (e: any) {
      res.status(500).json({ error: "Error al obtener retos" });
    }
  }

  postChallenge = async (req: Request, res: Response) => {
    try {
      if (!req.body.name || !req.body.pointsReward) {
        return res.status(400).json({ error: "Faltan campos obligatorios: name y pointsReward" });
      }
      const result = await this._service.createNewChallenge(req.body);
      res.status(201).json(result);
    } catch (e: any) {
      res.status(400).json({ error: e.message || "Error al crear reto" });
    }
  }

  updateChallenge = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await this._service.updateChallenge(id as string, req.body);
      res.status(200).json(result);
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Error al actualizar reto" });
    }
  }

  deleteChallenge = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await this._service.deleteChallenge(id as string);
      res.status(200).json({ message: "Reto eliminado", result });
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Error al eliminar reto" });
    }
  }
}