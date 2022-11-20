import { useContext } from 'react';

import wallet from '../../resources/wallet.png';
import cyberWalletContext from '../context/AppContext';
import { HeaderS } from '../styles';
import { LoginState } from '../types';

function Header() {
  const { login, setLogin } = useContext(cyberWalletContext) as LoginState;

  const handleLogin = () => {
    localStorage.removeItem('cyber-wallet-ng');
    setLogin({
      username: '',
      id: 0,
      logged: false,
    });
    window.location.reload();
  };

  return (
    <HeaderS>
      <div>
        <img src={wallet} alt="wallet"></img>
        <p>Cyber Wallet</p>
      </div>
      <div>
        <span>{login.username}</span>
        <button type="button" onClick={handleLogin}>
          Sair
        </button>
      </div>
    </HeaderS>
  );
}

export default Header;
