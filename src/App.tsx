import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Pagination } from './Pagination';

const App: React.FC = () => {
  const amountOfPages = 9;
  const pageContent = [];

  const [selectedPage, setSelectedPage] = useState(0);

  const onPageChange = (pageId: number) => {
    setSelectedPage(pageId);
  };

  for (let i = 1; i <= amountOfPages; i += 1) {
    pageContent.push(`Page number ${i}`);
  }

  return (
    <div className="container">
      <h1 className="h1 text-center">
        Pagination
      </h1>
      <p className="text-center">
        {pageContent[selectedPage]}
      </p>
      <Pagination
        total={amountOfPages}
        onSelect={onPageChange}
      />
    </div>
  );
};

export default App;
