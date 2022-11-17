import { Account } from '@prisma/client';
import { Transaction, TransactionPayload } from '../Types/Index';
import PrismaModel from './PrismaModel';

class TransactionModel extends PrismaModel<Transaction, TransactionPayload> {
  create = async (data: TransactionPayload): Promise<Transaction> => {
    await this.debitValue(data);
    return this.model.transaction.create({
      data: {
        value: data.value,
        debitedAccountId: data.debitedAccountId,
        creditedAccountId: data.creditedAccountId,
      },
    });
  };

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

  getAccount = async (data: number): Promise<Account | null> => 
    this.model.account.findUnique({
      where: {
        id: data, 
      },
    });

  debitValue = async (data: TransactionPayload): Promise<boolean> => {
    await this.model.account.update({
      where: { id: data.debitedAccountId },
      data: {
        balance: {
          decrement: data.value,
        },
      },
    });
    await this.model.account.update({
      where: { id: data.creditedAccountId },
      data: {
        balance: {
          increment: data.value,
        },
      },
    });

    return true;
  };
}

export default TransactionModel;