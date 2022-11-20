import { Login } from '../types';

export interface AppContextInterface {
  login: {
    logged: boolean;
    id: number;
    username: string;
  };
  setLogin?: (data: Login) => void;
}
