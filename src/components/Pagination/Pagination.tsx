export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pageCount = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          onClick={
            currentPage === 1 ? undefined : () => onPageChange(currentPage - 1)
          }
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={`${currentPage === 1 ? true : false}`}
        >
          «
        </a>
      </li>
      {Array.from({ length: pageCount }, (_, i) => i + 1).map(page => (
        <li
          key={page}
          className={`page-item ${page === currentPage ? 'active' : ''}`}
        >
          <a
            onClick={() => page !== currentPage && onPageChange(page)}
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={`page-item ${currentPage === pageCount ? 'disabled' : ''}`}
      >
        <a
          onClick={
            currentPage === pageCount
              ? undefined
              : () => onPageChange(currentPage + 1)
          }
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={`${currentPage === pageCount ? true : false}`}
        >
          »
        </a>
      </li>
    </ul>
  );
};
