import bcrypt = require('bcrypt');
import { sign, SignOptions } from 'jsonwebtoken';
import * as path from 'path';
import fs = require('fs');
import UserModel from '../Models/UserModel';
import { 
  ResponseError, 
  UserPayload, 
  UserToken, User, 
  TokenType,
} from '../Types/Index';

import Service from './Index';
import { MessageErrors } from '../enum';

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

  getAll = async (): Promise<User[]> => {
    const users = await this.model.getAll(null); 
    return users;
  };

  login = async (data: UserPayload): Promise<UserToken | ResponseError> => {
    const validation = this.dataValidation(data);
    if (validation) return validation;

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

  private dataValidation = (data: UserPayload): undefined | ResponseError => {
    if (data.username === undefined || data.username.length < 3) {
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

  private generateToken = async (data: TokenType): Promise<string> => {
    const secret = fs.readFileSync(path.resolve('jwt.evaluation.key'), 'utf8');
    const jwtConfig: SignOptions = { expiresIn: '1d', algorithm: 'HS256' };

    const token: string = sign(data, secret, jwtConfig);
    return token;
  };
}

export default UserService;