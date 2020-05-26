import React, { useState, useEffect } from 'react';
import './App.css';

import { PostFromSever } from './helper/api';
import { Pagination } from './components/Pagination';

import { VisiblePost } from './components/VisiblePost';

const App = (props) => {
  const [posts, getPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const onPageChange = (e, CurrentPage) => {
    e.preventDefault();
    if (CurrentPage < 1 || CurrentPage > Math.ceil(posts.length / perPage)) {
      return;
    }

    setPage(CurrentPage);
  };

  const handleChangePerPage = (event) => {
    setPage(1);
    setPerPage(+event.target.value);
  };

  const selectPerPage = [3, 5, 10, 20];

  useEffect(() => {
    PostFromSever().then(getPosts);
  }, []);

  return (
    <div className="container">
      <h1>Pagination</h1>
      <select
        value={perPage}
        onChange={handleChangePerPage}
        className="form-control"
      >
        {selectPerPage.map(p => (
          <option key={p} value={p}>{p}</option>
        ))}

      </select>
      <VisiblePost
        page={page}
        perPage={perPage}
        posts={posts}
      />

      <Pagination
        onPageChange={onPageChange}
        total={posts.length}
        perPage={perPage}
        page={page}
      />
    </div>
  );
};

export default App;
