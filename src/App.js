import React from 'react';
import './App.css';
import Pagination from './components/Pagination';

const data = [
  'Тут',
  'розміщені',
  'дані',
  'з',
  'різних',
  'сторінок',
  'даного',
  'сайту',
  '!',
  ')',
];

const App = () => (
  <>
    <h1>Pagination</h1>
    <Pagination
      total={10}
      page={1}
      perPage={1}
      data={data}
    />
  </>
);

export default App;
