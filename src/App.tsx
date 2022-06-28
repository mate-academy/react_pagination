import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Pagination } from './Pagination';
import { Content } from './Content';

const App: React.FC = () => {
  const amount = 42;
  const pageContent = [];
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedItemsPerPage, setSelectedItemPerPage] = useState(5);

  for (let i = 1; i <= amount; i += 1) {
    pageContent.push(`Content item ${i}`);
  }

  const lastItem = selectedPage * selectedItemsPerPage;
  const firstItem = lastItem - selectedItemsPerPage;
  const currentContent = pageContent.slice(firstItem, lastItem);

  return (
    <div className="container">
      <h1 className="h1 text-center">
        Pagination
      </h1>
      <form
        method="submit"
        onSubmit={(event) => {
          event.preventDefault();
          setSelectedItemPerPage(itemsPerPage);
        }}
      >
        <div>Set items per page</div>
        <input
          type="number"
          className="input"
          value={itemsPerPage}
          min="2"
          onChange={(event) => {
            setItemsPerPage(+event.target.value);
          }}
        />
        <button
          type="submit"
        >
          Submit
        </button>
      </form>
      <div className="container text-center">
        <Content content={currentContent} />
      </div>
      <Pagination
        total={amount}
        perPage={selectedItemsPerPage}
        onSelect={setSelectedPage}
      />
    </div>
  );
};

export default App;
