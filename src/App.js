import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pagination } from './Pagination';

export const App = () => (
  <Pagination
    total={50}
  />
);
