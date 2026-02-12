type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: Props) => {
  const pagesCount = Math.ceil(total / perPage);
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  const handlePageClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    page: number,
  ) => {
    event.preventDefault();

    if (page >= 1 && page <= pagesCount && page !== currentPage) {
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
          onClick={(e) => handlePageClick(e, currentPage - 1)}
        >
          «
        </a>
      </li>

      {pages.map((page) => (
        <li
          key={page}
          className={`page-item ${page === currentPage ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={(e) => handlePageClick(e, page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={`page-item ${currentPage === pagesCount ? 'disabled' : ''
          }`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesCount}
          onClick={(e) => handlePageClick(e, currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
