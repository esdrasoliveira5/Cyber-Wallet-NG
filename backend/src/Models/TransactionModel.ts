import { Transaction, TransactionPayload, User } from '../Types/Index';
import PrismaModel from './PrismaModel';

class TransactionModel extends PrismaModel<Transaction, TransactionPayload> {
  create = async (data: TransactionPayload): Promise<Transaction> => 
    this.model.transaction.create({
      data: {
        value: data.value,
        debitedAccountId: data.debitedAccountId,
        creditedAccountId: data.creditedAccountId,
      },
    });

  getOne = async (data: number): Promise<Transaction | null> => 
    this.model.transaction.findUnique({
      where: { id: data },
      select: { id: true,
        value: true,
        debitedAccountId: true,
        createdAt: true,
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

  getAccount = async (data: number): Promise<User | null> => 
    this.model.user.findUnique({
      where: {
        id: data, 
      },
    });
}

export default TransactionModel;