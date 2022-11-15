import { User } from "@prisma/client";
import PrismaModel from "./PrismaModel";


class UserModel extends PrismaModel<User> {

  create = async (data: Omit<User, 'id'>): Promise<User> => this.model.user.create(
    {
      data: {
        ...data,
      }
    }
  )
}

export default UserModel;