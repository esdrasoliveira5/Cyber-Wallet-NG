import './App.css';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CyberWalletProvider from './context/CyberWalletProvider';
import Login from './pages/Login';
import Main from './pages/Main';

function App() {
  return (
    <CyberWalletProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/wallet" element={<Main />} />
      </Routes>
    </CyberWalletProvider>
  );
}

export default App;
