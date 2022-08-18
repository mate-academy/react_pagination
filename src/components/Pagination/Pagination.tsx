import React from 'react';
import classNames from 'classnames';

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
  const numberOfItems = Math.ceil(total / perPage);
  const isSelectedFirst = currentPage === 1;
  const isSelectedLast = currentPage === numberOfItems;

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        {
          disabled: isSelectedFirst,
        },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isSelectedFirst}
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {Array.from(Array(numberOfItems + 1).keys()).slice(1).map(num => (
        <li
          className={classNames(
            'page-item',
            {
              active: num === currentPage,
            },
          )}
          key={num}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${num}`}
            onClick={() => onPageChange(num)}
          >
            {num}
          </a>
        </li>
      ))}

      <li className={classNames(
        'page-item',
        {
          disabled: isSelectedLast,
        },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isSelectedLast}
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
