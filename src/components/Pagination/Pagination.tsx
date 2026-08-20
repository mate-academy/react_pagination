import { getNumbers } from '../../utils';

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
  const pages: number[] = getNumbers(1, Math.ceil(total / perPage));

  function clickHandler(page: number): void {
    if (page !== currentPage && page >= 1 && page <= pages.length) {
      onPageChange(page);
    }
  }

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          onClick={() => clickHandler(currentPage - 1)}
          href="#prev"
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={`page-item ${page === currentPage ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            onClick={() => clickHandler(page)}
            href={`#${page}`}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={`page-item ${currentPage === pages.length ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          onClick={() => clickHandler(currentPage + 1)}
          href="#next"
          aria-disabled={currentPage === pages.length}
        >
          »
        </a>
      </li>
    </ul>
  );
};
