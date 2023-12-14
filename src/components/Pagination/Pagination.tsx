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

  const onFirstPage = currentPage === 1;
  const onLastPage = currentPage === Number(pages.at(-1));

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: onFirstPage })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={onFirstPage}
          onClick={() => {
            if (!onFirstPage) {
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
      <li className={cn('page-item', { disabled: onLastPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={onLastPage}
          onClick={() => {
            if (!onLastPage) {
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
