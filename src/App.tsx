import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedPage, setSelectedPage] = useState(1);
  const totalContent = 42;
  const pagesCount = Math.ceil(totalContent / itemsPerPage);
  const firstItem = selectedPage * itemsPerPage - itemsPerPage + 1;
  const lastItem = () => {
    const lastItemFinde = itemsPerPage * selectedPage;

    if (lastItemFinde > totalContent) {
      return totalContent;
    }

    return lastItemFinde;
  };

  function changePages(event: React.ChangeEvent<HTMLSelectElement>) {
    setItemsPerPage(+event.target.value);
    setSelectedPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${firstItem} - ${lastItem()} of ${totalContent})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={changePages}
            value={itemsPerPage}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        pagesCount={pagesCount}
        onSelectedPage={setSelectedPage}
        selectedPage={selectedPage}
        firstItem={firstItem}
        lastItem={lastItem()}
      />

    </div>
  );
};

export default App;
