import { Request, Response } from 'express';
import { User } from '@prisma/client';
import UserService from '../Services/UserService';
import { UserPayload } from '../Types/Index';
import Controller from './Index';

export enum StatusCodes {
  OK = 200,
  CREATED,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INVALID = 422,
  INTERNAL = 500,
}

class UserController extends Controller<User, UserPayload > {
  private _route: string;

  constructor(
    service: UserService,
    route = '/user',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: Request<User>,
    res: Response,
  ): Promise<typeof res> => {
    const { body } = req;
    
    const response = await this.service.create(body);
    if ('error' in response) {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(201).json(response);
  };

  login = async (
    req: Request<User>,
    res: Response,
  ): Promise<typeof res> => {
    const { body } = req;
    
    const response = await this.service.login(body);
    if ('error' in response) {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(201).json(response);
  };
}

export default UserController;