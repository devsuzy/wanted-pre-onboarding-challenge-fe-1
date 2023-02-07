import React, { useState, useEffect } from 'react';
import { Button, List, Spin } from 'antd';
import { MoreOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { CreateToDo } from './Modal/CreateTodo';
import { TodoDetail } from './TodoDetail';
import styled from 'styled-components';
import {
  useTodoState,
  useTodoDispatch,
  getToDoList,
} from '../reducer/TodoContext';
// import { useAsync } from '../reducer/useAsync';

const StyledTodoList = styled.div`
  .list-btn {
    border: none;
    padding: 4px 8px;
  }
`;

export const TodoList = () => {
  // const [state, refetch] = useAsync(getToDoList, [saveList]);
  const state = useTodoState();
  const dispatch = useTodoDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [saveList, setSaveList] = useState(false);

  const { data, loading, error } = state.todo;

  useEffect(() => {
    getToDoList(dispatch);
  }, [saveList]);

  if (loading) return <Spin />;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!data) return null;

  const onModalClose = () => {
    setShowModal(false);
  };

  const onDrawerClose = () => {
    setShowDrawer(false);
  };

  const onDrawerOpen = (e) => {
    setShowDrawer(e);
  };

  const onSaveList = () => {
    setSaveList(!saveList);
  };

  const onCreateToDo = (title, content, id) => {
    const createItem = {
      title,
      content,
      id,
    };
    dispatch({ type: 'SUCCESS', data: [...data, createItem] });
  };

  const onDeleteToDo = (targetId) => {
    axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}/todos/${targetId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(() => {
      onSaveList();
    });
  };

  return (
    <StyledTodoList>
      <h3>할 일 목록</h3>
      <Button onClick={() => setShowModal(true)} type="primary">
        Create
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                onClick={() => onDrawerOpen(item.id)}
                className="list-btn"
              >
                <MoreOutlined />
              </Button>,
              <Button
                onClick={() => {
                  onDeleteToDo(item.id);
                }}
                className="list-btn"
              >
                <DeleteOutlined />
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={<p>{item.title}</p>}
              description={<p>{item.content}</p>}
            />
          </List.Item>
        )}
      />
      <CreateToDo
        showModal={showModal}
        onModalClose={onModalClose}
        onCreateToDo={onCreateToDo}
      />
      <TodoDetail
        showDrawer={showDrawer}
        onDrawerClose={onDrawerClose}
        onSaveList={onSaveList}
      />
    </StyledTodoList>
  );
};
