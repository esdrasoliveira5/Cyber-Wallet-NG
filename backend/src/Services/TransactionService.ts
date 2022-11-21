import { MessageErrors } from '../enum';
import TransactionModel from '../Models/TransactionModel';
import { 
  ResponseError, 
  Transaction, 
  TransactionDTO, 
  TransactionPayload, 
  TransactionsFilters, 
  User,
} from '../Types/Index';

import Service from './Index';

class TransactionService extends Service<Transaction, TransactionPayload> {
  private transactionModel: TransactionModel;

  constructor(
    model: TransactionModel,
  ) {
    super(model);
    this.transactionModel = model;    
  }

  create = async (data: TransactionDTO):
  Promise<Transaction | ResponseError> => {
    const validation = await this.dataValidation(data);
    if ('error' in validation) return validation;

    const userbalance = await this.transactionModel.getAccount(
      data.debitedUsername,
    ) as User;

    if (validation.accountId === userbalance.accountId) {
      return { error: MessageErrors.BAD_REQUEST };
    }

    if ((userbalance.account?.balance as number - data.value) < 0) {
      return { error: 'Insufficient balance' };
    }
    const response = this.model.create({ 
      value: +data.value,
      creditedAccountId: validation.accountId, 
      debitedAccountId: userbalance.accountId,
    } as TransactionPayload);
    return response;
  };

  getOne = async (data: number): Promise<Transaction | ResponseError > => {
    const transaction = await this.model.getOne(data);
    if (!transaction) return { error: MessageErrors.NOT_FOUND };

    return transaction;
  };

  getAll = async (data: number, query: TransactionsFilters):
  Promise<Transaction[]> => {
    if (query !== null) {
      const transactions = await this.transactionModel.getFilter(data, query);
      return transactions;
    }

    const transactions = await this.model.getAll(data);
    return transactions;
  };

  private dataValidation = async (data: TransactionDTO):
  Promise<User | ResponseError> => {
    if (data.creditedUsername === undefined) {
      return { error: MessageErrors.BAD_REQUEST };
    }
    if (data.value === undefined || data.value < 0) {
      return { error: MessageErrors.BAD_REQUEST };
    }

    const creditedUser = await this.transactionModel.getAccount(
      data.creditedUsername,
    );
    if (!creditedUser) return { error: MessageErrors.BAD_REQUEST };

    return creditedUser;
  };
}

export default TransactionService;