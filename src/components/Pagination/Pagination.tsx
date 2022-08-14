import classNames from 'classnames';
import React from 'react';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total, perPage, currentPage, onPageChange,
}) => {
  const amountPages = Math.ceil(total / perPage);
  const pages: number[] = [];

  for (let i = 1; i <= amountPages; i += 1) {
    pages.push(i);
  }

  const handlerCurrentPage = (page: string | null) => {
    if (page) {
      onPageChange(+page);
    }
  };

  const handlerNextPage = () => {
    if (currentPage < amountPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlerPrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames(
          'page-item',
          {
            disabled: currentPage === 1,
          },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handlerPrevPage}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={classNames('page-item',
            {
              active: page === currentPage,
            })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={
              (e) => handlerCurrentPage(e.currentTarget.textContent)
            }
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={classNames(
          'page-item',
          {
            disabled: currentPage === amountPages,
          },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === amountPages}
          onClick={handlerNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
