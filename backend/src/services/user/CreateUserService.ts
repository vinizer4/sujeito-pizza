import PrismaClient from "@prisma/client";
import prismaCliente from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    if (!email) {
      throw new Error("Email is required");
    }

    const userEmailAlreadyExists = await prismaCliente.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userEmailAlreadyExists) {
      throw new Error("User Email already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaCliente.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
