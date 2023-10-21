import React from 'react';
import cn from 'classnames';
import { getNumbers, getRandomNumber } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange = () => {},
}) => {
  const maxPages = Math.ceil(total / perPage);

  const getPreviousPage = () => {
    if (currentPage !== 1) {
      onPageChange((prevPage: number) => prevPage - 1);
    }
  };

  const getNextPage = () => {
    if (currentPage !== maxPages) {
      onPageChange((prevPage: number) => prevPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={getPreviousPage}
        >
          «
        </a>
      </li>
      {getNumbers(1, maxPages).map(page => (
        <li
          className={cn('page-item', {
            active: currentPage === page,
          })}
          key={getRandomNumber()}
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
        className={cn('page-item', {
          disabled: currentPage === maxPages,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === maxPages}
          onClick={getNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
