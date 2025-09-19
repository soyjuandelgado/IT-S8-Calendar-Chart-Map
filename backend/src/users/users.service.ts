import { Injectable } from '@nestjs/common';

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
