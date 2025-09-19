import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAll(params): any {
    return params.length > 0
    ? `findAll funcionando con ${params}`
    :'findAll funcionando';
  }

  find(userId: string): any {
    return `find funcionando: ${userId}`;
  }

  create(user: number): any {
    return `new funcionando: ${user}`;
  }

  delete(userId: string): any {
    return `delete funcionando: ${userId}`;
  }

  update(user: number): any {
    return `update funcionando: ${user}`;
  }
}
