import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToDo } from './ToDo';
import { Login } from './auth/Login';
import { PrivateRoot } from './PrivateRoot';

function App() {
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoot />}>
          <Route path="/" element={<ToDo />}></Route>
        </Route>
        <Route>
          <Route path="/auth/login" element={<Login />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
