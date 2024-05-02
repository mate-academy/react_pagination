import React from 'react';
import cn from 'classnames';

interface Props {
  total: number[];
  perPage: number;
  currentPage: number;
  onPageChange: (page: number, lastNumberOfPage: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages: number[] = total.slice(
    0,
    Math.ceil(total.length / perPage),
  );

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          onClick={() => onPageChange(currentPage - 1, numberOfPages.length)}
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
        >
          «
        </a>
      </li>
      {numberOfPages?.map(item => {
        return (
          <li
            className={cn('page-item', {
              active: numberOfPages.indexOf(item) + 1 === currentPage,
            })}
            key={total?.indexOf(item)}
          >
            <a
              onClick={() => onPageChange(item, numberOfPages.length)}
              data-cy="pageLink"
              className="page-link"
              href={`#${item}`}
            >
              {item}
            </a>
          </li>
        );
      })}
      <li
        className={cn('page-item', {
          disabled: currentPage === numberOfPages.length,
        })}
      >
        <a
          onClick={() => onPageChange(currentPage + 1, numberOfPages.length)}
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={
            currentPage === numberOfPages.length ? 'true' : 'false'
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
