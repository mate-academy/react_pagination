import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onChangePage: (pages: number) => void,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onChangePage,
}) => {
  const totalPages: number = Math.ceil(total / perPage);
  const pages: number[] = getNumbers(1, totalPages);
  const items = getNumbers(1, total)
    .map(item => `Item ${item}`);
  const currentItems = items
    .slice((currentPage - 1) * perPage, currentPage * perPage);

  const onPrevLink = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  };

  const onNextLink = () => {
    if (currentPage < totalPages) {
      onChangePage(currentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={onPrevLink}
          >
            «
          </a>
        </li>

        {pages.map(page => (
          <li
            className={cn('page-item', { active: currentPage === page })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => {
                if (page !== currentPage) {
                  onChangePage(page);
                }
              }}

            >
              {page}
            </a>
          </li>
        ))}

        <li className={
          cn('page-item', { disabled: currentPage === totalPages })
        }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages}
            onClick={onNextLink}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {currentItems.map(item => (
          <li data-cy="item">{item}</li>
        ))}
      </ul>

    </>

  );
};
