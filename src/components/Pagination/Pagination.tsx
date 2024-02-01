import React from 'react';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  changePage: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  changePage,
}) => {
  const totalPages: number[] = getNumbers(1, Math.ceil(total / perPage));

  const handleChangePage = (page: number) => {
    if (page <= totalPages.length && page >= 1 && page !== currentPage) {
      changePage(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => handleChangePage(currentPage - 1)}
        >
          «
        </a>
      </li>
      {totalPages.map((num) => (
        <li
          key={num}
          className={`page-item ${currentPage === num ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${num}`}
            onClick={() => handleChangePage(num)}
          >
            {num}
          </a>
        </li>
      ))}
      <li className={`page-item ${currentPage === totalPages.length ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages.length}
          onClick={() => handleChangePage(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
