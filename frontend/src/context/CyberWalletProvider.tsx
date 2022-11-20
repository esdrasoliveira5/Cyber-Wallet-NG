import React, { PropsWithChildren, useMemo, useState } from 'react';

import { AppContextInterface } from '../interfaces';
import { Login } from '../types';
import cyberWalletContext from './AppContext';

function CyberWalletProvider({ children }: PropsWithChildren<AppContextInterface>) {
  const [login, setLogin] = useState({
    logged: false,
    id: 0,
    username: '',
  });

  const contextValue = useMemo(
    () => ({
      login,
      setLogin: (data: Login) => setLogin(data),
    }),
    [login],
  );

  return (
    <cyberWalletContext.Provider value={contextValue}>
      {children}
    </cyberWalletContext.Provider>
  );
}

export default CyberWalletProvider;
