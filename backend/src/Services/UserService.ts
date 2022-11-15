import { User } from '@prisma/client';
import { ResponseError, UserPayload } from '../Types/Index';

import Service from './Index';

export enum MessageErrors {
  INTERNAL = 'Internal Server Error',
  NOT_FOUND = 'Not Found',
  BAD_REQUEST = 'Bad Request',
  INVALID_USERNAME = 'Username already registered!',
  INVALID_TOKEN = 'Invalid Token',
  INVALID_PASSWORD = 'Invalid Password',
  CONFLICT = 'Conflict',
  UNAUTHORIZED = 'Unauthorized',
}

class UserService extends Service<User, UserPayload> {
  create = async (data: UserPayload): Promise<User | ResponseError> => {
    const user = await this.model.getOne(data);
    if (user) return { error: MessageErrors.INVALID_USERNAME };
    
    return this.model.create(data);
  };
}

export default UserService;