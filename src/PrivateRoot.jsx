import React, { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

export const PrivateRoot = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      alert('토큰이 유효하지 않아 로그인 페이지로 이동합니다.');
      navigate('/auth/login', { state: pathname });
    }
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};
