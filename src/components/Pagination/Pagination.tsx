interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (event: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPagePages = Math.ceil(total / perPage);
  const numbersArray
    = Array.from({ length: totalPagePages }, (_, index) => index + 1);

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={() => onPageChange(-1)}
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
        >
          «
        </a>
      </li>
      {numbersArray.map((number: number) => (
        <li className={`page-item ${currentPage === number ? 'active' : ''}`} key={number}>
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${number}`}
            onClick={() => onPageChange(number - currentPage)}
          >
            {number}
          </a>
        </li>
      ))}
      <li className={`page-item ${currentPage === totalPagePages ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={() => onPageChange(1)}
          aria-disabled={currentPage === totalPagePages ? 'true' : 'false'}
        >
          »
        </a>
      </li>
    </ul>
  );
};
