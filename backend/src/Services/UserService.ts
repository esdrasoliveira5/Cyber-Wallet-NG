import { User } from '@prisma/client';
import bcrypt = require('bcrypt');
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
    const validation = this.dataValidation(data);
    if (validation) return validation;
    const user = await this.model.getOne(data);
    if (user) return { error: MessageErrors.INVALID_USERNAME };

    const hash = await this.hashIt(data.password);
    const response = await this.model.create({ ...data, password: hash });
    return response;
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

  private hashIt = async (password: string): Promise<string> => {
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };

  private compareIt = async (password: string, hashedPassword: string):
  Promise<void | ResponseError> => {
    const response = await bcrypt.compare(password, hashedPassword);
    if (!response) {
      return { error: MessageErrors.UNAUTHORIZED };
    }
  };
}

export default UserService;