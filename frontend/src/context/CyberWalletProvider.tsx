import React, { PropsWithChildren, useMemo, useState } from 'react';

import { AppContextInterface } from '../types';
import cyberWalletContext from './AppContext';

function CyberWalletProvider({ children }: PropsWithChildren<AppContextInterface>) {
  const [logged, setLogged] = useState({
    logged: false,
    id: '',
    username: '',
  });
  const contextValue = useMemo(
    () => ({
      logged,
      setLogged,
    }),
    [logged],
  );

  return (
    <cyberWalletContext.Provider value={contextValue}>
      {children}
    </cyberWalletContext.Provider>
  );
}

export default CyberWalletProvider;
