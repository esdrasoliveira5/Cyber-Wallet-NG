import React, { useContext, useEffect, useState } from 'react';

import cyberWalletContext from '../context/AppContext';
import requests from '../services/requests';
import { TableS } from '../styles';
import { LoginState, Transaction, UserLogin } from '../types';

function Table() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { login } = useContext(cyberWalletContext) as LoginState;
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

  if (transactions.length === 0) {
    return <h1>Voce nao tem pedidos</h1>;
  }
  return (
    <TableS>
      <table>
        <thead>
          <tr>
            <th>Transação</th>
            <th>Valor</th>
            <th>Nome do usuário</th>
            <th>Data da transação</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(
            ({
              id,
              createdAt,
              value,
              debitedAccount: {
                user: { id: debitedId, username: debited },
              },
              creditedAccount: {
                user: { username: credited },
              },
            }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{login.id == debitedId ? `- ${value}` : `+ ${value}`}</td>
                <td>{login.id == debitedId ? credited : debited}</td>
                <td>{new Date(createdAt).toLocaleString()}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </TableS>
  );
}

export default Table;
