import cn from 'classnames';

interface PaginationType {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function getPages(total: number, perPage: number) {
  const pagesCounted: number[] = [];
  const totalPages = Math.ceil(total / perPage);

  for (let i = 1; i <= totalPages; i++) {
    pagesCounted.push(i);
  }

  return pagesCounted;
}

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: PaginationType) => {
  const totalPages: number[] = getPages(total, perPage);
  const lastPageSelected: boolean =
    currentPage === totalPages[totalPages.length - 1];
  const firstPageSelected: boolean = currentPage === 1;

  function handlePageMoveForward() {
    if (!lastPageSelected) {
      onPageChange(currentPage + 1);
    }
  }

  function handlePageMoveBack() {
    if (!firstPageSelected) {
      onPageChange(currentPage - 1);
    }
  }

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: firstPageSelected })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={firstPageSelected ? 'true' : 'false'}
          onClick={() => handlePageMoveBack()}
        >
          «
        </a>
      </li>
      {totalPages.map(pageNumber => (
        <li
          className={cn('page-item', { active: pageNumber === currentPage })}
          key={pageNumber}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNumber}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', {
          disabled: lastPageSelected,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={lastPageSelected ? 'true' : 'false'}
          onClick={() => handlePageMoveForward()}
        >
          »
        </a>
      </li>
    </ul>
  );
};
