// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async getUsers(): Promise<User[]> {
    const userAddr= await this.prisma.user.findMany({
      include: { addresses: true },
    });
    return userAddr

    // return userAddr.map((userWithAddress) => {
    //     const { addresses, ...user } = userWithAddress;
    //     return {
    //       ...user,
    //       addresses: addresses.map((address) => {
    //         const { userId, ...rest } = address;
    //         return rest;
    //       }),
    //     };
    //   });
    
  }

  async getUserById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { addresses: true },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    // console.log("----------------", String(email));
    return this.prisma.user.findUnique({
      where: { email:String(email) },
      
    });
  }
  

  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
      include: { addresses: true },
    });
  }

  async deleteUser(id: number): Promise<User> {
    // return this.prisma.user.delete({
    //   where: { id },
    //   include: { addresses: true },
    // });

    //  deleting the addresses first from Address table, then deleting the user from user table
        await this.prisma.address.deleteMany({ where: { userId: id } });

        return this.prisma.user.delete({ where: { id }, include: { addresses: true } })

  }
}
