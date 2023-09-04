import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  curentPage: number;
  onPageChange: (value: number) => void;
};
export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  curentPage = 1,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pageButtons = getNumbers(1, numberOfPages);
  const isFirstPage = curentPage === 1;
  const isLastPage = curentPage === numberOfPages;

  const handlePageChange = (page: number) => {
    if (curentPage !== page) {
      onPageChange(page);
    }
  };

  const handlePrevButton = () => {
    if (!isFirstPage) {
      onPageChange(curentPage - 1);
    }
  };

  const handleNextButton = () => {
    if (!isLastPage) {
      onPageChange(curentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', {
          disable: isFirstPage,
        })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={handlePrevButton}
          >
            «
          </a>
        </li>

        {pageButtons.map(page => (
          <li
            key={page}
            className={cn('page-item', {
              active: curentPage === page,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              aria-disabled={isFirstPage}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li className={cn('page-item', {
          disable: isLastPage,
        })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={handleNextButton}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
