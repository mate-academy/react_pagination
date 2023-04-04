import classNames from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number
  currentPage: number
  onPageChange: (page: number) => void
};

export const Pagination: React.FC<Props> = ({
  perPage,
  currentPage,
  onPageChange,
  total,
}) => {
  const isFirstPage = currentPage === 1;
  const numbersOfPage = Math.ceil(total / perPage);
  const isLastPage = currentPage === numbersOfPage;

  const listItem = getNumbers(1, numbersOfPage)
    .map(item => (
      <li
        className={classNames(
          'page-item',
          { active: currentPage === item },
        )}
        key={item}
      >
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${item}`}
          onClick={() => {
            if (currentPage !== item) {
              onPageChange(item);
            }
          }}
        >
          {item}
        </a>
      </li>
    ));

  return (
    <>
      <ul className="pagination">
        <li className={classNames('page-item', { disabled: isFirstPage })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={() => {
              if (currentPage !== 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {listItem}

        <li className={classNames(
          'page-item',
          { disabled: isLastPage },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={() => {
              if (currentPage !== numbersOfPage) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
