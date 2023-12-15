import cn from 'classnames';
import { FC } from 'react';

type Props = {
  total: number,
  perPage: number,
  currentPage?: number,
  onPageChange: (page: number) => void,
};

export const Pagination: FC<Props> = ({
  total, perPage, currentPage = 1, onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pages = [];

  for (let i = 1; i <= numberOfPages; i += 1) {
    pages.push(String(i));
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === Number(pages.at(-1));

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: isFirstPage })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={() => {
            if (!isFirstPage) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li key={page} className={`page-item ${Number(page) === currentPage ? 'active' : ''}`}>
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(+page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={cn('page-item', { disabled: isLastPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={() => {
            if (!isLastPage) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
