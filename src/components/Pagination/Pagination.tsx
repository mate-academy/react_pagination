import { getNumbers } from '../../utils';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination = (props: PaginationProps) => {
  const { total, perPage, currentPage = 1, onPageChange } = props;

  const totalPages = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={`${currentPage === 1 ? 'true' : 'false'}`}
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
      {getNumbers(1, totalPages).map(page => (
        <li
          className={`page-item ${page === currentPage ? 'active' : ''}`}
          key={page}
        >
          <a
            href={`#${page}`}
            onClick={e => {
              e.preventDefault();
              if (page !== currentPage) {
                onPageChange(page);
              }
            }}
            data-cy="pageLink"
            className="page-link"
          >
            {page}
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
          aria-disabled={`${currentPage === totalPages ? 'true' : 'false'}`}
          onClick={e => {
            e.preventDefault();
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
