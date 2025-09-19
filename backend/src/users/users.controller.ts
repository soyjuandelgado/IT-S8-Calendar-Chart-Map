import { Controller, Get, Param, Query, Req } from '@nestjs/common';
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
}
