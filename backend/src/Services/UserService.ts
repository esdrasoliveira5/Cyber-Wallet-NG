import { User } from '@prisma/client';
import UserModel from '../Models/UserModel';
import { ResponseError, UserPayload, UserToken } from '../Types/Index';

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
  private userModel: UserModel;

  constructor(
    model: UserModel,
  ) {
    super(model);
    this.userModel = model;    
  }

  create = async (data: UserPayload): Promise<User | ResponseError> => {
    const validation = this.dataValidation(data);
    if (validation) return validation;
    const user = await this.model.getOne(data.username);
    if (user) return { error: MessageErrors.INVALID_USERNAME };

    const hash = await this.hashIt(data.password);
    const response = await this.model.create({ ...data, password: hash });
    return response;
  };

  getOne = async (data: string):
  Promise<User | ResponseError> => {
    const user = await this.model.getOne(data);
    if (!user) return { error: MessageErrors.NOT_FOUND };

    return user;
  };

  login = async (data: UserPayload): Promise<UserToken | ResponseError> => {
    const user = await this.userModel.getAccount(data.username);
    if (!user) return { error: MessageErrors.UNAUTHORIZED };

    const passwordValidation = await this.compareIt(
      data.password, 
      user.password as string,
    );
    if (passwordValidation) return passwordValidation;

    const token = await this.generateToken(
      { id: user.id, username: user.username as string },
    );
    delete user.password;
    return { user, token };
  };

  getAccount = async (data: string): 
  Promise<User | ResponseError> => {
    const userAccount = await this.userModel.getAccount(data);
    if (!userAccount) return { error: MessageErrors.NOT_FOUND };
    delete userAccount.password;
    return userAccount;
  };
}

export default UserService;