import JWT from 'jsonwebtoken';
import { IUser } from '../database/db';
export const JWT_SECRET = "Very_Secret";

export function signJWTToken(user: IUser){
    return JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);
}

export function decodeJWTToken(token: string){
    return JWT.verify(token, JWT_SECRET);
}