import React from 'react';
import classNames from 'classnames';
import { getPages } from '../../utils/utils';

type Props = {
  perPage: number,
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  perPage,
  currentPage,
  onPageChange = () => {},
}) => {
  const pages = getPages(perPage);

  const firstPage = pages[0];
  const lastPage = pages[pages.length - 1];

  const isFirst = currentPage === firstPage;
  const isLast = currentPage === lastPage;

  const handleClickPrev = () => onPageChange(
    isFirst ? firstPage : currentPage - 1,
  );

  const handleClickNext = () => onPageChange(
    isLast ? lastPage : currentPage + 1,
  );

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: isFirst })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirst}
          onClick={handleClickPrev}
        >
          «
        </a>
      </li>

      {pages.map((page) => (
        <li
          key={page}
          className={classNames('page-item', {
            active: currentPage === page,
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

      <li className={classNames('page-item', { disabled: isLast })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLast}
          onClick={handleClickNext}
        >
          »
        </a>
      </li>
    </ul>
  );
};
