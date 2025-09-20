import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { User } from './user.class';

@Injectable()
export class UsersService {
  users: User[] = [
    {
      id: 1,
      first: 'Juan',
      last: 'Delgado',
      email: 'soy.juan.delgado@gmail.com',
      phone: '666957457',
      location: 'Mataró, Barcelona, Spain',
      hobby: 'read',
    },
    {
      id: 2,
      first: 'David',
      last: 'del Molino',
      email: 'daviddmt@gmail.com',
      phone: '676242737',
      location: 'Premiá de Mar, Barcelona, Spain',
      hobby: 'music',
    },
  ];

  findAll(params): User[] {
    return this.users;
  }

  find(userId: string): User {
    return this.users[parseInt(userId) - 1];
  }

  create(newUser: UserDto): User {
    const user = new User();

    user.id = 99;
    user.first = newUser.first;
    user.last = newUser.last;
    user.email = newUser.email;
    user.phone = newUser.phone;
    user.location = newUser.location;
    user.hobby = newUser.hobby;

    return user;
  }

  delete(userId: string): User {
    return this.users[parseInt(userId) - 1];
  }

  update(userId: string, newUser: UserDto): User {
    return this.users[parseInt(userId) - 1];
  }
}
