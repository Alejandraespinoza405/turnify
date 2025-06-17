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
exports.login = exports.register = exports.getUserById = exports.getAllUsers = void 0;
const userService_1 = require("../services/userService");
const credentialService_1 = require("../services/credentialService");
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.getAllUsersService)();
        res.status(200).json({
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Unknown Error',
        });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, userService_1.getUserByIdService)(Number(id));
        res.status(200).json({
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Unknown Error',
        });
    }
});
exports.getUserById = getUserById;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userService_1.createUser)(req.body);
        res.status(200).json({
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Unknown Error',
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const credentialId = yield (0, credentialService_1.validateCredential)(username, password);
        res.status(200).json({
            data: credentialId,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Unknown Error',
        });
    }
});
exports.login = login;
