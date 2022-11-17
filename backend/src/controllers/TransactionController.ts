import { Request, Response } from 'express';
import Controller from './Index';
import { StatusCodes } from '../enum';
import {
  RequestWithBody,
  Transaction,
  TransactionPayload,
} from '../Types/Index';
import TransactionService from '../Services/TransactionService';

class TransactionController 
  extends Controller<Transaction, TransactionPayload > {
  private _route: string;

  private transactionService: TransactionService;

  constructor(
    service: TransactionService,
    route = '/transaction',
  ) {
    super(service);
    this._route = route;
    this.transactionService = service;    
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<TransactionPayload>,
    res: Response,
  ): Promise<typeof res> => {
    const { body } = req;
    
    const userToken = await this.handleAuthorization(req);
    if ('error' in userToken) {
      return res.status(StatusCodes.UNAUTHORIZED).json(userToken);
    }

    const response = await this.service.create(
      { ...body, 
        debitedAccountId: userToken.id,
      },
    );

    if ('error' in response) {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  };

  getOne = async (
    req: Request,
    res: Response,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const userToken = await this.handleAuthorization(req);
    if ('error' in userToken) {
      return res.status(StatusCodes.UNAUTHORIZED).json(userToken);
    }
    const response = await this.service.getOne(+id);

    if ('error' in response) {
      return res.status(StatusCodes.NOT_FOUND).json(response);
    }
    return res.status(StatusCodes.OK).json(response);
  };
}

export default TransactionController;