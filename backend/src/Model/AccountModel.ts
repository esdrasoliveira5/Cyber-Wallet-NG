import { Account } from "@prisma/client";
import PrismaModel from "./PrismaModel";


class AccountModel extends PrismaModel<Account> {

  create = async (data: Omit<Account, 'id'>): Promise<Account> => this.model.account.create(
    {
      data: {
        ...data,
      }
    }
  )

}

export default AccountModel;