type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount: number = Math.ceil(total / perPage);
  const pages: JSX.Element[] = [];

  for (let i = 1; i <= pageCount; i++) {
    pages.push(
      <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${i}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </a>
      </li>,
    );
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pageCount) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => handlePrev()}
          >
            «
          </a>
        </li>
        {pages}
        <li
          className={`page-item ${currentPage === pageCount ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pageCount ? 'true' : 'false'}
            onClick={() => handleNext()}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
