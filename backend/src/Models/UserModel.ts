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

  getOne = async (data: string): Promise<User | null> => {
    const response = this.model.user.findUnique({
      where: {
        username: data, 
      }, 
    });
    return response;
  };

  public getAccount = async (data: string):
  Promise<Omit<User, 'password' | 'accountId'> | null> => {
    const response = this.model.user.findUnique({
      where: {
        id: data, 
      }, 
      select: {
        id: true,
        username: true,
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