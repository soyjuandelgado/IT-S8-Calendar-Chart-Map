import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { Request } from 'express';
import { UserDto } from './user.dto';
import { User } from './user.class';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(@Req() request: Request): User[] {
    return this.usersService.findAll(request.query);
  }

  @Get(':userId')
  find(@Param('userId') userId: string): User {
    return this.usersService.find(userId);
  }

  @Post()
  create(@Body() newUser: UserDto): User {
    return this.usersService.create(newUser);
  }

  @Delete(':userId')
  delete(@Param('userId') userId: string): User {
    return this.usersService.delete(userId);
  }

  @Put(':userId')
  update(@Param('userId') userId: string, @Body() newUser: UserDto): User {
    return this.usersService.update(userId, newUser);
  }
}
