import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/styles/main.scss';

import AuthProvider from './context/auth';
import SigninPage from './pages/public/signin';
import MePage from './pages/protected/me';
import LogoutPage from './pages/public/logout';
import worker from './mocks/browser';

if (process.env.NODE_ENV === 'development') {
  void worker.start();
}

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<>404</>} />
        <Route path="/" element={<SigninPage />} />
        <Route path="/me" element={<MePage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
