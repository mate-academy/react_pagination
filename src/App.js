import React, { useState, useEffect } from 'react';
import './App.css';

import { Route, useHistory, useLocation } from 'react-router-dom';
import { PostFromSever } from './helper/api';
import { Pagination } from './components/Pagination';

import { VisiblePost } from './components/VisiblePost';

const App = (props) => {
  const [posts, getPosts] = useState([]);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    PostFromSever().then(getPosts);
  }, []);

  const searchParams = new URLSearchParams(location.search);
  const pageParams = Number(searchParams.get('page')) || 1;
  const perPageParams = Number(searchParams.get('perPage')) || 5;
  const selectPerPage = [3, 5, 10, 20];

  const onPageChange = (CurrentPage) => {
    if (CurrentPage < 1
       || CurrentPage > Math.ceil(posts.length / perPageParams)) {
      return;
    }

    searchParams.set('page', `${CurrentPage}`);
    history.push({
      search: searchParams.toString(),
    });
  };

  const handleChangePerPage = (event) => {
    searchParams.set('perPage', event.target.value);
    searchParams.set('page', 1);
    history.push({
      search: searchParams.toString(),
    });
  };

  return (
    <div className="container">
      <h1>Pagination</h1>
      <select
        value={perPageParams}
        onChange={handleChangePerPage}
        className="form-control"
      >
        {selectPerPage.map(p => (
          <option key={p} value={p}>{p}</option>
        ))}

      </select>
      <Route
        path="/"
        render={({ match }) => (
          <VisiblePost
            page={pageParams}
            perPage={perPageParams}
            posts={posts}
          />
        )}
      />

      <Pagination
        onPageChange={onPageChange}
        total={posts.length}
        perPage={perPageParams}
        page={pageParams}
      />
    </div>
  );
};

export default App;
