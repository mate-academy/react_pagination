import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pages: number[] = [];
  const length: number = Math.ceil(total / perPage);

  for (let i = 1; i <= length; i++) {
    pages.push(i);
  }

  return (
    <ul className="pagination">
      <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={
            currentPage !== 1 ? () => onPageChange(currentPage - 1) : () => {}
          }
        >
          «
        </a>
      </li>

      {pages.map(page => {
        return (
          <li
            className={currentPage === page ? 'page-item active' : 'page-item'}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={
                currentPage !== page ? () => onPageChange(page) : () => {}
              }
            >
              {page}
            </a>
          </li>
        );
      })}

      <li
        className={
          currentPage === pages.length ? 'page-item disabled' : 'page-item'
        }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages.length ? 'true' : 'false'}
          onClick={
            currentPage !== pages.length
              ? () => onPageChange(currentPage + 1)
              : () => {}
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
