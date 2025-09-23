import { ApiProperty } from '@nestjs/swagger';

export class MeetingDto {
  @ApiProperty({ example: 'Reunión de Bienvenida' })
  readonly name: string;
  @ApiProperty({ example: '987654321' })
  readonly phone: string;
  @ApiProperty({ type: 'string', format: 'date', example: '2025-09-23' })
  readonly date: Date;
  @ApiProperty({ example: 2.17795188 })
  readonly longitude: number;
  @ApiProperty({ example: 41.38825991 })
  readonly latitude: number;
}
