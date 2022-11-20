import React, { useContext, useEffect, useState } from 'react';

import ProfilePic from '../../resources/profile_pic.jpg';
import cyberWalletContext from '../context/AppContext';
import requests from '../services/requests';
import { ContentS, NavCategoriesS, ProfileInfoS, ProfileS, SidebarS } from '../styles';
import { AccountState, LoginState, Transaction, UserLogin } from '../types';
import Table from './Table';

function Profile() {
  const { login } = useContext(cyberWalletContext) as LoginState;
  const { account } = useContext(cyberWalletContext) as AccountState;
  return (
    <ProfileS>
      <SidebarS>
        <ProfileInfoS>
          <img src={ProfilePic} alt="avatar" />
          <div>
            <h3>{login.username}</h3>
            <h2>Saldo R${account.balance.toPrecision(4)}</h2>
          </div>
        </ProfileInfoS>
        <NavCategoriesS>
          <button value="" type="button" key="0">
            Histórico de Transacoes
          </button>
          <button value={1} type="button" key={1}>
            Tranferir
          </button>
        </NavCategoriesS>
      </SidebarS>
      <ContentS>
        <Table />
      </ContentS>
    </ProfileS>
  );
}

export default Profile;
