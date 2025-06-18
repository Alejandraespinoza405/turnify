import { Request, Response } from "express";
import { createUser, getAllUsersService, getUserByIdService, loginUserService } from "../services/userService";
import { IUserResponseDTO } from "../dtos/IUserDTO";


export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users: IUserResponseDTO[] = await getAllUsersService();
    res.status(200).json(users);
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
    res.status(200).json(user);
  } catch (error: unknown) {
     if (error instanceof Error && error.message == 'User Not Found') {
       res.status(404).json({
      message: error.message,
    });
     }
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown Error',
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const user: IUserResponseDTO = await createUser(req.body);
    res.status(200).json(user);
  } catch (error: unknown) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown Error',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user: IUserResponseDTO = await loginUserService(username, password);
    res.status(200).json({
      login: true,
      user,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown Error',
    });
  }
};