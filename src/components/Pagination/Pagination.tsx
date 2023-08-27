import { getNumbers, getNumbersInRange } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const firstItemOnPage = (currentPage - 1) * perPage + 1;
  const lastItemOnPage = currentPage * perPage;

  const pageItems = getNumbersInRange(
    firstItemOnPage,
    lastItemOnPage,
    1,
    total,
  );

  return (
    <>
      {/* Pagination links */}
      <ul className="pagination">
        {/* Previous page link */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href={`#${currentPage - 1}`}
            aria-disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            «
          </a>
        </li>
        {/* Page number links */}
        {getNumbers(1, totalPages).map((n) => (
          <li
            className={`page-item ${n === currentPage ? 'active' : ''}`}
            key={n}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${n}`}
              onClick={() => handlePageChange(n)}
            >
              {n}
            </a>
          </li>
        ))}
        {/* Next page link */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href={`#${currentPage + 1}`}
            aria-disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      {/* Item list */}
      <ul>
        {pageItems.map((n) => (
          <li data-cy="item" key={n}>{`Item ${n}`}</li>
        ))}
      </ul>
    </>
  );
};
