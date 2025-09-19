import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAll(): any {
    return 'findAll funcionando';
  }

  find(userId: number): any {
    return 'find funcionando: ' + userId;
  }

  create(user: number): any {
    return 'new funcionando: ' + user;
  }

  delete(userId: number): any {
    return 'delete funcionando: ' + userId;
  }

  update(user: number): any {
    return 'update funcionando: ' + user;
  }
}
