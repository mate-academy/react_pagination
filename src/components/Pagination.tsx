export const Pagination: React.FC<{
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}> = ({ total, perPage, currentPage = 1, onPageChange }) => {
  const totalPages = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          className="page-link"
          href="#prev"
          data-cy="prevLink"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
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
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <li
          key={page}
          className={`page-item ${page === currentPage ? 'active' : ''}`}
        >
          <a
            className="page-link"
            href={`#${page}`}
            data-cy="pageLink"
            onClick={e => {
              e.preventDefault();
              if (page !== currentPage) {
                onPageChange(page);
              }
            }}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        <a
          className="page-link"
          href="#next"
          data-cy="nextLink"
          aria-disabled={currentPage === totalPages ? 'true' : 'false'}
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
