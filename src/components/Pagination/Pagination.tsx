import classNames from 'classnames';
import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (selectPage: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pageCount = Math.ceil(total / perPage);
  const pages = Array.from({ length: pageCount }, (num, i) => i + 1);

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: currentPage === 1,
        })}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          href="#prev"
        >
          «
        </a>
      </li>

      {pages.map(item => (
        <li
          key={item}
          onClick={() => onPageChange(item)}
          className={classNames('page-item', {
            active: item === currentPage,
          })}
        >
          <a data-cy="pageLink" className="page-link" href={`#${item}`}>
            {item}
          </a>
        </li>
      ))}

      <li
        onClick={() => currentPage < pageCount && onPageChange(currentPage + 1)}
        className={classNames('page-item', {
          disabled: currentPage === pageCount,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageCount ? 'true' : 'false'}
        >
          »
        </a>
      </li>
    </ul>
  );
};
