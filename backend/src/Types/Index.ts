import { Request } from 'express';

export type User = {
  id: number
  username?: string
  password?: string
  accountId?: number
  account?: {
    balance: number
  }
};

export type UserPayload = {
  username: string,
  password: string
};

export type ResponseError = {
  error: string
};

export type TokenType = {
  id: number;
  username: string;
};

export type Token<T> = T & {
  token: string
};

export type Transaction = {
  id: number
  value?: number
  createdAt?: Date
  debitedAccountId?: number
  creditedAccountId?: number
};

export type TransactionPayload = {
  value: number,
  debitedAccountId: number,
  creditedAccountId: number,
};

export type TransactionDTO = {
  value: number,
  debitedUsername: string,
  creditedUsername: string,
};

export type TransactionsFilters = {
  createdAt?: string;
  cashIn?: string;
  cashOut?: string;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}
