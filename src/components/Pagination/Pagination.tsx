import React from 'react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = (props) => {
  const {
    total,
    perPage,
    currentPage,
    onPageChange,
  } = props;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const maxPage = Math.ceil(total / perPage);
  const allPages = Array.from(
    { length: maxPage },
    (_, i) => i + 1,
  );

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: (currentPage === 1),
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${prevPage}`}
          aria-disabled={currentPage === 1}
          onClick={() => onPageChange(prevPage)}
        >
          «
        </a>
      </li>

      {allPages.map(page => (
        <li
          key={uuidv4()}
          className={classNames('page-item', {
            active: (currentPage === page),
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={classNames('page-item', {
          disabled: (currentPage === maxPage),
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${nextPage}`}
          aria-disabled={currentPage === maxPage}
          onClick={() => onPageChange(nextPage)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
