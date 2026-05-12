import { Request, Response } from "express";
import { UsersService } from "./users_service";

export class UsersController {
    private _UsersService = new UsersService();

    register = async (req: Request, res: Response) => {
        try {
            const result = await this._UsersService.register(req.body);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    findAllUsers = async (req: Request, res: Response) => {
        try {
            const result = await this._UsersService.findAllUsers();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener usuarios" });
        }
    }

    findOneUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await this._UsersService.findOneUser(id as string);
            if (!result) return res.status(404).json({ message: "Usuario no encontrado" });
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message || "Error de servidor" });
        }
    }

    updateUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await this._UsersService.updateUser(id as string, req.body);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message || "Error al actualizar" });
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await this._UsersService.deleteUser(id as string);
            res.status(200).json({ message: "Usuario eliminado con éxito", result });
        } catch (error: any) {
            res.status(500).json({ error: error.message || "Error al eliminar" });
        }
    }
}