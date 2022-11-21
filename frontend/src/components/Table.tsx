import React, { useContext, useEffect, useState } from 'react';

import cyberWalletContext from '../context/AppContext';
import requests from '../services/requests';
import { FilterFormS, TableS } from '../styles';
import { LoginState, Transaction, UserLogin } from '../types';

function Table() {
  const { login } = useContext(cyberWalletContext) as LoginState;
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filters, setFilters] = useState({
    createdAt: '',
    cashIn: true,
    cashOut: true,
  });
  useEffect(() => {
    const getTransactions = async () => {
      const localResponse = localStorage.getItem('cyber-wallet-ng');
      if (localResponse !== null) {
        const { token }: UserLogin = JSON.parse(localResponse);
        const transactions = (await requests.getAllTransactions(token)) as Transaction[];
        if (!('error' in transactions)) {
          setTransactions(transactions);
        }
      }
    };
    getTransactions();
  }, []);

  const submitCategory = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const sendFilters = async () => {
    const localResponse = localStorage.getItem('cyber-wallet-ng');
    if (localResponse !== null) {
      const { token }: UserLogin = JSON.parse(localResponse);
      const transactions = (await requests.getAllTransactionsByFilter(
        token,
        filters,
      )) as Transaction[];
      if (!('error' in transactions)) {
        setTransactions(transactions);
      }
    }
  };

  const clearFilters = async () => {
    const cleanParams = { createdAt: '', cashIn: true, cashOut: true };
    const localResponse = localStorage.getItem('cyber-wallet-ng');
    if (localResponse !== null) {
      const { token }: UserLogin = JSON.parse(localResponse);
      const transactions = (await requests.getAllTransactionsByFilter(
        token,
        cleanParams,
      )) as Transaction[];
      if (!('error' in transactions)) {
        setTransactions(transactions);
      }
    }
    setFilters(cleanParams);
  };

  const formatValue = (data: number) => {
    return data.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <TableS>
      <FilterFormS>
        <div>
          <input
            type="date"
            name="createdAt"
            value={filters.createdAt}
            onChange={submitCategory}
          />
        </div>
        <div>
          <label>
            {'Entradas '}
            <input
              name="cashIn"
              type="checkbox"
              checked={filters.cashIn}
              onChange={() => setFilters({ ...filters, cashIn: !filters.cashIn })}
            />
          </label>
          <label>
            {'Saidas '}
            <input
              name="cashOut"
              type="checkbox"
              checked={filters.cashOut}
              onChange={() => setFilters({ ...filters, cashOut: !filters.cashOut })}
            />
          </label>
        </div>
        <div>
          <button type="button" onClick={sendFilters}>
            Enviar
          </button>
          <button type="button" onClick={clearFilters}>
            Limpar
          </button>
        </div>
      </FilterFormS>
      {transactions.length === 0 ? (
        <h1>Voce não tem transações</h1>
      ) : (
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
              (
                {
                  id,
                  createdAt,
                  value,
                  debitedAccount: {
                    user: { id: debitedId, username: debited },
                  },
                  creditedAccount: {
                    user: { username: credited },
                  },
                },
                i,
              ) => (
                <tr key={id}>
                  <td>{transactions.length - i}</td>
                  <td>
                    {login.id == debitedId
                      ? `- ${formatValue(value)}`
                      : `+ ${formatValue(value)}`}
                  </td>
                  <td>{login.id == debitedId ? credited : debited}</td>
                  <td>{new Date(createdAt).toLocaleString()}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      )}
    </TableS>
  );
}

export default Table;
