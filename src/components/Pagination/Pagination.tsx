import React, { useEffect } from 'react';
import classNames from 'classnames';

 type Props = {
   total: number,
   perPage: number,
   currentPage: number,
   onPageChange: ((page: number) => void),
 };

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  useEffect(() => {
    onPageChange(1);
  }, [perPage]);

  const maxPagination = Math.ceil(total / perPage);
  const pagination = [...Array(maxPagination)].map((_, i) => i + 1);
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === pagination.length;

  const prevPage = () => {
    if (!isPrevDisabled) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (!isNextDisabled) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames(
          'page-item',
          {
            disabled: isPrevDisabled,
          },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isPrevDisabled}
          onClick={prevPage}
        >
          «
        </a>
      </li>

      {pagination.map(item => (
        <li
          key={item}
          className={classNames(
            'page-item',
            {
              active: currentPage === item,
            },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </a>
        </li>
      ))}

      <li
        className={classNames(
          'page-item',
          {
            disabled: isNextDisabled,
          },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isNextDisabled}
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
