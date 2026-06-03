import cn from 'classnames';

interface PaginationParams {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationParams> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(total / perPage);

  if (pageCount <= 1) {
    return null;
  }

  const pageLink = [];

  for (let i = 1; i <= pageCount; i++) {
    pageLink.push(
      <li className={cn('page-item', { active: i === currentPage })} key={i}>
        <a
          data-cy="pageLink"
          className="page-link"
          href={`${i}`}
          onClick={e => {
            e.preventDefault();

            if (i !== currentPage) {
              onPageChange(i);
            }
          }}
        >
          {i}
        </a>
      </li>,
    );
  }

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={e => {
            e.preventDefault();
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pageLink}

      <li className={cn('page-item', { disabled: currentPage === pageCount })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageCount}
          onClick={e => {
            e.preventDefault();
            if (currentPage < pageCount) {
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
