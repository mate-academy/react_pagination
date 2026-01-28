import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
