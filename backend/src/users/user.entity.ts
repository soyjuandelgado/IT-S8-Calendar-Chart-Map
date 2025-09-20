import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first: string;

  @Column()
  last: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  location: string;

  @Column()
  hobby: string;
}
