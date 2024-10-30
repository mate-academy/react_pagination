type PaginationProps = {
  total: number,
  perPage?: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination = ({ total, perPage = 5, currentPage, onPageChange }: PaginationProps) => {
  const pageQuantity = Math.ceil(total / perPage);
  const pages = [];

  for (let i = 1; i <= pageQuantity; i++) {
    pages.push(i);
  }

  return (
  <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage - 1)
            }}
            >
            «
          </a>
        </li>

        {pages.map(page => (
          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            <a
              className="page-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}
            >
            {page}
            </a>
          </li>
        ))}

        <li className={`page-item ${currentPage === pageQuantity ? 'disabled' : ''}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pageQuantity}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage + 1)
            }}
            >
            »
          </a>
        </li>
      </ul>
  );
};
