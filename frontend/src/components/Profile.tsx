import React, { useContext } from 'react';

import ProfilePic from '../../resources/profile_pic.jpg';
import cyberWalletContext from '../context/AppContext';
import { ContentS, NavCategoriesS, ProfileInfoS, ProfileS, SidebarS } from '../styles';
import { AccountState, LoginState, TransactionsState } from '../types';

function Profile() {
  const { login } = useContext(cyberWalletContext) as LoginState;
  const { account } = useContext(cyberWalletContext) as AccountState;
  const { transactions } = useContext(cyberWalletContext) as TransactionsState;

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
