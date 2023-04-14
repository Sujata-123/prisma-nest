import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AddressController } from './address/address.controller';
import { AddressService } from './address/address.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [UserController, AddressController],
  providers: [UserService, AddressService, PrismaService],
})
export class AppModule {}