import { Input, Modal, Button } from 'antd';
import styled from 'styled-components';
import { useRef, useState } from 'react';
import axios from 'axios';

const { TextArea } = Input;

const StyledModal = styled(Modal)`
  .input-area {
    width: 80%;
    margin: 40px auto;
  }
  .ant-input {
    margin-bottom: 10px;
  }
  .btn-area {
    text-align: center;
  }
`;

export const CreateToDo = ({ showModal, onModalClose, onCreateToDo }) => {
  const titleInput = useRef();
  const contentInput = useRef();
  const [inputData, setInputData] = useState({
    title: '',
    content: '',
  });

  const handleInputData = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = () => {
    if (!inputData.title) {
      titleInput.current.focus();
      return;
    } else if (!inputData.content) {
      contentInput.current.focus();
      return;
    }

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/todos`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: inputData,
    }).then((res) => {
      const title = res.data.data.title;
      const content = res.data.data.content;
      const id = res.data.data.id;
      onCreateToDo(title, content, id);
      onModalClose();
      setInputData({
        title: '',
        content: '',
      });
    });
  };

  return (
    <StyledModal
      title={'할 일 생성하기'}
      open={showModal}
      onCancel={onModalClose}
      footer={null}
    >
      <div className="input-area">
        <Input
          ref={titleInput}
          name="title"
          value={inputData.title}
          onChange={handleInputData}
          placeholder="title"
        />
        <TextArea
          ref={contentInput}
          name="content"
          value={inputData.content}
          onChange={handleInputData}
          placeholder="content"
        />
      </div>
      <div className="btn-area">
        <Button type="primary" onClick={handleCreate}>
          등록
        </Button>
      </div>
    </StyledModal>
  );
};
