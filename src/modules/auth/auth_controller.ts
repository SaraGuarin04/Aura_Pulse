import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth_service";

export class AuthController {
    private _AuthService = new AuthService();

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this._AuthService.register(req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error)
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this._AuthService.login(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    }

    getProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
        
            const userId = (req as any).user?.sub; 

            if (!userId) {
                return res.status(401).json({ message: "No se encontró el ID en el token (sub)" });
        }

            const result = await this._AuthService.getProfile(userId);
            res.status(200).json(result);
        }catch (error) {
         next(error);
    }
}

    updatePassword = async (req: Request, res: Response, next: NextFunction) => {
            try {
                const userId = (req as any).user?.sub; // Cambiado de .id a .sub
                const { newPassword } = req.body;

            if (!userId) throw new Error("Sesión inválida");

                const result = await this._AuthService.updatePassword(userId, newPassword);
                res.status(200).json(result);
            } catch (error) {
                next(error);
    }
}

    deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).user?.sub; // Cambiado de .id a .sub
        
            if (!userId) throw new Error("Sesión inválida");

                const result = await this._AuthService.deleteAccount(userId);
                res.status(200).json({ message: "Cuenta eliminada", result });
        } catch (error) {
            next(error);
    }
}
}