import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import FormLogin from '../components/FormLogin';
import cyberWalletContext from '../context/AppContext';
import requests from '../services/requests';
import { LoginState, UserLogin } from '../types';

function Login() {
  const navigate = useNavigate();
  const { login, setlogin } = useContext(cyberWalletContext) as LoginState;

  useEffect(() => {
    const userLogged = async () => {
      const localResponse = localStorage.getItem('cyber-wallet-ng');
      if (localResponse !== null) {
        const { token }: UserLogin = JSON.parse(localResponse);
        const response = await requests.getUser('account', token);
        if ('error' in response) {
          setlogin({ ...login, logged: false });
        } else {
          setlogin({
            id: response.id,
            username: response.username,
            logged: true,
          });
          navigate('/wallet');
        }
      } else {
        setlogin({ ...login, logged: false });
      }
    };
    userLogged();
  }, []);

  return (
    <div>
      <FormLogin />
    </div>
  );
}

export default Login;
