import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(@Query('order') order: string) {
    let params: string[] = [];

    if (order !== undefined) {
      params.push(`'${order}'`);
    }
    return this.usersService.findAll(params);
  }

  @Get(':userId')
  find(@Param('userId') userId: string) {
    return this.usersService.find(userId);
  }
}
