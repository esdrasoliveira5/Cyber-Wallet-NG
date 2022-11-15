import { Request, Response } from 'express';
import { User } from '@prisma/client';
import UserService from '../Services/UserService';
import { UserPayload } from '../Types/Index';
import Controller from './Index';

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
    req: Request,
    res: Response,
  ): Promise<typeof res> => {
    const { body } = req;
    
    const response = await this.service.create(body);

    return res.status(201).json(response);
  };
}

export default UserController;