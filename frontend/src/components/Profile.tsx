import React, { useContext, useEffect, useState } from 'react';

import ProfilePic from '../../resources/profile_pic.jpg';
import cyberWalletContext from '../context/AppContext';
import requests from '../services/requests';
import { ContentS, NavCategoriesS, ProfileInfoS, ProfileS, SidebarS } from '../styles';
import { AccountState, LoginState, Transaction, UserLogin } from '../types';

function Profile() {
  const { login } = useContext(cyberWalletContext) as LoginState;
  const { account } = useContext(cyberWalletContext) as AccountState;
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const getTransactions = async () => {
      const localResponse = localStorage.getItem('cyber-wallet-ng');
      if (localResponse !== null) {
        const { token }: UserLogin = JSON.parse(localResponse);
        const transactions = (await requests.getAllTransactions(token)) as Transaction[];
        console.log(transactions);
        if (!('error' in transactions)) {
          setTransactions(transactions);
        }
      }
    };
    getTransactions();
  }, []);

  return (
    <ProfileS>
      <SidebarS>
        <ProfileInfoS>
          <img src={ProfilePic} alt="avatar" />
          <div>
            <h1>{login.username}</h1>
            <h1>{account.balance}</h1>
          </div>
        </ProfileInfoS>
        <NavCategoriesS>
          <button value="" type="button" key="0">
            Histórico de Transacoes
          </button>
          <button value={1} type="button" key={1}>
            Categoria
          </button>
        </NavCategoriesS>
      </SidebarS>
      <ContentS>
        {transactions.map(({ value, id }) => (
          <p key={id}>{value}</p>
        ))}
      </ContentS>
    </ProfileS>
  );
}

export default Profile;
