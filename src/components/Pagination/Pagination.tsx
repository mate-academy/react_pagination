import { getNumbers } from '../../utils';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: PaginationProps) => {
  const totalPages: number = Math.ceil(total / perPage);
  const pages: number[] = getNumbers(1, totalPages);

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={event => {
            event.preventDefault();
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pages.map((pageNumber: number) => (
        <li
          key={pageNumber}
          className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}
        >
          <a
            href={`#${pageNumber}`}
            className="page-link"
            data-cy="pageLink"
            onClick={event => {
              event.preventDefault();
              if (pageNumber !== currentPage) {
                onPageChange(pageNumber);
              }
            }}
          >
            {pageNumber}
          </a>
        </li>
      ))}

      <li
        className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={event => {
            event.preventDefault();

            if (currentPage < totalPages) {
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
