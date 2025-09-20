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

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(@Req() request: Request) {
    return this.usersService.findAll(request.query);
  }

  @Get(':userId')
  find(@Param('userId') userId: string) {
    return this.usersService.find(userId);
  }

  @Post()
  create(@Body() body) {
    const user: any = body;
    return this.usersService.create(user);
  }

  @Delete(':userId')
  delete(@Param('userId') userId: string) {
    return this.usersService.delete(userId);
  }

  @Put(':userId')
  update(@Param("userId") userId: string, @Body() body){
    const user: any = body;
    return this.usersService.update(userId, user);
  }
}
