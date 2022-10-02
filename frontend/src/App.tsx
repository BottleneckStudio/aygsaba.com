import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/styles/main.scss';

import SigninPage from './pages/public/signin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<>404</>} />
        <Route path="/" element={<SigninPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
