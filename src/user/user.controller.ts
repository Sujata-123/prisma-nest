// src/user/user.controller.ts
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
    Req,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { User, Prisma } from '@prisma/client';
  import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
  import { CreateUserDto } from '../dto/create-user.dto';
  import { UpdateUserDto } from '../dto/create-user.dto';

  
  @ApiTags('User')
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Post()
    @ApiResponse({ status: 201, description: 'The user has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Invalid input.'})
    @ApiParam({ name: 'email', type: 'string', description: 'The email of the user.' })
    @ApiParam({ name: 'lastName', type: 'string', description: 'The last name of the user.' })
    @ApiParam({ name: 'firstName', type: 'string', description: 'The first name of the user.' })
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
      const { firstName, lastName, email } = createUserDto;
  
      const existingUser = await this.userService.getUserByEmail(email);
      if (existingUser) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
  
      const data: Prisma.UserCreateInput = {
        firstName,
        lastName,
        email
      };
  
      return this.userService.createUser(data);
    }
  
    @Get()
    @ApiResponse({ status: 200, description: 'Returns all users.'})
    async getUsers(): Promise<User[]> {
      return this.userService.getUsers();
    }
  
    @Get(':id')
    @ApiResponse({ status: 200, description: 'Returns the user with the specified ID.'})
    @ApiResponse({ status: 404, description: 'User not found.'})
    @ApiParam({
        name: 'id',
        description: 'The ID of the user to retrieve',
        type: 'integer',
      })
    async getUserById(@Param('id') id: string): Promise<User> {
      const user = await this.userService.getUserById(Number(id));
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    }
  
    @Put(':id')
    @ApiResponse({ status: 200, description: 'Updates the user with the specified ID.'})
    @ApiResponse({ status: 400, description: 'Invalid input.'})
    @ApiResponse({ status: 404, description: 'User not found.'})
    @ApiParam({ name: 'email', type: 'string', description: 'The email of the user.', required:false })
    @ApiParam({ name: 'lastName', type: 'string', description: 'The last name of the user.', required:false })
    @ApiParam({ name: 'firstName', type: 'string', description: 'The first name of the user.', required:false })
    async updateUser(
      @Param('id') id: string,
      @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        // console.log(req.body);
      const { firstName, lastName, email } = updateUserDto;
      console.log(updateUserDto);
      const existingUser = await this.userService.getUserById(Number(id));
      if (!existingUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      
      console.log("-------_-------",firstName, lastName, email)
      const data: Prisma.UserUpdateInput = {
        firstName,
        lastName,
        email,
      };
  
      return this.userService.updateUser(Number(id), data);
    }
  
    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Deletes the user with the specified ID.'})
    @ApiResponse({ status: 404, description: 'User not found.'})
    async deleteUser(@Param('id') id: string): Promise<User> {
        const existingUser = await this.userService.getUserById(Number(id));
        if (!existingUser) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return this.userService.deleteUser(Number(id));  
    }
}