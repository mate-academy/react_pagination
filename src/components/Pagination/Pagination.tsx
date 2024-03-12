interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onChangePage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onChangePage,
}) => {
  const pagesAmount = Math.ceil(total / perPage);
  const pages = new Array<number>(pagesAmount).fill(0).map((_, i) => i + 1);

  const prevPage = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < pagesAmount) {
      onChangePage(currentPage + 1);
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
          onClick={prevPage}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          className={`page-item ${currentPage === page ? 'active' : ''}`}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onChangePage(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={`page-item ${currentPage === pagesAmount ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesAmount}
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
