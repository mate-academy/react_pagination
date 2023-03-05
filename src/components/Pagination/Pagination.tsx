import classNames from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = (props) => {
  const {
    total,
    perPage,
    currentPage,
    onPageChange,
  } = props;
  const maxPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, maxPages);
  const disabledNextButton = currentPage === pages.length;
  const disabledPrevButton = currentPage === 1;

  const handleNextButton = () => currentPage < pages.length
    && onPageChange(currentPage + 1);

  const handlePrevButton = () => currentPage > 1
    && onPageChange(currentPage - 1);

  return (
    <ul className="pagination">
      <li
        className={classNames({
          'page-item': true,
          disabled: disabledPrevButton,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={disabledPrevButton}
          onClick={handlePrevButton}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={classNames({
            'page-item': true,
            active: page === currentPage,
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
        className={classNames({
          'page-item': true,
          disabled: disabledNextButton,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={disabledNextButton}
          onClick={handleNextButton}
        >
          »
        </a>
      </li>
    </ul>
  );
};
