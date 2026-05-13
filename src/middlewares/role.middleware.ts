import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: any, res: Response, next: NextFunction) => {

  if (req.user && req.user.role === "ADMIN") {
    next();
  } else {
    res.status(403).json({ message: "Acceso denegado: Se requiere rol de Administrador" });
  }
};
