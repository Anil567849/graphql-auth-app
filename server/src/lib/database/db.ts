import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function save(firstName: string, lastName: string | undefined, email: string, salt: string, hashedPassword: string): Promise<string>{
    const data = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            salt,
            password: hashedPassword,
          },
    })
    return (data.id).toString();
}

interface IUser {
    id: string; firstName: string; lastName: string | null; profileImageURL: string | null; email: string; password: string; salt: string; 
}


export async function getUserByEmail(email: string): Promise<IUser | null>{
    return prisma.user.findUnique({ where: { email } });
}

