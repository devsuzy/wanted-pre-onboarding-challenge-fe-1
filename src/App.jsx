import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './auth/Login';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
