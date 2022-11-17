import TransactionModel from '../Models/TransactionModel';
import { ResponseError, Transaction, TransactionPayload } from '../Types/Index';

import Service from './Index';

class TransactionService extends Service<Transaction, TransactionPayload> {
  private transactionModel: TransactionModel;

  constructor(
    model: TransactionModel,
  ) {
    super(model);
    this.transactionModel = model;    
  }
  create(data: TransactionPayload): Promise<Transaction | ResponseError> {

    if (data.creditedUsername == undefined)
    const creditedUser = this.transactionModel.getAccount(data.creditedUsername);
    const response = this.model.create(data);
    return response;
  }
}

export default TransactionService;