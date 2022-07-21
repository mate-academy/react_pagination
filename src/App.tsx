import React, { useEffect, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(9);

  const lastElemetOnPage = (currentPage * itemsPerPage) <= items.length
    ? currentPage * itemsPerPage
    : (currentPage - 1) * itemsPerPage + (items.length % itemsPerPage);

  const firstElemetOnPage = (currentPage - 1) * itemsPerPage;

  useEffect(() => {
    setTotal(Math.ceil(items.length / itemsPerPage));
  });

  const handleChangeCurrentPage = (
    event: React.FormEvent<HTMLAnchorElement>,
  ) => {
    const page = event.currentTarget.href.split('#').slice(-1)[0];

    if (page === 'prev') {
      setCurrentPage(currentPage - 1);
    } else if (page === 'next') {
      setCurrentPage(currentPage + 1);
    } else if (
      currentPage !== Number(page)
      && currentPage >= 1
      && currentPage <= total
    ) {
      setCurrentPage(Number(page));
    }
  };

  const handleItemsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstElemetOnPage + 1} - ${lastElemetOnPage} of ${items.length})`}
      </p>

      <Pagination
        total={total}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handleChangeCurrentPage}
        onPerPageChange={handleItemsPerPage}
      />
      <ul>
        {
          items
            .slice(firstElemetOnPage, lastElemetOnPage)
            .map(item => (<li data-cy="item" key={item}>{item}</li>))
        }
      </ul>
    </div>
  );
};

export default App;
