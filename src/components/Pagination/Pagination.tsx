import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage = 5,
  currentPage = 1,
  onPageChange,
}) => {
  const pagesNumber = Math.ceil(total / perPage);
  const pages: number[] = getNumbers(1, pagesNumber);

  const handlePageNumberReduct = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handlePageNumberIncrease = () => {
    if (currentPage < pagesNumber) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={
        classNames('page-item', {
          disabled: currentPage <= 1,
        })
      }
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage > 1 ? 'false' : 'true'}
          onClick={handlePageNumberReduct}
        >
          «
        </a>
      </li>
      {pages.map((element) => {
        return (
          <li
            key={element}
            className={
              classNames('page-item', {
                active: element === currentPage,
              })
            }
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href="#1"
              onClick={
                () => {
                  onPageChange(element);
                }
              }
            >
              {element}
            </a>
          </li>
        );
      })}
      <li className={
        classNames('page-item', {
          disabled: currentPage === pagesNumber,
        })
      }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage < pagesNumber ? 'false' : 'true'}
          onClick={handlePageNumberIncrease}
        >
          »
        </a>
      </li>
    </ul>
  );
};
