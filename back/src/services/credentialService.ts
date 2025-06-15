import ICredential from "../interfaces/ICredential";

const credentialsDB: ICredential[] = [
  { id: 1, username: "usuario1", password: "pass123" },
  { id: 2, username: "usuario2", password: "clave456" },
  { id: 3, username: "usuario3", password: "secreto789" },
];
let credentialId = 4;
export const createCredential = async (username: string, password: string): Promise<number> => {
 const newCredential: ICredential = {
    id: credentialId,
    username,
    password,
 };
 credentialId++;
 credentialsDB.push(newCredential);
 return newCredential.id;
};

export const validateCredential = async (username: string, password: string): Promise<number>=> {
  const foundCredential = credentialsDB.find((credential) => credential.username == username);
  
  if (!foundCredential) throw new Error("No existe el username ingresado");
  if (foundCredential.password != password) throw new Error("Contraseña incorrecta");
  return foundCredential.id;
};
