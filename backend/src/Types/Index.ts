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
  user: {
    id: string,
    username: string,
    accountId: string,
  },
  token: string,
};
