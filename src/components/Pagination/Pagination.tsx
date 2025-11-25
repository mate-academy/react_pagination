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
  const pages = Math.ceil(total / perPage);

  const allPages = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <ul className="pagination">
      <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {allPages.map(page => (
        <li
          className={page === currentPage ? 'page-item active' : 'page-item'}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#page-${page}`}
            onClick={() => page !== currentPage && onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={currentPage === pages ? 'page-item disabled' : 'page-item'}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages ? 'true' : 'false'}
          onClick={() => currentPage !== pages && onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
