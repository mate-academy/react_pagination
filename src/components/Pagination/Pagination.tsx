type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage); // Загальна кількість сторінок
  const pageNumbers
    = Array.from({ length: totalPages }, (_, index) => index + 1); // Масив з номерами сторінок

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pageNumbers.map((page) => (
        <li
          key={page}
          className={`page-item ${page === currentPage ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={() => handlePageClick(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
