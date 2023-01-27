import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 350px;
  margin: 0 auto;
  text-align: center;

  .ant-form-item {
    width: 100%;
  }
  Button {
    width: 100%;
    height: 40px;
  }
`;

export const LoginForm = ({ title, loginBtn, signUpBtn }) => {
  return (
    <FormWrapper>
      <h2>{title}</h2>
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
          {loginBtn}
        </Button>
      </Form.Item>
      <Form.Item>
        <Link to="/signUp">
          <p>{signUpBtn}</p>
        </Link>
      </Form.Item>
    </FormWrapper>
  );
};
