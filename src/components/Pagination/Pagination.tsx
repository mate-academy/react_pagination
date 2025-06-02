type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button
          data-cy="prevLink"
          className="page-link"
          onClick={handlePrevClick}
          disabled={currentPage === 1}
          aria-disabled={currentPage === 1}
        >
          «
        </button>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={`page-item ${page === currentPage ? 'active' : ''}`}
        >
          <button
            data-cy="pageLink"
            className="page-link"
            onClick={() => handleClick(page)}
          >
            {page}
          </button>
        </li>
      ))}

      <li
        className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        <button
          data-cy="nextLink"
          className="page-link"
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
          aria-disabled={currentPage === totalPages}
        >
          »
        </button>
      </li>
    </ul>
  );
};
