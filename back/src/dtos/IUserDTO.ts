export interface IUserResponseDTO {
    id: number;
    name: string;
    email: string;
    birthdate: Date;
    nDni: number;
}

export interface IUserRegisterDTO {
    name: string;
    email: string;
    birthdate: Date;
    nDni: number;
    username: string;
    password: string;
}