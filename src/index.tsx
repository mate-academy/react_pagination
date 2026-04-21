import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);

  root.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>,
  );
}
