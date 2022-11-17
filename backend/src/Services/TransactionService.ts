import { Account } from '@prisma/client';
import { MessageErrors } from '../enum';
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

  create = async (data: TransactionPayload):
  Promise<Transaction | ResponseError> => {
    const validation = this.dataValidation(data);
    if (validation) return validation;

    const creditedUser = await this.transactionModel.getAccount(
      data.creditedAccountId,
    );
    if (!creditedUser) return { error: MessageErrors.BAD_REQUEST };
    const userbalance = await this.transactionModel.getAccount(
      data.debitedAccountId,
    ) as Account;

    if ((userbalance.balance - data.value) < 0) {
      return { error: 'Insufficient balance' };
    }

    const response = this.model.create(data);
    return response;
  };

  getOne = async (data: number): Promise<Transaction | ResponseError > => {
    const transaction = await this.model.getOne(data);
    if (!transaction) return { error: MessageErrors.NOT_FOUND };
    return transaction;
  };

  private dataValidation = (data: TransactionPayload):
  undefined | ResponseError => {
    if (data.creditedAccountId === undefined) {
      return { error: MessageErrors.BAD_REQUEST };
    }
    if (!Number.isInteger(data.creditedAccountId)) {
      return { error: MessageErrors.BAD_REQUEST };
    }
    if (data.value === undefined || data.value < 0) {
      return { error: MessageErrors.BAD_REQUEST };
    }
  };
}

export default TransactionService;