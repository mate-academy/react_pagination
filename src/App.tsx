import { FC, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { PaginationForm } from './components/PaginationForm';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const start = (currentPage - 1) * perPage;
  const end = currentPage * perPage > items.length
    ? items.length
    : currentPage * perPage;

  const visibleItems = items.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = Number(event.target.value);

    setPerPage(selectedOption);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${start + 1} - ${end} of ${items.length})`}
      </p>

      <PaginationForm
        perPage={perPage}
        handlePerPageChange={handlePerPageChange}
      />

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        setCurrentPage={setCurrentPage}
      />

      <ul>
        {visibleItems.map(item => (
          <li
            key={item}
            data-cy="item"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
