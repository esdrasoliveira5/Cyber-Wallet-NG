import { User } from '@prisma/client';

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

export type TransactionPayload = {
  value: number,
  debitedAccountId: string,
  creditedAccountId: string,
};