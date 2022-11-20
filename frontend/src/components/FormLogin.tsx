import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import requests from '../services/requests';
import { FormS } from '../styles';

function FormLogin() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  function handleLogin({ target }: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = target;
    setLogin({
      ...login,
      [name]: value,
    });
  }

  async function sendLogin(): Promise<void> {
    const response = await requests.login(login);
    if ('user' in response) {
      localStorage.setItem('cyber-wallet-ng', JSON.stringify(response));
      window.alert('Bem Vindo!');
      navigate('/wallet');
    } else {
      window.alert('Username ou Senha incorreta!');
    }
  }

  async function createAccount(): Promise<void> {
    const response = await requests.createUser(login);
    if ('error' in response) {
      if (response.error === 'Invalid Username') {
        window.alert('Nome de Usuario Invalido');
      } else if (response.error === 'Invalid Password') {
        window.alert('Senha Invalida');
      }
    } else {
      localStorage.setItem('cyber-wallet-ng', JSON.stringify(response));
      window.alert('Bem Vindo!');
      navigate('/wallet');
    }
  }

  return (
    <FormS>
      <label htmlFor="username">
        <input
          name="username"
          type="text"
          value={login.username}
          placeholder="Nome de Usuario"
          onChange={(event) => handleLogin(event)}
        />
      </label>
      <label htmlFor="password">
        <input
          name="password"
          type="password"
          value={login.password}
          placeholder="Senha"
          onChange={(event) => handleLogin(event)}
        />
      </label>
      <button type="button" onClick={sendLogin}>
        Login
      </button>
      <button type="button" onClick={createAccount}>
        Cadastrar
      </button>
    </FormS>
  );
}

export default FormLogin;
