import { Transaction, User } from '@prisma/client';
import { TransactionPayload } from '../Types/Index';
import PrismaModel from './PrismaModel';

class TransactionModel extends PrismaModel<Transaction, TransactionPayload> {
  create = async (data: TransactionPayload): Promise<Transaction> => {
    const response = this.model.transaction.create({ data });
    return response;
  };

  getOne = async (data: string): Promise<Transaction | null> => {
    const response = this.model.transaction.findUnique({
      where: { id: data },
      select: { id: true,
        value: true,
        debitedAccountId: true,
        creditedAccount: {
          select: { id: true,
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      }, 
    });
    return response;
  };

  getAccount = async (data: string): Promise<User | null> => {
    const response = this.model.user.findUnique({
      where: {
        username: data, 
      }, 
    });
    return response;
  };
}

export default TransactionModel;