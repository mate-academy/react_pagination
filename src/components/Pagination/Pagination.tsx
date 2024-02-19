interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const isCurrentPage = (page: number) => currentPage === page;

  const goPreviousPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const selectPage = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const goNextPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${isFirstPage ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={() => goPreviousPage()}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={`page-item ${isCurrentPage(page) ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href="#page"
            onClick={() => selectPage(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={`page-item ${isLastPage ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={() => goNextPage()}
        >
          »
        </a>
      </li>
    </ul>
  );
};
