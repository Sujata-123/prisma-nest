// src/address/address.controller.ts
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { AddressService } from './address.service';
  import { UserService } from '../user/user.service';
  import { Address, Prisma } from '@prisma/client';
  import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
  import { CreateAddressDto, UpdateAddressDto } from '../dto/create-address.dto';
 
  
  @ApiTags('Address')
  @Controller('address')
  export class AddressController {
    constructor(private readonly addressService: AddressService, private readonly userService: UserService) {}
  
    @Post()
    @ApiResponse({ status: 201, description: 'The address has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Invalid input.'})
    @ApiParam({ name: 'userId', type: 'string', description: 'userId of the User for which Address is stored.' })
    @ApiParam({ name: 'street', type: 'string', description: 'Street of the User.' })
    @ApiParam({ name: 'city', type: 'string', description: 'The city of the User.' })
    @ApiParam({ name: 'state', type: 'string', description: 'The state of the User.' })
    @ApiParam({ name: 'zipCode', type: 'string', description: 'The zipCode of the Area.' })
    async createAddress(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
      const { userId, street, city, state, zipCode } = createAddressDto;
  
      const existingUser = await this.userService.getUserById(userId);
      if (!existingUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
  
      const data: Prisma.AddressCreateInput = {
        street,
        city,
        state,
        zipCode,
        user: { connect: { id: userId } },
      };
  
      return this.addressService.createAddress(data);
    }
  
    @Get()
    @ApiResponse({ status: 200, description: 'Returns all addresses.'})
    async getAddresses(): Promise<Address[]> {
      return this.addressService.getAddresses();
    }
  
    @Get(':id')
    @ApiResponse({ status: 200, description: 'Returns the address with the specified ID.'})
    @ApiResponse({ status: 404, description: 'Address not found.'})
    async getAddressById(@Param('id') id: string): Promise<Address> {
      const address = await this.addressService.getAddressById(Number(id));
      if (!address) {
        throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
      }
      return address;
    }
    // @Get(':id')
    // async getAddressById(@Param('id') id: string) {
    //   return await this.addressService.getAddressById(+id);
    // }
    @Put(':id')
    @ApiResponse({ status: 200, description: 'Updates the address with the specified ID.'})
    @ApiResponse({ status: 400, description: 'Invalid input.'})
    @ApiResponse({ status: 404, description: 'Address not found.'})
    async updateAddress(
      @Param('id') id: string,
      @Body() updateAddressDto: UpdateAddressDto,
    ): Promise<Address> {
      const { street, city, state, zipCode } = updateAddressDto;
  
      const existingAddress = await this.addressService.getAddressById(Number(id));
      if (!existingAddress) {
        throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
      }
  
      const data: Prisma.AddressUpdateInput = {
        street,
        city,
        state,
        zipCode,
      };
  
      return this.addressService.updateAddress(Number(id), data);
    }
  
    @Delete(':id')
    @ApiResponse({
status: 200, description: 'Deletes the address with the specified ID.'})
@ApiResponse({ status: 404, description: 'Address not found.'})
async deleteAddress(@Param('id') id: string): Promise<Address> {
const existingAddress = await this.addressService.getAddressById(Number(id));
if (!existingAddress) {
throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
}

return this.addressService.deleteAddress(Number(id));
}
  }
