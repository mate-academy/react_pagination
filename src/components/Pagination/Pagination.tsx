interface PaginationProps {
  currentPage: number;
  total: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  currentPage,
  total,
}) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === total;

  return (
    <ul className="pagination">
      <li className={`page-item ${isFirstPage && 'disabled'}`}>
        <button
          data-cy="prevLink"
          className="page-link"
          onClick={() => onPageChange(currentPage - 1)}
          aria-disabled={isFirstPage}
          disabled={isFirstPage}
          type="button"
        >
          «
        </button>
      </li>
      {pages.map((page) => (
        <li key={`page-${page}`} className={`page-item ${currentPage === page && 'active'}`}>
          <button
            data-cy="pageLink"
            className="page-link"
            onClick={() => onPageChange(page)}
            type="button"
          >
            {page}
          </button>
        </li>
      ))}
      <li className={`page-item ${isLastPage && 'disabled'}`}>
        <button
          data-cy="nextLink"
          className="page-link"
          onClick={() => onPageChange(currentPage + 1)}
          aria-disabled={isLastPage}
          disabled={isLastPage}
          type="button"
        >
          »
        </button>
      </li>
    </ul>
  );
};
