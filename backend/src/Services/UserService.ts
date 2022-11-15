import { User } from '@prisma/client';
import { ResponseError, UserPayload } from '../Types/Index';

import Service from './Index';

export enum MessageErrors {
  INTERNAL = 'Internal Server Error',
  NOT_FOUND = 'Not Found',
  BAD_REQUEST = 'Bad Request',
  INVALID_USERNAME = 'Invalid Username',
  INVALID_TOKEN = 'Invalid Token',
  INVALID_PASSWORD = 'Invalid Password',
  CONFLICT = 'Conflict',
  UNAUTHORIZED = 'Unauthorized',
}

class UserService extends Service<User, UserPayload> {
  create = async (data: UserPayload): Promise<User | ResponseError> => {
    const user = await this.model.getOne(data);
    if (user) return { error: MessageErrors.INVALID_USERNAME };
    const validation = this.dataValidation(data);
    if (validation) return validation;
    return this.model.create(data);
  };

  private dataValidation = (data: UserPayload): undefined | ResponseError => {
    if (data.username.length < 3) {
      return { error: MessageErrors.INVALID_USERNAME };
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!regex.test(data.password)) {
      return { error: MessageErrors.INVALID_PASSWORD };
    }
  };
}

export default UserService;