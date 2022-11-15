import { User, Account } from '@prisma/client';
import { UserPayload } from '../Types/Index';
import PrismaModel from './PrismaModel';

class UserModel extends PrismaModel<User, UserPayload> {
  create = async (data: UserPayload): Promise<User> => {
    const { id } = await this.accountCreate();
    const response = this.model.user.create(
      {
        data: {
          ...data,
          accountId: id,
        },
      },
    );
    return response;
  };

  private accountCreate = async (): 
  Promise<Account> => {
    const response = this.model.account.create(
      {
        data: {
          balance: 100.00,
        },
      },
    );

    return response;
  };
}

export default UserModel;