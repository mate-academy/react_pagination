import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';
import { PerPageSelector } from './components/PerPageSelector';
import { ItemList } from './components/ItemList';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const pageQueryParam = queryParams.get('page');
  const perPageQueryParam = queryParams.get('perPage');

  const [perPage, setPerPage] = useState(
    perPageQueryParam ? parseInt(perPageQueryParam, 10) : 5,
  );
  const [currentPage, setCurrentPage] = useState(
    pageQueryParam ? parseInt(pageQueryParam, 10) : 1,
  );

  const changePage = (page: number) => {
    setCurrentPage(page);
    queryParams.set('page', String(page));
    navigate({ search: queryParams.toString() });
  };

  const handlePerPageChange = (perPageValue: number) => {
    setPerPage(perPageValue);
    queryParams.set('perPage', String(perPageValue));
    queryParams.set('page', '1');
    navigate({ search: queryParams.toString() });
  };

  useEffect(() => {
    if (pageQueryParam) {
      setCurrentPage(parseInt(pageQueryParam, 10));
    }
  }, [pageQueryParam]);

  const total = items.length;
  const maxPage = perPage * currentPage;
  const startPage = maxPage - perPage;
  const endPage = maxPage > total ? total : maxPage;

  const visiblePages = items.slice(startPage, endPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startPage + 1} - ${endPage} of ${total})`}
      </p>

      <PerPageSelector
        perPage={perPage}
        onPerPageChange={handlePerPageChange}
      />

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={changePage}
      />

      <ItemList items={visiblePages} />
    </div>
  );
};

export default App;
