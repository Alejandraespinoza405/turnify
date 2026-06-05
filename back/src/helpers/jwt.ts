import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";
import { UserRole } from "../entities/User";

export const generateToken = (
  id: number,
  role: UserRole
): string => {
  return jwt.sign(
    {
      id,
      role,
    },
    JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
};