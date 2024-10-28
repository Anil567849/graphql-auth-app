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
exports.JWT_SECRET = void 0;
const db_1 = require("../database/db");
const generateHash_1 = require("../utils/generateHash");
const jwt_1 = require("../utils/jwt");
exports.JWT_SECRET = "Very_Secret";
class UserService {
    static createUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password } = payload;
            const salt = (0, generateHash_1.generateSalt)();
            const hashedPassword = (0, generateHash_1.generateHash)(salt, password);
            return yield (0, db_1.save)(firstName, lastName, email, salt, hashedPassword);
        });
    }
    static getUserToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const user = yield (0, db_1.getUserByEmail)(email);
            if (!user)
                throw new Error("user not found");
            const userSalt = user.salt;
            const usersHashPassword = (0, generateHash_1.generateHash)(userSalt, password);
            if (usersHashPassword !== user.password)
                throw new Error("Incorrect Password");
            const token = (0, jwt_1.signJWTToken)(user);
            return token;
        });
    }
}
exports.default = UserService;
