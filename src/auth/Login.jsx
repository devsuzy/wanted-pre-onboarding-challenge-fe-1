import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import styled from 'styled-components';
import axios from 'axios';

const StyledLoginForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 350px;
  margin: 0 auto;

  .ant-form-item {
    width: 100%;
  }

  Button {
    width: 100%;
    height: 40px;
  }
`;

export const Login = () => {
  const [form] = useForm();

  const handleSubmit = (values) => {
    let submitLoginData = {};
    const { email, password } = values;

    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (!emailRegex.test(email)) {
      alert('이메일 형식이 올바르지 않습니다.');
    } else if (password.length < 8) {
      alert('비밀번호는 최소 8자 이상입니다.');
    } else {
      submitLoginData = { email, password };
      console.log(submitLoginData);
    }

    axios({
      method: 'post',
      url: 'http://localhost:8080/users/login',
      data: submitLoginData,
    }).then((res) => {
      console.log(res);
    });
    form.resetFields();
  };

  return (
    <StyledLoginForm form={form} onFinish={(values) => handleSubmit(values)}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: '이메일을 입력해주세요.' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          로그인
        </Button>
      </Form.Item>
      <Form.Item>
        <Button>회원가입</Button>
      </Form.Item>
    </StyledLoginForm>
  );
};
