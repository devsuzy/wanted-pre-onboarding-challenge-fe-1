import { Drawer, Button, Input } from 'antd';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const { TextArea } = Input;

const StyledDrawer = styled(Drawer)`
  .contents {
    margin: 30px 0;
  }
  .contents > input {
    margin-bottom: 10px;
  }
`;

export const TodoDetail = ({ showDrawer, onDrawerClose, onSaveList }) => {
  const [detailData, setDetailData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const getDetailToDo = () => {
      showDrawer &&
        axios({
          method: 'get',
          url: `${process.env.REACT_APP_API_URL}/todos/${showDrawer}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }).then((res) => {
          const targetData = res.data.data;
          setDetailData(targetData);
        });
    };
    getDetailToDo();
  }, [showDrawer]);

  const handleEdit = (e) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;

    switch (targetName) {
      case 'title':
        setDetailData({ ...detailData, title: targetValue });
        break;
      case 'content':
        setDetailData({ ...detailData, content: targetValue });
        break;
    }
  };

  const onEditToDo = (e) => {
    e.preventDefault();
    axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}/todos/${detailData.id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        title: detailData.title,
        content: detailData.content,
      },
    }).then(() => {
      onSaveList();
      setIsEdit(false);
    });
  };

  return (
    <StyledDrawer
      open={showDrawer}
      onClose={onDrawerClose}
      title="할 일 상세 보기"
    >
      {isEdit ? (
        <Button onClick={onEditToDo} type="primary">
          <CheckOutlined />
        </Button>
      ) : (
        <Button
          onClick={(e) => {
            e.preventDefault();
            setIsEdit(true);
          }}
          type="primary"
        >
          <EditOutlined />
        </Button>
      )}

      <div className="contents">
        {isEdit ? (
          <>
            <Input
              name="title"
              value={detailData.title}
              onChange={handleEdit}
            />
            <TextArea
              name="content"
              value={detailData.content}
              onChange={handleEdit}
            />
          </>
        ) : (
          <>
            <h3>{detailData.title}</h3>
            <p>{detailData.content}</p>
          </>
        )}
      </div>
    </StyledDrawer>
  );
};
