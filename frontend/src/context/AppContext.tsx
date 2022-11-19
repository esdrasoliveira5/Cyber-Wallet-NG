import { createContext } from 'react';

import { AppContextInterface } from '../interfaces';

const cyberWalletContext = createContext<AppContextInterface | null>(null);

export default cyberWalletContext;
