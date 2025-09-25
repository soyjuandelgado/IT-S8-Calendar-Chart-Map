import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Meeting {
  @ApiProperty({ example: 99 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Reunión de Bienvenida' })
  @Column()
  readonly name: string;

  @ApiProperty({ example: '987654321' })
  @Column()
  readonly phone: string;

  @ApiProperty({ type: 'string', format: 'date', example: '2025-09-23' })
  @Column({ type: 'date' })
  readonly date: Date;

  @ApiProperty({ example: 2.17795188 })
  @Column({ type: 'decimal', precision: 11, scale: 8 })
  readonly longitude: number;

  @ApiProperty({ example: 41.38825991 })
  @Column({ type: 'decimal', precision: 10, scale: 8 })
  readonly latitude: number;
}
