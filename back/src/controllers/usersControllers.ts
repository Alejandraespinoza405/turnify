import { Request, Response } from "express";
import { createUser, getAllUsersService, getUserByIdService, loginUserService } from "../services/userService";
import { IUserResponseDTO } from "../dtos/IUserDTO";
import { generateToken } from "../helpers/jwt";

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
  console.log(req.body);
  try {
    const { username, password } = req.body;
    const user: IUserResponseDTO = await loginUserService(username, password);

    const token = generateToken(user.id, user.role);

    res.status(200).json({
      login: true,
      token,
      user,
    });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown Error',
    });
  }
};