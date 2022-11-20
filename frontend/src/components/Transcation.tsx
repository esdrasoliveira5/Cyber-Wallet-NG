import { useContext, useState } from 'react';

import cyberWalletContext from '../context/AppContext';
import requests from '../services/requests';
import { FormS } from '../styles';
import { AccountState, UserLogin } from '../types';

function Transaction() {
  const { account } = useContext(cyberWalletContext) as AccountState;

  const [transaction, setTransaction] = useState({
    creditedUsername: '',
    value: 0,
  });

  function handleTransaction({ target }: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = target;
    setTransaction({
      ...transaction,
      [name]: value,
    });
  }

  async function sendTransaction(): Promise<void> {
    const localResponse = localStorage.getItem('cyber-wallet-ng');
    if (localResponse !== null) {
      const { token }: UserLogin = JSON.parse(localResponse);
      const response = await requests.createTransaction(transaction, token);
      if ('error' in response) {
        if (transaction.creditedUsername === '') {
          window.alert('Usuário não pode ser vazio!');
        } else if (transaction.value === 0) {
          window.alert('Valor não pode ser vazio!');
        } else if (transaction.value > account.balance) {
          window.alert('Saldo insuficiente!');
        } else {
          window.alert('Usuário não encontrado!');
        }
      } else {
        window.alert('Transferencia concluida com Sucesso!');
        location.reload();
      }
    }
  }

  return (
    <FormS>
      <label htmlFor="username">
        <p>Pra quem vamos enviar ?</p>
        <input
          name="creditedUsername"
          type="text"
          value={transaction.creditedUsername}
          placeholder="Nome de Usuario"
          onChange={(event) => handleTransaction(event)}
        />
      </label>
      <label htmlFor="password">
        <p>Qual o valor você quer enviar ?</p>
        <input
          name="value"
          type="number"
          value={transaction.value === 0 ? undefined : transaction.value}
          min="1"
          placeholder="Valor"
          onChange={(event) => handleTransaction(event)}
        />
      </label>
      <button type="button" onClick={sendTransaction}>
        Enviar
      </button>
      <button
        type="button"
        onClick={() => setTransaction({ creditedUsername: '', value: 0 })}
      >
        Limpar
      </button>
    </FormS>
  );
}

export default Transaction;
