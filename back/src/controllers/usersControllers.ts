import { Request, Response } from "express";
import { createUser, getAllUsersService, getUserByIdService } from "../services/userService";
import { IUserResponseDTO } from "../dtos/IUserDTO";
import { validateCredential } from "../services/credentialService";


export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users: IUserResponseDTO[] = await getAllUsersService();
    res.status(200).json({
      data: users,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown Error',
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user: IUserResponseDTO = await getUserByIdService(Number(id));
    res.status(200).json({
      data: user,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown Error',
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const user: IUserResponseDTO = await createUser(req.body);
    res.status(200).json({
      data: user,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown Error',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const credentialId: number = await validateCredential(username, password);
    res.status(200).json({
      data: credentialId,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown Error',
    });
  }
};