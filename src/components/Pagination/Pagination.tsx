import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  currentPage: number,
  lastPage: number,
  onChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  lastPage,
  onChange,
}) => {
  const handlePrevLink = () => {
    if (currentPage !== 1) {
      onChange(currentPage - 1);
    }
  };

  const handleNextLink = () => {
    if (currentPage !== lastPage) {
      onChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handlePrevLink}
        >
          «
        </a>
      </li>
      {getNumbers(1, lastPage).map(page => (
        <li
          className={`page-item ${currentPage === page && 'active'}`}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={`page-item ${currentPage === lastPage && 'disabled'}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === lastPage}
          onClick={handleNextLink}
        >
          »
        </a>
      </li>
    </ul>
  );
};
