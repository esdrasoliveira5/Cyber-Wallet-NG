import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Footer from '../components/Footer';
import FormLogin from '../components/FormLogin';
import Header from '../components/Header';
import cyberWalletContext from '../context/AppContext';
import requests from '../services/requests';
import { MainS, PageS } from '../styles';
import { LoginState, UserLogin } from '../types';

function Login() {
  const navigate = useNavigate();
  const { login, setLogin } = useContext(cyberWalletContext) as LoginState;

  useEffect(() => {
    const userLogged = async () => {
      const localResponse = localStorage.getItem('cyber-wallet-ng');
      if (localResponse !== null) {
        const { token }: UserLogin = JSON.parse(localResponse);
        const response = await requests.getUser('account', token);
        if ('error' in response) {
          setLogin({ ...login, logged: false });
        } else {
          setLogin({
            id: response.id,
            username: response.username,
            logged: true,
          });
          navigate('/wallet');
        }
      } else {
        setLogin({ ...login, logged: false });
      }
    };
    userLogged();
  }, []);

  return (
    <PageS>
      <Header />
      <MainS>
        <FormLogin />
      </MainS>
      <Footer />
    </PageS>
  );
}

export default Login;
