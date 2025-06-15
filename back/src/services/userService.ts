import { IUserRegisterDTO, IUserResponseDTO } from "../dtos/IUserDTO";
import IUser from "../interfaces/IUser";
import { createCredential } from "./credentialService";

const usersDB: IUser[] = [
    {
    id: 1,
    name: "Ana Gomez",
    email: "ana.gomez@email.com",
    birthdate: new Date("1985-10-22"),
    nDni: 87654321,
    credentialsId: 1,
  },
  {
    id: 2,
    name: "Carlos Díaz",
    email: "carlos.diaz@email.com",
    birthdate: new Date("1993-03-10"),
    nDni: 11223344,
    credentialsId: 2,
  },
];
let userId = 3;

export const getAllUsersService = async (): Promise<IUserResponseDTO[]> => {
    return usersDB.map((user) => ({
      id: user.id,
      name: user.name,
      birthdate: user.birthdate,
      email: user.email,
      nDni: user.nDni,
    }));
};

export const getUserByIdService = async (id: number): Promise<IUserResponseDTO> => {
    const foundUser: IUser | undefined = usersDB.find((user) => user.id == id);
    if (!foundUser) throw new Error("User Not Found");
    return  {
      id: foundUser.id,
      name: foundUser.name,
      birthdate: foundUser.birthdate,
      email: foundUser.email,
      nDni: foundUser.nDni,
    };
};

export const createUser = async (userDTO: IUserRegisterDTO): Promise<IUserResponseDTO> => {
  const newCredentialId = await createCredential(userDTO.username, userDTO.password);

  const newUser: IUser = {
    id: userId,
    name: userDTO.name,
    email: userDTO.email,
    birthdate: userDTO.birthdate,
    nDni: userDTO.nDni,
    credentialsId: newCredentialId,
  };
  userId++;
  usersDB.push(newUser);
  return  {
      id: newUser.id,
      name: newUser.name,
      birthdate: newUser.birthdate,
      email: newUser.email,
      nDni: newUser.nDni,
    };
};