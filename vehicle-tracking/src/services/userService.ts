import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const createUser = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { name, email, password: hashedPassword }
  });
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const findUserById = async (id: number) => {
  return prisma.user.findUnique({ where: { id } });
};

export const updateUser = async (id: number, data: { name?: string; email?: string; password?: string }) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return prisma.user.update({
    where: { id },
    data
  });
};

export const deleteUser = async (id: number) => {
  return prisma.user.delete({ where: { id } });
};
