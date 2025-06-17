"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserByIdService = exports.getAllUsersService = void 0;
const credentialService_1 = require("./credentialService");
const usersDB = [
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
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    return usersDB.map((user) => ({
        id: user.id,
        name: user.name,
        birthdate: user.birthdate,
        email: user.email,
        nDni: user.nDni,
    }));
});
exports.getAllUsersService = getAllUsersService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = usersDB.find((user) => user.id == id);
    if (!foundUser)
        throw new Error("User Not Found");
    return {
        id: foundUser.id,
        name: foundUser.name,
        birthdate: foundUser.birthdate,
        email: foundUser.email,
        nDni: foundUser.nDni,
    };
});
exports.getUserByIdService = getUserByIdService;
const createUser = (userDTO) => __awaiter(void 0, void 0, void 0, function* () {
    const newCredentialId = yield (0, credentialService_1.createCredential)(userDTO.username, userDTO.password);
    const newUser = {
        id: userId,
        name: userDTO.name,
        email: userDTO.email,
        birthdate: userDTO.birthdate,
        nDni: userDTO.nDni,
        credentialsId: newCredentialId,
    };
    userId++;
    usersDB.push(newUser);
    return {
        id: newUser.id,
        name: newUser.name,
        birthdate: newUser.birthdate,
        email: newUser.email,
        nDni: newUser.nDni,
    };
});
exports.createUser = createUser;
