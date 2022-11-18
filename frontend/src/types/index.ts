export type AppContextInterface = {
  logged?: {
    logged: boolean;
    id: string;
    username: string;
  };
};

export type UserPayload = {
  username: string;
  password: string;
};

export type User = {
  id: number;
  username: string;
  accountId: number;
};

export type UserAccount = {
  id: number;
  username: string;
  account: {
    id: number;
    balance: number;
  };
};

export type UserLogin = {
  user: UserAccount;
  token: string;
};

export type ResponseError = {
  error: string;
};

export type TransactionPayload = {
  value: number;
  creditedUsername: string;
};

export type Transaction = {
  id: number;
  value: number;
  createdAt: string;
  debitedAccountId: number;
  creditedAccountId: number;
};
