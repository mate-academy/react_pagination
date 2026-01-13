interface Props {
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
}: Props) => {
  const totalPages = Math.ceil(total / perPage);
  const arrPage = Array.from({ length: totalPages }, (_, i) => i + 1);

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
            const newPage = currentPage - 1;

            if (newPage < 1 || newPage > totalPages) {
              return;
            }

            onPageChange(newPage);
          }}
        >
          «
        </a>
      </li>
      {arrPage.map(page => (
        <li
          className={`page-item ${currentPage === page ? 'active' : ''}`}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
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
          data-cy="nextLink"
          className="page-link "
          href="#next"
          aria-disabled={`${currentPage === totalPages ? 'true' : 'false'}`}
          onClick={e => {
            e.preventDefault();
            const newPage = currentPage + 1;

            if (newPage < 1 || newPage > totalPages) {
              return;
            }

            onPageChange(newPage);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
