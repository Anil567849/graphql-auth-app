import { getUserByEmail, save } from "../database/db";
import { generateHash, generateSalt } from "../utils/generateHash";
import JWT from 'jsonwebtoken';
import { signJWTToken } from "../utils/jwt";

export const JWT_SECRET = "Very_Secret";

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface GetUserTokenPayload {
  email: string;
  password: string;
}

export default class UserService {

  public static async createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password } = payload;

    const salt = generateSalt();
    const hashedPassword = generateHash(salt, password);

    return await save(firstName, lastName, email, salt, hashedPassword);
  }

  public static async getUserToken(payload: GetUserTokenPayload) {
    const { email, password } = payload;
    const user = await getUserByEmail(email);
    if (!user) throw new Error("user not found");

    const userSalt = user.salt;
    const usersHashPassword = generateHash(userSalt, password);

    if (usersHashPassword !== user.password)
      throw new Error("Incorrect Password");

    const token = signJWTToken(user);
    return token;
  }

}