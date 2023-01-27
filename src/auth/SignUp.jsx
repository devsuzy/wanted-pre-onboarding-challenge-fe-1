import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { LoginForm } from '../components/LoginForm';
import axios from 'axios';

export const SignUp = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const { state } = useLocation();

  const goToLoginPage = () => {
    if (state) {
      navigate(state);
    } else {
      navigate('/login');
    }
  };

  const handleSubmit = (values) => {
    let submitData = {};
    const { email, password } = values;

    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (!emailRegex.test(email)) {
      alert('이메일 형식이 올바르지 않습니다.');
    } else if (password.length < 8) {
      alert('비밀번호는 최소 8자 이상입니다.');
    } else {
      submitData = { email, password };
    }

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/users/create`,
      data: submitData,
    })
      .then((res) => {
        const successStatus = res.status;
        const message = res.data.message;
        const token = res.data.token;

        if (successStatus === 200) {
          alert(message);
          localStorage.setItem('token', token);
          form.resetFields();
          goToLoginPage();
        }
      })
      .catch((res) => {
        const errorStatus = res.response.data.details;
        alert(errorStatus);
      });
  };

  return (
    <Form form={form} onFinish={(values) => handleSubmit(values)}>
      <LoginForm title={'Sign Up'} loginBtn={'가입하기'} />
    </Form>
  );
};
