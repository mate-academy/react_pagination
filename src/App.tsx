import React, { useState } from 'react';

const getNumbers = (min: number, max: number): number[] => {
  return Array.from({ length: max - min + 1 }, (_, i) => min + i);
};

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
}

const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pageNumbers.map(page => (
        <li
          key={page}
          className={`page-item ${page === currentPage ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={() => {
            if (currentPage < totalPages) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const total = getNumbers(1, 42).length;
  const firstItem = (currentPage - 1) * perPage + 1;
  const lastItem = Math.min(currentPage * perPage, total);

  const infoText = `Page ${currentPage} (items ${firstItem} - ${lastItem} of ${total})`;
  const items = getNumbers(1, 42).map(n => `Item ${n}`);

  const onPerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;
  const itemsToShow = items.slice(startIndex, endIndex);

  return (
    <>
      <div className="container">
        <h1>Items with Pagination</h1>

        <p className="lead" data-cy="info">
          {infoText}
        </p>

        <div className="form-group row">
          <div className="col-3 col-sm-2 col-xl-1">
            <select
              data-cy="perPageSelector"
              id="perPageSelector"
              className="form-control"
              value={perPage}
              onChange={event => onPerPageChange(+event.target.value)}
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
          total={total}
          perPage={perPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        <ul data-cy="items">
          {itemsToShow.map(item => (
            <li key={item} data-cy="item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
