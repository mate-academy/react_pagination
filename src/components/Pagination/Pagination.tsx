import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const getNumbersOfButtons = (numbers: number, page: number) => {
  const totalPage = Math.ceil(numbers / page);
  const numbersOfButtons: number[] = [];

  for (let i = 1; i <= totalPage; i += 1) {
    numbersOfButtons.push(i);
  }

  return numbersOfButtons;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageList = getNumbersOfButtons(total, perPage);

  function setPage(value: number) {
    if (value > 0 && value <= pageList.length) {
      onPageChange(value);
    }
  }

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => setPage(currentPage - 1)}
        >
          «
        </a>
      </li>

      {pageList.map((page: number) => {
        return (
          <li
            className={cn('page-item', { active: page === currentPage })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => setPage(page)}
            >
              {page}
            </a>
          </li>
        );
      })}

      <li
        className={cn('page-item', {
          disabled: currentPage === pageList.length,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageList.length ? 'true' : 'false'}
          onClick={() => setPage(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
