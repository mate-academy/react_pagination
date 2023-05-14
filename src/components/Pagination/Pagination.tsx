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
  onPageChange = () => { },
}: PaginationProps) => {
  const pageCount = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {
        Array.from({ length: pageCount }, (_, index) => {
          const pageId = index + 1;

          return (
            <li
              className={`page-item ${currentPage === pageId ? 'active' : ''}`}
              key={pageId}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${pageId}`}
                onClick={() => currentPage !== pageId && onPageChange(pageId)}
              >
                {pageId}
              </a>
            </li>
          );
        })
      }

      <li className={`page-item ${currentPage === pageCount ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageCount}
          onClick={() => (
            currentPage < pageCount && onPageChange(currentPage + 1)
          )}
        >
          »
        </a>
      </li>
    </ul>
  );
};
