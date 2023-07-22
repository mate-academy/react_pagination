import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPageNumber = Math.ceil(total / perPage);

  const pageNumbers = getNumbers(1, totalPageNumber);

  const selectPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const selectedPageNumber = Number(event.currentTarget.textContent);

    if (selectedPageNumber !== currentPage) {
      onPageChange(selectedPageNumber);
    }
  };

  const handleClickPrevLink = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleClickNextLink = () => {
    if (currentPage < totalPageNumber) {
      onPageChange(currentPage + 1);
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
          onClick={handleClickPrevLink}
        >
          «
        </a>
      </li>
      {pageNumbers.map(item => (
        <li
          key={item}
          className={cn('page-item', {
            active: item === currentPage,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href="#1"
            onClick={(e) => {
              selectPage(e);
            }}
          >
            {item}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', {
          disabled: currentPage === totalPageNumber,
        })}
      >
        <a
          data-cy="nextLink"
          href="#next"
          className="page-link"
          aria-disabled={currentPage === totalPageNumber}
          onClick={handleClickNextLink}
        >
          »
        </a>
      </li>
    </ul>
  );
};
