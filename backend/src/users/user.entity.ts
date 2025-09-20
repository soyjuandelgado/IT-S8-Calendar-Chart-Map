import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: 99 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'José' })
  @Column()
  first: string;

  @ApiProperty({ example: 'Pérez' })
  @Column()
  last: string;

  @ApiProperty({ example: 'email@email.com' })
  @Column()
  email: string;

  @ApiProperty({ example: '987654321' })
  @Column()
  phone: string;

  @ApiProperty({ example: 'Mataró, Barcelona, Spain' })
  @Column()
  location: string;

  @ApiProperty({ example: 'leer' })
  @Column()
  hobby: string;
}
