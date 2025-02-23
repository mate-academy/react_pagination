import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pagesList = getNumbers(1, totalPages).map(n => n);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: currentPage === 1,
        })}
        onClick={handlePrevClick}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
        >
          «
        </a>
      </li>

      {pagesList.map(page => (
        <li
          key={page}
          className={classNames('page-item', {
            active: page === currentPage,
          })}
          onClick={() => onPageChange(page)}
        >
          <a data-cy="pageLink" className="page-link" href={`#${page}`}>
            {page}
          </a>
        </li>
      ))}

      <li
        className={classNames('page-item', {
          disabled: currentPage === totalPages,
        })}
        onClick={handleNextClick}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages ? 'true' : 'false'}
        >
          »
        </a>
      </li>
    </ul>
  );
};
