import cn from 'classnames';
interface PaginationProps {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

function isPrevDisables(current: number) {
  return current === 1;
}

function isNextDisables(current: number, pagesNumber: number) {
  return current >= pagesNumber;
}

export const Pagination = ({
  total,
  perPage = 5,
  currentPage = 1,
  onPageChange,
}: PaginationProps) => {
  const pagesNumber = Math.ceil(total / perPage);
  const pagesToShow = Array.from({ length: pagesNumber }, (_, i) => i + 1);

  return (
    <ul className="pagination">
      <li
        className={cn('page-item ', isPrevDisables(currentPage) && 'disabled')}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isPrevDisables(currentPage) && 'true'}
          onClick={() =>
            !isPrevDisables(currentPage) && onPageChange(currentPage - 1)
          }
        >
          «
        </a>
      </li>
      {pagesToShow.map(page => (
        <li
          key={page}
          className={cn('page-item', currentPage === page && 'active')}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => page !== currentPage && onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={cn(
          'page-item ',
          isNextDisables(currentPage, pagesNumber) && 'disabled',
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={
            isNextDisables(currentPage, pagesNumber) && 'true'
          }
          onClick={() =>
            !isNextDisables(currentPage, pagesNumber) &&
            onPageChange(currentPage + 1)
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
