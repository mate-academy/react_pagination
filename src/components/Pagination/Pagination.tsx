import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total:number,
  perPage:number,
  currentPage:number,
  onPageChange: (page:number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesNumbers = (!(total % perPage))
    ? total / perPage
    : Math.ceil(total / perPage);

  const pages = getNumbers(1, pagesNumbers);

  const lastPage = currentPage === pagesNumbers;
  const firstPage = currentPage === 1;
  const nextPage = currentPage + 1;
  const previousPage = currentPage - 1;

  const pageChangeHandler = (page:number) => {
    if (page > pagesNumbers || page < 1 || currentPage === page) {
      return;
    }

    onPageChange(page);
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: firstPage })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${previousPage}`}
          aria-disabled={firstPage}
          onClick={() => (pageChangeHandler(previousPage))}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={classNames('page-item', { active: currentPage === page })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => (onPageChange(page))}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={classNames('page-item', { disabled: lastPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${nextPage}`}
          aria-disabled={lastPage}
          onClick={() => pageChangeHandler(nextPage)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
