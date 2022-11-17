import { Account } from '@prisma/client';
import { UserPayload, User } from '../Types/Index';
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
        select: {
          id: true,
          username: true,
          accountId: true,
        },
      },
    );
    return response;
  };

  getOne = async (data: string): Promise<User | null> => {
    const response = this.model.user.findUnique({
      where: {
        username: data, 
      },
      select: {
        id: true,
        username: true,
        accountId: true,
      },
    });
    return response;
  };

  public getAccount = async (data: string):
  Promise<User | null> => {
    const response = this.model.user.findUnique({
      where: {
        username: data, 
      }, 
      select: {
        id: true,
        username: true,
        password: true,
        account: {
          select: {
            id: true,
            balance: true,
          },
        },
      },
    });
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