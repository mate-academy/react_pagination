interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const pagesCount = Math.ceil(total / perPage);

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagesCount) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={`${currentPage === 1 ? 'true' : 'false'}`}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            handlePageChange(currentPage - 1);
          }}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={`page-item${page === currentPage ? ' active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={e => {
              e.preventDefault();
              const href = (e.target as HTMLAnchorElement).href.split('#')[1];

              onPageChange(Number(href));
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={`page-item${currentPage === pagesCount ? ' disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={`${currentPage === pagesCount ? 'true' : 'false'}`}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            handlePageChange(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
