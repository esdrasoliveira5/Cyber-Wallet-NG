import { Response, Request } from 'express';
import { verify } from 'jsonwebtoken';
import * as path from 'path';
import fs = require('fs');
import Service from '../Services/Index';
import { ControllerI } from '../Interfaces/ControllerInterface';
import { ResponseError, TokenType } from '../Types/Index';

abstract class Controller<T, M> implements ControllerI {
  abstract route: string;

  constructor(public service: Service<T, M>) {}

  abstract create(req: Request, res: Response):
  Promise<typeof res>;

  abstract getOne(req: Request, res: Response):
  Promise<typeof res>;

  protected handleAuthorization = async (req: Request)
  : Promise<TokenType | ResponseError> => {
    const { authorization } = req.headers;

    const secret = fs.readFileSync(path.resolve('jwt.evaluation.key'), 'utf8');

    if (authorization === undefined) {
      return { error: 'Unauthorized' };
    }
    try {
      const decoded = verify(authorization, secret) as TokenType;
      return decoded;
    } catch (err) {
      return { error: 'Unauthorized' };
    }
  };
}

export default Controller;
