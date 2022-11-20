import React, { useContext, useEffect, useState } from 'react';

import ProfilePic from '../../resources/profile_pic.jpg';
import cyberWalletContext from '../context/AppContext';
import { ContentS, NavCategoriesS, ProfileInfoS, ProfileS, SidebarS } from '../styles';
import { AccountState, LoginState } from '../types';
import Table from './Table';
import Transaction from './Transcation';

function Profile() {
  const { login } = useContext(cyberWalletContext) as LoginState;
  const { account } = useContext(cyberWalletContext) as AccountState;
  const [content, setContent] = useState('transactions');

  return (
    <ProfileS>
      <SidebarS>
        <ProfileInfoS>
          <img src={ProfilePic} alt="avatar" />
          <div>
            <h3>{login.username}</h3>
            <h2>
              <p>Saldo</p>
              {account.balance.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </h2>
          </div>
        </ProfileInfoS>
        <NavCategoriesS>
          <button type="button" onClick={() => setContent('transactions')}>
            Histórico de Transacoes
          </button>
          <button type="button" onClick={() => setContent('transfer')}>
            Tranferir
          </button>
        </NavCategoriesS>
      </SidebarS>
      <ContentS>{content === 'transactions' ? <Table /> : <Transaction />}</ContentS>
    </ProfileS>
  );
}

export default Profile;
