import { Request } from 'express';

export type User = {
  id: string
  username?: string
  password?: string
  accountId?: string
};

export type UserPayload = {
  username: string,
  password: string
};

export type ResponseError = {
  error: string
};

export type TokenType = {
  id: string;
  username: string;
};

export type UserToken = {
  user: User,
  token: string,
};

export type Transaction = {
  id: string
  value?: number
  createdAt?: Date
  debitedAccountId?: string
  creditedAccountId?: string
};

export type TransactionPayload = {
  value: number,
  debitedAccountId: string,
  creditedAccountId: string,
};

export interface RequestWithBody<T> extends Request {
  body: T;
}