import { Account } from '@prisma/client';
import PrismaModel from './PrismaModel';

class AccountModel extends PrismaModel<Account> {
  create = async (data: Omit<Account, 'id'>): Promise<Account> => {
    const response = this.model.account.create(
      {
        data: {
          ...data,
        },
      },
    );

    return response;
  };
}

export default AccountModel;