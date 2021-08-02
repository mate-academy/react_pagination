import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pagination } from './Pagination';

export const App = () => (
  <>
    <h1>Pagination</h1>
    <Pagination
      total={50}
    />
  </>
);
