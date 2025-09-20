import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  findAll(params): any {
    let msg = `findAll funcionando. Parámetros:`;

    if (params.order !== undefined) {
      msg = msg + ` order: ${params.order}`;
    }

    if (params.limit !== undefined) {
      msg = msg + ` limit: ${params.limit}`;
    }

    return msg;
  }

  find(userId: string): any {
    return `find funcionando: ${userId}`;
  }

  create(user: UserDto): UserDto {
    return user;
  }

  delete(userId: string): any {
    return `delete funcionando: ${userId}`;
  }

  update(userId: string, user: UserDto): UserDto {
    return user;
  }
}

// ID, First, Last, Email, Phone, Location, Hobby

// {
//     "ID": 5,
//     "first": "Juan",
//     "Last": "Delgado",
//     "email": "soyjuandelgado@gmail.com",
//     "phone": "666666666",
//     "location": "Mataró, Barcelona, Spain",
//     "hobby": "read"
// }