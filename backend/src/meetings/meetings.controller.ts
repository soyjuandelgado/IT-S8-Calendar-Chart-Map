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
import { MeetingsService } from './meetings.service';
import type { Request } from 'express';
import { MeetingDto } from './meeting.dto';
import { Meeting } from './meeting.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('meeting')
@Controller('meetings')
export class MeetingsController {
  constructor(private meetingsService: MeetingsService) {}

  /**
   *
   * @param {Request} request Lista de parámetros para filtrar
   * @returns {Meeting[]} Devuelve la lista de reuniones
   */
  @Get()
  @ApiOperation({ summary: 'Obtener lista de reuniones' })
  @ApiResponse({
    status: 201,
    description: 'Lista de reuniones',
    type: Meeting,
  })
  findAll(@Req() request: Request): Promise<Meeting[]> {
    console.log(request.query);
    return this.meetingsService.findAll(request.query);
  }

  /**
   *
   * @param {meetingId} id de reunion
   * @returns {Meeting} Devuelve la reunion
   */
  @Get(':meetingId')
  @ApiOperation({ summary: 'Obtener reunion' })
  @ApiResponse({
    status: 201,
    description: 'Datos de reunion',
    type: Meeting,
  })
  find(@Param('meetingId') meetingId: string): Promise<Meeting> {
    return this.meetingsService.find(meetingId);
  }

  /**
   *
   * @param {newMeeting} datos de la reunion
   * @returns {Meeting} datos de la reunion creada
   */
  @Post()
  @ApiOperation({ summary: 'Crear reunion' })
  @ApiResponse({
    status: 201,
    description: 'Datos de reunion',
    type: Meeting,
  })
  create(@Body() newMeeting: MeetingDto): Promise<Meeting> {
    return this.meetingsService.create(newMeeting);
  }

  /**
   *
   * @param {meetingId} id de reunion
   * @returns {Meeting} reunion eliminada
   */
  @Delete(':meetingId')
  @ApiOperation({ summary: 'Eliminar reunion' })
  @ApiResponse({
    status: 201,
    description: 'Datos de reunion',
    type: Meeting,
  })
  delete(@Param('meetingId') meetingId: string): Promise<Meeting> {
    return this.meetingsService.delete(meetingId);
  }

  /**
   *
   * @param {meetingId} id de reunion a modificar
   * @param {newMeeting} datos de la reunion
   * @returns {Meeting} reunion modificada
   */
  @Put(':meetingId')
  @ApiOperation({ summary: 'Modificar reunion' })
  @ApiResponse({
    status: 201,
    description: 'Datos de reunion',
    type: Meeting,
  })
  update(
    @Param('meetingId') meetingId: string,
    @Body() newMeeting: MeetingDto,
  ): Promise<Meeting> {
    return this.meetingsService.update(meetingId, newMeeting);
  }
}
