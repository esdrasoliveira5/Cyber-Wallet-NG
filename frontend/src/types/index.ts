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
  id: number;
  username: string;
  accountId: number;
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
  debitedAccount: {
    id: number;
    user: {
      id: number;
      username: string;
    };
  };
  creditedAccount: {
    id: number;
    user: {
      id: number;
      username: string;
    };
  };
};

export type Login = {
  logged: boolean;
  id: number;
  username: string;
};

export type LoginState = {
  login: Login;
  setLogin: (data: Login) => void;
};

export type Account = {
  id: number;
  balance: number;
};

export type AccountState = {
  account: Account;
  setAccount: (data: Account) => void;
};

export type TransactionsState = {
  transactions: Transaction[];
  setTransactions: (data: Transaction[]) => void;
};
