import { createContext } from 'react';

import { AppContextInterface } from '../interfaces';

const cyberWalletContext = createContext<AppContextInterface | undefined>(undefined);

export default cyberWalletContext;
