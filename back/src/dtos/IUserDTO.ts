import { Appointment } from "../entities/Appointment";
import { UserRole } from "../entities/User";

export interface IUserResponseDTO {
    id: number;
    name: string;
    email: string;
    birthdate: Date;
    nDni: number;
    role: UserRole;
    appointments: Appointment[];
}

export interface IUserRegisterDTO {
    name: string;
    email: string;
    birthdate: Date;
    nDni: number;
    username: string;
    password: string;
}