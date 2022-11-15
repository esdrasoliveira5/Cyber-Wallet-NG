import { User } from '@prisma/client';
import { UserPayload } from '../Types/Index';

import Service from './Index';

class UserService extends Service<User, UserPayload> {
  create(data: UserPayload): Promise<User> {
    return this.model.create(data);
  }
}

export default UserService;