import React, { PropsWithChildren, useMemo, useState } from 'react';

import { AppContextInterface } from '../interfaces';
import { Account, Login, Transaction } from '../types';
import cyberWalletContext from './AppContext';

function CyberWalletProvider({ children }: PropsWithChildren<AppContextInterface>) {
  const [login, setLogin] = useState({
    logged: false,
    id: 0,
    username: '',
  });

  const [account, setAccount] = useState({
    id: 0,
    balance: 0,
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const contextValue = useMemo(
    () => ({
      login,
      setLogin: (data: Login) => setLogin(data),
      account,
      setAccount: (data: Account) => setAccount(data),
      transactions,
      setTransactions: (data: Transaction[]) => setTransactions(data),
    }),
    [login, account],
  );

  return (
    <cyberWalletContext.Provider value={contextValue}>
      {children}
    </cyberWalletContext.Provider>
  );
}

export default CyberWalletProvider;
