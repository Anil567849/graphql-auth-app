import { createHmac, randomBytes } from "node:crypto";

export function generateHash(salt: string, password: string){
    return createHmac("sha256", salt)
      .update(password)
      .digest("hex");
}

export function generateSalt(){
    return randomBytes(32).toString("hex");
}