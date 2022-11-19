import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Footer from '../components/Footer';
import FormLogin from '../components/FormLogin';
import Header from '../components/Header';
import cyberWalletContext from '../context/AppContext';
import requests from '../services/requests';
import { PageS } from '../styles';
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
    <PageS>
      <Header />
      <FormLogin />
      <Footer />
    </PageS>
  );
}

export default Login;
