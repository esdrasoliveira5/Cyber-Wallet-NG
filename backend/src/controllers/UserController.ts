import { Request, Response } from 'express';
import UserService from '../Services/UserService';
import { UserPayload, User } from '../Types/Index';
import Controller from './Index';
import { ControllerI } from '../Interfaces/ControllerInterface';
import { StatusCodes } from '../enum';

class UserController extends Controller<User, UserPayload >
  implements ControllerI {
  private _route: string;

  private userService: UserService;

  constructor(
    service: UserService,
    route = '/user',
  ) {
    super(service);
    this._route = route;
    this.userService = service;    
  }

  get route() { return this._route; }

  create = async (
    req: Request<UserPayload>,
    res: Response,
  ): Promise<typeof res> => {
    const { body } = req;
    
    const response = await this.service.create(body);
    if ('error' in response) {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  };

  getOne = async (
    req: Request<UserPayload>,
    res: Response,
  ): Promise<typeof res> => {
    const { username } = req.params;
    const userToken = await this.handleAuthorization(req);
    if ('error' in userToken) {
      return res.status(StatusCodes.UNAUTHORIZED).json(userToken);
    }
    const response = await this.service.getOne(username);

    if ('error' in response) {
      return res.status(StatusCodes.NOT_FOUND).json(response);
    }
    return res.status(StatusCodes.OK).json(response);
  };

  login = async (
    req: Request<User>,
    res: Response,
  ): Promise<typeof res> => {
    const { body } = req;
    
    const response = await this.userService.login(body);
    if ('error' in response) {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  };

  getAccount = async (
    req: Request<UserPayload>,
    res: Response,
  ): Promise<typeof res> => {
    const userToken = await this.handleAuthorization(req);
    if ('error' in userToken) {
      return res.status(StatusCodes.UNAUTHORIZED).json(userToken);
    }
    
    const response = await this.userService.getAccount(userToken.username);

    if ('error' in response) {
      return res.status(StatusCodes.NOT_FOUND).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  };
}

export default UserController;