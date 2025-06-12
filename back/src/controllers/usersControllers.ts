import { Request, Response } from "express";


export const getAllUsers = async (_req: Request, res: Response) => {
  res.status(200).send("Obtener el listado de todos los usuarios");
};

export const getUserById = async (_req: Request, res: Response) => {
  res.status(200).send("Obtener el detalle de un usuario específico");
};

export const register = async (_req: Request, res: Response) => {
  res.status(201).send("Registro de un nuevo usuario");
};

export const login = async (_req: Request, res: Response) => {
  res.status(200).send("Login del usuario a la aplicación");
};