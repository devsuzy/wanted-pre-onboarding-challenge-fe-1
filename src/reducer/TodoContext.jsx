import axios from 'axios';
import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  todo: {
    loading: false,
    data: null,
    error: null,
  },
};

const loadingState = {
  loading: true,
  data: null,
  error: null,
};

const success = (data) => ({
  loading: false,
  data,
  error: null,
});

const error = (error) => ({
  loading: false,
  data: null,
  error,
});

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        todo: loadingState,
      };
    case 'SUCCESS':
      return {
        ...state,
        todo: success(action.data),
      };
    case 'ERROR':
      return {
        ...state,
        todo: error(action.error),
      };
    default:
      throw new Error(`Unhanlded action type: ${action.type}`);
  }
};

const TodoStateContext = createContext(null);
const TodoDispatchContext = createContext(null);

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

export const useTodoState = () => {
  const state = useContext(TodoStateContext);
  if (!state) {
    throw new Error('Cannot find Provider');
  }
  return state;
};

export const useTodoDispatch = () => {
  const dispatch = useContext(TodoDispatchContext);
  if (!dispatch) {
    throw new Error('Cannot find Provider');
  }
  return dispatch;
};

export const getToDoList = async (dispatch) => {
  dispatch({ type: 'LOADING' });
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/todos`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const listData = response.data.data;
    dispatch({ type: 'SUCCESS', data: listData });
  } catch (error) {
    dispatch({ type: 'ERROR', error });
  }
};
