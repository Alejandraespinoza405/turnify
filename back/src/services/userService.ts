import { AppDataSource, userRepository } from "../config/data-source";
import { IUserRegisterDTO, IUserResponseDTO } from "../dtos/IUserDTO";
import { createCredential, validateCredential } from "./credentialService";
import { USer } from "../entities/User";
import { Credential } from "../entities/Credential";

export const getAllUsersService = async (): Promise<IUserResponseDTO[]> => {
  const users: USer[] = await userRepository.find();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      birthdate: user.birthdate,
      email: user.email,
      nDni: user.nDni,
      role: user.role,
      appointments: user.appointments,
    }));
};

export const getUserByIdService = async (id: number): Promise<IUserResponseDTO> => {
    const foundUser: USer | null = await userRepository.findOne({
      where: {
        id,
      },
      relations: {
        appointments: true,
      }
    });
    if (!foundUser) throw new Error("User Not Found");

    return  {
      id: foundUser.id,
      name: foundUser.name,
      birthdate: foundUser.birthdate,
      email: foundUser.email,
      nDni: foundUser.nDni,
      role: foundUser.role,
      appointments: foundUser.appointments,
    };
};

export const createUser = async (userDTO: IUserRegisterDTO): Promise<IUserResponseDTO> => {
 const resultUser: USer = await AppDataSource.transaction(async (entityManager) => {
  const newCredential: Credential = await createCredential(entityManager, userDTO.username, userDTO.password);

  const newUser: USer = entityManager.create(USer, {
    name: userDTO.name,
    email: userDTO.email,
    birthdate: userDTO.birthdate,
    nDni: userDTO.nDni,
    credentials: newCredential,
  });
  const results = await entityManager.save(USer, newUser);
  return results;
});

  return  {
      id: resultUser.id,
      name: resultUser.name,
      birthdate: resultUser.birthdate,
      email: resultUser.email,
      nDni: resultUser.nDni,
      role: resultUser.role,
      appointments: resultUser.appointments,
    };
};

export const loginUserService = async (username: string, password: string) => {
  const credentialId: number = await validateCredential(username, password);

  const foundUser: USer | null = await userRepository.findOne({
    where: {
      credentials: {
        id: credentialId,
      },
    },
    relations: {
        appointments: true,
      },
  });
  if (!foundUser) {
    throw new Error("User Not Found");
  }

  return {
      id: foundUser.id,
      name: foundUser.name,
      birthdate: foundUser.birthdate,
      email: foundUser.email,
      nDni: foundUser.nDni,
      role: foundUser.role,
      appointments: foundUser.appointments,
  }
};