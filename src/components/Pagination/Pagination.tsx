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
  const totalPages = Math.ceil(total / perPage);
  const pageNumbers: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const createPageChangeHandler =
    (page: number) => (event: React.MouseEvent) => {
      event.preventDefault();

      if (page !== currentPage) {
        onPageChange(page);
      }
    };

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const handlePrevPage = (event: React.MouseEvent) => {
    event.preventDefault();

    if (!isPrevDisabled) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = (event: React.MouseEvent) => {
    event.preventDefault();

    if (!isNextDisabled) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item${isPrevDisabled ? ' disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className={`page-link${isPrevDisabled ? ' disabled' : ''}`}
          href="#prev"
          aria-disabled={isPrevDisabled ? 'true' : 'false'}
          onClick={handlePrevPage}
        >
          «
        </a>
      </li>
      {pageNumbers.map(page => (
        <li
          key={page}
          className={`page-item${page === currentPage ? ' active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={createPageChangeHandler(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={`page-item${isNextDisabled ? ' disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className={`page-link${isNextDisabled ? ' disabled' : ''}`}
          href="#next"
          aria-disabled={isNextDisabled ? 'true' : 'false'}
          onClick={handleNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
