import cn from 'classnames';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const pagiPagesCount = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1
            ? 'true'
            : 'false'
          }
          onClick={() => currentPage > 1
            ? onPageChange(currentPage - 1)
            : ''
          }
        >
          «
        </a>
      </li>
      {Array.from({ length: pagiPagesCount }, (_, i) => i + 1)
        .map(page => (
        <li
          className={cn('page-item', { active: page === currentPage })}
          key={page}
          onClick={() => onPageChange(page)}
        >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
            >
            {page}
          </a>
        </li>
      ))}

      <li className={cn('page-item', { disabled: currentPage === pagiPagesCount })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === 1
            ? 'true'
            : 'false'
          }
          onClick={() => currentPage < pagiPagesCount
            ? onPageChange(currentPage + 1)
            : ''
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
