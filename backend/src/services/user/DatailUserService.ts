import { PrismaClient } from "@prisma/client";
import prismaClient from "../../prisma";

 class DatailUserService {
    async execute(user_id: string) {

        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })
        return user;
    }
 }

 export { DatailUserService }