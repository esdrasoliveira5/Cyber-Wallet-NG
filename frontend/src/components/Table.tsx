import React, { useEffect, useState } from 'react';

import requests from '../services/requests';
import { TableS } from '../styles';
import { Transaction, UserLogin } from '../types';

function Table() {
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

  if (transactions.length === 0) {
    return <h1>Voce nao tem pedidos</h1>;
  }
  return (
    <TableS>
      <table>
        <thead>
          <tr>
            <th>Transacao</th>
            <th>Valor</th>
            <th>Nome do Usuario</th>
            <th>Data da Transacao</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(({ id, createdAt, value, creditedAccount }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{value}</td>
              <td>{creditedAccount.user.username}</td>
              <td>{new Date(createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableS>
  );
}

export default Table;
