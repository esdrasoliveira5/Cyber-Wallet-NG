import { createContext } from 'react';

import { AppContextInterface } from '../types';

const cyberWalletContext = createContext<AppContextInterface | null>(null);

export default cyberWalletContext;
