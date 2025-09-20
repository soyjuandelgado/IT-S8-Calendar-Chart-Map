import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(params): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async find(userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: parseInt(userId) },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  create(newUser: UserDto): Promise<User> {
    return this.usersRepository.save(newUser);
  }

  async delete(userId: string): Promise<any> {
    return this.usersRepository.delete({ id: parseInt(userId) });
  }

  async update(userId: string, newUser: UserDto): Promise<User> {
    const toUpdate = await this.usersRepository.findOne({
      where: { id: parseInt(userId) },
    });
    if (!toUpdate) {
      throw new NotFoundException('User not found');
    }
    const updated = Object.assign(toUpdate, newUser);
    return this.usersRepository.save(updated);
  }
}
