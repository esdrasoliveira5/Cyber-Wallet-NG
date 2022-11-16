import bcrypt = require('bcrypt');
import { sign, SignOptions } from 'jsonwebtoken';
import * as path from 'path';
import fs = require('fs');
import { ResponseError, TokenType, UserPayload } from '../Types/Index';
import { Model } from '../Interfaces/ModelInterface';
import { ServiceI } from '../Interfaces/ServiceInterface';

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

abstract class Service<T, M> implements ServiceI<T, M> {
  constructor(public model: Model<T, M>) {}

  abstract create(data: M): Promise<T | ResponseError>;

  abstract getOne(data: string): Promise<T | ResponseError>;

  protected dataValidation = (data: UserPayload): undefined | ResponseError => {
    if (data.username.length < 3) {
      return { error: MessageErrors.INVALID_USERNAME };
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!regex.test(data.password)) {
      return { error: MessageErrors.INVALID_PASSWORD };
    }
  };

  protected hashIt = async (password: string): Promise<string> => {
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };

  protected compareIt = async (password: string, hashedPassword: string):
  Promise<void | ResponseError> => {
    const response = await bcrypt.compare(password, hashedPassword);
    if (!response) {
      return { error: MessageErrors.UNAUTHORIZED };
    }
  };

  protected generateToken = async (data: TokenType): Promise<string> => {
    const secret = fs.readFileSync(path.resolve('jwt.evaluation.key'), 'utf8');
    const jwtConfig: SignOptions = { expiresIn: '1d', algorithm: 'HS256' };

    const token: string = sign(data, secret, jwtConfig);
    return token;
  };
}

export default Service;