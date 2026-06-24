type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const getNumbers = (from: number, to: number): number[] => {
  const numbers = [];

  for (let i = from; i <= to; i++) {
    numbers.push(i);
  }

  return numbers;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / perPage);

  const pages = getNumbers(1, pagesCount);

  const isFirstPage: boolean = currentPage === 1;
  const isLastPage: boolean = currentPage === pagesCount;

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={isFirstPage ? 'disabled' : ''}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={e => {
            e.preventDefault();

            if (!isFirstPage) {
              handlePageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li key={page} className={page === currentPage ? 'active' : ''}>
          <a
            data-cy="pageLink"
            href={`#${page}`}
            onClick={e => {
              e.preventDefault();
              handlePageChange(page);
            }}
            className="page-link"
          >
            {page}
          </a>
        </li>
      ))}

      <li className={isLastPage ? 'disabled' : ''}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={e => {
            e.preventDefault();

            if (!isLastPage) {
              handlePageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
