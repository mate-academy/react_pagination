import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const totalItems = 42;
  const defaultPerPage = 5;

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page') || '1', 10);
    const perPage = parseInt(params.get('perPage') || `${defaultPerPage}`, 10);

    return { page, perPage };
  };

  const [currentPage, setCurrentPage] = useState<number>(getQueryParams().page);
  const [perPage, setPerPage] = useState<number>(getQueryParams().perPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`?page=${page}&perPage=${perPage}`);
  };

  useEffect(() => {
    const { page: quryPage, perPage: quryPerPage } = getQueryParams();

    setCurrentPage(quryPage);
    setPerPage(quryPerPage);
  }, [location.search]);

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
    navigate(`?page=1&perPage=${newPerPage}`);
  };

  const items = getNumbers(1, totalItems);
  const currentItems = items.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>
      <Pagination
        total={totalItems}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
      />
      <ul>
        {currentItems.map((item, index) => (
          <li key={index} data-cy="item">
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
