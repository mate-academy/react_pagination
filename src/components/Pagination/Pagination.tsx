import { FC } from 'react';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const lastPage = Math.ceil(total / perPage);
  const pages = getNumbers(1, lastPage);
  const isCurrentFirst = currentPage === 1;
  const isCurrentLast = currentPage === lastPage;

  return (
    <ul className="pagination">
      <li className={`page-item ${isCurrentFirst && 'disabled'}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${pages[currentPage - 1]}`}
          aria-disabled={isCurrentFirst}
          onClick={() => {
            if (!isCurrentFirst) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li key={page} className={`page-item ${page === currentPage && 'active'}`}>
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

      <li className={`page-item ${isCurrentLast && 'disabled'}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${pages[currentPage + 1]}`}
          aria-disabled={isCurrentLast}
          onClick={() => {
            if (!isCurrentLast) {
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
