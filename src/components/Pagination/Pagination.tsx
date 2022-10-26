import React from 'react';
import classNames from 'classnames';

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
  const pages = Array(Math.ceil(total / perPage)).fill(null);
  const itemsOnPage = Array(perPage).fill(null);
  const countOfPages = Math.ceil(total / perPage) - 1;

  const handlerNextButton = () => {
    if (currentPage !== countOfPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlerPrevButton = () => {
    if (currentPage !== 0) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={classNames(
          'page-item',
          {
            disabled: currentPage === 0,
          },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 0}
            onClick={() => handlerPrevButton()}
          >
            «
          </a>
        </li>
        {pages.map((_, idx) => (
          <li
            className={classNames(
              'page-item',
              {
                active: currentPage === idx,
              },
            )}
            key={`page-${Math.random().toString().slice(-4)}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${idx + 1}`}
              onClick={() => onPageChange(idx)}
            >
              {idx + 1}
            </a>
          </li>
        ))}
        <li className={classNames(
          'page-item',
          {
            disabled: currentPage === countOfPages,
          },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === countOfPages}
            onClick={() => handlerNextButton()}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsOnPage.map((_, idx) => (
          <li
            data-cy="item"
            key={`item ${Math.random().toString().slice(-4)}`}
          >
            {`Item ${currentPage * perPage + idx + 1}`}
          </li>
        )).filter((_, idx) => currentPage * perPage + idx < total)}
      </ul>
    </>
  );
};
