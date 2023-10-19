import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pageButtons = getNumbers(1, totalPages)
    .map(n => (
      <li
        key={n}
        className={cn(
          'page-item',
          // eslint-disable-next-line quote-props
          { 'active': n === currentPage },
        )}
      >
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${n}`}
          onClick={() => onPageChange(n)}
        >
          {n}
        </a>
      </li>
    ));

  const onPrevNextHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const current = event.currentTarget.getAttribute('data-cy');

    switch (current) {
      case 'prevLink':
        if (currentPage !== 1) {
          onPageChange(currentPage - 1);
        }

        break;
      case 'nextLink':
        if (currentPage !== totalPages) {
          onPageChange(currentPage + 1);
        }

        break;

      default:
        break;
    }
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={cn(
            'page-item',
            { disabled: currentPage === 1 },
          )}
        >
          <a
            data-cy="prevLink"
            className={cn('page-link')}
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={(event) => onPrevNextHandler(event)}
          >
            «
          </a>
        </li>
        {pageButtons}
        <li
          className={cn(
            'page-item',
            { disabled: currentPage === totalPages },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages}
            onClick={(event) => onPrevNextHandler(event)}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
