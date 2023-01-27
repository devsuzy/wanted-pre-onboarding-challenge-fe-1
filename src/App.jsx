import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToDo } from './pages/ToDo';
import { Login } from './auth/Login';
import { SignUp } from './auth/SignUp';
import { PrivateRoot } from './auth/root/PrivateRoot';

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoot />}>
          <Route path="/" element={<ToDo />}></Route>
        </Route>
        <Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
