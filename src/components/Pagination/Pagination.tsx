import cn from 'classnames';
import { getNumbers } from '../../utils';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const countPages = Math.ceil(total / perPage);

  const pages = getNumbers(1, countPages)
    .map(page => {
      return (
        <li
          className={cn(
            'page-item',
            { active: page === currentPage },
          )}
          key={page}
        >
          <a
            onClick={() => {
              onPageChange(page);
            }}
            key={page}
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
          >
            {page}
          </a>
        </li>
      );
    });

  return (
    <ul className="pagination">
      <li className={cn(
        'page-item',
        { disabled: currentPage === 1 },
      )}
      >
        <a
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>
      {pages}
      <li className={cn(
        'page-item',
        { disabled: currentPage === countPages },
      )}
      >
        <a
          onClick={() => {
            if (currentPage < countPages) {
              onPageChange(currentPage + 1);
            }
          }}
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === countPages}
        >
          »
        </a>
      </li>
    </ul>
  );
};
