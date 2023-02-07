import { useReducer, useEffect } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhanlded action type: ${action.type}`);
  }
};

export const useAsync = (callback, deps = []) => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: [],
    error: null,
  });

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await callback();
      dispatch({ type: 'SUCCESS', data });
    } catch (error) {
      dispatch({ type: 'ERROR', error });
    }
  };

  useEffect(() => {
    fetchData();
  }, deps);

  return [state, fetchData];
};
