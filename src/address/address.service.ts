// src/address/address.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Address, Prisma } from '@prisma/client';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async createAddress(
    data: Prisma.AddressCreateInput,
  ): Promise<Address> {
    return this.prisma.address.create({ data });
  }

  async getAddresses(): Promise<Address[]> {
    return this.prisma.address.findMany({
      include: { user: true },
    });
  }
  async getAddressById(id: number): Promise<Address> {
    return this.prisma.address.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async updateAddress(
    id: number,
    data: Prisma.AddressUpdateInput,
    ): Promise<Address> {
    return this.prisma.address.update({
    where: { id },
    data,
    include: { user: true },
    });
    }
    
    async deleteAddress(id: number): Promise<Address> {
        return this.prisma.address.delete({
        where: { id },
        include: { user: true },
        });
    }
}