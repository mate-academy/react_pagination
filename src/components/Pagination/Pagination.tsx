import classNames from 'classnames';
import { useState } from 'react';

type Props = {
  total: string[];
  perPage: number;
  currentPage: number | 1;
  onPageChange: (page: number) => void;
  startIndex: number;
  endIndex: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage = 5,
  currentPage = 1,
  onPageChange,
  startIndex,
  endIndex = perPage,
}) => {
  const totalPages = Math.ceil(total.length / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const pageItems = [...total].slice(
    startIndex,
    Math.min(endIndex, total.length),
  );

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', { disabled: currentPage === 1 })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={e => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
          >
            «
          </a>
        </li>

        {pages.map(page => (
          <li
            className={classNames('page-item', {
              active: page === currentPage,
            })}
            key={page}
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
            disabled: currentPage === pages.length,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages.length ? 'true' : 'false'}
            onClick={(e) =>{
              e.preventDefault()
              if(currentPage < pages.length) onPageChange(currentPage + 1)
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {pageItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
