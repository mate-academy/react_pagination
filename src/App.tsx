import React, { useState } from 'react';
import { Pagination } from './components/Pagination';
import './App.css';
import { getNumbers, getVisibleAmountItems } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleItems, setVisibleItems] = useState(items
    .slice(0, itemsPerPage));
  const [
    visibleAmountItems,
    setVisibleAmountItems,
  ] = useState(() => getVisibleAmountItems(10, 1));

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setVisibleAmountItems(getVisibleAmountItems(
      itemsPerPage,
      pageNumber,
      items.length,
    ));

    setVisibleItems(items.slice(
      itemsPerPage * pageNumber - itemsPerPage,
      itemsPerPage * pageNumber > items.length
        ? items.length
        : itemsPerPage * pageNumber,
    ));
  };

  const hendlerItemPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const amountItems = +event.currentTarget.value;
    const initialPage = 1;

    setCurrentPage(initialPage);
    setItemsPerPage(amountItems);
    setVisibleItems(items.slice(
      initialPage * amountItems - amountItems,
      amountItems,
    ));
    setVisibleAmountItems(getVisibleAmountItems(amountItems, initialPage));
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} `}
        {`(items ${visibleAmountItems.start} - ${visibleAmountItems.end} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={hendlerItemPerPage}
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
        total={items.length}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={changePage}
      />

      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
