import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
  startItem: number,
  endItem: number,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  startItem,
  endItem,
}) => {
  const lastPage = Math.ceil(total / perPage);
  const pageNumbers = getNumbers(1, lastPage);
  const items = getNumbers(startItem, endItem);

  const handleNextButton = () => {
    if (lastPage !== currentPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevButton = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames(
            'page-item',
            {
              disabled: currentPage === 1,
            },
          )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={handlePrevButton}
          >
            «
          </a>
        </li>

        {pageNumbers.map(number => (
          <li
            key={number}
            className={classNames(
              'page-item',
              {
                active: number === currentPage,
              },
            )}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${number}`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </a>
          </li>
        ))}

        <li
          className={classNames(
            'page-item',
            {
              disabled: currentPage === lastPage,
            },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === lastPage}
            onClick={handleNextButton}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {items.map(item => (
          <li data-cy="item" key={item}>
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </>
  );
};
