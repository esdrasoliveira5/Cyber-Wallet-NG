import { Account, Login, Transaction } from '../types';

export interface AppContextInterface {
  login?: Login;
  setLogin?: (data: Login) => void;
  account?: Account;
  setAccount?: (data: Account) => void;
}
