import {
  ResponseError,
  Transaction,
  TransactionPayload,
  TransactionsFilters,
  User,
  UserAccount,
  UserLogin,
  UserPayload,
} from '../types';

const URL_FETCH = 'http://localhost:3001';
const APLICATION = 'application/json';

async function login(data: UserPayload): Promise<UserLogin | ResponseError> {
  try {
    const response = await fetch(`${URL_FETCH}/login`, {
      method: 'POST',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
      },
      body: JSON.stringify(data),
    });
    const results: UserLogin = await response.json();
    return results;
  } catch (error) {
    return { error } as ResponseError;
  }
}

async function createUser(data: UserPayload): Promise<User | ResponseError> {
  try {
    const response = await fetch(`${URL_FETCH}/user`, {
      method: 'POST',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
      },
      body: JSON.stringify(data),
    });
    const results: User = await response.json();
    return results;
  } catch (error) {
    return { error } as ResponseError;
  }
}

async function getUser(
  user: string,
  token: string,
): Promise<User | UserAccount | ResponseError> {
  try {
    const response: Response = await fetch(`${URL_FETCH}/user/${user}`, {
      method: 'GET',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
        Authorization: token,
      },
    });
    const results: User = await response.json();
    return results;
  } catch (error) {
    return { error } as ResponseError;
  }
}

async function getAllUsers(token: string): Promise<User[] | ResponseError> {
  try {
    const response: Response = await fetch(`${URL_FETCH}/user`, {
      method: 'GET',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
        Authorization: token,
      },
    });
    const results: User[] = await response.json();
    return results;
  } catch (error) {
    return { error } as ResponseError;
  }
}

async function createTransaction(
  data: TransactionPayload,
  token: string,
): Promise<Transaction | ResponseError> {
  try {
    const response: Response = await fetch(`${URL_FETCH}/transaction`, {
      method: 'POST',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
        Authorization: token,
      },
      body: JSON.stringify(data),
    });
    const results: Transaction = await response.json();
    return results;
  } catch (error) {
    return { error } as ResponseError;
  }
}

async function getTransaction(
  transaction: string,
  token: string,
): Promise<Transaction | ResponseError> {
  try {
    const response: Response = await fetch(`${URL_FETCH}/transaction/${transaction}`, {
      method: 'GET',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
        Authorization: token,
      },
    });
    const results: Transaction = await response.json();
    return results;
  } catch (error) {
    return { error } as ResponseError;
  }
}

async function getAllTransactions(token: string): Promise<Transaction[] | ResponseError> {
  try {
    const response: Response = await fetch(`${URL_FETCH}/transaction`, {
      method: 'GET',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
        Authorization: token,
      },
    });
    const results: Transaction[] = await response.json();
    return results;
  } catch (error) {
    return { error } as ResponseError;
  }
}

async function getAllTransactionsByFilter(
  token: string,
  { createdAt, cashIn, cashOut }: TransactionsFilters,
) {
  try {
    const response = await fetch(
      `${URL_FETCH}/transaction?createdAt=${createdAt}&cashIn=${cashIn}&cashOut=${cashOut}`,
      {
        method: 'GET',
        headers: {
          Accept: APLICATION,
          'Content-Type': APLICATION,
          Authorization: token,
        },
      },
    );
    const results: Transaction[] = await response.json();
    return results;
  } catch (error) {
    return { error } as ResponseError;
  }
}

export default {
  login,
  createUser,
  getUser,
  getAllUsers,
  createTransaction,
  getTransaction,
  getAllTransactions,
  getAllTransactionsByFilter,
};
