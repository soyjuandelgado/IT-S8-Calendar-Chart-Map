import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'José' })
  readonly first: string;
  @ApiProperty({ example: 'Pérez' })
  readonly last: string;
  @ApiProperty({ example: 'email@email.com' })
  readonly email: string;
  @ApiProperty({ example: '987654321' })
  readonly phone: string;
  @ApiProperty({ example: 'Mataró, Barcelona, Spain' })
  readonly location: string;
  @ApiProperty({ example: 'leer' })
  readonly hobby: string;
}
