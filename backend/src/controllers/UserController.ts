import { Request, Response } from 'express';
import UserService from '../Services/UserService';
import { UserPayload, User, RequestWithBody } from '../Types/Index';
import Controller from './Index';
import { StatusCodes } from '../enum';

class UserController extends Controller<User, UserPayload > {
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
    req: RequestWithBody<UserPayload>,
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
    req: Request,
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

  getAll = async (
    req: Request,
    res: Response,
  ): Promise<typeof res> => {
    const userToken = await this.handleAuthorization(req);
    if ('error' in userToken) {
      return res.status(StatusCodes.UNAUTHORIZED).json(userToken);
    }
    const response = await this.service.getAll(null, null);

    return res.status(StatusCodes.OK).json(response);
  };

  login = async (
    req: RequestWithBody<UserPayload>,
    res: Response,
  ): Promise<typeof res> => {
    const { body } = req;
    
    const response = await this.userService.login(body);
    if ('error' in response) {
      return res.status(StatusCodes.UNAUTHORIZED).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  };

  getAccount = async (
    req: Request,
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