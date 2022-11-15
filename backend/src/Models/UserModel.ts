import { User } from '@prisma/client';
import PrismaModel from './PrismaModel';

class UserModel extends PrismaModel<User> {
  create = async (data: Omit<User, 'id'>): Promise<User> => {
    const response = this.model.user.create(
      {
        data: {
          ...data,
        },
      },
    );
    return response;
  };
}

export default UserModel;