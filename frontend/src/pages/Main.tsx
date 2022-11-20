import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Profile from '../components/Profile';
import cyberWalletContext from '../context/AppContext';
import requests from '../services/requests';
import { MainS, PageS } from '../styles';
import {
  AccountState,
  LoginState,
  Transaction,
  TransactionsState,
  UserAccount,
  UserLogin,
} from '../types';

function Main() {
  const navigate = useNavigate();
  const { login, setLogin } = useContext(cyberWalletContext) as LoginState;
  const { setAccount } = useContext(cyberWalletContext) as AccountState;
  const { setTransactions } = useContext(cyberWalletContext) as TransactionsState;

  useEffect(() => {
    const userLogged = async () => {
      const localResponse = localStorage.getItem('cyber-wallet-ng');
      if (localResponse !== null) {
        const { token }: UserLogin = JSON.parse(localResponse);
        const response = (await requests.getUser('account', token)) as UserAccount;
        const transactions = (await requests.getAllTransactions(token)) as Transaction[];
        console.log(transactions);
        if ('error' in response) {
          setLogin({ ...login, logged: false });
          navigate('/');
        } else {
          setLogin({
            id: response.id,
            username: response.username,
            logged: true,
          });
          setAccount(response.account);
          setTransactions(transactions);
          navigate('/wallet');
        }
      } else {
        setLogin({ ...login, logged: false });
        navigate('/');
      }
    };
    userLogged();
  }, []);
  return (
    <PageS>
      <Header />
      <MainS>
        <Profile />
      </MainS>
      <Footer />
    </PageS>
  );
}

export default Main;
