import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { Request } from 'express';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   *
   * @param {Request} request Lista de parámetros para filtrar
   * @returns {User[]} Devuelve la lista de usuarios
   */
  @Get()
  @ApiOperation({ summary: 'Obtener lista de usuarios' })
  @ApiResponse({
    status: 201,
    description: 'Lista de usuarios',
    type: User,
  })
  findAll(@Req() request: Request): Promise<User[]> {
    console.log(request.query);
    return this.usersService.findAll(request.query);
  }

  /**
   *
   * @param {userId} id de usuario
   * @returns {User} Devuelve el usuario
   */
  @Get(':userId')
  @ApiOperation({ summary: 'Obtener usuario' })
  @ApiResponse({
    status: 201,
    description: 'Datos de usuario',
    type: User,
  })
  find(@Param('userId') userId: string): Promise<User> {
    return this.usersService.find(userId);
  }

  /**
   *
   * @param {newUser} datos del usuario
   * @returns {User} datos del usuario creado
   */
  @Post()
  @ApiOperation({ summary: 'Crear usuario' })
  @ApiResponse({
    status: 201,
    description: 'Datos de usuario',
    type: User,
  })
  create(@Body() newUser: UserDto): Promise<User> {
    return this.usersService.create(newUser);
  }

  /**
   *
   * @param {userId} id de usuario
   * @returns {User} usuario eliminado
   */
  @Delete(':userId')
  @ApiOperation({ summary: 'Eliminar usuario' })
  @ApiResponse({
    status: 201,
    description: 'Datos de usuario',
    type: User,
  })
  delete(@Param('userId') userId: string): Promise<User> {
    return this.usersService.delete(userId);
  }

  /**
   *
   * @param {userId} id de usuario a modificar
   * @param {newUser} datos del usuario
   * @returns {User} usuario modificado
   */
  @Put(':userId')
  @ApiOperation({ summary: 'Modificar usuario' })
  @ApiResponse({
    status: 201,
    description: 'Datos de usuario',
    type: User,
  })
  update(
    @Param('userId') userId: string,
    @Body() newUser: UserDto,
  ): Promise<User> {
    return this.usersService.update(userId, newUser);
  }
}
