import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination:React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const firstPage = 1;
  const numberPages = Math.ceil(total / perPage);
  const isLastPage = currentPage === numberPages;
  const isFirstPage = currentPage === firstPage;
  const pagesArray = getNumbers(firstPage, numberPages);
  const handleClick = (event: React.MouseEvent<HTMLElement>, page: number) => {
    event.preventDefault();
    onPageChange(page);
  };

  const nextPage = (event: React.MouseEvent<HTMLElement>) => {
    if (!isLastPage) {
      event.preventDefault();
      onPageChange(currentPage + 1);
    }
  };

  const prevPage = (event: React.MouseEvent<HTMLElement>) => {
    if (!isFirstPage) {
      event.preventDefault();
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: isFirstPage,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={(event) => {
            prevPage(event);
          }}
        >
          «
        </a>
      </li>
      {pagesArray.map(page => {
        return (
          <li
            className={cn('page-item', {
              active: currentPage === page,
            })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`${page}`}
              onClick={(event) => {
                handleClick(event, page);
              }}
            >
              {page}
            </a>
          </li>

        );
      })}
      <li className="page-item">
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
          onClick={(event) => {
            nextPage(event);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
