import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import requests from '../services/requests';
import { FormLoginS } from '../styles';

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

  async function sendLogin() {
    const response = await requests.login(login);
    if ('user' in response) {
      localStorage.setItem('cyber-wallet-ng', JSON.stringify(response));
      window.alert('Bem Vindo!');
      navigate('/wallet');
    } else {
      window.alert('Username ou Senha incorreta!');
    }
  }

  return (
    <FormLoginS>
      <label htmlFor="username">
        <input
          name="username"
          type="text"
          value={login.username}
          placeholder="Email"
          onChange={(event) => handleLogin(event)}
        />
      </label>
      <label htmlFor="password">
        <input
          name="password"
          type="password"
          value={login.password}
          placeholder="Password"
          onChange={(event) => handleLogin(event)}
        />
      </label>
      <button type="button" onClick={sendLogin}>
        Login
      </button>
    </FormLoginS>
  );
}

export default FormLogin;
