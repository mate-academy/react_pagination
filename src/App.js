import React from 'react';
import './App.css';
import { Pagination } from './Pagination';

const data = [...Array(26)].map((e, i) => (i + 10).toString(36));

const App = () => (
  <div>
    <h1 className="title">Pagination</h1>
    <Pagination
      total={26}
      perPage={5}
      page={1}
      data={data}
    />
  </div>
);

export default App;
