import React, { useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Pagination } from './components/Pagination';
import { useSearchParams } from './helpers/useSearchParams';

import {
  DEFAULT_PAGE, DEFAULT_PER_PAGE, DEFAULT_TOTAL,
} from './helpers/constants';

function calculateCurrentPage(page, total, perPage) {
  return Math.min(page, Math.ceil(total / perPage));
}

function paginationReducer(state, action) {
  switch (action.type) {
    case 'SET_TOTAL':
      return {
        ...state,
        total: +action.value,
        page: +calculateCurrentPage(state.page, action.value, state.perPage),
      };

    case 'SET_PER_PAGE':
      return {
        ...state,
        perPage: +action.value,
        page: +calculateCurrentPage(state.page, state.total, action.value),
      };

    case 'SET_PAGE':
      return {
        ...state,
        page: +calculateCurrentPage(action.value, state.total, state.perPage),
      };

    default:
      throw new Error('Unknown action type = ', action.type);
  }
}

const App = () => {
  const [searchParams, updateSearchParams] = useSearchParams();
  const [state, dispatch] = useReducer(paginationReducer, {
    total: +searchParams.get('total') || DEFAULT_TOTAL,
    perPage: +searchParams.get('perPage') || DEFAULT_PER_PAGE,
    page: +searchParams.get('page') || DEFAULT_PAGE,
  });

  const handleChange = (type, key, value) => {
    dispatch({
      type, value,
    });
    updateSearchParams(key, value);
  };

  return (
    <div className="App container">
      <Pagination
        {...state}
        onTotalChange={
          value => handleChange('SET_TOTAL', 'total', value)
        }
        onPerPageChange={
          value => handleChange('SET_PER_PAGE', 'perPage', value)
        }
        onPageChange={
          value => handleChange('SET_PAGE', 'page', value)
        }
        withInfo
      />
    </div>
  );
};

export default App;
