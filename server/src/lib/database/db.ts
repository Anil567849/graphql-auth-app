import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function save(firstName: string, lastName: string, email: string, password: string){
    await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password,
            salt: 'random_salt'
        }
    })
    return true;
}